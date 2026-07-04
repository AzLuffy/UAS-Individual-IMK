import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  History, 
  Heart, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X,
  BookMarked
} from 'lucide-react';
import { ActiveTab } from '../types';
import UINLogo from './UINLogo';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  unreadCount: number;
  onLogout: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen, 
  unreadCount,
  onLogout 
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: undefined },
    { id: 'catalog', label: 'Book Catalog', icon: BookOpen, badge: undefined },
    { id: 'history', label: 'Borrowing History', icon: History, badge: undefined },
    { id: 'favorites', label: 'Favorites', icon: Heart, badge: undefined },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'profile', label: 'Profile', icon: User, badge: undefined },
  ] as const;

  const handleNav = (tabId: typeof menuItems[number]['id']) => {
    setActiveTab({ id: tabId });
    setIsOpen(false); // Close mobile drawer
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-[#f8fafc] border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform 
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:static lg:h-screen`}
      >
        {/* Header / Logo */}
        <div className="p-6 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            {/* Official UIN Syarif Hidayatullah Jakarta Logo */}
            <UINLogo size="sm" />
            <div>
              <h1 className="font-display font-bold text-base text-[#112d62] tracking-tight leading-tight">
                FST Library
              </h1>
              <p className="text-xs text-slate-500 font-medium">UIN Jakarta</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button 
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeTab.id === item.id || 
              (item.id === 'catalog' && (activeTab.id === 'detail' || activeTab.id === 'confirm'));
            
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-[#112d62] text-white shadow-md shadow-[#112d62]/10' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon 
                    size={19} 
                    className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} 
                  />
                  <span>{item.label}</span>
                </div>
                
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full 
                    ${isActive ? 'bg-amber-400 text-slate-900' : 'bg-rose-500 text-white'}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
