import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('mkdata_token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('mkdata_user')) || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('mkdata_token', token);
    } else {
      localStorage.removeItem('mkdata_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('mkdata_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mkdata_user');
    }
  }, [user]);

  const login = (tokenValue, userValue) => {
    setToken(tokenValue);
    setUser(userValue);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
