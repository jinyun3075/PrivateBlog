interface ViewDataType {
  view_id: number;
  post_id: string;
  view: number;
  regDate: string;
}

interface VisitDataType {
  visit_id: number;
  visit: number;
  regDate: string;
}

/**
 * 오늘 날짜인지 확인하는 함수
 * @param regDate - "2025-09-13T05:23:46.093457" 형식의 날짜 문자열
 * @returns 오늘 날짜인지 여부
 */
const isToday = (regDate: string): boolean => {
  const today = new Date();
  const targetDate = new Date(regDate);
  
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  );
};

/**
 * 조회수 통계를 계산하는 함수
 * @param viewData - 조회수 데이터 배열
 * @returns 오늘 조회수와 누적 조회수
 */
export const calculateViewStats = (viewData: ViewDataType[]) => {
  const todayViews = viewData
    .filter(item => isToday(item.regDate))
    .reduce((sum, item) => sum + item.view, 0);
  
  const totalViews = viewData
    .reduce((sum, item) => sum + item.view, 0);
  
  return {
    todayViews,
    totalViews
  };
};

/**
 * 방문자 통계를 계산하는 함수
 * @param visitData - 방문자 데이터 배열
 * @returns 오늘 방문자와 누적 방문자
 */
export const calculateVisitStats = (visitData: VisitDataType[]) => {
  const todayVisits = visitData
    .filter(item => isToday(item.regDate))
    .reduce((sum, item) => sum + item.visit, 0);
  
  const totalVisits = visitData
    .reduce((sum, item) => sum + item.visit, 0);
  
  return {
    todayVisits,
    totalVisits
  };
};

/**
 * 모든 통계를 한번에 계산하는 함수
 * @param viewData - 조회수 데이터 배열
 * @param visitData - 방문자 데이터 배열
 * @returns 모든 통계 데이터
 */
export const calculateAllStats = (viewData: ViewDataType[], visitData: VisitDataType[]) => {
  const viewStats = calculateViewStats(viewData);
  const visitStats = calculateVisitStats(visitData);
  
  return {
    ...viewStats,
    ...visitStats
  };
};
