
import { User, Donation, CommunityPost, Role, Badge } from "@/lib/types";
import { PlaceHolderImages as placeholderImages } from "@/lib/placeholder-images";
import { Medal, Star, Heart, Leaf } from "lucide-react";

const findImage = (id: string) => placeholderImages.find(p => p.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/400`;
const findImageHint = (id: string) => placeholderImages.find(p => p.id === id)?.imageHint || `image`;

export const users: User[] = [
  { id: "user1", name: "Alice Grey", email: "alice@example.com", avatarUrl: findImage("avatar1"), role: "donor" },
  { id: "user2", name: "Bella's Bake", email: "bella@example.com", avatarUrl: findImage("avatar2"), role: "organization" },
  { id: "user3", name: "Charlie Day", email: "charlie@example.com", avatarUrl: findImage("avatar3"), role: "volunteer" },
  { id: "user4", name: "Dana's Diner", email: "dana@example.com", avatarUrl: `https://picsum.photos/seed/avatar4/100/100`, role: "donor" },
  { id: "user5", name: "Evan Foster", email: "evan@example.com", avatarUrl: `https://picsum.photos/seed/avatar5/100/100`, role: "volunteer" },
  { id: "user6", name: "Nourish Now", email: "nourish@example.com", avatarUrl: `https://picsum.photos/seed/avatar6/100/100`, role: "organization" },
  { id: "user7", name: "George's Grill", email: "george@example.com", avatarUrl: `https://picsum.photos/seed/avatar7/100/100`, role: "donor" },
];

export const donations: Donation[] = [
  // Donations by Alice (current user) - for "My Donations"
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Surplus Bread and Pastries",
    quantity: "2 boxes",
    storageCondition: "Dry storage",
    pickupTime: "Today, 4 PM - 6 PM",
    address: "123 Main St, Anytown, USA",
    imageUrl: findImage("donation_bread"),
    imageHint: findImageHint("donation_bread"),
    donor: users[0],
    status: "available",
    category: "Edible",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Canned Goods",
    quantity: "25 cans",
    storageCondition: "Dry storage",
    pickupTime: "Anytime this week",
    address: "789 Pine Ln, Anytown, USA",
    destinationAddress: "456 Oak Ave, Anytown, USA",
    imageUrl: findImage("donation_canned"),
    imageHint: findImageHint("donation_canned"),
    donor: users[0],
    status: "completed",
    claimedBy: users[1], // Claimed by Bella's Bake
    pickedUpBy: users[2], // Picked up by Charlie
    category: "Edible",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Bruised Apples & Oranges",
    quantity: "1 box",
    storageCondition: "Dry storage",
    pickupTime: "Today, 1 PM - 3 PM",
    address: "212 Birch Rd, Anytown, USA",
    destinationAddress: "456 Oak Ave, Anytown, USA",
    imageUrl: findImage("donation_fruit_bruised"),
    imageHint: findImageHint("donation_fruit_bruised"),
    donor: users[0],
    status: "claimed",
    claimedBy: users[1], // Claimed by Bella's Bake
    category: "Usable",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  },
   {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Day-old Bagels",
    quantity: "2 dozen",
    storageCondition: "dry",
    pickupTime: "Today, 5 PM - 7 PM",
    address: "123 Main St, Anytown, USA",
    imageUrl: findImage("donation_bagels"),
    imageHint: findImageHint("donation_bagels"),
    donor: users[0],
    status: "available",
    category: "Edible",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },


  // Donations claimed by Alice (current user) - for "My Claims"
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Fresh Vegetables",
    quantity: "2 crates",
    storageCondition: "Refrigerated",
    pickupTime: "Tomorrow, 9 AM - 11 AM",
    address: "456 Oak Ave, Anytown, USA",
    destinationAddress: "123 Main St, Anytown, USA",
    imageUrl: findImage("donation_veg"),
    imageHint: findImageHint("donation_veg"),
    donor: users[3],
    status: "claimed",
    claimedBy: users[0], 
    category: "Edible",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Organic Vegetable Scraps",
    quantity: "2 kg bag",
    storageCondition: "room temp",
    pickupTime: "This weekend",
    address: "101 Maple Dr, Anytown, USA",
    destinationAddress: "123 Main St, Anytown, USA",
    imageUrl: findImage("donation_veg_scraps"),
    imageHint: findImageHint("donation_veg_scraps"),
    donor: users[3],
    status: "completed",
    claimedBy: users[0],
    pickedUpBy: users[2],
    category: "Compost",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  
  // Pickups by Alice (current user) - for "My Pickups"
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Expired Milk and Yogurt",
    quantity: "1 crate",
    storageCondition: "Refrigerated",
    pickupTime: "ASAP",
    address: "101 Maple Dr, Anytown, USA",
    destinationAddress: "456 Oak Ave, Anytown, USA",
    imageUrl: findImage("donation_dairy_expired"),
    imageHint: findImageHint("donation_dairy_expired"),
    donor: users[3],
    status: "completed",
    claimedBy: users[1],
    pickedUpBy: users[0],
    category: "Usable",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Leftover Catering Salads",
    quantity: "3 large trays",
    storageCondition: "Refrigerated",
    pickupTime: "Tonight by 9 PM",
    address: "333 River St, Anytown, USA",
    destinationAddress: "456 Oak Ave, Anytown, USA",
    imageUrl: findImage("donation_sandwiches"),
    imageHint: "catering salads",
    donor: users[6],
    status: "claimed",
    claimedBy: users[1],
    pickedUpBy: users[0],
    category: "Edible",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Assorted Sandwiches",
    quantity: "1 platter",
    storageCondition: "refrigerated",
    pickupTime: "Today, 12 PM - 2 PM",
    address: "789 Pine Ln, Anytown, USA",
    destinationAddress: "456 Oak Ave, Anytown, USA",
    imageUrl: findImage("donation_sandwiches"),
    imageHint: findImageHint("donation_sandwiches"),
    donor: users[3],
    status: "completed",
    claimedBy: users[1],
    pickedUpBy: users[0],
    category: "Edible",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 2*60*60*1000),
  },
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Bulk Rice",
    quantity: "5 kg bag",
    storageCondition: "dry",
    pickupTime: "Anytime",
    address: "456 Oak Ave, Anytown, USA",
    destinationAddress: "123 Main St, Anytown, USA",
    imageUrl: findImage("donation_rice"),
    imageHint: findImageHint("donation_rice"),
    donor: users[3],
    status: "claimed",
    claimedBy: users[1],
    pickedUpBy: users[0],
    category: "Edible",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Frozen Chicken",
    quantity: "2 kg",
    storageCondition: "frozen",
    pickupTime: "Tomorrow, 10 AM - 12 PM",
    address: "123 Main St, Anytown, USA",
    destinationAddress: "456 Oak Ave, Anytown, USA",
    imageUrl: findImage("donation_chicken_frozen"),
    imageHint: findImageHint("donation_chicken_frozen"),
    donor: users[3],
    status: "completed",
    claimedBy: users[1],
    pickedUpBy: users[0],
    category: "Edible",
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
   {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Fresh Fruit Platter",
    quantity: "1 large platter",
    storageCondition: "refrigerated",
    pickupTime: "Today, 1 PM - 3 PM",
    address: "555 Cedar Ave, Anytown, USA",
    imageUrl: "https://images.unsplash.com/photo-1578882294028-5541c9f52d58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxGcnVpdCUyMFBsYXR0ZXJ8ZW58MHx8fHwxNzYyMTk4ODg1fDA&ixlib=rb-4.0.3&q=80&w=1080",
    imageHint: "Fruit Platter",
    donor: users[4],
    status: "available",
    category: "Edible",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: `don_${crypto.randomUUID()}`,
    foodType: "Vegetable Peelings for Compost",
    quantity: "5 kg",
    storageCondition: "room temp",
    pickupTime: "This week",
    address: "101 Maple Dr, Anytown, USA",
    imageUrl: "https://images.unsplash.com/photo-1760445529166-1184fc7bb808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBzY3JhcHN8ZW58MHx8fHwxNzYyMTA2NDgzfDA&ixlib=rb-4.0.3&q=80&w=1080",
    imageHint: "vegetable scraps",
    donor: users[6],
    status: "available",
    category: "Compost",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  }
];

