import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PostType } from '../common/type';

export const usePosts = () =>
  useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/client/post/select/all`);
      return res.data;
    },
    staleTime: 1000 * 60,
  });


