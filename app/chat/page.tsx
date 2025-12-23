'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou a Doutora IA, sua assistente especializada em Direito e preparação para a OAB. Como posso ajudar você hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Chamada para o chat server via API backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'doutoraia-oab-2025-secret-key-ultra-secure'
        },
        body: JSON.stringify({
          userName: 'Estudante',
          message: input,
          contextType: 'oab'
        })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || 'Desculpe, não consegui processar sua pergunta.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚖️</span>
              <div>
                <h1 className="text-purple-900 text-xl font-bold">Chat com Doutora IA</h1>
                <p className="text-sm text-gray-600">Sua assistente jurídica especializada</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 px-4 py-2"
            >
              ← Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                  message.role === 'user'
                    ? 'bg-purple-900 text-white'
                    : 'bg-white border-2 border-gray-200 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">
                    {message.role === 'user' ? 'Você' : '🤖 Doutora IA'}
                  </span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-purple-200' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="animate-bounce">🤖</div>
                  <span className="text-gray-600">Doutora IA está digitando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta sobre Direito ou OAB..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-900"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 Dica: Pergunte sobre legislação, jurisprudência, questões da OAB e muito mais!
          </p>
        </div>
      </div>
    </div>
  );
}
