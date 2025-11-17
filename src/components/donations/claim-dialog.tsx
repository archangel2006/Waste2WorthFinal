
"use client";

import { Donation } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ClaimDialogProps = {
  donation: Donation;
  onOpenChange: (open: boolean) => void;
  onSubmit: (address: string) => void;
};

export function ClaimDialog({ donation, onOpenChange, onSubmit }: ClaimDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim Donation: {donation.foodType}</DialogTitle>
          <DialogDescription>
            Confirm your details to claim this donation for your organization.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const address = formData.get("address") as string;
            onSubmit(address);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="address">Your Organization's Address</Label>
            <Input id="address" name="address" placeholder="123 Charity Way, Anytown" required />
          </div>
           <div className="space-y-3">
            <Label>Pickup Preference</Label>
            <RadioGroup defaultValue="volunteer" name="pickupPreference" required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="self" id="self" />
                <Label htmlFor="self">I will pick it up myself</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="volunteer" id="volunteer" />
                <Label htmlFor="volunteer">I need a volunteer to transport it</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Desired Quantity (Max: {donation.quantity})</Label>
            <Input id="quantity" name="quantity" defaultValue={donation.quantity} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input id="contactName" name="contactName" placeholder="Your Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input id="contactPhone" name="contactPhone" type="tel" placeholder="Your Phone Number" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Thank You Note (Optional)</Label>
            <Textarea id="notes" name="notes" placeholder="e.g., Thank you for your generous donation!" />
          </div>
          <Button type="submit" className="w-full">
            Submit Claim
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
