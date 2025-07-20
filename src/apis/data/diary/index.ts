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

export const getPetPlantsTodayInfo = async (dailyRecordId: number) => {
  const res = await api.get<{ data: PlantsTodayInfo }>(
    `/api/pet-plants/daily-record/${dailyRecordId}`,
  );
  return res.data;
};

export type ReqPetPlantWatering = {
  petPlantId: number;
  today: string;
};

export const postPetPlantWatering = async ({
  petPlantId,
  today,
}: ReqPetPlantWatering) => {
  await api.post(`/api/pet-plants/${petPlantId}/watering`, {
    today,
  });
};

export type PetPlantDiaryRecordReq = {
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
  petPlantId,
  today,
  title,
  content,
}: PetPlantDiaryRecordReq) => {
  const res = await api.post<PetPlantDiaryRecordRes>(
    `/api/pet-plants/${petPlantId}/daily-record`,
    {
      today,
      title,
      content,
    },
  );
  return res;
};

export type DeletePostReq = {
  dailyRecordId: number;
};
export const deleteDailyRecord = async ({ dailyRecordId }: DeletePostReq) => {
  await api.delete(`/api/pet-plants/daily-record/${dailyRecordId}`);
};

export type PutPostReq = {
  dailyRecordId: number;
  body: {
    title: string;
    content: PostContentItem[];
  };
};

export const putDailyRecord = async ({ dailyRecordId, body }: PutPostReq) => {
  const res = await api.put<PetPlantDiaryRecordRes>(
    `/api/pet-plants/daily-record/${dailyRecordId}`,
    body,
  );
  return res;
};

export interface PlantCardItem {
  name: string;
  type: string;
}

export interface PlantCardResponse {
  data: PlantCardItem;
}

export interface MyPlantItem {
  id: number;
  name: string;
  type: string;
  createdAt: string;
}

export interface MyPlantResponse {
  data: MyPlantItem[];
}

export const createPlantCard = async (
  payload: PlantCardItem,
): Promise<PlantCardItem> => {
  const res = await api.post<PlantCardResponse>('/api/pet-plants', payload);
  return res.data;
};

export const fetchMyPlant = async (): Promise<MyPlantItem[]> => {
  const res = await api.get<MyPlantResponse>('/api/pet-plants');
  return res.data;
};

export const deletePlant = async (petPlantId: number): Promise<void> => {
  try {
    await api.delete(`/api/pet-plants/${petPlantId}`);
  } catch (error) {
    console.error('식물 삭제 실패:', error);
    throw error;
  }
};

type PlantMonthInfoRes = {
  data: {
    date: string;
    watering: boolean;
    dailyRecordId: number;
  }[];
};

export const getPetPlantsMonthInfo = async (
  petPlantId: number,
  year: number,
  month: number,
) => {
  try {
    const res = await api.get<PlantMonthInfoRes>(
      `/api/pet-plants/${petPlantId}?year=${year}&month=${month}`,
    );
    return res;
  } catch (error) {
    console.error('식물 삭제 실패:', error);
    throw error;
  }
};
