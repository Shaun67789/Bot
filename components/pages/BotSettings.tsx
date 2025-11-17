import React, { useState } from 'react';
import { GroupConfig } from '../../types';
import Card from '../Card';

interface BotSettingsProps {
  config: GroupConfig;
  setConfig: (newConfig: GroupConfig) => Promise<boolean>;
}

const BotSettings: React.FC<BotSettingsProps> = ({ config, setConfig }) => {
  const [token, setToken] = useState(config.botToken);

  const handleSave = async () => {
    const success = await setConfig({
      ...config,
      botToken: token
    });

    if (success) {
        alert('Bot settings saved! The bot will restart with the new token if it was changed.');
    } else {
        alert('Failed to save bot settings. See console for details.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card title="Bot Configuration">
        <div className="space-y-6">
          <div>
            <label htmlFor="bot-token" className="block text-sm font-medium text-gray-400 mb-2">Telegram Bot Token</label>
            <input
              id="bot-token"
              type="password"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your Telegram Bot Token"
            />
             <p className="text-xs text-gray-500 mt-2">
                <strong>Note:</strong> Your bot token is sent to and stored on the backend server. It is never exposed in the frontend UI after the initial save.
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save Token
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BotSettings;
