// src/authProvider.tsx or a similar file

import React, { createContext, ReactNode, useState, useContext, useEffect } from 'react';

// export interface UserData {
//   email: string;
//   // password: string;
// }
interface User {
  uid: string;
  email: string;
  // add other user properties if necessary
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user) => void;
  logout: () => void;
  cvContent: any | null;
  setCvContent: (cv: any) => void;
  template: null;
  setTemplate: (temp: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cvContent, setCvContent] = useState<any | null>(null);
  const [template, setTemplate] = useState<any | null>(null);
  // Function to initialize the user state from localStorage
  const initializeUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    initializeUser(); // Initialize user state on component mount
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        cvContent,
        setCvContent,
        template, 
        setTemplate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
