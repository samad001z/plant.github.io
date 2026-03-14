import React from 'react';

const Badge = ({ children, variant = 'info', className = '', icon = null }) => {
  const variantClass = `badge-${variant}`;

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {icon && <span className="mr-1">{icon}</span>}
      }
      {children}
    </span>
  );
};

export default Badge;
