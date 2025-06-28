import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock user data for development
  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      const mockUser = {
        id: 1,
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: '👨‍💻',
        role: 'student'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);
    }, 1000);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock login API call
      const mockUser = {
        id: 1,
        name: 'Alex Johnson',
        email: email,
        avatar: '👨‍💻',
        role: 'student'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      // Mock signup API call
      const mockUser = {
        id: 1,
        name: name,
        email: email,
        avatar: '👨‍💻',
        role: 'student'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContext;