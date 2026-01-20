import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Award, Leaf, TrendingUp, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatCarbon } from '../utils/formatPrice';
import '../styles/Profile.css';
import { useEcoPoints } from '../context/EcoPointsContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const { carbonSaved, badges } = useCart();
  const { ecoPoints } = useEcoPoints();

  const badgeData = [
    {
      id: 'eco-starter',
      name: 'Eco Starter',
      description: 'Saved 10kg CO₂',
      icon: '🌱',
      unlocked: badges.includes('eco-starter')
    },
    {
      id: 'green-warrior',
      name: 'Green Warrior',
      description: 'Saved 50kg CO₂',
      icon: '🌿',
      unlocked: badges.includes('green-warrior')
    },
    {
      id: 'planet-hero',
      name: 'Planet Hero',
      description: 'Saved 100kg CO₂',
      icon: '🌍',
      unlocked: badges.includes('planet-hero')
    },
    {
      id: 'frequent-buyer',
      name: 'Frequent Buyer',
      description: 'Made 5+ purchases',
      icon: '🛍️',
      unlocked: badges.includes('frequent-buyer')
    }
  ];

  const impactData = [
    { month: 'Jan', carbon: Math.max(0, carbonSaved * 0.2) },
    { month: 'Feb', carbon: Math.max(0, carbonSaved * 0.4) },
    { month: 'Mar', carbon: Math.max(0, carbonSaved * 0.7) },
    { month: 'Apr', carbon: carbonSaved }
  ];

  const stats = [
    {
      icon: <Leaf size={32} />,
      label: 'Total CO₂ Saved',
      value: formatCarbon(carbonSaved),
      color: '#10b981'
    },
    {
      icon: <Award size={32} />,
      label: 'Badges Earned',
      value: badges.length,
      color: '#f59e0b'
    },
    {
      icon: <TrendingUp size={32} />,
      label: 'Eco Score',
      value: Math.min(100, Math.round(carbonSaved * 2)),
      color: '#3b82f6'
    }
  ];

//  Eco Progress Logic
let nextTarget = 50;
let nextBadge = "Eco Starter";

if (ecoPoints >= 50 && ecoPoints < 100) {
  nextTarget = 100;
  nextBadge = "Green Warrior";
} else if (ecoPoints >= 100 && ecoPoints < 200) {
  nextTarget = 200;
  nextBadge = "Planet Hero";
} else if (ecoPoints >= 200) {
  nextTarget = ecoPoints;
  nextBadge = "All badges unlocked 🎉";
}

const progressPercent = Math.min(
  100,
  Math.round((ecoPoints / nextTarget) * 100)
);

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <User size={48} />
        </div>
        <div className="profile-info">
          <h1>{user?.name || 'Eco Warrior'}</h1>
          <p>{user?.email || 'user@example.com'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-details">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">{stat.value}</p>
            </div>
            {/*  Eco Progress Section */}
             <div className="eco-progress">
            <h2>Eco Progress</h2>
             <p>
            {ecoPoints} / {nextTarget} points – {nextBadge}
            </p>

            <div className="progress-bar">
         <div
      className="progress-fill"
      style={{ width: `${progressPercent}%` }}
       />
      </div>
        </div>
          </motion.div>
        ))}

        {/*  ECO POINTS CARD */}
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon" style={{ color: '#22c55e' }}>
            🌱
          </div>
          <div className="stat-details">
            <p className="stat-label">Eco Points</p>
            <p className="stat-value">{ecoPoints}</p>
          </div>
        </motion.div>
      </div>

      {/* Carbon Impact Chart */}
      <motion.div
        className="chart-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2>Your Carbon Impact Journey</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="carbon" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        className="badges-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Achievement Badges</h2>
        <div className="badges-grid">
          {badgeData.map((badge, index) => (
            <motion.div
              key={badge.id}
              className={`badge-card ${
                badge.unlocked ? 'unlocked' : 'locked'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="badge-icon">{badge.icon}</div>
              <h3>{badge.name}</h3>
              <p>{badge.description}</p>
              {badge.unlocked && (
                <div className="unlocked-tag">Unlocked!</div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
