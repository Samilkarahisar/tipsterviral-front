import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import {
  API_PATH_ADD_TITLE,
  API_PATH_DELETE_TITLE,
  API_PATH_EDIT_SAVE,
  API_PATH_GENERATE_MORE,
  API_PATH_GET_TITLES,
  API_PATH_SINGLE_TITLE,
} from '@/res/values';

export const addTitle = async (createTitleDto: {
  title: string;
  siteId: string;
}) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.post(
        API_PATH_ADD_TITLE,
        { ...createTitleDto },
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
export const deleteTitle = async (titleId: string) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.post(
        API_PATH_DELETE_TITLE,
        { titleId },
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
export const generateMore = async (titleDto: any) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.post(
        API_PATH_GENERATE_MORE,
        { ...titleDto },
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

export const titleEdit = async (titleDto: any) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.post(
        API_PATH_EDIT_SAVE,
        { ...titleDto },
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
