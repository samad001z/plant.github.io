import React from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const AppLayout = ({ children, user, onLogout, showNav = true }) => {
  return (
    <div className="min-h-screen bg-background">
      {showNav && <Sidebar user={user} onLogout={onLogout} />}

      <div className={showNav ? 'md:pl-64' : ''}>
        <main className={`min-h-screen ${showNav ? 'pb-20 md:pb-0' : ''}`}>
          {children}
        </main>
      </div>

      {showNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
