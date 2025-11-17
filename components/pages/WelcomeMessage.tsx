import React, { useState } from 'react';
import { GroupConfig } from '../../types';
import Card from '../Card';

interface WelcomeMessageProps {
  config: GroupConfig;
  setConfig: (newConfig: GroupConfig) => Promise<boolean>;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ config, setConfig }) => {
  const [message, setMessage] = useState(config.welcomeMessage.message);
  const [isEnabled, setIsEnabled] = useState(config.welcomeMessage.enabled);

  const handleSave = async () => {
    const success = await setConfig({
      ...config,
      welcomeMessage: {
        enabled: isEnabled,
        message: message
      }
    });
    if (success) {
        alert('Welcome message saved!');
    } else {
        alert('Failed to save welcome message. See console for details.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card title="Welcome Message Configuration">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label htmlFor="enable-welcome" className="text-lg font-medium text-gray-200">Enable Welcome Message</label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="enable-welcome"
                checked={isEnabled}
                onChange={() => setIsEnabled(!isEnabled)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label htmlFor="enable-welcome" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer"></label>
            </div>
            <style>{`.toggle-checkbox:checked { right: 0; border-color: #3b82f6; } .toggle-checkbox:checked + .toggle-label { background-color: #3b82f6; }`}</style>
          </div>
          <div>
            <label htmlFor="welcome-message" className="block text-sm font-medium text-gray-400 mb-2">Message Template</label>
            <textarea
              id="welcome-message"
              rows={5}
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Welcome {username}!"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Use <code className="bg-gray-600 px-1 rounded">{'{username}'}</code> as a placeholder for the new member's name.</p>
          </div>
          <div className="text-right">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeMessage;
