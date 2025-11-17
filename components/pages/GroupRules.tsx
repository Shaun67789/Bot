import React, { useState } from 'react';
import { GroupConfig } from '../../types';
import Card from '../Card';

interface GroupRulesProps {
  config: GroupConfig;
  setConfig: (newConfig: GroupConfig) => Promise<boolean>;
}

const GroupRules: React.FC<GroupRulesProps> = ({ config, setConfig }) => {
  const [rules, setRules] = useState(config.rules);
  const [newRule, setNewRule] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const updateConfig = (updatedRules: string[]) => {
      setConfig({ ...config, rules: updatedRules });
  }

  const handleAddRule = () => {
    if (newRule.trim()) {
      const updatedRules = [...rules, newRule.trim()];
      setRules(updatedRules);
      updateConfig(updatedRules);
      setNewRule('');
    }
  };

  const handleDeleteRule = (index: number) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
    updateConfig(updatedRules);
  };
  
  const handleEditRule = (index: number) => {
    setEditingIndex(index);
    setEditingText(rules[index]);
  }
  
  const handleUpdateRule = () => {
    if (editingIndex !== null) {
      const updatedRules = [...rules];
      updatedRules[editingIndex] = editingText;
      setRules(updatedRules);
      updateConfig(updatedRules);
      setEditingIndex(null);
      setEditingText('');
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card title="Group Rules">
        <div className="space-y-4">
          <ul className="space-y-3">
            {rules.map((rule, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                {editingIndex === index ? (
                   <input 
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateRule()}
                    className="flex-grow bg-gray-600 p-1 rounded-md text-white"
                   />
                ) : (
                  <span className="text-gray-200">{index + 1}. {rule}</span>
                )}
                <div className="flex items-center space-x-2 ml-4">
                  {editingIndex === index ? (
                    <>
                      <button onClick={handleUpdateRule} className="text-green-400 hover:text-green-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </button>
                      <button onClick={() => setEditingIndex(null)} className="text-gray-400 hover:text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </>
                  ) : (
                      <button onClick={() => handleEditRule(index)} className="text-blue-400 hover:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                      </button>
                  )}
                  <button onClick={() => handleDeleteRule(index)} className="text-red-500 hover:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex space-x-2 pt-4">
            <input
              type="text"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddRule()}
              className="flex-grow bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Add a new rule"
            />
            <button
              onClick={handleAddRule}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GroupRules;
