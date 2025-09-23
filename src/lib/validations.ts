import { z } from 'zod';

export const quoteFormSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  
  // Move Details
  moveType: z.enum(['local', 'long-distance', 'commercial'], {
    required_error: 'Please select a move type',
  }),
  moveDate: z.string().min(1, 'Please select a move date'),
  
  // Addresses
  fromAddress: z.string().min(5, 'Please enter a valid origin address'),
  fromCity: z.string().min(2, 'Please enter origin city'),
  fromState: z.string().min(2, 'Please enter origin state'),
  fromZip: z.string().min(5, 'Please enter valid ZIP code'),
  
  toAddress: z.string().min(5, 'Please enter a valid destination address'),
  toCity: z.string().min(2, 'Please enter destination city'),
  toState: z.string().min(2, 'Please enter destination state'),
  toZip: z.string().min(5, 'Please enter valid ZIP code'),
  
  // Property Details
  homeSize: z.enum(['studio', '1-bedroom', '2-bedroom', '3-bedroom', '4-bedroom', '5+bedroom', 'office', 'warehouse'], {
    required_error: 'Please select property size',
  }),
  
  // Services
  packingService: z.boolean().default(false),
  storageService: z.boolean().default(false),
  specialItems: z.string().optional(),
  
  // Additional Information
  additionalNotes: z.string().optional(),
  
  // Marketing
  hearAboutUs: z.enum(['google', 'facebook', 'referral', 'repeat-customer', 'other']).optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const paymentFormSchema = z.object({
  amount: z.number().min(50, 'Minimum payment amount is $50'),
  quoteId: z.string().min(1, 'Quote ID is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerName: z.string().min(2, 'Customer name is required'),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type PaymentFormData = z.infer<typeof paymentFormSchema>;
