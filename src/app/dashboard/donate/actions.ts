
"use server";

import { z } from "zod";
import { categorizeDonation, CategorizeDonationInput, CategorizeDonationOutput } from "@/ai/flows/categorize-donations";
import { format } from "date-fns";

const FormSchema = z.object({
  donationTitle: z.string().min(1, 'Donation title is required'),
  foodType: z.string().min(1, 'Food type is required'),
  dateCooked: z.string().optional(),
  quantity: z.string().min(1, 'Quantity is required'),
  storageCondition: z.string().min(1, 'Storage condition is required'),
  pickupTimeStart: z.string().min(1, 'Pickup start date is required'),
  pickupTimeEnd: z.string().min(1, 'Pickup deadline is required'),
  additionalDetails: z.string().optional(),
  photoDataUri: z.string().min(1, 'A photo is required.'),
});

export type FormState = {
  message: string;
  result?: CategorizeDonationOutput & { title: string };
  errors?: {
    [key: string]: string[];
  };
};

export async function createAndCategorizeDonation(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const rawFormData = Object.fromEntries(formData.entries());
  
  // The 'photo' field from the file input is not needed, only the data URI.
  delete rawFormData.photo;

  const validatedFields = FormSchema.safeParse(rawFormData);
  
  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { pickupTimeStart, pickupTimeEnd, ...restOfData } = validatedFields.data;
  
  const formattedStart = format(new Date(pickupTimeStart), "PPP");
  const formattedEnd = format(new Date(pickupTimeEnd), "PPP");
  const pickupTime = `${formattedStart} to ${formattedEnd}`;

  const donationInput: CategorizeDonationInput = {
    ...restOfData,
    pickupTime,
  };

  try {
    const result = await categorizeDonation(donationInput);
    
    return {
      message: "Donation categorized successfully!",
      result: {
        ...result,
        title: donationInput.donationTitle,
      }
    };
  } catch (error) {
    console.error("AI categorization failed:", error);
    return {
      message: "An error occurred during AI categorization. Please try again.",
    };
  }
}
