import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { formatPrice, formatCarbon, calculateShipping } from '../utils/formatPrice';
import '../styles/Cart.css';

const Cart = ({ onNavigate }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal, totalCarbonInCart } = useCart();

  const shipping = calculateShipping(cartTotal);
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <motion.div
        className="empty-cart"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShoppingBag size={64} strokeWidth={1.5} />
        <h2>Your cart is empty</h2>
        <p>Add some eco-friendly products to get started!</p>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate('home')}
        >
          Continue Shopping
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <motion.div
          className="cart-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>

          {shipping > 0 && (
            <p className="free-shipping-notice">
              Add {formatPrice(50 - cartTotal)} more for free shipping!
            </p>
          )}

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {/* Carbon Impact */}
          <div className="carbon-impact">
            <Leaf size={24} color="#10b981" />
            <div>
              <p className="carbon-impact-label">Your Climate Impact</p>
              <p className="carbon-impact-value">
                {formatCarbon(totalCarbonInCart)} saved
              </p>
            </div>
          </div>

          <button
            className="btn btn-primary checkout-btn"
            onClick={() => onNavigate('checkout')}
          >
            Proceed to Checkout
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => onNavigate('home')}
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;