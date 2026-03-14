import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hop as Home, LayoutDashboard, Camera, History, MessageSquare } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Camera, label: 'Scan', path: '/scan' },
    { icon: History, label: 'History', path: '/history' },
    { icon: MessageSquare, label: 'AI Chat', path: '/assistant' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link key={item.path} to={item.path} className="flex-1">
              <motion.div
                className="flex flex-col items-center justify-center h-full"
                whileTap={{ scale: 0.95 }}
              >
                <Icon
                  className={`h-6 w-6 ${active ? 'text-primary' : 'text-gray-400'}`}
                />
                <span
                  className={`text-xs mt-1 ${
                    active ? 'text-primary font-medium' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
