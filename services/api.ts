// Base API configuration
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Generic API fetch function
async function apiRequest<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// Types for JSONPlaceholder data
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// API functions
export const postsApi = {
  // Get all posts
  getPosts: (): Promise<Post[]> => apiRequest<Post[]>('/posts'),
  
  // Get single post
  getPost: (id: number): Promise<Post> => apiRequest<Post>(`/posts/${id}`),
  
  // Get posts by user
  getPostsByUser: (userId: number): Promise<Post[]> => 
    apiRequest<Post[]>(`/posts?userId=${userId}`),
};

export const usersApi = {
  // Get all users
  getUsers: (): Promise<User[]> => apiRequest<User[]>('/users'),
  
  // Get single user
  getUser: (id: number): Promise<User> => apiRequest<User>(`/users/${id}`),
};

export const commentsApi = {
  // Get comments for a post
  getCommentsByPost: (postId: number): Promise<Comment[]> => 
    apiRequest<Comment[]>(`/posts/${postId}/comments`),
  
  // Get all comments
  getComments: (): Promise<Comment[]> => apiRequest<Comment[]>('/comments'),
};