import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { User, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/firebase.config";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  initializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  companyData: any | null;
  setCompanyData: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [companyData, setCompanyData] = useState<any | null>(null);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setCompanyData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        initializing,
        login,
        logout,
        companyData,
        setCompanyData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
