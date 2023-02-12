import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import { API_PATH_GET_TITLES, API_PATH_SINGLE_TITLE } from '@/res/values';

export const getTitles = async (siteId: string | undefined) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.get(API_PATH_GET_TITLES, {
        params: {
          token,
          siteId,
        },
      });
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const getTitleById = async (
  token: string | undefined,
  id: string | number,
) => {
  try {
    const { data } = await api.get(`${API_PATH_SINGLE_TITLE}/${id}`, {
      params: {
        token,
      },
    });

    return data;
  } catch (e) {
    return null;
  }
};
