'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Questao {
  id: string;
  enunciado: string;
  alternativas: { [key: string]: string };
  dificuldade: string;
  area: string;
}

export default function EstudoPage() {
  const router = useRouter();
  const [sessaoId, setSessaoId] = useState<string | null>(null);
  const [questaoAtual, setQuestaoAtual] = useState<Questao | null>(null);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  useEffect(() => {
    iniciarSessao();
  }, []);

  const iniciarSessao = async () => {
    setLoading(true);
    try {
      const result = await api.iniciarEstudo('oab');
      if (result.success) {
        setSessaoId(result.data.sessaoId);
        setQuestaoAtual(result.data.questao);
      }
    } catch (err) {
      console.error('Erro ao iniciar sessão:', err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const responderQuestao = async () => {
    if (!sessaoId || !questaoAtual || !respostaSelecionada) return;

    setLoading(true);
    try {
      const result = await api.responderQuestao(
        sessaoId,
        questaoAtual.id,
        respostaSelecionada
      );
      setFeedback(result.data);

      // Próxima questão após 3 segundos
      setTimeout(() => {
        if (result.data.proximaQuestao) {
          setQuestaoAtual(result.data.proximaQuestao);
          setRespostaSelecionada('');
          setFeedback(null);
        } else {
          // Sessão finalizada
          router.push('/dashboard');
        }
      }, 3000);
    } catch (err) {
      console.error('Erro ao responder:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !questaoAtual) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Preparando questões...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">⚖️</span>
              <span className="text-purple-900 text-xl font-bold">Doutora IA OAB</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 px-4 py-2"
            >
              ← Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {questaoAtual ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Cabeçalho da Questão */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {questaoAtual.area}
                </span>
                <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {questaoAtual.dificuldade}
                </span>
              </div>
              <span className="text-gray-500 text-sm">ID: {questaoAtual.id}</span>
            </div>

            {/* Enunciado */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Questão:</h2>
              <p className="text-gray-700 leading-relaxed">{questaoAtual.enunciado}</p>
            </div>

            {/* Alternativas */}
            <div className="space-y-3 mb-8">
              {Object.entries(questaoAtual.alternativas).map(([letra, texto]) => (
                <button
                  key={letra}
                  onClick={() => !feedback && setRespostaSelecionada(letra)}
                  disabled={!!feedback}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    respostaSelecionada === letra
                      ? 'border-purple-900 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  } ${
                    feedback && feedback.correta === letra
                      ? 'border-green-500 bg-green-50'
                      : feedback && respostaSelecionada === letra && feedback.correta !== letra
                      ? 'border-red-500 bg-red-50'
                      : ''
                  } disabled:cursor-not-allowed`}
                >
                  <span className="font-bold text-purple-900 mr-2">{letra})</span>
                  <span className="text-gray-700">{texto}</span>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`p-6 rounded-lg mb-6 ${
                feedback.acertou ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
              }`}>
                <h3 className={`font-bold text-lg mb-2 ${
                  feedback.acertou ? 'text-green-900' : 'text-red-900'
                }`}>
                  {feedback.acertou ? '✅ Correto!' : '❌ Incorreto'}
                </h3>
                <p className="text-gray-700">{feedback.explicacao}</p>
              </div>
            )}

            {/* Botão Responder */}
            {!feedback && (
              <button
                onClick={responderQuestao}
                disabled={!respostaSelecionada || loading}
                className="w-full bg-purple-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verificando...' : 'Confirmar Resposta'}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">Nenhuma questão disponível no momento</p>
            <Link
              href="/dashboard"
              className="inline-block bg-purple-900 text-white px-6 py-3 rounded-lg hover:bg-purple-800"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
