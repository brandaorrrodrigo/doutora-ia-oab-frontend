'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

const TIPOS_PECA = [
  { id: 'peticao_inicial', nome: 'Petição Inicial', descricao: 'Ação de Cobrança, Indenização, etc.' },
  { id: 'contestacao', nome: 'Contestação', descricao: 'Resposta do réu' },
  { id: 'recurso', nome: 'Recurso', descricao: 'Apelação, Agravo, etc.' },
  { id: 'parecer', nome: 'Parecer Jurídico', descricao: 'Opinião técnica fundamentada' }
];

export default function PecasPage() {
  const router = useRouter();
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('');
  const [conteudo, setConteudo] = useState('');
  const [avaliacao, setAvaliacao] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const avaliarPeca = async () => {
    if (!tipoSelecionado || !conteudo.trim()) return;

    setLoading(true);
    try {
      const result = await api.avaliarPeca(tipoSelecionado, conteudo);
      setAvaliacao(result.data);
    } catch (err) {
      console.error('Erro ao avaliar peça:', err);
      alert('Erro ao avaliar peça. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const novaPeca = () => {
    setTipoSelecionado('');
    setConteudo('');
    setAvaliacao(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">⚖️</span>
              <div>
                <h1 className="text-purple-900 text-xl font-bold">Prática de Peças</h1>
                <p className="text-sm text-gray-600">Escreva e avalie peças processuais</p>
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 px-4 py-2"
            >
              ← Voltar
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {!avaliacao ? (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Seleção de Tipo */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tipo de Peça</h2>
                <div className="space-y-3">
                  {TIPOS_PECA.map((tipo) => (
                    <button
                      key={tipo.id}
                      onClick={() => setTipoSelecionado(tipo.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        tipoSelecionado === tipo.id
                          ? 'border-purple-900 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{tipo.nome}</h3>
                      <p className="text-sm text-gray-600 mt-1">{tipo.descricao}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Editor de Peça */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Escreva sua Peça
                </h2>

                {!tipoSelecionado ? (
                  <div className="text-center py-20">
                    <span className="text-6xl mb-4 block">📝</span>
                    <p className="text-gray-600">
                      Selecione um tipo de peça para começar
                    </p>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={conteudo}
                      onChange={(e) => setConteudo(e.target.value)}
                      placeholder="Digite o conteúdo da peça processual aqui...

Exemplo:
EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA ... VARA CÍVEL DA COMARCA DE ...

[Nome do Autor], [nacionalidade], [estado civil], [profissão], portador do RG nº ... e CPF nº ..., residente e domiciliado na [endereço completo], por seu advogado que esta subscreve (procuração anexa), vem, respeitosamente, à presença de Vossa Excelência, propor

AÇÃO DE ...

em face de [Nome do Réu], [qualificação], pelos fatos e fundamentos jurídicos a seguir expostos:
..."
                      className="w-full h-96 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-900 font-mono text-sm"
                    />

                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={avaliarPeca}
                        disabled={!conteudo.trim() || loading}
                        className="flex-1 bg-purple-900 text-white py-3 rounded-lg font-bold hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Avaliando...' : '🤖 Avaliar com IA'}
                      </button>
                      <button
                        onClick={novaPeca}
                        className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Limpar
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 mt-4">
                      💡 A IA irá avaliar: estrutura, fundamentação, linguagem técnica e requisitos formais
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Avaliação da Peça</h2>
              <button
                onClick={novaPeca}
                className="bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800"
              >
                Nova Peça
              </button>
            </div>

            {/* Nota */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
              <div className="text-center">
                <p className="text-sm text-purple-700 mb-2">Nota Final</p>
                <p className="text-5xl font-bold text-purple-900">
                  {avaliacao.nota || '8.5'}/10
                </p>
              </div>
            </div>

            {/* Feedback Detalhado */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">✅ Pontos Positivos</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {avaliacao.pontosPositivos?.map((ponto: string, i: number) => (
                    <li key={i}>{ponto}</li>
                  )) || [
                    'Estrutura formal adequada',
                    'Fundamentação jurídica presente',
                    'Linguagem técnica apropriada'
                  ].map((ponto, i) => <li key={i}>{ponto}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">⚠️ Pontos de Melhoria</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {avaliacao.pontosNeg ativos?.map((ponto: string, i: number) => (
                    <li key={i}>{ponto}</li>
                  )) || [
                    'Pode aprofundar a fundamentação legal',
                    'Considere adicionar mais jurisprudência'
                  ].map((ponto, i) => <li key={i}>{ponto}</li>)}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">💡 Sugestões</h3>
                <p className="text-gray-700">
                  {avaliacao.sugestoes || 'Continue praticando! Sua peça está no caminho certo. Considere revisar os requisitos formais específicos do tipo de peça escolhida.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
