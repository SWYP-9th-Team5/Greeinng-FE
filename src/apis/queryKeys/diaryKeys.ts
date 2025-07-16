/* eslint-disable import/no-anonymous-default-export */
export default {
  getPetPlants: (
    userId: number,
    year: number,
    month: number,
    petPlantId: number,
  ) => ['/pet-plants', userId, year, month, petPlantId],
  getPetPlantsTodayInfo: (userId: number, dailyRecordId: number) => [
    '/pet-plants/daily-record',
    userId,
    dailyRecordId,
  ],
};
