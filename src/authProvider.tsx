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
  login: (user: User) => void;
  logout: () => void;
  cvContent: any | null;
  setCvContent: (cv: any) => void;
  template: any | null;
  setTemplate: (temp: any) => void;
  companyData: any;
  setCompanyData: (data: any) => void;
  userInfo: any | null;
  setUserInfo: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cvContent, setCvContent] = useState<any | null>(null);
  const [template, setTemplate] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);
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

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const [companyData, setCompanyData] = useState({});

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
        companyData, 
        setCompanyData,
        userInfo, 
        setUserInfo
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
