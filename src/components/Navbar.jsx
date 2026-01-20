import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, User, LogOut, Sun, Moon, Search, Leaf, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = ({ onNavigate, onSearch, onShowAuth }) => {
  const { user, darkMode, toggleDarkMode, logout } = useAuth();
  const { cartCount, wishlist } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => onNavigate('home')}>
          <Leaf size={32} color="#10b981" />
          <span>EcoShop</span>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search eco-friendly products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
         {/* Desktop Actions */}
        <div className="navbar-actions">
          {/* Dark Mode Toggle */}
          <button
            className="btn-icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* Wishlist */}
          <button
            className="btn-icon icon-with-badge"
            onClick={() => onNavigate('wishlist')}
            aria-label="Wishlist"
          >
            <Heart size={24} />
            {wishlist.length > 0 && (
              <span className="badge-count">{wishlist.length}</span>
            )}
          </button>

          {/* Cart */}
          <button
            className="btn-icon icon-with-badge"
            onClick={() => onNavigate('cart')}
            aria-label="Shopping cart"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="badge-count">{cartCount}</span>
            )}
          </button>

          {/* User Menu */}
          {user ? (
            <div className="user-menu">
              <button
                className="btn-icon"
                onClick={() => onNavigate('profile')}
                aria-label="User profile"
              >
                <User size={24} />
              </button>
              <button
                className="btn-icon"
                onClick={logout}
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onShowAuth}>
              Login
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="btn-icon mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <button className="mobile-menu-item" onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}>
            Home
          </button>
          <button className="mobile-menu-item" onClick={() => { onNavigate('cart'); setMobileMenuOpen(false); }}>
            Cart ({cartCount})
          </button>
          <button className="mobile-menu-item" onClick={() => { onNavigate('wishlist'); setMobileMenuOpen(false); }}>
            Wishlist ({wishlist.length})
          </button>
          {user && (
            <button className="mobile-menu-item" onClick={() => { onNavigate('profile'); setMobileMenuOpen(false); }}>
              Profile
            </button>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;