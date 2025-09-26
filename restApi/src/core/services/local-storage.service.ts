export interface BestSentence {
  characterId: number;
  sentence: string;
  updatedAt: string;
}

const BEST_SENTENCES_KEY = 'best-sentences';

export const localStorageService = {
  // Obtener todas las frases guardadas
  getAllBestSentences(): BestSentence[] {
    try {
      const data = localStorage.getItem(BEST_SENTENCES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  // Obtener frase de un personaje específico
  getBestSentence(characterId: number): string {
    const sentences = this.getAllBestSentences();
    const found = sentences.find(s => s.characterId === characterId);
    return found?.sentence || '';
  },

  // Guardar o actualizar frase de un personaje
  saveBestSentence(characterId: number, sentence: string): void {
    try {
      const sentences = this.getAllBestSentences();
      const existingIndex = sentences.findIndex(s => s.characterId === characterId);
      
      const bestSentence: BestSentence = {
        characterId,
        sentence,
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        sentences[existingIndex] = bestSentence;
      } else {
        sentences.push(bestSentence);
      }

      localStorage.setItem(BEST_SENTENCES_KEY, JSON.stringify(sentences));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save best sentence locally');
    }
  },

  // Eliminar frase de un personaje
  deleteBestSentence(characterId: number): void {
    try {
      const sentences = this.getAllBestSentences();
      const filtered = sentences.filter(s => s.characterId !== characterId);
      localStorage.setItem(BEST_SENTENCES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
      throw new Error('Failed to delete best sentence');
    }
  }
};