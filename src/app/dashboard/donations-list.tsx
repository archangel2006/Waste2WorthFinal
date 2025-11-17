import type { Donation } from "@/lib/types";
import { DonationCard } from "@/components/donations/donation-card";

type DonationsListProps = {
    donations: Donation[];
    onClaim: (donation: Donation) => void;
    onSchedulePickup: (donation: Donation) => void;
}

export default function DonationsList({ donations, onClaim, onSchedulePickup }: DonationsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {donations.map((donation) => (
        <DonationCard 
            key={donation.id} 
            donation={donation} 
            onClaim={onClaim}
            onSchedulePickup={onSchedulePickup}
        />
      ))}
    </div>
  );
}
