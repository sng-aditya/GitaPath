import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
    return (
        <div
            className={`
        bg-white dark:bg-charcoal-900 
        rounded-xl border border-charcoal-100 dark:border-charcoal-800
        shadow-card dark:shadow-none
        ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
