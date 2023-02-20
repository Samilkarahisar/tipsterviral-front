import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import { API_PATH_POST_DESIGN_TOOL } from '@/res/values';

export const createDesignFromTool = async (formData: FormData | undefined) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      await api
        .post(API_PATH_POST_DESIGN_TOOL, {
          params: {
            token,
          },
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
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
