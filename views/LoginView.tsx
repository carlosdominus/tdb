
import React, { useState } from 'react';
import { Logo } from '../components/Logo.tsx';
import { User, Mail } from 'lucide-react';

interface LoginViewProps {
  onLogin: (name: string, email: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onLogin(name, email);
    }
  };

  const loginImageUrl = "https://i.ibb.co/QFGpb2M4/foto-capa-tdb-1.webp";

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center relative overflow-hidden">
      {/* Background Image - Covers top portion with smooth fade */}
      <div className="absolute top-0 left-0 right-0 h-[45vh] z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginImageUrl})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#F5F5F7]"></div>
      </div>

      {/* Login Card - Positioned in the lower portion of the screen */}
      <div className="relative z-10 w-full max-w-[380px] px-6 mt-auto mb-28 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-8 flex flex-col items-center border border-white/60">
          
          {/* Logo Section - Very compact */}
          <div className="mb-6 text-center">
            <div className="w-14 h-14 mx-auto text-[#1B4D3E] mb-3">
              <Logo size={56} />
            </div>
            <h1 className="text-lg font-bold text-[#1B4D3E] font-poppins tracking-tight uppercase">Protocolo Força Natural</h1>
          </div>

          {/* Form Section - Compact and efficient */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest ml-4">NOME COMPLETO</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <User size={18} strokeWidth={2} />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full pl-12 pr-6 py-3.5 rounded-2xl bg-[#F5F5F7] border-none focus:ring-2 focus:ring-[#1B4D3E] transition-all outline-none text-[#1D1D1F] placeholder-gray-400 text-base font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest ml-4">EMAIL</label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} strokeWidth={2} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-6 py-3.5 rounded-2xl bg-[#F5F5F7] border-none focus:ring-2 focus:ring-[#1B4D3E] transition-all outline-none text-[#1D1D1F] placeholder-gray-400 text-base font-medium"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#1B4D3E] text-white py-4 rounded-[20px] font-bold text-base shadow-[0_8px_20px_rgba(27,77,62,0.2)] hover:shadow-[0_12px_28_rgba(27,77,62,0.25)] active:scale-[0.98] transition-all mt-4 uppercase tracking-widest"
            >
              ENTRAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
