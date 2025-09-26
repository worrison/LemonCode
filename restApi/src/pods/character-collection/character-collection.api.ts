import { http } from '../../core/api/http';
import { endpoints } from '../../core/api/endpoints';
import { ApiListResponse } from '../../core/models/pagination';
import { Character } from '../../core/models/character';


export const fetchCharacters = async (page = 1, name = '') => {
const params: Record<string, string | number> = { page };
if (name) params.name = name;
const { data } = await http.get<ApiListResponse<Character>>(endpoints.characters, { params });
return data;
};
