// utils/stat.ts

import { formatNumber } from "./numberFormat";

// Generic 타입 사용 가능
export const calculateViewStats = <T>(
  data: T[],
  getDateKey: (item: T) => string,
  getCount: (item: T) => number
): { todayTotal: string; allTotal: string } => {
  const todayKey = new Date().toISOString().slice(0, 10); // '2025-09-10'

  let todayTotal = 0;
  let allTotal = 0;

  for (const item of data) {
    const dateKey = getDateKey(item); // 날짜 비교용
    const count = getCount(item); // 조회수 또는 방문자수

    if (dateKey === todayKey) {
      todayTotal += count;
    }

    allTotal += count;
  }

  return {
    todayTotal: formatNumber(todayTotal),
    allTotal: formatNumber(allTotal),
  };
};
