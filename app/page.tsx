'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    api.health()
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">⚖️</span>
            </div>
            <span className="text-white text-2xl font-bold">Doutora IA OAB</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="text-white hover:text-purple-200 transition-colors px-4 py-2"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="bg-white text-purple-900 hover:bg-purple-100 transition-colors px-6 py-2 rounded-lg font-semibold"
            >
              Cadastrar
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Sua Aprovação na OAB
            <br />
            <span className="text-purple-300">Começa Aqui</span>
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Plataforma inteligente com IA para turbinar seus estudos.
            <br />
            Questões comentadas, simulados e análise de peças processuais.
          </p>

          {/* Status Badge */}
          <div className="mb-8 flex justify-center">
            {apiStatus === 'loading' && (
              <span className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm">
                🔄 Verificando sistema...
              </span>
            )}
            {apiStatus === 'online' && (
              <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm">
                ✅ Sistema operacional
              </span>
            )}
            {apiStatus === 'offline' && (
              <span className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm">
                ⚠️ Sistema em manutenção
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cadastro"
              className="bg-white text-purple-900 hover:bg-purple-100 transition-colors px-8 py-4 rounded-lg font-bold text-lg shadow-xl"
            >
              Começar Gratuitamente
            </Link>
            <Link
              href="/sobre"
              className="bg-purple-700/50 text-white hover:bg-purple-700 transition-colors px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/20"
            >
              Conhecer Recursos
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">Questões OAB</h3>
            <p className="text-purple-200">
              Milhares de questões comentadas por nossa IA especializada em direito
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-white mb-2">IA Personalizada</h3>
            <p className="text-purple-200">
              Inteligência artificial treinada especificamente para o exame da OAB
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Análise Completa</h3>
            <p className="text-purple-200">
              Acompanhe seu desempenho com relatórios detalhados e insights
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">15k+</div>
            <div className="text-purple-200">Questões</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-purple-200">Aprovação</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-purple-200">Disponível</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">IA</div>
            <div className="text-purple-200">Avançada</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-white/10">
        <div className="text-center text-purple-200">
          <p>© 2025 Doutora IA OAB. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            Plataforma de estudos com Inteligência Artificial
          </p>
        </div>
      </footer>
    </div>
  );
}
