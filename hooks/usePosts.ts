import { useContext } from 'react';
import PostsContext from '@/stores/Posts.context';

const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === null) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export default usePosts;
