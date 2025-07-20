import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from '@apis/api-config';
import {
  DeletePostReq,
  PetPlantDiaryRecordReq,
  PetPlantDiaryRecordRes,
  PutPostReq,
  ReqPetPlantWatering,
  deleteDailyRecord,
  postPetPlantWatering,
  postPetPlantsDiaryRecord,
  putDailyRecord,
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
    mutationFn: ({ petPlantId, today }) =>
      postPetPlantWatering({ petPlantId, today }),
  });

  const deletePetPlantDiaryMutation = useMutation<
    void,
    AxiosError<ErrorResponse>,
    DeletePostReq
  >({
    mutationFn: ({ dailyRecordId }) => deleteDailyRecord({ dailyRecordId }),
  });

  const putPetPlantDiaryMutation = useMutation<
    PetPlantDiaryRecordRes,
    AxiosError<ErrorResponse>,
    PutPostReq
  >({
    mutationFn: ({ dailyRecordId, body }) =>
      putDailyRecord({ dailyRecordId, body }),
  });

  return {
    postDiaryPostMutation,
    postWaterMutation,
    deletePetPlantDiaryMutation,
    putPetPlantDiaryMutation,
  };
}
