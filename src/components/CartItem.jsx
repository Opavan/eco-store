import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, Leaf } from 'lucide-react';
import { formatPrice, formatCarbon } from '../utils/formatPrice';
import '../styles/CartItem.css';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <motion.div
      className="cart-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      layout
    >
      <img src={item.image} alt={item.name} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="cart-item-description">{item.description}</p>
        <div className="carbon-saved-small">
          <Leaf size={14} />
          <span>{formatCarbon(item.carbonSaved)} saved per item</span>
        </div>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="cart-item-price">
          {formatPrice(item.price * item.quantity)}
        </div>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.id)}
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;