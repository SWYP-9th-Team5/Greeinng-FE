'use client';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '@/assets/css/calendar.css';
import { useDiaryModalStore } from '@/stores/useDiaryModalStore';

import { getPetPlantsMonthInfo } from '@apis/data/diary';

interface CustomStyledCalendarProps {
  plantId: number;
}
interface WateringDate {
  date: string;
  watering: boolean;
  dailyRecordId: number;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CustomStyledCalendar({
  plantId,
}: CustomStyledCalendarProps) {
  const [value, setValue] = useState<Value>(new Date());
  const [wateringDates, setWateringDates] = useState<WateringDate[]>([]);

  const handleSetDiaryState = useDiaryModalStore(
    (state) => state.handleSetDiaryState,
  );
  const handleOpenDiaryModal = useDiaryModalStore(
    (state) => state.handleOpenDiaryModal,
  );
  const handleClickDate = async (value: Date) => {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();

    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const { data } = await getPetPlantsMonthInfo(plantId, year, month);

    const findResValue = data.find((item) => item.date === formattedDate);
    handleSetDiaryState({
      petPlantId: plantId,
      isWatering: !!findResValue?.watering,
      dailyRecordId: findResValue?.dailyRecordId ?? -1,
      date: formattedDate,
    });
    handleOpenDiaryModal();
  };

  // 현재 보이는 달을 상태로 관리
  const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

  const handleChange = (val: Value) => {
    setValue(val);
  };

  const handlePrevMonth = () => {
    const prev = new Date(activeStartDate);
    prev.setMonth(prev.getMonth() - 1);
    setActiveStartDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(activeStartDate);
    next.setMonth(next.getMonth() + 1);
    setActiveStartDate(next);
  };

  useEffect(() => {
    console.log(
      '📅 API 호출 시점: plantId =',
      plantId,
      '| activeStartDate =',
      activeStartDate,
    );

    const fetchData = async () => {
      const year = activeStartDate.getFullYear();
      const month = activeStartDate.getMonth() + 1;
      const { data } = await getPetPlantsMonthInfo(plantId, year, month);
      console.log('📦 받아온 데이터:', data);
      setWateringDates(data);
    };

    fetchData();
  }, [plantId, activeStartDate]);

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  const renderTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const formatted = formatDate(date);

    const match = wateringDates.find((item) => item.date === formatted);

    if (!match) return null;

    const icons = [];

    if (match.dailyRecordId !== 0) {
      console.log('✅ 표시 대상 날짜:', formatted);
      icons.push(
        <img
          key="record"
          src="/icons/record.svg"
          alt="기록 있음"
          className="h-1.5 w-1.5 md:h-2 md:w-2"
        />,
      );
    }

    return <div className="flex justify-end pt-1 pl-3 md:pl-7">{icons}</div>;
  };

  // 현재 월 추출
  const getDisplayMonth = (date: Date) => `${date.getMonth() + 1}월`;

  return (
    <div className="box-border h-[375px] w-[316px] rounded-2xl bg-[#f7f6f2] px-2 pt-1 md:h-[480px] md:w-[500px] md:px-4 md:pt-2">
      <div className="flex items-center justify-start gap-3">
        <button
          onClick={handlePrevMonth}
          className="-mr-2 h-5 w-5 bg-[url('/icons/arrow-left.svg')] bg-contain bg-center bg-no-repeat"
        />
        <h2 className="title2 text-secondary">
          {getDisplayMonth(activeStartDate)}
        </h2>
        <button
          onClick={handleNextMonth}
          className="-ml-2 h-5 w-5 bg-[url('/icons/arrow-right.svg')] bg-contain bg-center bg-no-repeat"
        />
      </div>

      {/* 달력 */}
      <Calendar
        locale="ko-KR"
        value={value}
        onChange={handleChange}
        calendarType="gregory"
        tileContent={renderTileContent}
        showNeighboringMonth={false}
        showNavigation={false}
        formatDay={(_, date) => `${date.getDate()}`}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate ?? new Date())
        }
        onClickDay={(value) => handleClickDate(value)}
      />
    </div>
  );
}
