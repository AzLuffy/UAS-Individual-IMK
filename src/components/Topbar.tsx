import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface TopbarProps {
  user: UserProfile;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  setSidebarOpen: (open: boolean) => void;
  unreadCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Topbar({
  user,
  activeTab,
  setActiveTab,
  setSidebarOpen,
  unreadCount,
  searchQuery,
  setSearchQuery
}: TopbarProps) {

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Switch to catalog if not already there, so search works immediately!
      if (activeTab.id !== 'catalog') {
        setActiveTab({ id: 'catalog' });
      }
    }
  };

  const handleSearchFocus = () => {
    // Optionally switch tab, but let's just let them type.
  };

  return (
    <header className="sticky top-0 bg-[#112d62] text-white h-16 px-4 lg:px-8 flex items-center justify-between z-30 shadow-md">
      {/* Left section: Hamburger (mobile) & Brand Title (desktop) */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu size={22} />
        </button>
        
        <div className="hidden sm:block">
          <h2 className="font-display font-semibold text-lg lg:text-xl tracking-tight text-white flex items-center gap-2">
            FST Digital Library
          </h2>
        </div>
      </div>

      {/* Middle section: Search bar */}
      <div className="flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative group">
          <Search 
            size={18} 
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#112d62] transition-colors" 
          />
          <input
            type="text"
            placeholder="Search catalog... (Press Enter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onFocus={handleSearchFocus}
            className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-[#0f2963] placeholder-slate-300 focus:placeholder-slate-400 pl-10 pr-4 py-2 rounded-full text-sm outline-hidden border border-transparent focus:border-slate-300 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right section: Only Notification Bell and Avatar */}
      <div className="flex items-center gap-4">
        {/* Notification Icon with red dot */}
        <button
          onClick={() => setActiveTab({ id: 'notifications' })}
          className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Notification center"
        >
          <Bell size={20} className="text-slate-100" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-[#112d62]" />
          )}
        </button>

        {/* User Avatar */}
        <button
          onClick={() => setActiveTab({ id: 'profile' })}
          className="flex-shrink-0 focus:outline-hidden"
          aria-label="User profile"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full border border-white/20 object-cover hover:border-white/50 transition-colors"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </header>
  );
}
