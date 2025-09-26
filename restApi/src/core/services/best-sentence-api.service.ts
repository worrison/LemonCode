import { http } from '../api/http';

export interface BestSentenceDto {
  id?: number;
  characterId: number;
  sentence: string;
  createdAt?: string;
  updatedAt?: string;
}

// Configuración para el servidor local
const LOCAL_SERVER_URL = 'http://localhost:3001';

// Cliente HTTP para el servidor local
const localHttp = {
  async get<T>(url: string): Promise<{ data: T }> {
    const response = await fetch(`${LOCAL_SERVER_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },

  async post<T>(url: string, body: any): Promise<{ data: T }> {
    const response = await fetch(`${LOCAL_SERVER_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },

  async put<T>(url: string, body: any): Promise<{ data: T }> {
    const response = await fetch(`${LOCAL_SERVER_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },

  async delete<T>(url: string): Promise<{ data: T }> {
    const response = await fetch(`${LOCAL_SERVER_URL}${url}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return { data };
  },
};

export const bestSentenceApi = {
  // Obtener todas las frases del servidor
  async getAll(): Promise<BestSentenceDto[]> {
    const { data } = await localHttp.get<BestSentenceDto[]>('/best-sentences');
    return data;
  },

  // Obtener frase de un personaje específico
  async getByCharacterId(characterId: number): Promise<BestSentenceDto | null> {
    try {
      const { data } = await localHttp.get<BestSentenceDto>(`/best-sentences/${characterId}`);
      return data;
    } catch (error: any) {
      if (error.message.includes('404')) {
        return null; // No existe frase para este personaje
      }
      throw error;
    }
  },

  // Crear nueva frase
  async create(sentence: Omit<BestSentenceDto, 'id' | 'createdAt' | 'updatedAt'>): Promise<BestSentenceDto> {
    const { data } = await localHttp.post<BestSentenceDto>('/best-sentences', sentence);
    return data;
  },

  // Actualizar frase existente
  async update(characterId: number, sentence: string): Promise<BestSentenceDto> {
    const { data } = await localHttp.put<BestSentenceDto>(`/best-sentences/${characterId}`, {
      sentence,
    });
    return data;
  },

  // Eliminar frase
  async delete(characterId: number): Promise<void> {
    await localHttp.delete(`/best-sentences/${characterId}`);
  },
};
