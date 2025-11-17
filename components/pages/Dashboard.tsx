
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { User } from '../../types';
import Card from '../Card';
import { NEW_MEMBERS_DATA, MESSAGE_ACTIVITY_DATA } from '../../constants';

interface DashboardProps {
    users: User[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
        <div className="bg-blue-600 bg-opacity-20 text-blue-400 p-3 rounded-full">
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ users }) => {
  const totalUsers = users.length;
  // This is mock data
  const messagesToday = 1245; 
  const onlineNow = Math.floor(totalUsers * 0.4);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Members" value={totalUsers} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
        <StatCard title="Messages Today" value={messagesToday.toLocaleString()} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>} />
        <StatCard title="Online Now" value={onlineNow} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a4 4 0 110-5.656m0 5.656a4 4 0 010-5.656" /></svg>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="New Members This Week">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={NEW_MEMBERS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                    <XAxis dataKey="name" stroke="#a0a0a0" />
                    <YAxis stroke="#a0a0a0" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #2d2d2d' }} />
                    <Legend />
                    <Line type="monotone" dataKey="members" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Card>

        <Card title="Message Activity">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MESSAGE_ACTIVITY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                    <XAxis dataKey="day" stroke="#a0a0a0" />
                    <YAxis stroke="#a0a0a0" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #2d2d2d' }} />
                    <Legend />
                    <Bar dataKey="messages" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
