import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, User, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, formatCarbon, calculateShipping } from '../utils/formatPrice';
import '../styles/Checkout.css';

const Checkout = ({ onNavigate }) => {
  const { cart, cartTotal, totalCarbonInCart, completePurchase } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const shipping = calculateShipping(cartTotal);
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completePurchase();
    alert('Order placed successfully! 🌱');
    onNavigate('home');
  };

  if (cart.length === 0) {
    onNavigate('cart');
    return null;
  }

  return (
    <motion.div
      className="checkout-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        {/* Checkout Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Contact Information */}
          <div className="form-section">
            <h2 className="section-title">
              <User size={24} />
              Contact Information
            </h2>
            
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className="input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="form-section">
            <h2 className="section-title">
              <MapPin size={24} />
              Shipping Address
            </h2>
            
            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="address"
                className="input"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  className="input"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className="input"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="form-section">
            <h2 className="section-title">
              <CreditCard size={24} />
              Payment Information
            </h2>
            
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                className="input"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="19"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  className="input"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  maxLength="5"
                  required
                />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  className="input"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength="4"
                  required
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary place-order-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Place Order - {formatPrice(total)}
          </motion.button>
        </form>

        {/* Order Summary */}
        <div className="order-summary-sidebar">
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-details">
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-quantity">Qty: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="order-total-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="order-total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="order-divider"></div>
              <div className="order-total-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="carbon-impact-checkout">
              <Leaf size={20} color="#10b981" />
              <div>
                <p className="carbon-label">Total Carbon Saved</p>
                <p className="carbon-value">{formatCarbon(totalCarbonInCart)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;