'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const quoteId = searchParams.get('quoteId');
  const amount = searchParams.get('amount');
  const customerName = searchParams.get('customerName');
  const customerEmail = searchParams.get('customerEmail');

  useEffect(() => {
    if (!quoteId || !amount || !customerName || !customerEmail) {
      setError('Missing payment information. Please return to your quote.');
      setLoading(false);
      return;
    }

    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseFloat(amount),
        quoteId,
        customerName,
        customerEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to initialize payment. Please try again.');
        setLoading(false);
      });
  }, [quoteId, amount, customerName, customerEmail]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#2563eb',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Initializing secure payment...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Error</h1>
            <p className="text-lg text-gray-600 mb-6">{error}</p>
            <a href="/quote" className="btn-primary">
              Return to Quote
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Shield className="w-16 h-16 mx-auto mb-6 text-primary-200" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Secure Payment
              </h1>
              <p className="text-xl text-primary-100">
                Complete your moving deposit securely with Stripe
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            
            {/* Payment Summary */}
            <div className="card mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quote ID:</span>
                  <span className="font-medium">{quoteId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer:</span>
                  <span className="font-medium">{customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{customerEmail}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Deposit Amount:</span>
                    <span className="text-2xl font-bold text-primary-600">${amount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-primary-600" />
                Your Payment is Secure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  256-bit SSL Encryption
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  PCI DSS Compliant
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  Stripe Secure Processing
                </div>
              </div>
            </div>

            {/* Stripe Elements */}
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <div className="card">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                  <CheckoutForm />
                </div>
              </Elements>
            )}

            {/* Terms */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>
                By completing this payment, you agree to our{' '}
                <a href="/terms" className="text-primary-600 hover:text-primary-700">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
