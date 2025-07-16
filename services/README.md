# Services Directory

This directory contains the data fetching logic using TanStack Query (React Query) for the PlayBuddys application.

## Structure

- **`api.ts`** - Contains API functions and TypeScript interfaces for JSONPlaceholder endpoints
- **`hooks.ts`** - Custom React hooks using TanStack Query for data fetching
- **`index.ts`** - Barrel export file for clean imports

## Features Implemented

### API Layer (`api.ts`)
- Generic API request function with error handling
- TypeScript interfaces for Post, User, and Comment data
- Organized API functions for:
  - Posts (get all, get single, get by user)
  - Users (get all, get single)
  - Comments (get all, get by post)

### Custom Hooks (`hooks.ts`)
- **Query Keys**: Centralized query key management for better cache control
- **Basic Hooks**: 
  - `usePosts()` - Fetch all posts
  - `usePost(id)` - Fetch single post
  - `useUser(id)` - Fetch single user
  - `useComments()` - Fetch all comments
  - `useCommentsByPost(postId)` - Fetch comments for specific post
- **Advanced Hooks**:
  - `usePostWithUser(postId)` - Combined hook for post with user details
  - `usePostsPaginated(limit)` - Infinite query for paginated posts

### Configuration
- **Stale Time**: 5 minutes for posts, 10 minutes for users
- **Refetch on Window Focus**: Disabled globally
- **Error Handling**: Comprehensive error states
- **Loading States**: Proper loading indicators
- **Cache Management**: Optimized query keys for efficient caching

## Usage Example

```tsx
import { usePosts, usePostWithUser } from '@/services/hooks';

function MyComponent() {
  const { data: posts, isLoading, error } = usePosts();
  const { post, user, isLoading: postLoading } = usePostWithUser(1);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## Implementation in Fixture Page

The `/fixture` page demonstrates:
- Real-time data fetching from JSONPlaceholder API
- Loading states with skeleton components
- Error handling with user-friendly messages
- Interactive post selection with detailed views
- Comments loading for selected posts
- Refresh functionality
- Responsive design with proper UI components

## TanStack Query Setup

The QueryClient is configured in `app/providers.tsx` with:
- React Query DevTools for development
- Global query defaults
- Proper provider wrapping for the entire application