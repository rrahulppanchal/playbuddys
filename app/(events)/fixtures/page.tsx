"use client";

import { useState } from "react";
import { usePosts, useUsers, usePostWithUser, useCommentsByPost } from "@/services/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { User, MessageCircle, RefreshCw, AlertCircle } from "lucide-react";
import Header from "@/components/layout/header";

export default function FixturePage() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  
  // Fetch all posts and users
  const { data: posts, isLoading: postsLoading, error: postsError, refetch: refetchPosts } = usePosts();
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  
  // Fetch selected post with user details
  const { post: selectedPost, user: selectedUser, isLoading: selectedPostLoading } = usePostWithUser(selectedPostId || 0);
  
  // Fetch comments for selected post
  const { data: comments, isLoading: commentsLoading } = useCommentsByPost(selectedPostId || 0);

  const handleRefresh = () => {
    refetchPosts();
  };

  const getUserById = (userId: number) => {
    return users?.find(user => user.id === userId);
  };

  if (postsError || usersError) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (<><Header/>
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fixture Dashboard</h1>
          <p className="text-muted-foreground">
            Data fetching demo using TanStack Query with JSONPlaceholder API
          </p>
        </div>
        <Button onClick={handleRefresh} disabled={postsLoading} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${postsLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts List */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Posts</h2>
            <Badge variant="secondary">{posts?.length || 0}</Badge>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {postsLoading || usersLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                </Card>
              ))
            ) : (
              posts?.map((post) => {
                const author = getUserById(post.userId);
                return (
                  <Card 
                    key={post.id} 
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedPostId === post.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedPostId(post.id)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        {author?.name || 'Unknown Author'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.body}
                      </p>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Post Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Post Details</h2>
          
          {!selectedPostId ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">Select a post to view details</p>
              </CardContent>
            </Card>
          ) : selectedPostLoading ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ) : selectedPost && selectedUser ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedPost.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {selectedUser.name} (@{selectedUser.username})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed mb-4">{selectedPost.body}</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2 text-sm">
                    <div><strong>Email:</strong> {selectedUser.email}</div>
                    <div><strong>Phone:</strong> {selectedUser.phone}</div>
                    <div><strong>Website:</strong> {selectedUser.website}</div>
                    <div><strong>Company:</strong> {selectedUser.company.name}</div>
                    <div><strong>Address:</strong> {selectedUser.address.city}, {selectedUser.address.street}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Comments
                    <Badge variant="secondary">{comments?.length || 0}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {commentsLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                        </div>
                      ))}
                    </div>
                  ) : comments && comments.length > 0 ? (
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-l-2 border-muted pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.name}</span>
                            <span className="text-xs text-muted-foreground">{comment.email}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.body}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No comments available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </div>
    </div></>
  );
}