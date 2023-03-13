import api from '@/lib/axios';
import { auth } from '@/lib/firebase';
import { API_PATH_POST_DESIGN_TOOL } from '@/res/values';

export const createDesignFromTool = async (
  file: any,
  style: string,
  type: string,
  empty: any,
) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    const ownerId = auth.currentUser?.uid;

    if (token && ownerId) {
      const resizedFile = await resizeImage(file, 800, 800);
      const fileToUpload = new File([resizedFile], 'resizedFile');
      const formData = new FormData();
      formData.append('image', fileToUpload);
      formData.append('style', style);
      formData.append('roomType', type);
      formData.append('isRoomEmpty', empty);

      const { data } = await api.post(API_PATH_POST_DESIGN_TOOL, formData, {
        params: {
          token,
        },
      });
      return data;
    }
  } catch (e) {
    console.log(e);
    return;
  }
};

const resizeImage = (
  imageData: ArrayBuffer,
  maxWidth: number,
  maxHeight: number,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(new Blob([imageData]));

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      if (ctx) ctx.drawImage(img, x, y, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to resize image'));
        }
      });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};
