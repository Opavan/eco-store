import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Leaf, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { fetchProductById } from '../services/api';
import { formatPrice, formatCarbon } from '../utils/formatPrice';
import Loader from '../components/Loader';
import '../styles/Product.css';

const Product = ({ productId, onNavigate }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => onNavigate('home')}>
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-page">
      <button className="back-btn" onClick={() => onNavigate('home')}>
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <motion.div
        className="product-detail-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Product Image */}
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
          <div className="eco-badge-large">
            <Leaf size={24} />
            <span>{product.ecoScore}% Eco Score</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />
            ))}
            <span>(4.8/5.0)</span>
          </div>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-price">
            <span className="price-label">Price:</span>
            <span className="price-value">{formatPrice(product.price)}</span>
          </div>

          <div className="carbon-impact-detail">
            <Leaf size={32} color="#10b981" />
            <div>
              <p className="carbon-impact-label">Carbon Impact</p>
              <p className="carbon-impact-value">
                {formatCarbon(product.carbonSaved)} saved per purchase
              </p>
            </div>
          </div>

          <div className="product-stock">
            {product.stock > 10 ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="low-stock">Only {product.stock} left!</span>
            )}
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls-large">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
              </div>
            </div>

            <motion.button
              className="btn btn-primary btn-large"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>

            <motion.button
              className={`btn btn-secondary btn-large ${inWishlist ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart size={20} fill={inWishlist ? '#ef4444' : 'none'} />
              {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </motion.button>
          </div>

          <div className="product-features">
            <h3>Why Choose This Product?</h3>
            <ul>
              <li>✓ 100% Eco-friendly materials</li>
              <li>✓ Sustainable manufacturing</li>
              <li>✓ Reduces carbon footprint</li>
              <li>✓ Biodegradable packaging</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Product;