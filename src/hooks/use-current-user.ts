import { users } from "@/lib/placeholder-data";
import { User } from "@/lib/types";

// This is a mock hook. In a real app, you would use a proper
// authentication provider (like Firebase Auth, NextAuth, etc.)
export const useCurrentUser = (): User => {
  // We'll cycle through the mock users to simulate different roles.
  // For a real implementation, you'd fetch the current user's data.
  // You can change the index to test different user roles:
  // 0: donor (Alice)
  // 1: organization (Bella)
  // 2: volunteer (Charlie)
  
  // Set to 1 to show claims, 2 to show pickups, 0 to show donations.
  // Or cycle through them based on a condition for dynamic testing.
  const userIndex = 0; 
  
  return users[userIndex];
};

export const useUserById = (id: string): User | undefined => {
    return users.find(u => u.id === id);
}
