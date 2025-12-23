// API Client para integração com o backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://oab.doutoraia.com';

export class APIClient {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_URL;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(error.message || `Erro: ${response.status}`);
    }

    return response.json();
  }

  // Auth
  async login(email: string, senha: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
  }

  async register(data: { nome: string; email: string; senha: string }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Estudo
  async iniciarEstudo(contextType: string = 'oab') {
    return this.request('/estudo/iniciar', {
      method: 'POST',
      body: JSON.stringify({ contextType }),
    });
  }

  async responderQuestao(sessaoId: string, questaoId: string, resposta: string) {
    return this.request('/estudo/responder', {
      method: 'POST',
      body: JSON.stringify({ sessaoId, questaoId, resposta }),
    });
  }

  async finalizarEstudo(sessaoId: string) {
    return this.request('/estudo/finalizar', {
      method: 'POST',
      body: JSON.stringify({ sessaoId }),
    });
  }

  // Peças
  async iniciarPeca(tipo: string) {
    return this.request('/peca/iniciar', {
      method: 'POST',
      body: JSON.stringify({ tipo }),
    });
  }

  async avaliarPeca(pecaId: string, conteudo: string) {
    return this.request('/peca/avaliar', {
      method: 'POST',
      body: JSON.stringify({ pecaId, conteudo }),
    });
  }

  // Painel
  async getPainel() {
    return this.request('/estudante/painel');
  }

  async getRelatorio(periodo: string = '30d') {
    return this.request(`/estudante/relatorio?periodo=${periodo}`);
  }

  // Health
  async health() {
    return this.request('/health');
  }
}

export const api = new APIClient();
