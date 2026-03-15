# Julie's Dog Sitting - Professional Services Website

A modern, responsive one-page website for Julie's dog sitting, boarding, day care, and walking services in Georgetown, Massachusetts.

**🎉 LIVE PRODUCTION SITE:** https://julie-dog-sitting.vercel.app

**GitHub:** https://github.com/davecummings-zz/julie-dog-sitting

## ✨ Features

### Navigation & UX
- 🧭 **Sticky Navigation Bar** - Quick access to 8 sections from anywhere on site
- 📱 **Mobile Hamburger Menu** - Touch-friendly navigation on mobile devices
- ⚡ **Smooth Scrolling** - Seamless navigation to sections (About, Services, Gallery, Reviews, Contact, Location)
- 🎨 **Custom SVG Icons** - 9 professional custom icons throughout site

### Content Sections
- 👋 **About Julie** - Photo, bio, communication stats, skills, typical day
- 📅 **Interactive Calendar** - Date-based availability for all 4 services
- 💰 **Services & Pricing** - Boarding, Drop-in Visits, Day Care, Dog Walking with pricing variants
- 📸 **Photo Gallery** - 43+ dynamic dog photos with Load More pagination & lightbox
- ⭐ **Reviews Section** - 17 verified 5-star reviews with carousel navigation
- 🏡 **Home & Environment** - Safety standards, care details, home information
- 📋 **Contact Form** - Booking inquiries with cancellation policy disclosure
- 🗺️ **Location Map** - Interactive Google Maps showing service area
- 🔗 **QR Code Generator** - Shareable link for mobile access

### Features
- 🐕 **One-page responsive design** - Desktop, tablet, mobile optimized
- 💚 **Professional branding** - Green (#01BD70) accent with gray aesthetic
- 🎯 **Dynamic photo gallery** - No hardcoding needed; add/remove photos from `/public/images/dogs/`
- 📱 **Mobile-first design** - Works beautifully on all screen sizes
- ♿ **Accessible** - Semantic HTML, proper contrast, keyboard navigation
- ⚙️ **Year-round availability** - Calendar pre-loaded March-December 2026
- 📋 **Cancellation policy modal** - Linked disclosure with backdrop close
- 🎨 **Custom icon system** - Reusable SVG icon components (WalkingIcon, PhoneIcon, TargetIcon, PlayIcon, HugIcon, FoodIcon, HomeIcon, ShieldIcon, DayIcon)

## 🎯 Current Status

**✅ 100% FEATURE COMPLETE & LIVE IN PRODUCTION**

All core features implemented and deployed to Vercel. Site is fully functional and ready for use.

### Last Updated
- **Commit:** `a08a7d4`
- **Date:** Sunday, March 15, 2026
- **Changes:** Complete icon system (9 custom SVG icons), sticky navigation, cancellation policy modal

## 🛠️ Tech Stack

- **Next.js 14** - React framework for production
- **React 18** - UI components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **react-calendar** - Interactive date picker
- **QR Code** - Shareable link generation
- **Vercel** - Hosting & auto-deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone repository
git clone https://github.com/davecummings-zz/julie-dog-sitting.git
cd julie-dog-sitting

# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Development

```bash
# Watch mode with live reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint and format
npm run lint
```

## 📁 Project Structure

```
julie-dog-sitting/
├── app/
│   ├── page.tsx              # Main one-page site (entire UI)
│   ├── layout.tsx            # Root layout with Navigation
│   ├── globals.css           # Tailwind directives + custom styles
│   └── api/
│       └── dogs/route.ts     # Dynamic photo API endpoint
├── components/
│   ├── Navigation.tsx        # Sticky navbar with mobile menu
│   └── Icons.tsx             # Reusable SVG icon components (9 icons)
├── lib/
│   └── services.ts           # Services, pricing, reviews data
├── public/
│   ├── images/
│   │   ├── dogs/             # Dog photos (1.webp - 43.webp, expandable to 125)
│   │   └── julie.webp        # Julie's photo for About section
│   └── ...
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── postcss.config.js         # PostCSS + Autoprefixer
└── package.json
```

## 📸 Adding Dog Photos

Julie can manage photos without touching code:

1. Add `.webp` files to `/public/images/dogs/`
2. Photos automatically appear in gallery with pagination
3. Supports up to 125 images
4. Gallery displays 12 per page with "Load More" button
5. Click any photo to open lightbox with navigation

**Example:**
```
/public/images/dogs/
  1.webp
  2.webp
  3.webp
  ... (up to 125)
```

The gallery API at `/app/api/dogs/route.ts` auto-scans the folder.

## 🎨 Customization

### Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: '#01BD70',        // Green accent
  lightGray: '#F4F5F6',      // Light gray backgrounds
  darkGray: '#3A3A3A',       // Dark text
}
```

### Services & Pricing

Edit `lib/services.ts`:

```typescript
export const services = [
  {
    id: 'boarding',
    name: 'Boarding',
    price: 75,
    variants: { /* pricing variants */ }
  },
  // ... other services
]
```

### Content & Text

Edit `app/page.tsx` directly:
- About Julie section (bio, communication, skills)
- Typical day description
- Home & environment details
- Service descriptions

### Navigation Links

Edit `components/Navigation.tsx`:

```typescript
const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Availability', href: '#availability' },
  // ... add more
]
```

### Calendar Availability

Edit `app/page.tsx` in `initializeAvailability()`:

```typescript
const availability: Record<string, Record<string, boolean>> = {
  "2026-03-12": { boarding: true, dropIn: true, daycare: true, walking: true },
  // ... pre-populate with your dates
}
```

## 🔧 SVG Icon System

All 9 custom icons are reusable components in `/components/Icons.tsx`:

```typescript
import { WalkingIcon, PhoneIcon, TargetIcon, PlayIcon, HugIcon, FoodIcon, HomeIcon, ShieldIcon, DayIcon } from '@/components/Icons'

