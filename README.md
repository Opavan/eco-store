#  EcoShop - Sustainable E-Commerce Platform

A modern, eco-friendly e-commerce website built with React featuring gamification, carbon footprint tracking, and beautiful animations.

##  Features

- **Product Catalog** - Browse eco-friendly products with filtering
- **Product Details** - Detailed product pages with ratings and features
- **Shopping Cart** - Add, remove, and update product quantities
- **Wishlist** - Save favorite products for later
- **User Authentication** - Login/Register functionality
- **Gamification** - Earn eco-badges based on carbon savings
- **Carbon Tracking** - Track your environmental impact with charts
- **Dark/Light Mode** - Toggle between themes
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Beautiful transitions with Framer Motion

##  Project Structure

```
ecommerce-ui/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── CartItem.jsx
│   │   ├── Loader.jsx
│   │   └── AuthModal.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Product.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── WishlistPage.jsx
│   │   └── ProfilePage.jsx
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── AuthContext.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   └── formatPrice.js
│   │
│   ├── styles/
│   │   ├── Navbar.css
│   │   ├── ProductCard.css
│   │   ├── CartItem.css
│   │   ├── Loader.css
│   │   ├── Home.css
│   │   ├── Product.css
│   │   ├── Cart.css
│   │   ├── Checkout.css
│   │   ├── Wishlist.css
│   │   ├── Profile.css
│   │   └── AuthModal.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

##  Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Create a new Vite + React project**:

```bash
npm create vite@latest ecommerce-ui -- --template react
cd ecommerce-ui
```

2. **Install dependencies**:

```bash
npm install framer-motion recharts lucide-react
npm install
```

3. **Create the folder structure**:

```bash
# Create directories
mkdir -p src/components src/pages src/context src/services src/utils src/styles
```

4. **Copy all the files** from this guide into your project following the structure above.

5. **Start the development server**:

```bash
npm run dev
```

6. **Open your browser** to `http://localhost:5173`

##  Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4",
    "recharts": "^2.10.3",
    "lucide-react": "^0.294.0"
  }
}
```

## 🎮 How to Use

### Navigation
- **Home** - Browse all eco-friendly products
- **Product Details** - Click on any product to see details
- **Cart** - View cart icon in navbar
- **Wishlist** - Save products by clicking the heart icon
- **Profile** - Login to track carbon savings and badges

### Shopping
1. Browse products on the home page
2. Filter by category
3. Search for specific products
4. Click product to see details
5. Add to cart or wishlist
6. Proceed to checkout
7. Complete purchase

### Gamification
- Earn badges by making sustainable purchases
- Track your carbon savings
- View progress in profile page
- Unlock achievements:
  -  **Eco Starter** - Save 10kg CO₂
  -  **Green Warrior** - Save 50kg CO₂
  -  **Planet Hero** - Save 100kg CO₂
  -  **Frequent Buyer** - Make 5+ purchases

##  Customization

### Adding Products

Edit `src/services/api.js`:

```javascript
{
  id: 13,
  name: 'Your Product',
  description: 'Description here',
  price: 29.99,
  category: 'lifestyle',
  image: 'image-url',
  carbonSaved: 5.0,
  ecoScore: 90,
  stock: 25
}
```

### Changing Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-green: #10b981;
  --dark-green: #059669;
  /* Add your colors */
}
```

### Adding Categories

Edit `src/services/api.js`:

```javascript
export const categories = [
  { id: 'your-category', name: 'Your Category' },
  // ...
];
```

##  Responsive Design

The app is fully responsive:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

##  Data Persistence

All data is stored in localStorage:
- Shopping cart
- Wishlist
- User authentication
- Carbon savings
- Earned badges
- Dark mode preference

##  Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

##  Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

##  License

This project is open source and available for educational purposes.

##  Acknowledgments

- Product images from Unsplash
- Icons from Lucide React
- Animations powered by Framer Motion
- Charts by Recharts

---

**Made with 💚 for the planet**