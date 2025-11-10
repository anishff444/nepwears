# NepWears - Frontend V2

A modern, aesthetic e-commerce frontend for **NepWears** - celebrating authentic Nepali fashion and heritage.

## 🎨 Design Philosophy

NepWears Frontend V2 features a completely new design aesthetic focused on:

- **Nepal-inspired color palette** with earthy terracotta and nepal tones
- **Minimalist and clean** interface design
- **Cultural heritage** emphasis throughout the UI
- **Premium feel** with smooth animations and transitions
- **Mobile-first** responsive design

## 🚀 Features

- **Modern UI/UX** with Nepal-inspired branding
- **Product browsing** with advanced filtering and search
- **Shopping cart** with slide-out drawer
- **User authentication** (Login/Signup)
- **Secure checkout** with eSewa payment integration
- **Order management** and history
- **Responsive design** for all devices
- **Smooth animations** using Framer Motion
- **Toast notifications** for user feedback

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS 4** - Styling
- **Zustand** - State management
- **React Query** - Server state management
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Framer Motion** - Animations

## 📦 Installation

1. **Install dependencies:**
   ```bash
   cd frontend-v2
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp env.example .env
   ```

3. **Update .env with your API URL:**
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The application will run on `http://localhost:3001`

## 🎨 Color Palette

### Nepal Colors (Earth Tones)
- `nepal-50` to `nepal-900` - Warm, earthy beige tones

### Terracotta (Brand Accent)
- `terracotta-50` to `terracotta-900` - Vibrant terracotta/orange tones

## 📁 Project Structure

```
frontend-v2/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Alert.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   ├── ProductCard.jsx
│   │   └── Skeleton.jsx
│   ├── lib/             # Utilities and API setup
│   │   └── api.js
│   ├── pages/           # Page components
│   │   ├── AuthPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── PaymentFailed.jsx
│   │   ├── ProductDetailPage.jsx
│   │   └── ProductsPage.jsx
│   ├── services/        # API service functions
│   │   ├── authService.js
│   │   ├── cartService.js
│   │   ├── orderService.js
│   │   └── productService.js
│   ├── stores/          # Zustand state stores
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   └── themeStore.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles & Tailwind
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎯 Key Features by Page

### Home Page
- Hero section with Nepal-inspired design
- Brand story and values
- Featured products grid
- Call-to-action sections

### Products Page
- Product grid with cards
- Search and sort functionality
- Filter options
- Responsive grid layout

### Product Detail Page
- Large product images
- Detailed product information
- Add to cart functionality
- Stock availability
- Share and wishlist options

### Cart Drawer
- Slide-out cart interface
- Item management
- Real-time total calculation
- Checkout button

### Checkout Page
- Order summary
- eSewa payment integration
- Secure payment indicators

### Orders Page
- Order history
- Order status tracking
- Order details

## 🔐 Authentication

Uses JWT-based authentication with:
- Login/Signup forms
- Protected routes
- Persistent auth state (Zustand + localStorage)

## 💳 Payment Integration

Integrated with **eSewa** payment gateway for secure online payments.

## 🎨 Custom Design System

The project includes a custom design system with:
- **Typography** - Playfair Display for headings, Inter for body
- **Color palette** - Nepal-inspired earthy tones
- **Components** - Reusable button, card, input styles
- **Animations** - Fade-in, slide-up, slide-down effects
- **Patterns** - Nepal-inspired decorative patterns

## 📱 Responsive Design

Fully responsive across all breakpoints:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🚀 Build for Production

```bash
npm run build
```

Built files will be in the `dist/` folder.

## 🌐 Preview Production Build

```bash
npm run preview
```

## 📝 Notes

- Make sure the backend API is running on the specified URL
- The frontend runs on port 3001 by default (different from original frontend on port 3000)
- All API calls are proxied through Vite in development mode

## 🎨 Brand Identity - NepWears

**Tagline:** "Wear Your Heritage"

**Mission:** Celebrating authentic Nepali craftsmanship and culture through modern fashion.

**Values:**
- Authenticity
- Quality Craftsmanship
- Cultural Heritage
- Sustainability
- Community Support

---

Built with ❤ in Nepal
