import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import { API_PATH_POST_DESIGN_TOOL } from '@/res/values';

export const createDesignFromTool = async (formData: any) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      console.log(token);
      await api
        .post(API_PATH_POST_DESIGN_TOOL, formData, {
          params: {
            token,
          },
        })
        .then((res) => {
          console.log(res);
        });
    }
    return;
  } catch (e) {
    return;
  }
};
