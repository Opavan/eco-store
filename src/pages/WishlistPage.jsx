import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import '../styles/Wishlist.css';

const WishlistPage = ({ onNavigate }) => {
  const { wishlist, addToCart, toggleWishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <motion.div
        className="empty-wishlist"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Heart size={64} strokeWidth={1.5} />
        <h2>Your wishlist is empty</h2>
        <p>Save your favorite eco-friendly products here!</p>
        <button className="btn btn-primary" onClick={() => onNavigate('home')}>
          Browse Products
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="wishlist-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="wishlist-title">My Wishlist ❤️</h1>

      <div className="wishlist-grid">
        {wishlist.map((product, index) => (
          <motion.div
            key={product.id}
            className="wishlist-item"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              className="remove-wishlist-btn"
              onClick={() => toggleWishlist(product)}
              aria-label="Remove from wishlist"
            >
              <X size={20} />
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="wishlist-item-image"
              onClick={() => onNavigate('product', product.id)}
            />
            
            <div className="wishlist-item-info">
              <h3 onClick={() => onNavigate('product', product.id)}>{product.name}</h3>
              <p className="wishlist-item-description">{product.description}</p>
              
              <div className="wishlist-item-footer">
                <span className="wishlist-item-price">{formatPrice(product.price)}</span>
                
                <motion.button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WishlistPage;