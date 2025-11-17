
export interface User {
  id: number;
  name: string;
  username: string;
  joinDate: string;
  avatar: string;
}

export interface GroupConfig {
  botToken: string;
  welcomeMessage: {
    enabled: boolean;
    message: string;
  };
  rules: string[];
  bannedWords: string[];
  users: User[];
}