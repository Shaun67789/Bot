import React, { useState } from 'react';
import { GroupConfig } from '../../types';
import Card from '../Card';

interface BannedWordsProps {
  config: GroupConfig;
  setConfig: (newConfig: GroupConfig) => Promise<boolean>;
}

const BannedWords: React.FC<BannedWordsProps> = ({ config, setConfig }) => {
  const [words, setWords] = useState(config.bannedWords);
  const [newWord, setNewWord] = useState('');

  const updateConfig = (updatedWords: string[]) => {
    setConfig({ ...config, bannedWords: updatedWords });
  };

  const handleAddWord = () => {
    if (newWord.trim() && !words.includes(newWord.trim().toLowerCase())) {
      const updatedWords = [...words, newWord.trim().toLowerCase()];
      setWords(updatedWords);
      updateConfig(updatedWords);
      setNewWord('');
    }
  };

  const handleDeleteWord = (wordToDelete: string) => {
    const updatedWords = words.filter(word => word !== wordToDelete);
    setWords(updatedWords);
    updateConfig(updatedWords);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card title="Banned Words Filter">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddWord()}
              className="flex-grow bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Add a new word to ban"
            />
            <button
              onClick={handleAddWord}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            {words.length > 0 ? words.map((word) => (
              <span
                key={word}
                className="flex items-center bg-gray-600 text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                {word}
                <button
                  onClick={() => handleDeleteWord(word)}
                  className="ml-2 text-red-400 hover:text-red-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )) : (
                <p className="text-gray-500 w-full text-center py-4">No banned words yet.</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BannedWords;
