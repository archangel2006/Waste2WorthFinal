
'use client';

import { Suspense, useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { List, Map, PlusCircle } from 'lucide-react';
import DonationsList from './donations-list';
import DonationsMap from './donations-map';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/use-current-user';
import { DonationForm } from './donate/donation-form';
import { donations as initialDonations } from '@/lib/placeholder-data';
import type { Donation } from '@/lib/types';
import { ClaimDialog } from '@/components/donations/claim-dialog';
import { PickupDialog } from '@/components/donations/pickup-dialog';
import { useToast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const user = useCurrentUser();
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [claimingDonation, setClaimingDonation] = useState<Donation | null>(null);
  const [pickupDonation, setPickupDonation] = useState<Donation | null>(null);
  
  const handleClaimSubmit = (donation: Donation, address: string) => {
    setDonations(prev => prev.map(d => d.id === donation.id ? {...d, status: 'claimed', claimedBy: user, destinationAddress: address} : d));
    setClaimingDonation(null);
    toast({
        title: "Donation Claimed!",
        description: `You have successfully claimed "${donation.foodType}".`,
    });
  }
  
  const handlePickupSubmit = (donation: Donation) => {
    setDonations(prev => prev.map(d => d.id === donation.id ? {...d, pickedUpBy: user} : d));
    setPickupDonation(null);
     toast({
        title: "Pickup Scheduled!",
        description: `You are scheduled to pick up "${donation.foodType}".`,
    });
  }

  return (
    <Tabs defaultValue="list" className="h-full flex flex-col">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="list">
            <List className="mr-2 h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="map">
            <Map className="mr-2 h-4 w-4" />
            Map View
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          {user.role === 'donor' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Donation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create a New Donation</DialogTitle>
                  <DialogDescription>
                    Fill out the details below to list your surplus food. Our AI
                    will help categorize it.
                  </DialogDescription>
                </DialogHeader>
                <DonationForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <TabsContent value="list" className="flex-1 mt-4">
        <DonationsList donations={donations} onClaim={setClaimingDonation} onSchedulePickup={setPickupDonation} />
      </TabsContent>
      <TabsContent
        value="map"
        className="flex-1 rounded-lg overflow-hidden relative mt-4"
      >
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <DonationsMap donations={donations} />
        </Suspense>
      </TabsContent>

      {claimingDonation && (
        <ClaimDialog 
            donation={claimingDonation}
            onOpenChange={() => setClaimingDonation(null)}
            onSubmit={(address) => handleClaimSubmit(claimingDonation, address)}
        />
      )}
      {pickupDonation && (
        <PickupDialog
            donation={pickupDonation}
            onOpenChange={() => setPickupDonation(null)}
            onSubmit={() => handlePickupSubmit(pickupDonation)}
        />
      )}
    </Tabs>
  );
}
