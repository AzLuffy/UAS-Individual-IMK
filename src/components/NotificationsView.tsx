import React, { useState } from 'react';
import { Bell, Check, Clock, Info, CheckCircle2, Sliders } from 'lucide-react';
import { LibraryNotification } from '../types';

interface NotificationsViewProps {
  notifications: LibraryNotification[];
  onMarkAllRead: () => void;
  onClearOne: (id: string) => void;
}

export default function NotificationsView({
  notifications,
  onMarkAllRead,
  onClearOne
}: NotificationsViewProps) {
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'reminders' | 'systems'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'reminders') return n.type === 'Reminder';
    if (activeFilter === 'systems') return n.type === 'System';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'Reminder':
        return <Clock className="text-amber-600" size={18} />;
      case 'Success':
        return <CheckCircle2 className="text-emerald-600" size={18} />;
      default:
        return <Info className="text-blue-600" size={18} />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'Reminder': return 'bg-amber-50 border border-amber-100';
      case 'Success': return 'bg-emerald-50 border border-emerald-100';
      default: return 'bg-blue-50 border border-blue-100';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#112d62] tracking-tight">
            Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Stay updated on your borrowing status, system alerts, and academic deadlines.
          </p>
        </div>

        {/* Mark All as Read button */}
        <button
          onClick={onMarkAllRead}
          className="px-4 py-2 bg-white border border-[#112d62] text-[#112d62] hover:bg-[#112d62] hover:text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
        >
          <Check size={14} className="stroke-[2.5px]" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Filter Chips (exactly matches mock image 10) */}
      <div className="flex gap-2.5">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#112d62] text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-transparent'
          }`}
        >
          All Updates
        </button>
        <button
          onClick={() => setActiveFilter('reminders')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'reminders'
              ? 'bg-[#112d62] text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          Reminders
        </button>
        <button
          onClick={() => setActiveFilter('systems')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'systems'
              ? 'bg-[#112d62] text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          System Announcements
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div 
              key={notif.id}
              className={`bg-white border rounded-2xl p-4 sm:p-5 flex items-start gap-4 transition-all relative ${
                notif.unread ? 'border-l-4 border-l-[#112d62] border-slate-200/80 shadow-xs' : 'border-slate-200/60 opacity-80'
              }`}
            >
              {/* Unread circle badge */}
              {notif.unread && (
                <span className="absolute top-4 left-4 w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
              )}

              {/* Icon container */}
              <div className={`p-3 rounded-full flex-shrink-0 ${getIconBg(notif.type)} ml-2`}>
                {getIcon(notif.type)}
              </div>

              {/* Main Text Content */}
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display font-bold text-slate-800 text-xs sm:text-sm">
                    {notif.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">
                    {notif.date}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium mt-1">
                  {notif.message}
                </p>

                {/* Confirm reminder button if type is Reminder */}
                {notif.type === 'Reminder' && (
                  <button 
                    onClick={() => alert("Reminder Confirmed!")}
                    className="mt-3 py-1.5 px-4 bg-[#f2be22] hover:bg-[#ddaa1a] text-[#112d62] text-[10px] font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Affirmation
                  </button>
                )}
              </div>

              {/* Individual clear button */}
              <button 
                onClick={() => onClearOne(notif.id)}
                className="text-slate-300 hover:text-rose-500 text-xs font-bold p-1 rounded-sm hover:bg-slate-50"
                title="Dismiss notification"
              >
                Clear
              </button>
            </div>
          ))
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-16 text-center shadow-xs">
            <Bell size={48} className="mx-auto text-slate-200 stroke-[1.5]" />
            <h3 className="font-display font-extrabold text-slate-800 text-lg mt-4">
              All Caught Up!
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
              You do not have any notifications right now.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
