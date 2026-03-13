# Julie's Dog Sitting - Professional Services Website

A modern, responsive one-page website for Julie's dog sitting, boarding, day care, and walking services in Georgetown, Massachusetts.

**Live Demo:** https://julie-dog-sitting.vercel.app (coming soon)

## Features

- 🐕 **One-page design** - Easy to share and navigate
- 📱 **Mobile responsive** - Looks great on all devices
- 💚 **Clean green & gray design** - Professional, trustworthy aesthetic
- 📍 **Service details** - Pricing, availability toggle, booking forms
- 📸 **Photo gallery** - Space for up to 125 dog photos
- ⭐ **Reviews section** - Display 17+ verified reviews from Rover
- 📝 **Contact & booking** - Submit inquiries and reviews (approval-based)
- 📊 **Availability management** - Toggle services on/off dynamically
- 🗺️ **Location map** - Shows approximate location in Georgetown, MA

## Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Vercel** - Hosting & deployment

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Navigate to project
cd julie-dog-sitting

# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

```
julie-dog-sitting/
├── app/
│   ├── page.tsx          # Main one-page site
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Tailwind & global styles
├── lib/
│   └── services.ts       # Services data, pricing, reviews
├── public/
│   └── images/
│       └── dogs/         # Photo gallery (add up to 125 images)
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## Adding Dog Photos

1. Place dog photos in `/public/images/dogs/`
2. Update the photo gallery loop in `app/page.tsx` to dynamically load images
3. Supports up to 125 images

## Customization

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#01BD70',      // Green accent
  lightGray: '#F4F5F6',    // Light gray backgrounds
}
```

### Services & Pricing

Edit `lib/services.ts` to update:
- Service names and descriptions
- Pricing and variants
- Reviews

### Content

Update text directly in `app/page.tsx`:
- Bio and about information
- Typical day description
- Home details and safety standards
- Contact information

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel auto-deploys on git push
4. Add custom domain in Vercel settings

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
```

Then connect to Vercel via https://vercel.com/new

## Features to Add

- [ ] Google Maps integration for location
- [ ] Resend email integration for booking inquiries
- [ ] Review submission approval workflow
- [ ] Admin panel for Julie to manage availability, photos, reviews
- [ ] Stripe integration for booking deposits (future)
- [ ] Email notifications for new inquiries/reviews

## Environment Variables

Create `.env.local` for future integrations:

```env
NEXT_PUBLIC_VERCEL_URL=
RESEND_API_KEY=
STRIPE_PUBLIC_KEY=
```

## Support

For questions or issues:
- Check Next.js docs: https://nextjs.org/docs
- Check Tailwind docs: https://tailwindcss.com/docs

---

**Built for Julie's Dog Sitting | Georgetown, Massachusetts** 🐕
