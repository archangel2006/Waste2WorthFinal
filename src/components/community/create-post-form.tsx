'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ImagePlus, X } from 'lucide-react';

type CreatePostFormProps = {
  onPostCreated: (post: { content: string; imageUrl?: string }) => void;
};

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const currentUser = useCurrentUser();
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!content && !imagePreview) return;
    
    onPostCreated({
        content,
        imageUrl: imagePreview || undefined,
    });

    // Reset form
    setContent('');
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-2">
            <Textarea
              placeholder="Share an update with the community..."
              className="w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {imagePreview && (
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image src={imagePreview} alt="Image preview" fill className="object-cover" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7 rounded-full"
                  onClick={() => {
                    setImagePreview(null);
                    if(fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex justify-between items-center">
                <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <ImagePlus className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Add Image</span>
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
              <Button onClick={handleSubmit} disabled={!content && !imagePreview}>Post Update</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
