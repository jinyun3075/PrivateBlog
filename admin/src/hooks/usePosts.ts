import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '../common/type';


// ✅ 테스트용 mock 데이터
const mockPosts: PostType[] = []; // or 만들어진 더미 데이터 배열

// ✅ 개발 중 테스트를 위한 플래그
const testMode = false;

export const usePosts = () =>
  useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      if (testMode) {
        // 👉 테스트 중엔 빈 배열 또는 가짜 데이터 반환
        return mockPosts;
      }

      const res = await axios.get(`/api/client/post/select/all`);
      return res.data;
    },
    staleTime: 0, // 캐시를 즉시 만료시켜 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true, // 윈도우 포커스 시 자동 새로고침
  });
