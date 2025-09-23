import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactFormSchema.parse(body);
    
    // Generate contact ID
    const contactId = `CT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Log the contact request (in production, save to database)
    console.log('New contact form submission:', {
      contactId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      subject: validatedData.subject,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    });
    
    // In production, send notification emails here
    await sendContactNotifications(validatedData, contactId);
    
    return NextResponse.json({
      success: true,
      contactId,
      message: 'Contact form submitted successfully',
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
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

async function sendContactNotifications(data: any, contactId: string) {
  // In production, implement email sending here
  console.log('Sending contact notifications:', {
    to: data.email,
    contactId,
    subject: data.subject,
    customerName: data.name,
  });
  
  // Example email content that would be sent:
  const customerEmailContent = `
    Dear ${data.name},
    
    Thank you for contacting Pack It Movers Heights!
    
    Contact ID: ${contactId}
    Subject: ${data.subject}
    
    We have received your message and will respond within 24 hours.
    
    Best regards,
    Pack It Movers Heights Team
  `;
  
  // Internal notification email content:
  const internalEmailContent = `
    New Contact Form Submission
    
    Contact ID: ${contactId}
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Subject: ${data.subject}
    
    Message:
    ${data.message}
    
    Submitted: ${new Date().toISOString()}
  `;
}
