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

  // Check for existing user session on mount
  useEffect(() => {
    // Simulate checking for existing session
    setTimeout(() => {
      // Check if we have a "logged in" user in memory
      // In a real app, you'd check a token or session
      setLoading(false);
    }, 500);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Mock login - in real app, this would call your backend
      const mockUser = {
        id: 1,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        avatar: '👨‍💻',
        role: 'student',
        bio: '',
        location: '',
        website: '',
        university: '',
        major: ''
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Mock signup - in real app, this would call your backend
      const mockUser = {
        id: Date.now(), // Simple unique ID
        name: name,
        email: email,
        avatar: '👨‍💻',
        role: 'student',
        bio: '',
        location: '',
        website: '',
        university: '',
        major: ''
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user with new profile data
      const updatedUser = {
        ...user,
        ...profileData
      };
      
      setUser(updatedUser);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message || 'Update failed' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    signup,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContext;