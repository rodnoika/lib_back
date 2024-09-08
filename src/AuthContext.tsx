import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string | null;
  saveToken: (token: string) => void;
  removeToken: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(Cookies.get('token') || null);

  const saveToken = (newToken: string) => {
    Cookies.set('token', newToken, { expires: 7 });
    setToken(newToken);
  };

  const removeToken = () => {
    Cookies.remove('token');
    setToken(null);
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};
