import api from '@apis/api-config';

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
