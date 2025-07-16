import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { postsApi, usersApi, commentsApi, Post, User, Comment } from './api';

// Query keys for better cache management
export const queryKeys = {
  posts: ['posts'] as const,
  post: (id: number) => ['posts', id] as const,
  postsByUser: (userId: number) => ['posts', 'user', userId] as const,
  users: ['users'] as const,
  user: (id: number) => ['users', id] as const,
  comments: ['comments'] as const,
  commentsByPost: (postId: number) => ['comments', 'post', postId] as const,
};

// Posts hooks
export const usePosts = () => {
  return useQuery({
    queryKey: queryKeys.posts,
    queryFn: postsApi.getPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => postsApi.getPost(id),
    enabled: !!id,
  });
};

export const usePostsByUser = (userId: number) => {
  return useQuery({
    queryKey: queryKeys.postsByUser(userId),
    queryFn: () => postsApi.getPostsByUser(userId),
    enabled: !!userId,
  });
};

// Users hooks
export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: usersApi.getUsers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => usersApi.getUser(id),
    enabled: !!id,
  });
};

// Comments hooks
export const useComments = () => {
  return useQuery({
    queryKey: queryKeys.comments,
    queryFn: commentsApi.getComments,
  });
};

export const useCommentsByPost = (postId: number) => {
  return useQuery({
    queryKey: queryKeys.commentsByPost(postId),
    queryFn: () => commentsApi.getCommentsByPost(postId),
    enabled: !!postId,
  });
};

// Combined hook for post with user details
export const usePostWithUser = (postId: number) => {
  const postQuery = usePost(postId);
  const userQuery = useUser(postQuery.data?.userId || 0);

  return {
    post: postQuery.data,
    user: userQuery.data,
    isLoading: postQuery.isLoading || userQuery.isLoading,
    error: postQuery.error || userQuery.error,
    isError: postQuery.isError || userQuery.isError,
  };
};

// Hook for posts with pagination simulation
export const usePostsPaginated = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'paginated', limit],
    queryFn: async ({ pageParam = 0 }) => {
      const allPosts = await postsApi.getPosts();
      const start = pageParam * limit;
      const end = start + limit;
      return {
        posts: allPosts.slice(start, end),
        nextPage: end < allPosts.length ? pageParam + 1 : undefined,
        hasMore: end < allPosts.length,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};