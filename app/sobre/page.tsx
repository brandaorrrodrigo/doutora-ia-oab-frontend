import Link from 'next/link';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">⚖️</span>
            </div>
            <span className="text-white text-2xl font-bold">Doutora IA OAB</span>
          </Link>
          <Link
            href="/"
            className="text-white hover:text-purple-200 transition-colors px-4 py-2"
          >
            ← Voltar
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Sobre a Doutora IA OAB
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              A <strong>Doutora IA OAB</strong> é uma plataforma revolucionária de estudos que combina
              inteligência artificial avançada com metodologia pedagógica comprovada para ajudar
              você a conquistar sua aprovação na OAB.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">🎯 Nossa Missão</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Democratizar o acesso a uma preparação de qualidade para o Exame da Ordem,
              tornando o estudo mais eficiente, personalizado e acessível a todos os estudantes
              de Direito do Brasil.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">🤖 Tecnologia de Ponta</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nossa plataforma utiliza modelos de linguagem de última geração, treinados
              especificamente para o contexto jurídico brasileiro e para o formato do Exame da OAB.
              A IA analisa seu desempenho, identifica pontos fracos e adapta o conteúdo às suas necessidades.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">✨ Recursos Principais</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-purple-900 mr-2">📚</span>
                <span className="text-gray-700">
                  <strong>Banco de Questões:</strong> Milhares de questões comentadas e atualizadas
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-900 mr-2">🎯</span>
                <span className="text-gray-700">
                  <strong>Simulados Personalizados:</strong> Provas adaptadas ao seu nível
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-900 mr-2">⚖️</span>
                <span className="text-gray-700">
                  <strong>Prática de Peças:</strong> Escreva e receba feedback da IA
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-900 mr-2">📊</span>
                <span className="text-gray-700">
                  <strong>Análise de Desempenho:</strong> Relatórios detalhados e insights
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-900 mr-2">💬</span>
                <span className="text-gray-700">
                  <strong>Chat com IA:</strong> Tire dúvidas 24/7 com nossa assistente virtual
                </span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">📈 Resultados Comprovados</h2>
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">98%</div>
                <div className="text-gray-700">Taxa de Aprovação</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">15k+</div>
                <div className="text-gray-700">Questões Disponíveis</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-purple-900 mb-2">24/7</div>
                <div className="text-gray-700">Suporte IA</div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">🚀 Comece Agora</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Junte-se a milhares de estudantes que já estão se preparando de forma inteligente
              e eficiente com a Doutora IA OAB. Sua aprovação começa aqui!
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                href="/cadastro"
                className="bg-purple-900 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-800 transition-colors inline-block"
              >
                Cadastrar Gratuitamente
              </Link>
              <Link
                href="/"
                className="border-2 border-purple-900 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors inline-block"
              >
                Voltar à Página Inicial
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12">
        <div className="text-center text-purple-200">
          <p>© 2025 Doutora IA OAB. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
