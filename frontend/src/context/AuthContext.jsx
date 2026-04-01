import React, { createContext, useState, useEffect } from 'react';

/* eslint-disable react-refresh/only-export-components */
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rentify_user');
    localStorage.removeItem('rentify_token');
  };

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem('rentify_user', JSON.stringify(userData));
    localStorage.setItem('rentify_token', accessToken);
  };

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem('rentify_token');
    const storedUser = localStorage.getItem('rentify_user');

    if (storedToken && storedUser) {
        try {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        } catch (e) {
            console.error("Failed to parse stored user", e);
            logout();
        }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      role: user?.role,
      isLoggedIn: !!user,
      login,
      logout,
      loading
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
