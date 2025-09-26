import { Character } from '../../core/models/character';


export interface CharacterCollectionVm {
page: number;
pages: number;
total: number;
items: Character[];
}
