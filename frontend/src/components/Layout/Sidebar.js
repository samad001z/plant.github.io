import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hop as Home, LayoutDashboard, Camera, History, MessageSquare, Settings, LogOut, Leaf } from 'lucide-react';

const Sidebar = ({ onLogout, user }) => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Camera, label: 'Scan Plant', path: '/scan' },
    { icon: History, label: 'History', path: '/history' },
    { icon: MessageSquare, label: 'AI Assistant', path: '/assistant' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center h-16 flex-shrink-0 px-6 border-b border-gray-200">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="ml-2 text-xl font-bold text-gray-900">PlantCare AI</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <div className="flex items-center mb-3 px-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                {user?.name?.[0]?.toUpperCase() || 'F'}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'Farmer'}</p>
              <p className="text-xs text-gray-500">{user?.phone || ''}</p>
            </div>
          </div>
          <motion.button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
