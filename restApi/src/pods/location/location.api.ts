import { http } from '../../core/api/http';
import { endpoints } from '../../core/api/endpoints';


export const fetchLocation = async (id: number) => {
const { data } = await http.get(endpoints.locations + '/' + id);
return data;
};
