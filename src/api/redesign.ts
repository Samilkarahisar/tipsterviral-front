import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import {
  API_PATH_GET_REDESIGN,
  API_PATH_GET_REDESIGNS_BY_USER,
} from '@/res/values';

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

export const getAllRedesignsByUserId = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const { data } = await api.get(`${API_PATH_GET_REDESIGNS_BY_USER}`, {
      params: {
        token,
      },
    });

    return data;
  } catch (e) {
    return null;
  }
};
