import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, animate = true, onClick }) => {
  const Component = animate ? motion.div : 'div';

  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <Component
      className={`card ${hover ? 'hover:shadow-large cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default Card;
