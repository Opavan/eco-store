import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, formatCarbon } from '../utils/formatPrice';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onNavigate }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.02 }}
    >
      {/* Product Image */}
      <div
        className="product-image-container"
        onClick={() => onNavigate('product', product.id)}
      >
        <img
        src={product.image}
          alt={product.name}
         className="product-image"
          loading="lazy"
            onError={(e) => {
             e.target.onerror = null;
          e.target.src = '/images/placeholder.png';
           }}
          />


        <button
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <Heart size={20} fill={inWishlist ? '#ef4444' : 'none'} />
        </button>

        <div className="eco-score-badge">
          <Leaf size={14} />
          <span>{product.ecoScore}%</span>
        </div>
      </div>

      <div className="product-info">
        <h3
          className="product-name"
          onClick={() => onNavigate('product', product.id)}
        >
          {product.name}
        </h3>

        <p className="product-description">{product.description}</p>

        <div className="carbon-info">
          <span>Carbon saved:</span>
          <span>{formatCarbon(product.carbonSaved)}</span>
        </div>

        <div className="product-footer">
          <span className="price">{formatPrice(product.price)}</span>

          <motion.button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
