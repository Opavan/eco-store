import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthModal.css';

const AuthModal = ({ onClose }) => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email
    });
    onClose();
  };

  // ✅ Demo login function
  const handleDemoLogin = () => {
    login({
      name: 'Demo User',
      email: 'demo@ecoshop.com'
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="auth-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-modal-btn" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="auth-header">
            <h2>{isLogin ? 'Welcome Back!' : 'Join EcoShop'}</h2>
            <p>
              {isLogin
                ? 'Login to track your eco-impact'
                : 'Start your sustainable journey today'}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="input-group">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <Lock size={20} className="input-icon" />
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary auth-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Login' : 'Create Account'}
            </motion.button>
          </form>

          <div className="auth-toggle">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                className="toggle-auth-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {/* ✅ Demo button styled like dashboard, at the very bottom */}
          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <motion.button
              className="btn auth-submit-btn"
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #10b981, #059669)',
                color: '#fff',
                fontWeight: '600',
                padding: '12px 0',
                borderRadius: '10px',
                boxShadow: '0 6px 15px rgba(16,185,129,0.3)',
                fontSize: '14px'
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDemoLogin}
            >
               Login as Demo User
            </motion.button>
          </div>

          <div className="auth-eco-message">
            🌱 Join thousands of eco-warriors making a difference!
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
