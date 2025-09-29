import axios from 'axios';

// 30분 세션 키 생성 (현재 시간을 30분 단위로 나눈 값)
export const getCurrentSessionKey = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const sessionNumber = Math.floor(minutes / 30); // 0-1 (30분 단위)
  const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
  return `${dateString}-${sessionNumber}`;
};

// 조회수 증가 API 호출
export const incrementViewCount = async (postId: string) => {
  try {
    await axios.post(`/api/client/view/up/${postId}`);
    console.log(`게시글 ${postId}의 조회수가 증가되었습니다.`);
  } catch (error) {
    console.error('조회수 증가 실패:', error);
  }
};

// 현재 세션에서 해당 게시글을 이미 조회했는지 확인
export const hasViewedInCurrentSession = (postId: string) => {
  const currentSessionKey = getCurrentSessionKey();
  const sessionData = localStorage.getItem('viewSession');
  
  if (!sessionData) {
    return false;
  }
  
  try {
    const parsedData = JSON.parse(sessionData);
    return parsedData.sessionKey === currentSessionKey && parsedData.viewedPosts.includes(postId);
  } catch (error) {
    console.error('세션 데이터 파싱 오류:', error);
    return false;
  }
};

// 현재 세션에서 해당 게시글 조회 기록 저장
export const markViewedInCurrentSession = (postId: string) => {
  const currentSessionKey = getCurrentSessionKey();
  const sessionData = localStorage.getItem('viewSession');
  
  let parsedData;
  if (sessionData) {
    try {
      parsedData = JSON.parse(sessionData);
    } catch (error) {
      parsedData = { sessionKey: currentSessionKey, viewedPosts: [] };
    }
  } else {
    parsedData = { sessionKey: currentSessionKey, viewedPosts: [] };
  }
  
  // 세션이 바뀌었으면 기존 데이터 초기화
  if (parsedData.sessionKey !== currentSessionKey) {
    parsedData = { sessionKey: currentSessionKey, viewedPosts: [] };
  }
  
  // 해당 게시글이 아직 조회 기록에 없으면 추가
  if (!parsedData.viewedPosts.includes(postId)) {
    parsedData.viewedPosts.push(postId);
    localStorage.setItem('viewSession', JSON.stringify(parsedData));
  }
};

// 30분 단위로 조회수 증가 (같은 세션에서는 한 번만)
export const incrementViewCountOncePerSession = async (postId: string) => {
  if (!hasViewedInCurrentSession(postId)) {
    await incrementViewCount(postId);
    markViewedInCurrentSession(postId);
  }
};
