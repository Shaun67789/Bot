
import React from 'react';
import { GroupConfig } from './types';

export const MOCK_USERS = [
  { id: 1, name: 'Alice', username: '@alice', joinDate: '2024-07-20', avatar: 'https://picsum.photos/seed/alice/40/40' },
  { id: 2, name: 'Bob', username: '@bob', joinDate: '2024-07-21', avatar: 'https://picsum.photos/seed/bob/40/40' },
  { id: 3, name: 'Charlie', username: '@charlie', joinDate: '2024-07-21', avatar: 'https://picsum.photos/seed/charlie/40/40' },
  { id: 4, name: 'Diana', username: '@diana', joinDate: '2024-07-22', avatar: 'https://picsum.photos/seed/diana/40/40' },
  { id: 5, name: 'Eve', username: '@eve', joinDate: '2024-07-23', avatar: 'https://picsum.photos/seed/eve/40/40' },
  { id: 6, name: 'Frank', username: '@frank', joinDate: '2024-07-24', avatar: 'https://picsum.photos/seed/frank/40/40' },
];

export const DEFAULT_CONFIG: GroupConfig = {
  botToken: '8485011526:AAFTXQhn5b3J67DJFpHSMEiY7MV_QJoEopM',
  welcomeMessage: {
    enabled: true,
    message: 'Welcome to the group, {username}! Please be sure to read the rules.'
  },
  rules: [
    'Be respectful to all members.',
    'No spamming or self-promotion.',
    'Keep discussions on-topic.',
    'Do not share personal information.'
  ],
  bannedWords: ['spam', 'crypto', 'scam'],
  users: MOCK_USERS,
};

export const NEW_MEMBERS_DATA = [
  { name: 'Jul 20', members: 1 },
  { name: 'Jul 21', members: 2 },
  { name: 'Jul 22', members: 1 },
  { name: 'Jul 23', members: 1 },
  { name: 'Jul 24', members: 1 },
  { name: 'Jul 25', members: 3 },
  { name: 'Jul 26', members: 2 },
];

export const MESSAGE_ACTIVITY_DATA = [
    { day: 'Mon', messages: 120 },
    { day: 'Tue', messages: 150 },
    { day: 'Wed', messages: 210 },
    { day: 'Thu', messages: 180 },
    { day: 'Fri', messages: 250 },
    { day: 'Sat', messages: 300 },
    { day: 'Sun', messages: 220 },
];

export const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
export const WelcomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
export const RulesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
export const BannedWordsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
);
export const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197" />
    </svg>
);
export const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);