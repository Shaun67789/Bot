
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleAction?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', titleAction }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-4 sm:p-6 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {titleAction}
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default Card;
