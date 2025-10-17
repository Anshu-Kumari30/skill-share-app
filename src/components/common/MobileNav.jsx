import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Users, MessageCircle, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MobileNav = ({ isOpen, onClose, onLogout }) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{user?.avatar || '👤'}</span>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link
            to="/"
            onClick={onClose}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="h-4 w-4 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/courses"
            onClick={onClose}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/courses')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Sessions
          </Link>
          <Link
            to="/groups"
            onClick={onClose}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/groups')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="h-4 w-4 mr-2" />
            Study Groups
          </Link>
          <Link
            to="/profile"
            onClick={onClose}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              isActive('/profile')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Link>

          <hr className="my-4 border-gray-200" />

          <Link
            to="/settings"
            onClick={onClose}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>

          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
