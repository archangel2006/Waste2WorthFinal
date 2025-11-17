

export type Role = "donor" | "volunteer" | "organization";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: Role;
};

export type DonationCategory = "Edible" | "Usable" | "Compost";

export type DonationStatus = "available" | "claimed" | "completed";

export type Donation = {
  id: string;
  foodType: string;
  quantity: string;
  storageCondition: string;
  pickupTime: string;
  address: string;
  destinationAddress?: string;
  imageUrl: string;
  imageHint: string;
  donor: User;
  status: DonationStatus;
  category: DonationCategory;
  claimedBy?: User;
  pickedUpBy?: User;
  createdAt: Date;
  completedAt?: Date;
};

export type CommunityPost = {
  id: string;
  author: User;
  content: string;
  imageUrl?: string;
  imageHint?: string;
  createdAt: Date;
  likes: number;
  comments: {
    id: string;
    author: User;
    content: string;
  }[];
};

export type Badge = {
    id: string;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
};
