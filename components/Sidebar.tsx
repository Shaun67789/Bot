
import React from 'react';
import { DashboardIcon, WelcomeIcon, RulesIcon, BannedWordsIcon, UsersIcon, SettingsIcon } from '../constants';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isSidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon /> },
    { label: 'Welcome Message', icon: <WelcomeIcon /> },
    { label: 'Group Rules', icon: <RulesIcon /> },
    { label: 'Banned Words', icon: <BannedWordsIcon /> },
    { label: 'User Management', icon: <UsersIcon /> },
    { label: 'Bot Settings', icon: <SettingsIcon /> },
  ];
  
  const handleItemClick = (label: string) => {
    setActivePage(label);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }

  return (
    <>
      <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`absolute md:relative z-30 flex-shrink-0 w-64 h-full bg-gray-800 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          <h1 className="ml-3 text-2xl font-bold text-white">TG Manager</h1>
        </div>
        <nav className="flex-1 px-4 py-4">
          <ul>
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                isActive={activePage === item.label}
                onClick={() => handleItemClick(item.label)}
              />
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; 2024 TG Manager</p>
          <p>UI Demo</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;