import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../services/api';
import { formatPrice } from '../utils/formatPrice';
import axios from 'axios';

const AIRecommendations = ({ currentProduct, onNavigate }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiReason, setAiReason] = useState('');

  useEffect(() => {
    if (!currentProduct) return;
    fetchRecommendations();
  }, [currentProduct]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

     const response = await axios.post('https://ecomart-backend-58f4.onrender.com/api/recommendations', {
        currentProduct,
        allProducts: products,
      });

      if (response.data.success) {
        const recommendedProducts = response.data.ids
          .map(id => products.find(p => p.id === id))
          .filter(Boolean);
        setRecommendations(recommendedProducts);
        setAiReason(response.data.reason);
      }
    } catch (error) {
      console.error('AI Recommendations error:', error);
      // Fallback — show same category products
      const fallback = products
        .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
        .slice(0, 3);
      setRecommendations(
        fallback.length > 0
          ? fallback
          : products.filter(p => p.id !== currentProduct.id).slice(0, 3)
      );
      setAiReason('Similar products you might like');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ai-recommendations">
        <div className="ai-recommendations-header">
          <Sparkles size={20} color="#10b981" />
          <h3>AI is finding recommendations...</h3>
        </div>
        <div className="recommendations-skeleton">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-image" />
              <div className="skeleton-text" />
              <div className="skeleton-text short" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      className="ai-recommendations"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="ai-recommendations-header">
        <Sparkles size={20} color="#10b981" />
        <h3>AI Recommendations</h3>
      </div>

      {aiReason && (
        <p className="ai-reason">✨ {aiReason}</p>
      )}

      <div className="recommendations-grid">
        {recommendations.map(product => (
          <motion.div
            key={product.id}
            className="recommendation-card"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate && onNavigate('product', product.id)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="recommendation-image"
            />
            <div className="recommendation-info">
              <h4>{product.name}</h4>
              <p className="recommendation-price">{formatPrice(product.price)}</p>
              <div className="recommendation-actions">
                <button
                  className="btn btn-primary btn-small"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  <ShoppingCart size={14} />
                  Add
                </button>
                <button
                  className={`btn btn-secondary btn-small ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                >
                  <Heart size={14} fill={isInWishlist(product.id) ? '#ef4444' : 'none'} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIRecommendations;