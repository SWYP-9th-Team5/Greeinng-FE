'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import '@/assets/css/calendar.css';

import { getPetPlantsMonthInfo } from '@apis/data/diary';

import PostModal, { DiaryModalState } from './modal/PostModal';

interface CustomStyledCalendarProps {
  plantId: number;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CustomStyledCalendar({
  plantId,
}: CustomStyledCalendarProps) {
  const [value, setValue] = useState<Value>(new Date());

  const [modalState, setModalState] = useState<DiaryModalState>({
    isOpen: false,
    isWatering: false,
    petPlantId: plantId,
    dailyRecordId: -1,
    date: '',
  });

  const handleClickDate = async (value: Date) => {
    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();

    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    // petPlantId 넘겨줘야함
    const { data } = await getPetPlantsMonthInfo(plantId, year, month);
    const findResValue = data.find((item) => item.date === formattedDate);

    setModalState((prev) => ({
      ...prev,
      // petPlantId 넘겨줘야함
      petPlantId: 13,
      isWatering: !!findResValue?.watering,
      dailyRecordId: findResValue?.dailyRecordId ?? -1,
      date: formattedDate,
      isOpen: true,
    }));
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

  // 현재 월 추출
  const getDisplayMonth = (date: Date) => `${date.getMonth() + 1}월`;

  return (
    <div className="box-border h-[353px] w-[316px] rounded-2xl bg-[#f7f6f2] p-2 md:h-[450px] md:w-[500px] md:p-4">
      <div className="mb-2 flex items-center justify-start gap-3">
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
        tileContent={() => null}
        showNeighboringMonth={false}
        showNavigation={false}
        formatDay={(_, date) => `${date.getDate()}`}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate ?? new Date())
        }
        onClickDay={(value) => handleClickDate(value)}
      />
      {modalState.isOpen && (
        <PostModal modalState={modalState} setModalState={setModalState} />
      )}
    </div>
  );
}