// Use in JSX
<WalkingIcon className="text-green-500" size={24} />
```

Each icon:
- Accepts `className` prop for styling
- Accepts `size` prop for sizing (default varies)
- Uses `currentColor` for color inheritance
- Properly sized for headings, bullets, etc.

## 📋 Deployment

### Deploy to Vercel (Current Setup)

The site auto-deploys from GitHub to Vercel on every push:

```bash
# Push changes to GitHub
git add .
git commit -m "Your message"
git push origin main
```

Vercel automatically builds and deploys. No manual steps needed.

### Custom Domain Setup

1. Purchase domain (e.g., juliedogcare.com via Namecheap)
2. In Vercel project settings → Domains
3. Add domain and follow DNS setup
4. Optional: Redirect secondary domain via 301 (e.g., juliedogsitting.com → juliedogcare.com)

## ✅ Feature Checklist

### Completed
- ✅ One-page responsive design
- ✅ Interactive calendar with date availability
- ✅ Dynamic photo gallery (43+ photos)
- ✅ Lightbox image viewer
- ✅ Reviews carousel (17 reviews)
- ✅ Contact form with validation
- ✅ Cancellation policy modal
- ✅ Google Map location
- ✅ QR code generator
- ✅ Navigation system (sticky navbar)
- ✅ Mobile hamburger menu
- ✅ Custom SVG icons (9)
- ✅ Services & pricing display
- ✅ About Julie section with photo
- ✅ Smooth scrolling navigation
- ✅ Responsive design (mobile/tablet/desktop)

### Future Enhancements (Optional)
- [ ] Email notifications (Resend API)
- [ ] Booking approval workflow
- [ ] Admin panel for managing availability
- [ ] Stripe payment integration
- [ ] Review submission automation
- [ ] Email marketing integration

## 📊 Performance

- ⚡ **Fast load times** - Optimized Next.js with Vercel CDN
- 📦 **Small bundle** - Tree-shaking, code splitting, image optimization
- 📱 **Mobile optimized** - Responsive design, touch-friendly
- ♿ **Accessible** - WCAG compliance, keyboard navigation

## 🐛 Troubleshooting

### Photos not showing in gallery
- Check files are in `/public/images/dogs/`
- Verify filenames are sequential (1.webp, 2.webp, etc.)
- Check console for 404 errors
- Try rebuilding: `npm run build && npm start`

### Modal closes immediately
- Ensure button has `type="button"` (not `type="submit"`)
- Check for accidental form submission
- Verify `stopPropagation()` is in place

### Navigation links don't scroll
- Check section IDs match href values (e.g., `id="about"` for `href="#about"`)
- Verify `scrollIntoView()` is working in browser console
- Test on different browsers

## 📚 Documentation

- **Next.js:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Calendar:** https://www.npmjs.com/package/react-calendar
- **Vercel:** https://vercel.com/docs

## 🎯 How Julie Can Use This

1. **Add Photos:** Drag `.webp` files to `/public/images/dogs/` folder
2. **Update Availability:** Edit calendar dates in `app/page.tsx`
3. **Change Content:** Edit section text directly in `app/page.tsx`
4. **Deploy:** Push to GitHub → Vercel auto-deploys
5. **Share:** Use QR code or link at https://julie-dog-sitting.vercel.app/

## 📞 Support

For questions or issues:
- Check site features in browser
- Review code comments in `app/page.tsx`
- Consult Next.js and Tailwind docs
- Contact developer with specific questions

---

**Built for Julie's Dog Sitting | Georgetown, Massachusetts** 🐕  
**Live Site:** https://julie-dog-sitting.vercel.app  
**Last Updated:** March 15, 2026
