import { http } from '../../core/api/http';
import { endpoints } from '../../core/api/endpoints';


export const fetchEpisode = async (id: number) => {
const { data } = await http.get(endpoints.episodes + '/' + id);
return data;
};