export const communityPosts: CommunityPost[] = [
  {
    id: "post1",
    author: users[2],
    content: "Just completed a big pickup from Dana's Diner and delivered it to the wonderful people at Bella's Bake! The trunk was full of fresh veggies. It feels amazing to be the bridge that connects generosity with need. So grateful for this platform! 🚚 ❤️",
    imageUrl: findImage("donation_veg"),
    imageHint: findImageHint("donation_veg"),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 15,
    comments: [
      { id: "c1", author: users[1], content: "Thank you so much, Charlie! Your help is invaluable. We're already prepping these for tonight's service." },
      { id: "c2", author: users[0], content: "This is what it's all about! Seeing the community work together like this is inspiring." },
    ],
  },
  {
    id: "post2",
    author: users[1],
    content: "A mountain of sandwiches ready for our evening meal service, all thanks to a huge donation from Alice's Cafe. We were able to provide over 50 extra meals today because of this. A massive thank you to our donors and volunteers who make this possible every single day!",
    imageUrl: findImage("donation_sandwiches"),
    imageHint: findImageHint("donation_sandwiches"),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    likes: 42,
    comments: [],
  },
  {
    id: "post3",
    author: users[0],
    content: "We had a dozen day-old bagels left over from the morning rush that are still perfectly delicious. Just listed them on the platform. I'm so glad they won't go to waste and can help someone start their day with a good meal. Hope they find a good home soon!",
    imageUrl: findImage("donation_bagels"),
    imageHint: findImageHint("donation_bagels"),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    likes: 8,
    comments: [],
  },
];


export const availableBadges: Badge[] = [
  { id: 'b1', name: 'First Donation', description: 'Made your first donation.', icon: Medal },
  { id: 'b2', name: 'Community Star', description: 'Received 10 likes on a community post.', icon: Star },
  { id: 'b3', name: 'Helping Hand', description: 'Completed your first pickup.', icon: Heart },
  { id: 'b4', name: 'Eco-Warrior', description: 'Donated 10kg of food.', icon: Leaf },
];

export const userBadges: string[] = ['b1', 'b3'];

    
