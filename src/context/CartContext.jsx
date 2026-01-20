import React, { createContext, useContext, useState, useEffect } from 'react';
import { useEcoPoints } from "./EcoPointsContext";


const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [carbonSaved, setCarbonSaved] = useState(0);
  const [badges, setBadges] = useState([]);

  const { addEcoPoints, ecoPoints } = useEcoPoints();

  useEffect(() => {
    if (ecoPoints >= 50 && !badges.includes("eco-starter")) {
      setBadges((prev) => [...prev, "eco-starter"]);
    }

    if (ecoPoints >= 100 && !badges.includes("green-warrior")) {
      setBadges((prev) => [...prev, "green-warrior"]);
    }

    if (ecoPoints >= 200 && !badges.includes("planet-hero")) {
      setBadges((prev) => [...prev, "planet-hero"]);
    }
  }, [ecoPoints]);




  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedCarbon = localStorage.getItem('carbonSaved');
    const savedBadges = localStorage.getItem('badges');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedCarbon) setCarbonSaved(JSON.parse(savedCarbon));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('carbonSaved', JSON.stringify(carbonSaved));
  }, [carbonSaved]);

  useEffect(() => {
    localStorage.setItem('badges', JSON.stringify(badges));
  }, [badges]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    addEcoPoints(10);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const checkAndAwardBadges = (totalCarbon, purchaseCount) => {
    const newBadges = [...badges];
    
    if (totalCarbon >= 10 && !badges.includes('eco-starter')) {
      newBadges.push('eco-starter');
    }
    if (totalCarbon >= 50 && !badges.includes('green-warrior')) {
      newBadges.push('green-warrior');
    }
    if (totalCarbon >= 100 && !badges.includes('planet-hero')) {
      newBadges.push('planet-hero');
    }
    if (purchaseCount >= 5 && !badges.includes('frequent-buyer')) {
      newBadges.push('frequent-buyer');
    }
    
    setBadges(newBadges);
  };

  const completePurchase = () => {
    const totalCarbon = cart.reduce((sum, item) => sum + (item.carbonSaved * item.quantity), 0);
    setCarbonSaved(carbonSaved + totalCarbon);
    checkAndAwardBadges(carbonSaved + totalCarbon, cart.length);
    clearCart();
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCarbonInCart = cart.reduce((sum, item) => sum + (item.carbonSaved * item.quantity), 0);

  const value = {
    cart,
    wishlist,
    carbonSaved,
    badges,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist,
    completePurchase,
    cartTotal,
    cartCount,
    totalCarbonInCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};