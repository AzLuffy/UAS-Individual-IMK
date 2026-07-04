import React, { useState } from 'react';
import { LogIn, KeyRound, User, Mail, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import UINLogo from './UINLogo';

interface AuthViewProps {
  onLoginSuccess: (name: string, role: string) => void;
}

export default function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [isRegister, setIsRegister] = useState(false);
  
  // Login states
  const [loginId, setLoginId] = useState('1120091000123');
  const [loginPassword, setLoginPassword] = useState('password123');
  
  // Register states
  const [regName, setRegName] = useState('');
  const [regId, setRegId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regRole, setRegRole] = useState('Student');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId.trim()) {
      alert('Silakan masukkan ID Mahasiswa/Dosen/Admin Anda.');
      return;
    }
    // Success simulation
    onLoginSuccess(loginId === '1120091000123' ? 'Ahmad Rizan' : 'Civitas Academica FST', regRole);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regId.trim() || !regEmail.trim() || !regPassword.trim()) {
      alert('Silakan lengkapi semua kolom pendaftaran.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok.');
      return;
    }
    if (!agreed) {
      alert('Anda harus menyetujui Syarat & Ketentuan yang berlaku.');
      return;
    }
    alert('Pendaftaran Berhasil! Silakan masuk ke akun baru Anda.');
    setIsRegister(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* LEFT HALF: Form Area */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-white shadow-xl z-10">
        
        {/* Top brand header */}
        <div className="flex flex-col items-center mt-4">
          {/* Official UIN Syarif Hidayatullah Jakarta Logo */}
          <UINLogo size="md" className="mb-3" />
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-[#112d62] text-center tracking-tight">
            FST Digital Library
          </h1>
          <p className="text-slate-500 font-medium text-xs sm:text-sm mt-1">
            Faculty of Science and Technology
          </p>
        </div>

        {/* Content body */}
        <div className="my-8 max-w-sm w-full mx-auto">
          {!isRegister ? (
            /* LOGIN CARD */
            <div className="bg-white border-t-4 border-[#112d62] rounded-xl p-6 sm:p-8 shadow-lg">
              <h2 className="font-display font-bold text-slate-800 text-lg sm:text-xl">
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Please sign in to your academic account.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                    ID MAHASISWA / ID DOSEN / ID ADMIN PUSTAKAWAN
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Enter Your ID"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden transition-all placeholder-slate-300 font-medium text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                      PASSWORD
                    </label>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert("Silakan hubungi administrator IT Perpustakaan di Gedung FST Lantai 1 untuk mereset kata sandi Anda."); }} className="text-[10px] font-bold text-primary hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-10 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-hidden transition-all placeholder-slate-300 font-medium text-slate-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f2be22] hover:bg-[#ddaa1a] text-[#112d62] font-bold text-xs py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
                >
                  <span>LOGIN</span>
                  <ArrowRight size={14} className="stroke-[2.5px]" />
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-xs text-slate-500">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="text-primary font-bold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* REGISTER CARD */
            <div className="bg-white border-t-4 border-[#112d62] rounded-xl p-6 shadow-lg">
              <h2 className="font-display font-bold text-slate-800 text-lg sm:text-xl">
                Create Your Account
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Register to access the FST Digital Library.
              </p>

              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all placeholder-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                    MASUKAN ID MAHASISWA / ID DOSEN
                  </label>
                  <div className="relative">
                    <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your ID"
                      value={regId}
                      onChange={(e) => setRegId(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all placeholder-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all placeholder-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                    ROLE
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all bg-white text-slate-700"
                  >
                    <option value="Student">Student</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Staff">Library Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Create a password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all placeholder-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-500 tracking-wider uppercase mb-1">
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <KeyRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Confirm your password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-hidden transition-all placeholder-slate-300"
                    />
                  </div>
                </div>

                {/* Agree T&C checkbox */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="terms-checkbox"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 rounded-sm text-primary focus:ring-primary border-slate-300"
                  />
                  <label htmlFor="terms-checkbox" className="text-[10px] text-slate-500 leading-tight">
                    I agree to the <span className="text-primary font-semibold hover:underline cursor-pointer">Terms & Conditions</span> and <span className="text-primary font-semibold hover:underline cursor-pointer">Privacy Policy</span>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f2be22] hover:bg-[#ddaa1a] text-[#112d62] font-bold text-xs py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>REGISTER</span>
                  <ArrowRight size={13} className="stroke-[2.5px]" />
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-xs text-slate-500">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="text-primary font-bold hover:underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-slate-400 font-medium">
          <p>© 2026 Faculty of Science and Technology</p>
          <p className="mt-0.5">UIN Syarif Hidayatullah Jakarta</p>
        </div>
      </div>

      {/* RIGHT HALF: Aesthetic Banner Graphic */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#765B00] items-center justify-center p-12 lg:p-16 text-white select-none">
        {/* Abstract Architectural Library Silhouette Overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none z-1">
          {/* Subtle line grids imitating library structures */}
          <div className="w-full h-full border-t border-b border-dashed border-white/10 grid grid-cols-4 gap-4 p-8">
            <div className="border-r border-white/10"></div>
            <div className="border-r border-white/10"></div>
            <div className="border-r border-white/10"></div>
            <div></div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-lg flex flex-col justify-between h-full py-10">
          <div>
            <div className="w-12 h-1 bg-[#f2be22] rounded mb-8"></div>
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl leading-tight tracking-tight text-white mb-6">
              Empowering Research & Discovery
            </h2>
            <p className="text-slate-300 font-light text-sm lg:text-base leading-relaxed">
              Access thousands of digital resources, journals, and publications curated specifically for the Faculty of Science and Technology community.
            </p>
          </div>

          {/* Core Stat Panels at Bottom */}
          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-inner">
              <span className="block text-2xl lg:text-3xl font-bold font-display text-[#f2be22]">
                10,000+
              </span>
              <span className="block text-xs text-slate-300 font-medium mt-1 uppercase tracking-wider">
                Digital Assets
              </span>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-inner">
              <span className="block text-2xl lg:text-3xl font-bold font-display text-[#f2be22]">
                Active
              </span>
              <span className="block text-xs text-slate-300 font-medium mt-1 uppercase tracking-wider">
                Community
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
