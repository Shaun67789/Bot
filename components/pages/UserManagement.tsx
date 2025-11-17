import React, { useState, useMemo } from 'react';
import { GroupConfig } from '../../types';
import Card from '../Card';

interface UserManagementProps {
  config: GroupConfig;
  setConfig: (newConfig: GroupConfig) => Promise<boolean>;
}

const UserManagement: React.FC<UserManagementProps> = ({ config }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        // User list is now read-only from the config. 
        // A real implementation would fetch this from the bot/API.
        return config.users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [config.users, searchTerm]);

    const handleAction = (action: string, username: string) => {
        alert(`${action} action simulated for user ${username}. In a real application, this would trigger a bot command to the backend.`);
    }

    return (
        <Card title="User Management">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-sm bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Join Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">{user.name}</div>
                                            <div className="text-sm text-gray-400">{user.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{user.joinDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleAction('Warn', user.username)} className="px-2 py-1 text-xs text-yellow-300 bg-yellow-800 hover:bg-yellow-700 rounded">Warn</button>
                                        <button onClick={() => handleAction('Kick', user.username)} className="px-2 py-1 text-xs text-orange-300 bg-orange-800 hover:bg-orange-700 rounded">Kick</button>
                                        <button onClick={() => handleAction('Ban', user.username)} className="px-2 py-1 text-xs text-red-300 bg-red-800 hover:bg-red-700 rounded">Ban</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default UserManagement;
