'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

interface PainelData {
  estudante: {
    nome: string;
    email: string;
    plano: string;
  };
  estatisticas: {
    sessoesRealizadas: number;
    questoesRespondidas: number;
    aproveitamento: number;
    pecasConcluidas: number;
  };
  limitesAtivos: {
    sessoesPorDia: number;
    sessoesUsadas: number;
    questoesPorSessao: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [painelData, setPainelData] = useState<PainelData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPainel = async () => {
      try {
        const data = await api.getPainel();
        setPainelData(data.data);
      } catch (err) {
        setError('Erro ao carregar painel');
        // Se não autenticado, redireciona para login
        if (err instanceof Error && err.message.includes('401')) {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadPainel();
  }, [router]);

  const handleLogout = () => {
    api.clearToken();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !painelData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/login" className="text-purple-900 hover:text-purple-700">
            Voltar para login
          </Link>
        </div>
      </div>
    );
  }

  const { estudante, estatisticas, limitesAtivos } = painelData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚖️</span>
              </div>
              <span className="text-purple-900 text-2xl font-bold">Doutora IA OAB</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 px-4 py-2"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Olá, {estudante.nome}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Plano: <span className="font-semibold text-purple-900">{estudante.plano}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-gray-900">{estatisticas.sessoesRealizadas}</div>
            <div className="text-gray-600 text-sm">Sessões Realizadas</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-gray-900">{estatisticas.questoesRespondidas}</div>
            <div className="text-gray-600 text-sm">Questões Respondidas</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-gray-900">{estatisticas.aproveitamento}%</div>
            <div className="text-gray-600 text-sm">Aproveitamento</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-2xl font-bold text-gray-900">{estatisticas.pecasConcluidas}</div>
            <div className="text-gray-600 text-sm">Peças Concluídas</div>
          </div>
        </div>

        {/* Limites Diários */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-purple-900 mb-2">Limite Diário</h3>
          <p className="text-sm text-purple-700">
            Você usou {limitesAtivos.sessoesUsadas} de {limitesAtivos.sessoesPorDia} sessões hoje.
          </p>
          <div className="mt-2 bg-purple-200 rounded-full h-2">
            <div
              className="bg-purple-900 h-2 rounded-full transition-all"
              style={{
                width: `${(limitesAtivos.sessoesUsadas / limitesAtivos.sessoesPorDia) * 100}%`
              }}
            ></div>
          </div>
        </div>

        {/* Ações Principais */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/estudo"
            className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-xl p-8 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-2">Iniciar Estudo</h3>
            <p className="text-purple-200">
              Responda questões da OAB com feedback da IA
            </p>
          </Link>

          <Link
            href="/pecas"
            className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white rounded-xl p-8 hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-2xl font-bold mb-2">Praticar Peças</h3>
            <p className="text-blue-200">
              Escreva e avalie peças processuais
            </p>
          </Link>
        </div>

        {/* Chat com IA */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="text-3xl mr-3">🤖</div>
            <h3 className="text-xl font-bold text-gray-900">Doutora IA - Sua Assistente</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Tire dúvidas sobre qualquer tema jurídico com nossa IA especializada
          </p>
          <Link
            href="/chat"
            className="inline-block bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
          >
            Conversar com a IA
          </Link>
        </div>
      </main>
    </div>
  );
}
