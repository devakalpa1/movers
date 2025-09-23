'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  MapPin, 
  Calendar, 
  Home, 
  Package, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { quoteFormSchema, type QuoteFormData } from '@/lib/validations';

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const watchedValues = watch();

  // Calculate estimated cost based on form inputs
  const calculateEstimate = (data: Partial<QuoteFormData>) => {
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
    const sizeMultipliers = {
      'studio': 0.7,
      '1-bedroom': 1,
      '2-bedroom': 1.4,
      '3-bedroom': 1.8,
      '4-bedroom': 2.2,
      '5+bedroom': 2.8,
      'office': 1.5,
      'warehouse': 3.0,
    };

    if (data.homeSize) {
      baseCost *= sizeMultipliers[data.homeSize];
    }

    // Additional services
    if (data.packingService) baseCost += 300;
    if (data.storageService) baseCost += 200;

    return Math.round(baseCost);
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setEstimatedCost(result.estimatedCost);
        setSubmitSuccess(true);
      } else {
        throw new Error('Failed to submit quote request');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('There was an error submitting your quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quote Request Submitted!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your interest in Pack It Movers Heights. We've received your quote request and will contact you within 24 hours.
            </p>
            {estimatedCost && (
              <div className="bg-primary-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  Estimated Cost Range
                </h3>
                <p className="text-3xl font-bold text-primary-600">
                  ${estimatedCost - 200} - ${estimatedCost + 300}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  *Final quote may vary based on specific requirements and additional services
                </p>
              </div>
            )}
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Next Steps:</strong>
              </p>
              <ul className="text-left text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Our team will review your request
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  We'll contact you to schedule an in-home estimate
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Receive your detailed, binding quote
                </li>
              </ul>
            </div>
          </motion.div>
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
              <Calculator className="w-16 h-16 mx-auto mb-6 text-primary-200" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get Your Free Moving Quote
              </h1>
              <p className="text-xl text-primary-100">
                Receive an accurate estimate for your move in just a few minutes
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Personal Information */}
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-primary-100 p-2 rounded-lg mr-3">
                    <span className="text-primary-600 font-bold">1</span>
                  </div>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      {...register('firstName')}
                      className="input-field"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register('lastName')}
                      className="input-field"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="input-field"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Move Details */}
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-primary-100 p-2 rounded-lg mr-3">
                    <span className="text-primary-600 font-bold">2</span>
                  </div>
                  Move Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Move Type *
                    </label>
                    <select {...register('moveType')} className="input-field">
                      <option value="">Select move type</option>
                      <option value="local">Local Move (within 50 miles)</option>
                      <option value="long-distance">Long Distance Move</option>
                      <option value="commercial">Commercial/Office Move</option>
                    </select>
                    {errors.moveType && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.moveType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Move Date *
                    </label>
                    <input
                      {...register('moveDate')}
                      type="date"
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.moveDate && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.moveDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-primary-100 p-2 rounded-lg mr-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  Moving From & To
                </h2>
                
                <div className="space-y-8">
                  {/* From Address */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Moving From</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          {...register('fromAddress')}
                          className="input-field"
                          placeholder="123 Main Street"
                        />
                        {errors.fromAddress && (
                          <p className="text-red-500 text-sm mt-1">{errors.fromAddress.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          {...register('fromCity')}
                          className="input-field"
                          placeholder="Houston"
                        />
                        {errors.fromCity && (
                          <p className="text-red-500 text-sm mt-1">{errors.fromCity.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          {...register('fromState')}
                          className="input-field"
                          placeholder="TX"
                        />
                        {errors.fromState && (
                          <p className="text-red-500 text-sm mt-1">{errors.fromState.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          {...register('fromZip')}
                          className="input-field"
                          placeholder="77001"
                        />
                        {errors.fromZip && (
                          <p className="text-red-500 text-sm mt-1">{errors.fromZip.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* To Address */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Moving To</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          {...register('toAddress')}
                          className="input-field"
                          placeholder="456 Oak Avenue"
                        />
                        {errors.toAddress && (
                          <p className="text-red-500 text-sm mt-1">{errors.toAddress.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          {...register('toCity')}
                          className="input-field"
                          placeholder="Dallas"
                        />
                        {errors.toCity && (
                          <p className="text-red-500 text-sm mt-1">{errors.toCity.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          {...register('toState')}
                          className="input-field"
                          placeholder="TX"
                        />
                        {errors.toState && (
                          <p className="text-red-500 text-sm mt-1">{errors.toState.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          {...register('toZip')}
                          className="input-field"
                          placeholder="75201"
                        />
                        {errors.toZip && (
                          <p className="text-red-500 text-sm mt-1">{errors.toZip.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-primary-100 p-2 rounded-lg mr-3">
                    <Home className="w-5 h-5 text-primary-600" />
                  </div>
                  Property Details
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Size *
                  </label>
                  <select {...register('homeSize')} className="input-field">
                    <option value="">Select property size</option>
                    <option value="studio">Studio Apartment</option>
                    <option value="1-bedroom">1 Bedroom</option>
                    <option value="2-bedroom">2 Bedroom</option>
                    <option value="3-bedroom">3 Bedroom</option>
                    <option value="4-bedroom">4 Bedroom</option>
                    <option value="5+bedroom">5+ Bedroom</option>
                    <option value="office">Small Office</option>
                    <option value="warehouse">Warehouse/Large Office</option>
                  </select>
                  {errors.homeSize && (
                    <p className="text-red-500 text-sm mt-1">{errors.homeSize.message}</p>
                  )}
                </div>
              </div>

              {/* Additional Services */}
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="bg-primary-100 p-2 rounded-lg mr-3">
                    <Package className="w-5 h-5 text-primary-600" />
                  </div>
                  Additional Services
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      {...register('packingService')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label className="ml-3 text-sm text-gray-700">
                      Professional Packing Service (+$300)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      {...register('storageService')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label className="ml-3 text-sm text-gray-700">
                      Temporary Storage Service (+$200)
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Items (Piano, Artwork, etc.)
                    </label>
                    <textarea
                      {...register('specialItems')}
                      className="input-field"
                      rows={3}
                      placeholder="Describe any special items that need extra care..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      {...register('additionalNotes')}
                      className="input-field"
                      rows={3}
                      placeholder="Any additional information about your move..."
                    />
                  </div>
                </div>
              </div>

              {/* Estimated Cost Display */}
              {watchedValues.moveType && watchedValues.homeSize && (
                <div className="card bg-primary-50 border-primary-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">
                    Estimated Cost Range
                  </h3>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    ${calculateEstimate(watchedValues) - 200} - ${calculateEstimate(watchedValues) + 300}
                  </div>
                  <p className="text-sm text-gray-600">
                    *This is a preliminary estimate. Final quote will be provided after consultation.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Get My Free Quote'
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  We'll contact you within 24 hours with your detailed quote
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
