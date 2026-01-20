import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { EcoPointsProvider } from './context/EcoPointsContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import AuthModal from './components/AuthModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleNavigate = (page, productId = null) => {
    setCurrentPage(page);
    if (productId) setSelectedProductId(productId);
    window.scrollTo(0, 0);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (currentPage !== 'home') setCurrentPage('home');
  };

  return (
    <AuthProvider>
      <EcoPointsProvider>
        <CartProvider>
          <div className="app">
            <Navbar
              onNavigate={handleNavigate}
              onSearch={handleSearch}
              onShowAuth={() => setShowAuthModal(true)}
            />

            <main style={{ flex: 1 }}>
              <AnimatePresence mode="wait">
                {currentPage === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Home onNavigate={handleNavigate} searchTerm={searchTerm} />
                  </motion.div>
                )}

                {currentPage === 'product' && (
                  <motion.div key="product" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Product productId={selectedProductId} onNavigate={handleNavigate} />
                  </motion.div>
                )}

                {currentPage === 'cart' && (
                  <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Cart onNavigate={handleNavigate} />
                  </motion.div>
                )}

                {currentPage === 'checkout' && (
                  <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Checkout onNavigate={handleNavigate} />
                  </motion.div>
                )}

                {currentPage === 'wishlist' && (
                  <motion.div key="wishlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <WishlistPage onNavigate={handleNavigate} />
                  </motion.div>
                )}

                {currentPage === 'profile' && (
                  <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ProfilePage onNavigate={handleNavigate} />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            <Footer />

            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
          </div>
        </CartProvider>
      </EcoPointsProvider>
    </AuthProvider>
  );
}

export default App;
