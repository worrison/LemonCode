import { localStorageService } from './local-storage.service';
import { bestSentenceApi } from './best-sentence-api.service';

export type SaveStrategy = 'localStorage' | 'api' | 'both';

export interface BestSentenceService {
  getBestSentence(characterId: number): Promise<string>;
  saveBestSentence(characterId: number, sentence: string, strategy?: SaveStrategy): Promise<void>;
  deleteBestSentence(characterId: number, strategy?: SaveStrategy): Promise<void>;
}

class BestSentenceServiceImpl implements BestSentenceService {
  private defaultStrategy: SaveStrategy = 'both';

  async getBestSentence(characterId: number): Promise<string> {
    try {
      // Intentar primero desde la API
      const apiResult = await bestSentenceApi.getByCharacterId(characterId);
      if (apiResult?.sentence) {
        return apiResult.sentence;
      }
    } catch (error) {
      console.warn('Failed to fetch from API, falling back to localStorage:', error);
    }

    // Fallback a localStorage
    return localStorageService.getBestSentence(characterId);
  }

  async saveBestSentence(
    characterId: number,
    sentence: string,
    strategy: SaveStrategy = this.defaultStrategy
  ): Promise<void> {
    const errors: string[] = [];

    if (strategy === 'localStorage' || strategy === 'both') {
      try {
        localStorageService.saveBestSentence(characterId, sentence);
      } catch (error: any) {
        errors.push(`localStorage error: ${error.message}`);
      }
    }

    if (strategy === 'api' || strategy === 'both') {
      try {
        // Verificar si ya existe
        const existing = await bestSentenceApi.getByCharacterId(characterId);

        if (existing) {
          await bestSentenceApi.update(characterId, sentence);
        } else {
          await bestSentenceApi.create({ characterId, sentence });
        }
      } catch (error: any) {
        errors.push(`API error: ${error.message}`);
      }
    }

    // Si hay errores pero al menos uno funcionó, solo advertir
    if (errors.length > 0) {
      if (errors.length === 2 || (strategy !== 'both' && errors.length === 1)) {
        // Todos los intentos fallaron
        throw new Error(`Failed to save: ${errors.join(', ')}`);
      } else {
        // Al menos uno funcionó
        console.warn('Partial save failure:', errors.join(', '));
      }
    }
  }

  async deleteBestSentence(
    characterId: number,
    strategy: SaveStrategy = this.defaultStrategy
  ): Promise<void> {
    const errors: string[] = [];

    if (strategy === 'localStorage' || strategy === 'both') {
      try {
        localStorageService.deleteBestSentence(characterId);
      } catch (error: any) {
        errors.push(`localStorage error: ${error.message}`);
      }
    }

    if (strategy === 'api' || strategy === 'both') {
      try {
        await bestSentenceApi.delete(characterId);
      } catch (error: any) {
        errors.push(`API error: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      if (errors.length === 2 || (strategy !== 'both' && errors.length === 1)) {
        throw new Error(`Failed to delete: ${errors.join(', ')}`);
      } else {
        console.warn('Partial delete failure:', errors.join(', '));
      }
    }
  }

  // Método para sincronizar datos entre localStorage y API
  async syncData(): Promise<void> {
    try {
      const apiData = await bestSentenceApi.getAll();
      const localData = localStorageService.getAllBestSentences();

      // Sincronizar: API tiene prioridad
      for (const apiItem of apiData) {
        localStorageService.saveBestSentence(apiItem.characterId, apiItem.sentence);
      }

      console.log('Data synchronized successfully');
    } catch (error) {
      console.error('Failed to sync data:', error);
    }
  }
}

export const bestSentenceService = new BestSentenceServiceImpl();
