import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, User, Users, MessageCircle, Menu, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MobileNav from './MobileNav';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">SkillSwap</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={navClass(isActive('/'))}>
              <User className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link to="/courses" className={navClass(isActive('/courses'))}>
              <BookOpen className="h-4 w-4 mr-2" />
              Sessions
            </Link>
            <Link to="/groups" className={navClass(isActive('/groups'))}>
              <Users className="h-4 w-4 mr-2" />
              Study Groups
            </Link>
          </nav>

          {/* Right side icons and mobile toggle */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <MessageCircle className="h-5 w-5" />
            </button>

            {/* User Menu - Desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-2xl">{user?.avatar || '👤'}</span>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile User Avatar */}
            <span className="md:hidden text-2xl">{user?.avatar || '👤'}</span>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
};

const navClass = (active) =>
  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
    active ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
  }`;

export default Header;