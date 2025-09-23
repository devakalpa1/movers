import { NextRequest, NextResponse } from 'next/server';
import { quoteFormSchema } from '@/lib/validations';
import { z } from 'zod';

// In a production environment, you would save this to a database
// For now, we'll simulate the process
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = quoteFormSchema.parse(body);
    
    // Calculate estimated cost
    const estimatedCost = calculateEstimatedCost(validatedData);
    
    // In production, you would:
    // 1. Save the quote request to your database
    // 2. Send notification emails to your team
    // 3. Add to CRM system
    // 4. Send confirmation email to customer
    
    // Simulate saving to database
    const quoteId = `QT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Log the quote request (in production, save to database)
    console.log('New quote request:', {
      quoteId,
      customer: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      moveType: validatedData.moveType,
      moveDate: validatedData.moveDate,
      estimatedCost,
      timestamp: new Date().toISOString(),
    });
    
    // In production, send emails here
    await sendQuoteNotifications(validatedData, quoteId, estimatedCost);
    
    return NextResponse.json({
      success: true,
      quoteId,
      estimatedCost,
      message: 'Quote request submitted successfully',
    });
    
  } catch (error) {
    console.error('Quote submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid form data',
          details: error.errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

function calculateEstimatedCost(data: any): number {
  let baseCost = 0;
  
  // Base cost by move type
  switch (data.moveType) {
    case 'local':
      baseCost = 400;
      break;
    case 'long-distance':
      baseCost = 1200;
      break;
    case 'commercial':
      baseCost = 800;
      break;
    default:
      baseCost = 400;
  }

  // Size multiplier
  const sizeMultipliers: Record<string, number> = {
    'studio': 0.7,
    '1-bedroom': 1,
    '2-bedroom': 1.4,
    '3-bedroom': 1.8,
    '4-bedroom': 2.2,
    '5+bedroom': 2.8,
    'office': 1.5,
    'warehouse': 3.0,
  };

  if (data.homeSize && sizeMultipliers[data.homeSize]) {
    baseCost *= sizeMultipliers[data.homeSize];
  }

  // Additional services
  if (data.packingService) baseCost += 300;
  if (data.storageService) baseCost += 200;

  return Math.round(baseCost);
}

async function sendQuoteNotifications(data: any, quoteId: string, estimatedCost: number) {
  // In production, implement email sending here
  // You could use services like SendGrid, AWS SES, or Resend
  
  console.log('Sending quote notifications:', {
    to: data.email,
    quoteId,
    estimatedCost,
    customerName: `${data.firstName} ${data.lastName}`,
  });
  
  // Example email content that would be sent:
  const customerEmailContent = `
    Dear ${data.firstName} ${data.lastName},
    
    Thank you for requesting a quote from Pack It Movers Heights!
    
    Quote ID: ${quoteId}
    Estimated Cost Range: $${estimatedCost - 200} - $${estimatedCost + 300}
    
    Our team will contact you within 24 hours to schedule an in-home estimate.
    
    Best regards,
    Pack It Movers Heights Team
  `;
  
  // Internal notification email content:
  const internalEmailContent = `
    New Quote Request Received
    
    Customer: ${data.firstName} ${data.lastName}
    Email: ${data.email}
    Phone: ${data.phone}
    Move Type: ${data.moveType}
    Move Date: ${data.moveDate}
    From: ${data.fromAddress}, ${data.fromCity}, ${data.fromState} ${data.fromZip}
    To: ${data.toAddress}, ${data.toCity}, ${data.toState} ${data.toZip}
    Property Size: ${data.homeSize}
    Estimated Cost: $${estimatedCost}
    
    Additional Services:
    - Packing: ${data.packingService ? 'Yes' : 'No'}
    - Storage: ${data.storageService ? 'Yes' : 'No'}
    
    Special Items: ${data.specialItems || 'None'}
    Additional Notes: ${data.additionalNotes || 'None'}
  `;
}
