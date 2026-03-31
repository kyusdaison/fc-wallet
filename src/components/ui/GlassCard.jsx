import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', onClick, style = {}, neonEdge = true }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card ${className}`}
      style={{
        ...style,
        boxShadow: neonEdge ? 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.5)' : style.boxShadow,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};
