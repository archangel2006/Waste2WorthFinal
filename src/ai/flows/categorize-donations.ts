'use server';

/**
 * @fileOverview AI-powered food donation categorization flow.
 *
 * This file defines a Genkit flow that categorizes food donations into tiers (Edible, Usable, Compost)
 * based on the donation details and uploaded images, leveraging AI for assessment.
 *
 * @exports categorizeDonation - An async function to categorize a food donation.
 * @exports CategorizeDonationInput - The input type for the categorizeDonation function.
 * @exports CategorizeDonationOutput - The output type for the categorizeDonation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeDonationInputSchema = z.object({
  donationTitle: z.string().describe('The title of the food donation.'),
  foodType: z.string().describe('The type of food being donated.'),
  dateCooked: z.string().optional().describe('The date the food was cooked, if applicable.'),
  quantity: z.string().describe('The quantity of food being donated (e.g., kilograms, number of items).'),
  storageCondition: z.string().describe('The storage condition of the food (e.g., refrigerated, frozen, dry storage).'),
  pickupTime: z.string().describe('The available pickup time window for the donation.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the food donation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  additionalDetails: z.string().optional().describe('Any additional details or notes about the donation.'),
});

export type CategorizeDonationInput = z.infer<typeof CategorizeDonationInputSchema>;

const CategorizeDonationOutputSchema = z.object({
  category: z.enum(['Edible', 'Usable', 'Compost']).describe('The AI-categorized tier for the food donation.'),
  reason: z.string().describe('The reasoning behind the categorization.'),
});

export type CategorizeDonationOutput = z.infer<typeof CategorizeDonationOutputSchema>;

export async function categorizeDonation(input: CategorizeDonationInput): Promise<CategorizeDonationOutput> {
  return categorizeDonationFlow(input);
}

const categorizeDonationPrompt = ai.definePrompt({
  name: 'categorizeDonationPrompt',
  input: {schema: CategorizeDonationInputSchema},
  output: {schema: CategorizeDonationOutputSchema},
  prompt: `You are an AI assistant specialized in categorizing food donations.

  Based on the following details and the image, determine the appropriate tier for the donation:

  Donation Title: {{{donationTitle}}}
  Food Type: {{{foodType}}}
  Date Cooked: {{{dateCooked}}}
  Quantity: {{{quantity}}}
  Storage Condition: {{{storageCondition}}}
  Pickup Window: {{{pickupTime}}}
  Additional Details: {{{additionalDetails}}}
  Photo: {{media url=photoDataUri}}

  The available categories are:
  - Edible: Safe for human consumption.
  - Usable: Suitable for animal feed or other non-human uses.
  - Compost: Only suitable for composting.

  Justify your categorization in the 'reason' field.
  Return a JSON object with the category and reason.
  `,
});

const categorizeDonationFlow = ai.defineFlow(
  {
    name: 'categorizeDonationFlow',
    inputSchema: CategorizeDonationInputSchema,
    outputSchema: CategorizeDonationOutputSchema,
  },
  async input => {
    const {output} = await categorizeDonationPrompt(input);
    return output!;
  }
);
