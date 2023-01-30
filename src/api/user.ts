import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import {
  API_PATH_CREATE_SESSION,
  API_PATH_GET_PORTAL,
  API_PATH_GET_USER,
} from '@/res/values';
import { Price } from 'types';

export const getUser = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.get(API_PATH_GET_USER, {
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
export const getPortalLink = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.get(API_PATH_GET_PORTAL, {
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
export const subscribeUser = async (price: Price) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const { data } = await api.post(
        API_PATH_CREATE_SESSION,
        { ...price },
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
