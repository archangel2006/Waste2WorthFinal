
import Image from 'next/image';
import { CommunityPost } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type PostCardProps = {
  post: CommunityPost;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
};

export function PostCard({ post, onLike, onComment }: PostCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{post.content}</p>
        {post.imageUrl && (
            <div className="relative h-64 w-full rounded-lg overflow-hidden border">
                <Image 
                    src={post.imageUrl} 
                    alt={post.imageHint || "Community post image"}
                    data-ai-hint={post.imageHint} 
                    fill 
                    className="object-cover" 
                />
            </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => onLike(post.id)}>
          <ThumbsUp className="h-4 w-4" />
          <span>Like ({post.likes})</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => onComment(post.id)}>
          <MessageSquare className="h-4 w-4" />
          <span>Comment ({post.comments.length})</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
