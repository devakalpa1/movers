'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Shield, 
  Clock, 
  Star,
  Truck,
  Heart,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '5000+', label: 'Successful Moves' },
    { number: '4.9', label: 'Average Rating' },
    { number: '24/7', label: 'Customer Support' },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Reliability',
      description: 'We handle your belongings with the utmost care and professionalism, ensuring a stress-free moving experience.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to exceed your expectations on every move.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in the moving industry through continuous training and quality assurance.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Punctuality',
      description: 'We respect your time and schedule, arriving promptly and completing moves efficiently.'
    }
  ];

  const team = [
    {
      name: 'Michael Rodriguez',
      role: 'Founder & CEO',
      experience: '15 years in moving industry',
      description: 'Started Pack It Movers Heights with a vision to revolutionize the moving experience in Texas.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Operations Manager',
      experience: '12 years operations experience',
      description: 'Ensures every move runs smoothly from initial quote to final delivery.'
    },
    {
      name: 'David Chen',
      role: 'Lead Moving Specialist',
      experience: '10 years moving expertise',
      description: 'Trains our team in best practices for safe and efficient moving techniques.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Pack It Movers Heights
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Your trusted moving partner in the Heights community and beyond. 
                We're not just movers – we're your neighbors helping you start your next chapter.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="mb-6">
                  Founded in 2013 in the heart of Houston's Heights neighborhood, Pack It Movers Heights 
                  began with a simple mission: to make moving less stressful and more affordable for 
                  families and businesses in our community.
                </p>
                <p className="mb-6">
                  What started as a small, family-owned business has grown into one of Houston's most 
                  trusted moving companies. We've helped thousands of families transition to new homes, 
                  assisted businesses in relocating their operations, and built lasting relationships 
                  throughout the Greater Houston area.
                </p>
                <p>
                  Today, we're proud to serve not just the Heights, but communities across Texas and 
                  beyond. Our commitment to excellence, customer service, and community involvement 
                  remains at the core of everything we do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide every decision we make and every service we provide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to making your move successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card text-center"
              >
                <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {member.experience}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Pack It Movers Heights?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-200 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Licensed & Insured</h3>
                    <p className="text-primary-100">Fully licensed and comprehensively insured for your peace of mind</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-200 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Transparent Pricing</h3>
                    <p className="text-primary-100">No hidden fees or surprise charges - what we quote is what you pay</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-200 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Professional Team</h3>
                    <p className="text-primary-100">Background-checked, trained professionals who treat your home with respect</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-200 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Modern Equipment</h3>
                    <p className="text-primary-100">Well-maintained trucks and professional moving equipment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-200 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Local Expertise</h3>
                    <p className="text-primary-100">Deep knowledge of Houston neighborhoods and traffic patterns</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary-200 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Customer Support</h3>
                    <p className="text-primary-100">24/7 customer support before, during, and after your move</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have trusted us with their most important moves
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="btn-primary text-lg px-8 py-4">
                Get Free Quote
              </Link>
              <a href="tel:555-MOVERS" className="btn-secondary text-lg px-8 py-4">
                Call (555) MOVERS
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
