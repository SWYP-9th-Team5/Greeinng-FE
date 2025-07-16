import api from '@apis/api-config';

import { PostContentItem } from '../community';

type PlantInfo = {
  date: string;
  watering: boolean;
  dailyRecordId: number;
};

export const getPetPlantsInfo = async (
  userId: number,
  year: number,
  month: number,
  petPlantId: number,
) => {
  const res = await api.get<{ data: PlantInfo[] }>(
    `/api/pet-plants/${petPlantId}`,
    {
      params: {
        userId,
        year,
        month,
      },
    },
  );
  return res.data;
};

type PlantsTodayInfo = {
  title: string;
  createdAt: string;
  content: PostContentItem[];
};

export const getPetPlantsTodayInfo = async (
  userId: number,
  dailyRecordId: number,
) => {
  const res = await api.get<{ data: PlantsTodayInfo }>(
    `/api/pet-plants/daily-record/${dailyRecordId}`,
    {
      params: {
        userId,
      },
    },
  );
  return res.data;
};

export type ReqPetPlantWatering = {
  userId: number;
  petPlantId: number;
  today: string;
};

export const postPetPlantWatering = async ({
  userId,
  petPlantId,
  today,
}: ReqPetPlantWatering) => {
  await api.post(`/api/pet-plants/${petPlantId}/watering?userId=${userId}`, {
    today,
  });
};

export type PetPlantDiaryRecordReq = {
  userId: number;
  petPlantId: number;
  today: string;
  title: string;
  content: PostContentItem[];
};

export type PetPlantDiaryRecordRes = {
  data: {
    dailyRecordId: number;
  };
};

export const postPetPlantsDiaryRecord = async ({
  userId,
  petPlantId,
  today,
  title,
  content,
}: PetPlantDiaryRecordReq) => {
  const res = await api.post<PetPlantDiaryRecordRes>(
    `/api/pet-plants/${petPlantId}/daily-record?userId=${userId}`,
    {
      today,
      title,
      content,
    },
  );
  return res;
};

export type DeletePostReq = {
  userId: number;
  dailyRecordId: number;
};
export const deleteDailyRecord = async ({
  userId,
  dailyRecordId,
}: DeletePostReq) => {
  await api.delete(
    `/api/pet-plants/daily-record/${dailyRecordId}?userId=${userId}`,
  );
};
