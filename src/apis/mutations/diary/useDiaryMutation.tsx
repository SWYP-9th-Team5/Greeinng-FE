import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from '@apis/api-config';
import {
  DeletePostReq,
  PetPlantDiaryRecordReq,
  PetPlantDiaryRecordRes,
  ReqPetPlantWatering,
  deleteDailyRecord,
  postPetPlantWatering,
  postPetPlantsDiaryRecord,
} from '@apis/data/diary';

export default function useDiaryMutation() {
  const postDiaryPostMutation = useMutation<
    PetPlantDiaryRecordRes,
    AxiosError<ErrorResponse>,
    PetPlantDiaryRecordReq
  >({
    mutationFn: (req: PetPlantDiaryRecordReq) => postPetPlantsDiaryRecord(req),
  });

  const postWaterMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    ReqPetPlantWatering
  >({
    mutationFn: ({ userId, petPlantId, today }) =>
      postPetPlantWatering({ userId, petPlantId, today }),
  });

  const deletePetPlantDiaryMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    DeletePostReq
  >({
    mutationFn: ({ userId, dailyRecordId }) =>
      deleteDailyRecord({ userId, dailyRecordId }),
  });

  return {
    postDiaryPostMutation,
    postWaterMutation,
    deletePetPlantDiaryMutation,
  };
}
