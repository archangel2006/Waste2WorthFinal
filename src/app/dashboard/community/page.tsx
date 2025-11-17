'use client';

import { useState } from 'react';
import { PostCard } from "@/components/community/post-card";
import { CreatePostForm } from "@/components/community/create-post-form";
import { communityPosts as initialCommunityPosts } from "@/lib/placeholder-data";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CommunityPost } from '@/lib/types';

export default function CommunityPage() {
    const currentUser = useCurrentUser();
    const [posts, setPosts] = useState<CommunityPost[]>(initialCommunityPosts);

    const handleLike = (postId: string) => {
        setPosts(posts.map(p => p.id === postId ? {...p, likes: p.likes + 1} : p));
    }
    
    const handleComment = (postId: string) => {
        alert(`Commenting on post ${postId}... (feature coming soon!)`);
    }

    const handlePostCreated = (newPost: { content: string; imageUrl?: string }) => {
        const post: CommunityPost = {
            id: `post_${crypto.randomUUID()}`,
            author: currentUser,
            createdAt: new Date(),
            likes: 0,
            comments: [],
            ...newPost,
        };
        setPosts([post, ...posts]);
    };

  return (
    <div className="max-w-3xl mx-auto w-full space-y-6">
      <CreatePostForm onPostCreated={handlePostCreated} />

      {posts.map((post) => (
        <PostCard 
            key={post.id} 
            post={post}
            onLike={handleLike}
            onComment={handleComment}
        />
      ))}
    </div>
  );
}
