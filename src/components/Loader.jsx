import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import '../styles/Loader.css';

const Loader = ({ fullScreen = false }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'fullscreen' : ''}`}>
      <motion.div
        className="loader-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Leaf size={48} color="#10b981" />
        </motion.div>
        <p className="loader-text">Loading eco-friendly products...</p>
      </motion.div>
    </div>
  );
};

export default Loader;