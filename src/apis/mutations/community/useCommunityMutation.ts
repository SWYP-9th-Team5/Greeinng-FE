import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from '@apis/api-config';
import {
  PostUploadImageRes,
  PostUploadReq,
  postUpload,
  postUploadImage,
} from '@apis/data/community';

export default function useCommunityMutation() {
  const postImageMutation = useMutation<
    PostUploadImageRes,
    AxiosError<ErrorResponse>,
    FormData
  >({
    mutationFn: (formData: FormData) => postUploadImage(formData),
  });

  const postMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    PostUploadReq
  >({
    mutationFn: (body: PostUploadReq) => postUpload(body),
  });

  return { postImageMutation, postMutation };
}
