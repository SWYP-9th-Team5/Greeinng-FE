import api from '@apis/api-config';

export interface PlantCardItem {
  name: string;
  type: string;
}

export interface PlantCardResponse {
  data: PlantCardItem;
}

export const createPlantCard = async (
  payload: PlantCardItem,
): Promise<PlantCardItem> => {
  const res = await api.post<PlantCardResponse>('/api/pet-plants', payload);
  console.log('📦 서버 응답:', res.data); // 🔍 여기서도 확인 가능
  return res.data;
};
