import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Users, MessageCircle, Menu } from 'lucide-react';
import MobileNav from './MobileNav'; // Adjust path if needed

const Header = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const user = {
    name: 'Alex Johnson',
    avatar: '👨‍💻'
  };

  const isActive = (path) => location.pathname === path;

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
            <Link to="/profile" className={navClass(isActive('/profile'))}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </nav>

          {/* Right side icons and mobile toggle */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <MessageCircle className="h-5 w-5" />
            </button>
            <span className="text-2xl">{user.avatar}</span>

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
      <MobileNav isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </header>
  );
};

const navClass = (active) =>
  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
    active ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
  }`;

export default Header;
