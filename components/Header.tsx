
import React from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
  activePage: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, activePage }) => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700 flex-shrink-0">
      <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <h2 className="text-xl font-semibold text-white">{activePage}</h2>
      <div>
        {/* Placeholder for user avatar or actions */}
        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
