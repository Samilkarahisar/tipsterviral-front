import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import { API_PATH_GET_DESIGN, API_PATH_GET_TITLES } from '@/res/values';

export const getDesigns = async (siteId: string | undefined) => {
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

export const getDesignBySlug = async (slug: string) => {
  try {
    const { data } = await api.get(`${API_PATH_GET_DESIGN}/${slug}`);
    return data;
  } catch (e) {
    return null;
  }
};
