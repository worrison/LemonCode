import { http } from '../../core/api/http';
import { endpoints } from '../../core/api/endpoints';
// Update the import path to the correct relative path if needed
import { Character } from '../../core/models/character';




export const fetchCharacter = async (id: number) => {
console.log('API: Fetching character with ID:', id);
console.log('API: Endpoint will be:', endpoints.character(id));
const { data } = await http.get<Character>(endpoints.character(id));
console.log('API: Character data received:', data);
return data;
};
