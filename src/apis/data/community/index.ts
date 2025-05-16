import api from '@apis/api-config';

export type PostUploadImageRes = {
  data: string[];
};

export const postUploadImage = async (formData: FormData) => {
  const res = await api.post<PostUploadImageRes>('/api/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export type PostUploadReq = {
  title: string;
  categoryId: 1 | 2 | 3;
  content: {
    type: string[];
    value: string[];
  };
};
export const postUpload = async (body: PostUploadReq) => {
  await api.post('/api/posts', body);
};
