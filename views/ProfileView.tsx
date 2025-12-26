
import React from 'react';
import { AppState, View } from '../types';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { User, Settings, Bell, Shield, LogOut, HelpCircle, ChevronRight, Mail, MessageSquare } from 'lucide-react';

interface ProfileViewProps {
  state: AppState;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (view: View) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ state, onBack, onLogout, onNavigate }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 mt-4">
      <div className="flex flex-col items-center py-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 p-1 mb-4 shadow-xl">
           <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gray-300">
              <User size={48} />
           </div>
        </div>
        <h2 className="text-2xl font-bold text-[#1B4D3E]">{state.user?.name}</h2>
        <p className="text-[#86868B] text-sm">{state.user?.email}</p>
        <div className="mt-4 flex gap-2">
           <span className="px-3 py-1 bg-[#1B4D3E]/10 text-[#1B4D3E] rounded-full text-xs font-bold">MEMBRO PREMIUM</span>
           <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold flex items-center gap-1">
             🔥 {state.user?.streak} DIAS
           </span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest ml-1">Configurações</h3>
        <GlassCard className="p-0 overflow-hidden divide-y divide-gray-100 bg-white border-none shadow-sm">
          <MenuLink icon={<Bell size={18} />} label="Notificações e Lembretes" onClick={() => onNavigate(View.TRACKER)} />
          <MenuLink icon={<Settings size={18} />} label="Horários das Doses" onClick={() => onNavigate(View.TRACKER)} />
          <MenuLink icon={<Shield size={18} />} label="Privacidade e Segurança" onClick={() => onNavigate(View.SCIENCE)} />
        </GlassCard>

        <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest ml-1 mt-6">Suporte e Ajuda</h3>
        <GlassCard className="p-0 overflow-hidden divide-y divide-gray-100 bg-white border-none shadow-sm">
          <MenuLink icon={<HelpCircle size={18} />} label="Central de Ajuda (FAQ)" onClick={() => onNavigate(View.HELP)} />
          <MenuLink icon={<Mail size={18} />} label="Falar com Especialista" onClick={() => {
            const chatwoot = (window as any).chatwootSDK;
            if (chatwoot) {
              chatwoot.toggle();
            } else {
              alert("Suporte via e-mail: suporte@protocoloforcanatural.com");
            }
          }} />
          <MenuLink icon={<MessageSquare size={18} />} label="Comunidade no WhatsApp" onClick={() => window.open('https://chat.whatsapp.com/exemplo', '_blank')} />
        </GlassCard>

        <h3 className="text-sm font-bold text-[#86868B] uppercase tracking-widest ml-1 mt-6">Protocolo</h3>
        <GlassCard className="p-0 overflow-hidden divide-y divide-gray-100 bg-white border-none shadow-sm">
          <MenuLink icon={<Shield size={18} />} label="Garantia Incondicional 90 Dias" onClick={() => onNavigate(View.WARRANTY)} />
          <button 
            onClick={onLogout}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center gap-4 text-red-500 font-bold">
              <LogOut size={18} /> Sair da Conta
            </div>
          </button>
        </GlassCard>
      </div>

      <div className="pt-8 text-center text-xs text-[#86868B] opacity-50 pb-12">
        <p>© 2025 Protocolo Força Natural - Todos os direitos reservados.</p>
        <p className="mt-1 hover:underline cursor-pointer">Termos de Uso • Política de Privacidade</p>
      </div>
    </div>
  );
};

const MenuLink: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors group text-left"
  >
    <div className="flex items-center gap-4 text-[#1B4D3E] font-medium">
      <div className="text-gray-400 group-hover:text-[#2ECC71] transition-colors">{icon}</div>
      {label}
    </div>
    <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-all" />
  </button>
);
