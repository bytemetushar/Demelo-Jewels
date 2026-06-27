import React, { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((email, password) => {
    // Simulate login
    setUser({
      name: email.split("@")[0],
      email,
      avatar: email.charAt(0).toUpperCase(),
    });
  }, []);

  const signup = useCallback((name, email, password) => {
    // Simulate signup
    setUser({
      name,
      email,
      avatar: name.charAt(0).toUpperCase(),
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
