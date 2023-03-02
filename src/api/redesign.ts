import api from '@/lib/axios';
import { API_PATH_GET_REDESIGN } from '@/res/values';
export const getRedesignById = async (
  token: string | undefined,
  id: string | number,
) => {
  try {
    const { data } = await api.get(`${API_PATH_GET_REDESIGN}/${id}`, {
      params: {
        token,
      },
    });

    return data;
  } catch (e) {
    return null;
  }
};
