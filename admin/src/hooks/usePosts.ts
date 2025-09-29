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

      const res = await axios.get(`http://ifut2.ddns.net/api/client/post/select/all`);
      return res.data;
    },
    staleTime: 1000 * 60,
  });