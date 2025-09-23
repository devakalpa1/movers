# Pack It Movers Heights - Enterprise Moving Company Website

A modern, production-ready website for Pack It Movers Heights - a professional moving company serving the Houston Heights area and beyond.

## 🚀 Features

### Core Features
- **Modern, Responsive Design** - Mobile-first approach with Tailwind CSS
- **Quote Request System** - Comprehensive form with real-time cost estimation
- **Stripe Payment Integration** - Secure deposit payments with PCI compliance
- **SEO Optimized** - Meta tags, structured data, sitemap, and robots.txt
- **Enterprise Security** - CSP headers, input validation, and secure practices
- **Performance Optimized** - Next.js 14 with App Router for optimal loading

### Business Features
- **Service Pages** - Local, long-distance, and commercial moving services
- **Customer Testimonials** - Social proof and reviews
- **Contact System** - Multi-channel contact with form submissions
- **About Page** - Company story, values, and team information
- **Payment Processing** - Secure Stripe integration for deposits

### Technical Features
- **TypeScript** - Full type safety throughout the application
- **Form Validation** - Zod schema validation with React Hook Form
- **Animation** - Smooth animations with Framer Motion
- **Accessibility** - WCAG compliant with proper ARIA labels
- **Analytics Ready** - Google Analytics integration ready

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Payments**: Stripe
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pack-it-movers-heights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - Add other optional configurations as needed

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form handler
│   │   ├── quote/         # Quote request handler
│   │   └── create-payment-intent/ # Stripe payment intent
│   ├── contact/           # Contact page
│   ├── payment/           # Payment pages
│   │   └── success/       # Payment success page
│   ├── quote/             # Quote request page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/            # Reusable components
│   ├── CheckoutForm.tsx   # Stripe checkout form
│   ├── Footer.tsx         # Site footer
│   └── Header.tsx         # Site header
└── lib/                   # Utilities
    ├── stripe.ts          # Stripe configuration
    └── validations.ts     # Zod schemas
```

## 💰 Pricing Strategy

### Service Pricing Structure
- **Local Moving**: Starting at $99/hour (2-3 movers + truck)
- **Long Distance**: Custom quotes based on distance and volume
- **Commercial Moving**: Starting at $150/hour (specialized service)

### Additional Services
- **Professional Packing**: +$300
- **Temporary Storage**: +$200/month
- **Special Items** (Piano, Artwork): Custom pricing

### Payment Options
- **Deposits**: 20-30% of total estimate
- **Payment Methods**: Credit/Debit cards via Stripe
- **Financing**: Available for larger moves (future feature)

## 🔒 Security Features

- **Content Security Policy (CSP)** headers
- **Input validation** with Zod schemas
- **XSS protection** with proper sanitization
- **HTTPS enforcement** in production
- **Stripe PCI compliance** for payments
- **Rate limiting** on API endpoints (recommended for production)

## 📈 SEO Optimization

- **Meta tags** optimized for moving services
- **Structured data** (JSON-LD) for local business
- **Sitemap** generation for search engines
- **Robots.txt** configuration
- **Open Graph** and Twitter Card tags
- **Local SEO** optimization for Houston Heights area

## 🚀 Deployment

### Environment Variables for Production
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
DATABASE_URL=your_production_database_url
SMTP_HOST=your_email_provider
SMTP_PORT=587
SMTP_USER=your_email_username
SMTP_PASS=your_email_password
```

### Deployment Platforms
- **Vercel** (Recommended): Automatic deployments with GitHub integration
- **Netlify**: Static site generation with serverless functions
- **AWS Amplify**: Full-stack deployment with AWS services

### Build Commands
```bash
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📊 Analytics & Monitoring

### Recommended Integrations
- **Google Analytics 4**: Website traffic and user behavior
- **Google Search Console**: SEO performance monitoring
- **Stripe Dashboard**: Payment analytics and reporting
- **Hotjar/LogRocket**: User experience monitoring

## 🔧 Customization

### Branding
- Update colors in `tailwind.config.js`
- Replace logo and images in `public/` directory
- Modify company information in components

### Content Management
- Update service descriptions in respective page files
- Modify pricing in quote calculation logic
- Add/remove testimonials in homepage component

### Features to Add
- **Blog/Articles** for SEO content marketing
- **Customer Portal** for move tracking
- **Inventory Management** system
- **CRM Integration** (HubSpot, Salesforce)
- **Live Chat** support widget

## 📞 Support

For technical support or customization requests:
- **Email**: developer@packitmoversheights.com
- **Documentation**: Check inline code comments
- **Issues**: Create GitHub issues for bugs

## 📄 License

This project is proprietary software for Pack It Movers Heights. All rights reserved.

---

**Pack It Movers Heights** - Professional Moving Services in Houston, Texas
