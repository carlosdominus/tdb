
import React from 'react';
import { View } from '../types';
import { Home, HelpCircle, Crown, Gift, Beaker, Shield, User, X, LogOut, Zap } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  currentView: View;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, onLogout, currentView }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'HOME', icon: <Home size={20} /> },
    { id: View.CATALOG, label: 'TÔNICOS', icon: <Beaker size={20} /> },
    { id: View.PREMIUM, label: 'PREMIUM', icon: <Crown size={20} /> },
    { id: View.TRACKER, label: 'TURBO', icon: <Zap size={20} /> },
    { id: View.BONUSES, label: 'BÔNUS', icon: <Gift size={20} /> },
    { id: View.WARRANTY, label: 'GARANTIA', icon: <Shield size={20} /> },
    { id: View.HELP, label: 'SUPORTE', icon: <HelpCircle size={20} /> },
    { id: View.PROFILE, label: 'PERFIL', icon: <User size={20} /> },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-white z-[70] shadow-2xl transition-transform duration-500 ease-apple ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
                <Logo size={24} />
              </div>
              <span className="font-poppins font-black text-lg text-black uppercase tracking-tighter">PROTOCOL <span className="text-[#E63946]">ELITE</span></span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all ${currentView === item.id ? 'bg-[#E63946] text-white shadow-lg' : 'text-[#86868B] hover:bg-gray-50 hover:text-black'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-100">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] text-[#E63946] hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              Sair da Conta
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
