import React, { useState } from 'react';
import { User, Mail, Phone, Settings, ShieldAlert, KeyRound, Save, LogOut, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
}

export default function ProfileView({
  user,
  onUpdateUser,
  onLogout
}: ProfileViewProps) {
  
  // Settings Form
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  
  // Security Form
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  // Toggles
  const [dueDateReminders, setDueDateReminders] = useState(user.notificationPreferences.dueDateReminders);
  const [holdAvailability, setHoldAvailability] = useState(user.notificationPreferences.holdAvailability);
  const [libraryAnnouncements, setLibraryAnnouncements] = useState(user.notificationPreferences.libraryAnnouncements);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      email,
      phone,
      notificationPreferences: {
        dueDateReminders,
        holdAvailability,
        libraryAnnouncements
      }
    });
    alert('Informasi akun Anda berhasil diperbarui!');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPw || !newPw || !confirmPw) {
      alert('Silakan lengkapi semua kolom password.');
      return;
    }
    if (newPw !== confirmPw) {
      alert('Password baru dan konfirmasi tidak cocok.');
      return;
    }
    alert('Kata sandi Anda berhasil diperbarui!');
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#112d62] tracking-tight">
          User Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Manage your account settings, security, and notification preferences.
        </p>
      </div>

      {/* Main split (exactly matches mock image 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar Card & quick stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs text-center flex flex-col justify-between h-full">
            <div className="space-y-4">
              {/* Profile Avatar */}
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title Identity */}
              <div>
                <h2 className="font-display font-extrabold text-[#112d62] text-lg sm:text-xl leading-tight">
                  {user.name}
                </h2>
                <span className="inline-block mt-1.5 px-3 py-1 bg-[#112d62]/10 text-[#112d62] font-mono text-xs font-bold rounded-full">
                  ID: {user.idNumber}
                </span>
                <p className="text-xs text-slate-500 font-medium mt-3 leading-relaxed">
                  {user.faculty}
                  <br />
                  <span className="font-bold text-slate-700">{user.program}</span>
                </p>
              </div>

              {/* Borrowed Counter Badges above buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="block text-xl font-black text-primary">{user.booksBorrowedCount}</span>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Books Borrowed</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="block text-xl font-black text-primary">{user.activeLoansCount}</span>
                  <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Active Loans</span>
                </div>
              </div>
            </div>

            {/* Edit / Action Buttons */}
            <div className="mt-8 space-y-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => alert("Ganti foto profil Anda dengan mengunggah gambar baru di Gedung FST Lantai 1.")}
                className="w-full py-2.5 bg-[#f2be22] hover:bg-[#ddaa1a] text-[#112d62] font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer uppercase text-center"
              >
                Edit Profile
              </button>
              
              <button 
                onClick={onLogout}
                className="w-full py-2 px-4 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl transition-all cursor-pointer uppercase text-center flex items-center justify-center gap-1.5"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Forms area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Account Settings form */}
          <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
            <h3 className="font-display font-extrabold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <Settings size={16} className="text-primary" />
              <span>Account Settings</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all bg-slate-50 text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all bg-slate-50 text-slate-700 font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </form>

          {/* Grid layout for preferences & password update */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Notification Preferences */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-display font-extrabold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center gap-2">
                <Settings size={15} className="text-primary" />
                <span>Notification Preferences</span>
              </h3>

              <div className="space-y-4 pt-1 font-medium text-xs text-slate-600">
                <label className="flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <span className="block text-slate-800 font-bold">Due Date Reminders</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Get notified 2 days before a book is due.</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={dueDateReminders}
                    onChange={(e) => setDueDateReminders(e.target.checked)}
                    className="rounded-sm text-primary focus:ring-primary border-slate-300 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <span className="block text-slate-800 font-bold">Hold Availability</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">Alert when a requested book becomes available.</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={holdAvailability}
                    onChange={(e) => setHoldAvailability(e.target.checked)}
                    className="rounded-sm text-primary focus:ring-primary border-slate-300 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <span className="block text-slate-800 font-bold">Library Announcements</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">News about events, new arrivals, and closures.</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={libraryAnnouncements}
                    onChange={(e) => setLibraryAnnouncements(e.target.checked)}
                    className="rounded-sm text-primary focus:ring-primary border-slate-300 w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Security password settings */}
            <form onSubmit={handleUpdatePassword} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="font-display font-extrabold text-slate-800 text-sm sm:text-base border-b border-slate-100 pb-2 flex items-center gap-2">
                <KeyRound size={15} className="text-primary" />
                <span>Security</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-hidden bg-slate-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-hidden bg-slate-50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary outline-hidden bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors cursor-pointer text-center"
              >
                Update Password
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}
