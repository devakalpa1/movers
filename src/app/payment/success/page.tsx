'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    if (paymentIntentId) {
      // In production, you would fetch payment details from your API
      // For now, we'll simulate the data
      setTimeout(() => {
        setPaymentDetails({
          id: paymentIntentId,
          amount: 500, // This would come from your API
          quoteId: 'QT-123456789',
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          date: new Date().toLocaleDateString(),
          receiptUrl: '#', // Stripe provides this
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [paymentIntentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment confirmation...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!paymentIntentId || !paymentDetails) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
              We couldn't find the payment details. Please contact us if you need assistance.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Support
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Success Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="bg-green-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h1>
              <p className="text-xl text-gray-600">
                Thank you for your deposit. Your move is now secured with Pack It Movers Heights.
              </p>
            </motion.div>

            {/* Payment Details */}
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Payment ID
                  </label>
                  <p className="text-gray-900 font-mono text-sm">{paymentDetails.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Amount Paid
                  </label>
                  <p className="text-2xl font-bold text-green-600">${paymentDetails.amount}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Quote ID
                  </label>
                  <p className="text-gray-900">{paymentDetails.quoteId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Payment Date
                  </label>
                  <p className="text-gray-900">{paymentDetails.date}</p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">What Happens Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Confirmation Email</h3>
                    <p className="text-gray-600">
                      You'll receive a detailed confirmation email with your receipt and move details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Schedule Confirmation</h3>
                    <p className="text-gray-600">
                      Our team will contact you within 24 hours to confirm your move date and details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Move Day Preparation</h3>
                    <p className="text-gray-600">
                      We'll send you a pre-move checklist and preparation guide 3 days before your move.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={paymentDetails.receiptUrl}
                className="btn-secondary flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Receipt
              </a>
              <Link href="/contact" className="btn-primary">
                Contact Us
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-12 text-center text-gray-600">
              <p className="mb-2">
                Questions about your move? We're here to help!
              </p>
              <p>
                Call us at <a href="tel:555-MOVERS" className="text-primary-600 font-semibold">(555) MOVERS</a> or 
                email <a href="mailto:info@packitmoversheights.com" className="text-primary-600 font-semibold">info@packitmoversheights.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
