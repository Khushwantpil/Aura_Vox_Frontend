import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ServerURL } from '../App';
import logo from '../assets/auravox-removebg-preview.png';
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import toast from 'react-hot-toast';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await axios.get(`${ServerURL}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      toast.success("Logout successful!");
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo and Name */}
        <div onClick={() => navigate('/')} className="flex items-center gap-2.5 cursor-pointer">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
          <h1 className="font-bold text-xl text-gray-700 leading-none">
            Aura <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-500">Vox</span>
          </h1>
        </div>

        {/* Action Buttons & Profile (Desktop) */}
        {user && (
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/50 p-1 rounded-2xl border border-orange-100 shadow-sm backdrop-blur-sm">
              <button
                onClick={() => navigate('/builder')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00C2CB] to-[#00D28E] text-white text-sm font-medium shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                Builder
              </button>
              <button
                onClick={() => navigate('/billing')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00C2CB] to-[#00D28E] text-white text-sm font-medium shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                Billing
              </button>
            </div>

            {/* Profile Avatar & Logout */}
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-white border border-orange-100 shadow-sm">
              <div
                title={user.email}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00C2CB] to-[#00D28E] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 cursor-pointer transition-all hover:opacity-95"
              >
                {(user.username || user.email || 'U').trim().charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-slate-600 text-sm font-medium max-w-[120px] truncate">
                {user.username ? user.username.split(" ")[0] : "User"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 cursor-pointer"
              >
                <span>Logout</span>
                <FiLogOut size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        {user && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 hover:text-cyan-600 transition-colors cursor-pointer"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && user && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white border-t border-orange-100 flex flex-col gap-4">
          {/* User Profile Header in Mobile Drawer */}
          <div className="flex items-center gap-3 py-3 border-b border-orange-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00C2CB] to-[#00D28E] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              {(user.username || user.email || 'U').trim().charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-slate-800 text-sm font-semibold truncate">
                {user.username ? user.username.split(" ")[0] : "User"}
              </span>
              <span className="text-slate-500 text-xs truncate">
                {user.email}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                navigate('/builder');
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00C2CB] to-[#00D28E] text-white text-sm font-medium shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              Builder
            </button>
            <button
              onClick={() => {
                navigate('/billing');
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00C2CB] to-[#00D28E] text-white text-sm font-medium shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              Billing
            </button>
          </div>

          {/* Logout Action */}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center justify-center gap-1.5 w-full mt-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>Logout</span>
            <FiLogOut size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;