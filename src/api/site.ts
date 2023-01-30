import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import {
  API_PATH_ADD_SITE,
  API_PATH_DELETE_SITE,
  API_PATH_GET_SITE,
  API_PATH_UPDATE_SITE,
} from '@/res/values';

export const addSite = async (siteName: string, logoData: Blob) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    const formData = new FormData();
    formData.append('logoData', logoData);
    formData.append('siteName', siteName);

    if (token && ownerId) {
      const { data } = await api.post(API_PATH_ADD_SITE, formData, {
        params: {
          token,
        },
      });
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const deleteSite = async (siteId: string) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;
    console.log(siteId);
    if (token && ownerId) {
      const { data } = await api.post(
        API_PATH_DELETE_SITE,
        { siteId },
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};

export const updateSite = async (updateSiteDto: any) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.post(
        API_PATH_UPDATE_SITE,
        { updateSiteDto },
        {
          params: {
            token,
          },
        },
      );
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};
export const getSites = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.get(API_PATH_GET_SITE, {
        params: {
          token,
        },
      });
      return data;
    }
    return;
  } catch (e) {
    return;
  }
};
