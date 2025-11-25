# The Speed Machine Website

A modern, scroll-based website for The Speed Machine putting training aid built with Next.js 14, TypeScript, and Tailwind CSS.

## Color Scheme

- **Background**: Pure white (#ffffff)
- **Text**: Black (#000000)
- **Accent**: Masters Green (#006747) for hover states and interactive elements

## Features

- 🎨 Clean black and white design with Masters green accents
- 📱 Fully responsive design
- 🎬 Scroll-based animations and interactions
- 📝 Content-driven architecture using content.json
- 🖼️ Optimized image and video assets
- ⚡ Next.js 14 with App Router
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling

## Project Structure

```
├── app/
│   ├── components/          # Reusable React components
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── SuccessMetrics.tsx
│   │   ├── TrainingPhilosophy.tsx
│   │   ├── CTASection.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── TrainingPrograms.tsx
│   │   ├── ScrollSection.tsx
│   │   └── HorizontalScroll.tsx
│   ├── product/            # Product page
│   │   └── page.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── lib/
│   ├── content.ts          # Content management utilities
│   └── cart.ts             # Shopping cart utilities
├── public/
│   ├── fonts/              # Custom fonts
│   ├── images/             # Product images
│   └── videos/             # Product videos
├── content.json            # Content source of truth
└── tailwind.config.ts      # Tailwind configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Content Management

All website content is managed through `content.json`. To update text:

1. Open `content.json`
2. Edit the relevant section (homepage or product_page)
3. Save the file - changes will be reflected automatically

## Asset Management

### Images
- All images are in `public/images/`
- Use Next.js Image component for automatic optimization
- Naming convention: lowercase with hyphens (e.g., `main-photo.jpeg`)

### Videos
- All videos are in `public/videos/`
- Currently in .MOV format
- Consider converting to MP4/WebM for better web performance

## Color Scheme Usage

The design uses a strict black/white/Masters green palette:

- **Primary buttons**: Black background, white text, hover to Masters green
- **Secondary buttons**: White background with black border, hover to black
- **Cards**: White background with black borders, hover border to Masters green
- **Text**: Black with opacity variations for hierarchy
- **Interactive elements**: Masters green hover states

## Custom Font

The site uses "Electromagnetic Lungs" custom font:
- Located in `public/fonts/ElectromagneticLungs.otf`
- Applied via `font-electromagnetic` utility class
- Used primarily for the hero "MAKE MORE PUTTS" text

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is configured for deployment on Netlify, Vercel, or any Next.js-compatible hosting platform.

## Component Overview

### Homepage Components

1. **Hero**: Full-screen hero with stacked text and parallax scrolling
2. **ProblemSection**: Three-column card layout explaining the problem
3. **SolutionSection**: Horizontal scrolling value propositions
4. **FeaturesGrid**: Six-feature grid with hover effects
5. **SuccessMetrics**: Animated counters with stats
6. **TrainingPhilosophy**: Three philosophy cards
7. **CTASection**: Call-to-action buttons

### Product Page Components

1. **Product Hero**: Full-screen image with product info
2. **ProductDetails**: Specs grid with four items
3. **TrainingPrograms**: Three program cards

### Utility Components

1. **Navigation**: Sticky navigation with cart count
2. **ScrollSection**: Reusable scroll animation wrapper
3. **HorizontalScroll**: Horizontal scrolling container

## License

Private project - All rights reserved
