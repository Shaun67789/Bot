import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/pages/Dashboard';
import WelcomeMessage from './components/pages/WelcomeMessage';
import GroupRules from './components/pages/GroupRules';
import BannedWords from './components/pages/BannedWords';
import UserManagement from './components/pages/UserManagement';
import BotSettings from './components/pages/BotSettings';
import { GroupConfig } from './types';
import { DEFAULT_CONFIG } from './constants';

const API_URL = 'http://localhost:3001/api/config';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [config, setConfig] = useState<GroupConfig | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch configuration from the server.');
        }
        const data = await response.json();
        setConfig(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Could not connect to the backend server. Please ensure it is running. Displaying default local data.');
        setConfig(DEFAULT_CONFIG);
      }
    };
    fetchConfig();
  }, []);

  const handleSetConfig = async (newConfig: GroupConfig) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
      });
      if (!response.ok) {
        throw new Error('Failed to save configuration to the server.');
      }
      // Update local state only after successful save
      setConfig(newConfig);
      setError(null);
      return true;
    } catch (err) {
      console.error(err);
      setError('Could not save configuration to the backend server.');
      return false;
    }
  };

  const renderPage = () => {
    if (!config) {
      return <div className="text-center p-10">Loading configuration...</div>
    }
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard users={config.users} />;
      case 'Welcome Message':
        return <WelcomeMessage config={config} setConfig={handleSetConfig} />;
      case 'Group Rules':
        return <GroupRules config={config} setConfig={handleSetConfig} />;
      case 'Banned Words':
        return <BannedWords config={config} setConfig={handleSetConfig} />;
      case 'User Management':
        return <UserManagement config={config} setConfig={handleSetConfig} />;
      case 'Bot Settings':
        return <BotSettings config={config} setConfig={handleSetConfig} />;
      default:
        return <Dashboard users={config.users} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} activePage={activePage} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-4 sm:p-6 lg:p-8">
          {error && (
            <div className="bg-red-900 border-l-4 border-red-500 text-red-200 p-4 rounded-r-lg mb-6" role="alert">
              <p className="font-bold">Connection Error</p>
              <p>{error}</p>
            </div>
          )}
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;
