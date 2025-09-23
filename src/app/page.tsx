'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Shield, 
  Clock, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Phone,
  MapPin,
  Users,
  Award,
  DollarSign
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Local Moving',
      description: 'Professional local moving services within the Heights area and surrounding communities.',
      price: 'Starting at $99/hr',
      features: ['2-3 Professional Movers', 'Fully Equipped Truck', 'Basic Insurance Coverage']
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Long Distance',
      description: 'Reliable long-distance moving services across Texas and nationwide.',
      price: 'Custom Quote',
      features: ['Full-Service Packing', 'GPS Tracking', 'Comprehensive Insurance']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Commercial Moving',
      description: 'Specialized commercial and office moving services with minimal downtime.',
      price: 'Starting at $150/hr',
      features: ['After-Hours Service', 'Equipment Handling', 'Project Management']
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Fully Licensed & Insured',
      description: 'Complete protection for your belongings'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Customer Support',
      description: 'Always here when you need us'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '5-Star Rated Service',
      description: 'Consistently excellent customer reviews'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: '10+ Years Experience',
      description: 'Trusted by thousands of families'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Heights, TX',
      rating: 5,
      text: 'Exceptional service! The team was professional, careful, and made our move stress-free. Highly recommend Pack It Movers Heights!'
    },
    {
      name: 'Michael Chen',
      location: 'Houston, TX',
      rating: 5,
      text: 'Best moving experience ever. They handled our long-distance move perfectly and everything arrived in perfect condition.'
    },
    {
      name: 'Jennifer Rodriguez',
      location: 'Montrose, TX',
      rating: 5,
      text: 'Professional, efficient, and affordable. The team went above and beyond to ensure our office move was seamless.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Moving Services in
              <span className="text-primary-200 block">Heights, Texas</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Trusted, reliable, and stress-free moving solutions for your home or business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                Get Free Quote
              </Link>
              <a href="tel:555-MOVERS" className="bg-primary-700 hover:bg-primary-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg border border-primary-500">
                Call (555) MOVERS
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-primary-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Moving Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive moving solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-primary-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="w-4 h-4 text-primary-600 mr-1" />
                    <span className="font-semibold text-primary-600">{service.price}</span>
                  </div>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link 
                  href="/quote" 
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  Get Quote <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Move?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Get your free, no-obligation quote today and experience the Pack It Movers Heights difference
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
                Get Free Quote
              </Link>
              <a href="tel:555-MOVERS" className="bg-primary-700 hover:bg-primary-800 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg border border-primary-500 flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
