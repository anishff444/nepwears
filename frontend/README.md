# Luxe Minimal - Premium E-commerce Frontend v2

A completely reimagined, modern e-commerce frontend built with cutting-edge technologies and creative design principles.

## 🎨 Design Philosophy

**"Luxe Minimal"** - Where luxury meets minimalism. This frontend embraces:

- **Glassmorphism**: Frosted glass effects with backdrop blur
- **3D Card Effects**: Interactive hover states with depth
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Dark/Light Themes**: Seamless theme switching
- **Premium UX**: Micro-interactions throughout the experience

## ✨ Features

### Core Features
- 🎯 **Modern Product Catalog** - Advanced filtering, sorting, and search
- 🛒 **Animated Shopping Cart** - Drawer-style cart with spring physics
- 🔐 **Secure Authentication** - Login/Signup with JWT tokens
- 💳 **Multi-step Checkout** - Progress indicators and validation
- 📱 **Fully Responsive** - Mobile-first design approach
- 🌓 **Dark Mode** - Persistent theme preference
- ⚡ **Optimistic Updates** - Lightning-fast UI responses
- 🎭 **Page Transitions** - Smooth navigation animations

### Technical Features
- **React Query** - Server state management with caching
- **Zustand** - Lightweight client state management
- **Axios** - HTTP client with interceptors
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Production-ready animations
- **React Hot Toast** - Beautiful notifications
- **Lucide Icons** - Modern icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running on `http://localhost:3000`

### Installation

1. Navigate to the frontend-v2 directory:
```bash
cd frontend-v2
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
VITE_API_URL=http://localhost:3000/api/v1
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📁 Project Structure

```
frontend-v2/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── ProductCard.jsx
│   │   └── Loader.jsx
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── AuthPage.jsx
│   │   └── CheckoutPage.jsx
│   ├── stores/           # Zustand stores
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   └── themeStore.js
│   ├── services/         # API services
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   └── orderService.js
│   ├── lib/              # Utilities
│   │   └── api.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (from-primary-500 to-primary-600)
- **Secondary**: Purple to Pink gradient
- **Dark Mode**: Sophisticated dark-50 to dark-950 scale
- **Accent**: Dynamic gradients for CTAs and highlights

### Typography
- **Font**: Inter - Clean, modern, highly readable
- **Hierarchy**: 
  - Display: 5xl-7xl for heroes
  - Headings: 2xl-4xl
  - Body: base-lg
  - Small: sm-xs

### Spacing
- Consistent 4px base unit
- Generous whitespace for premium feel
- Asymmetric layouts for visual interest

### Components
- **Glass Effects**: Blur + transparency + subtle borders
- **Rounded Corners**: xl-3xl for modern aesthetic
- **Shadows**: Layered, colored shadows for depth
- **Animations**: Spring-based physics for natural movement

## 🔌 Backend Integration

This frontend integrates with your existing backend API:

### Authentication Endpoints
- `POST /api/v1/users/signup` - User registration
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/me` - Get current user
- `PATCH /api/v1/users/updateMe` - Update profile
- `PATCH /api/v1/users/updateMyPassword` - Change password

### Product Endpoints
- `GET /api/v1/products` - List products (with filters)
- `GET /api/v1/products/:id` - Get product details
- `POST /api/v1/products/createProduct` - Create product (admin/seller)
- `PATCH /api/v1/products/updateProductDetail/:id` - Update product

### Cart Endpoints
- `GET /api/v1/carts` - Get user cart
- `POST /api/v1/carts/add/:productId` - Add to cart
- `POST /api/v1/carts/remove/:productId` - Remove from cart

### Order Endpoints
- `POST /api/v1/orders/checkout` - Create order
- `GET /api/v1/orders/verify-payment` - Verify eSewa payment
- `GET /api/v1/orders/history` - Order history
- `GET /api/v1/orders/status/:orderId` - Check order status

## 🌟 Key Differences from v1

1. **Complete UI Redesign**: Modern glassmorphism vs traditional design
2. **Advanced Animations**: Framer Motion vs basic CSS transitions
3. **Better State Management**: Zustand + React Query vs Context API
4. **Improved DX**: Better folder structure and code organization
5. **Premium UX**: Micro-interactions and attention to detail
6. **Performance**: Optimized rendering and code splitting
7. **Accessibility**: Better keyboard navigation and screen reader support

## 🛠️ Customization

### Changing Theme Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color scale
      }
    }
  }
}
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Header.jsx`

### Modifying Animations
Edit animation variants in component files or add new ones in `tailwind.config.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🔒 Security

- JWT tokens stored in localStorage (encrypted)
- Axios interceptors for automatic token attachment
- CORS configured for your backend
- Input validation on all forms
- XSS protection via React's built-in escaping

## 📈 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Images and components
- **Caching**: React Query smart caching strategy
- **Optimistic Updates**: Instant UI feedback
- **Tree Shaking**: Remove unused code
- **Minification**: Production build optimization

## 🎯 Future Enhancements

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking page
- [ ] User profile page
- [ ] Admin dashboard
- [ ] Real-time notifications
- [ ] Social auth (Google, Facebook)
- [ ] Advanced search with autocomplete
- [ ] Product comparison feature
- [ ] Gift cards and coupons

## 🤝 Contributing

This is a creative reimagining of your e-commerce frontend. Feel free to:
- Customize colors and branding
- Add new features
- Improve animations
- Enhance accessibility
- Optimize performance

## 📄 License

Same as your main project license.

## 🎉 Credits

- **Design Inspiration**: Modern e-commerce leaders
- **Icons**: Lucide Icons
- **Fonts**: Google Fonts (Inter)
- **Animations**: Framer Motion
- **UI Framework**: Tailwind CSS

---

Built with ❤️ and creativity by embracing modern web design principles.
