import axios from 'axios';

// 방문자 수 증가 API 호출
export const incrementVisitorCount = async () => {
  try {
    await axios.post('http://116.42.245.135/api/client/visit/up');
    console.log('방문자 수가 증가되었습니다.');
  } catch (error) {
    console.error('방문자 수 증가 실패:', error);
  }
};

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// 오늘 이미 방문했는지 확인
export const hasVisitedToday = () => {
  const today = getTodayString();
  const lastVisitDate = localStorage.getItem('lastVisitDate');
  return lastVisitDate === today;
};

// 오늘 방문 기록 저장
export const markVisitedToday = () => {
  const today = getTodayString();
  localStorage.setItem('lastVisitDate', today);
};

// 하루에 한 번만 방문자 수 증가
export const incrementVisitorCountOnceToday = async () => {
  if (!hasVisitedToday()) {
    await incrementVisitorCount();
    markVisitedToday();
  }
};
