import { useContext } from 'react';
import PostsContext from '@/stores/Posts.context';

const usePosts = () => {
  return useContext(PostsContext);
};

export default usePosts;
