import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { fetchProducts, fetchCategories } from '../services/api';
import '../styles/Home.css';

const Home = ({ onNavigate, searchTerm }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Load products & categories
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);

        setAllProducts(productsData);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        product => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProducts(filtered);
  }, [selectedCategory, searchTerm, allProducts]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="hero-title">
          Shop Eco-Friendly, Save the Planet 🌍
        </h1>
        <p className="hero-subtitle">
          Every purchase makes a difference. Track your carbon savings and earn eco-badges!
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        className="category-filter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${
              selectedCategory === category.id ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Product Grid */}
     <motion.div
  key={selectedCategory + searchTerm}
  className="product-grid"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {products.map(product => (
    <ProductCard
      key={product.id}
      product={product}
      onNavigate={onNavigate}
    />
  ))}
</motion.div>

    </div>
  );
};

export default Home;
