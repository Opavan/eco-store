import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, Leaf, ArrowLeft, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import '../styles/OrderTracking.css';

const STATUS_STEPS = [
  { key: 'placed', label: 'Order Placed', icon: Clock, color: '#3b82f6' },
  { key: 'processing', label: 'Processing', icon: Package, color: '#f59e0b' },
  { key: 'shipped', label: 'Shipped', icon: Truck, color: '#8b5cf6' },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle, color: '#10b981' },
];

const OrderCard = ({ order }) => {
  const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === order.status);

  return (
    <motion.div
      className="order-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Order Header */}
      <div className="order-card-header">
        <div>
          <h3 className="order-id">Order #{order.id}</h3>
          <p className="order-date">
            {new Date(order.date).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>
        <div className="order-total-badge">
          {formatPrice(order.total)}
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="order-stepper">
        {STATUS_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.key} className="stepper-item">
              <div className="stepper-icon-wrapper">
                {index > 0 && (
                  <div className={`stepper-line ${index <= currentStepIndex ? 'active' : ''}`} />
                )}
                <motion.div
                  className={`stepper-icon ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  style={{ backgroundColor: isCompleted ? step.color : '#e5e7eb' }}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Icon size={16} color={isCompleted ? 'white' : '#9ca3af'} />
                </motion.div>
              </div>
              <p className={`stepper-label ${isCompleted ? 'active' : ''}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Order Items */}
      <div className="order-items-list">
        {order.items.map((item, index) => (
          <div key={index} className="order-item-row">
            <img src={item.image} alt={item.name} className="order-item-img" />
            <div className="order-item-details">
              <p className="order-item-name">{item.name}</p>
              <p className="order-item-qty">Qty: {item.quantity}</p>
            </div>
            <p className="order-item-price">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      {/* Order Footer */}
      <div className="order-card-footer">
        <div className="order-address">
          <p> Delivering to: <strong>{order.address}</strong></p>
        </div>
        <div className="order-carbon">
          <Leaf size={16} color="#10b981" />
          <span>{order.carbonSaved?.toFixed(1)}kg CO₂ saved</span>
        </div>
      </div>
    </motion.div>
  );
};

const OrderTracking = ({ onNavigate }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('ecoOrders') || '[]');

    // Simulate order status progression based on time
    const updated = saved.map(order => {
      const minutesAgo = (Date.now() - new Date(order.date).getTime()) / 60000;
      let status = 'placed';
      if (minutesAgo > 1) status = 'processing';
      if (minutesAgo > 2) status = 'shipped';
      if (minutesAgo > 3) status = 'delivered';
      return { ...order, status };
    });

    setOrders(updated);
  }, []);

  return (
    <div className="orders-page">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <div className="orders-header">
        <ShoppingBag size={32} color="#10b981" />
        <h1>My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <motion.div
          className="no-orders"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ShoppingBag size={64} color="#d1d5db" />
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here!</p>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('home')}
          >
            Shop Now
          </button>
        </motion.div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;