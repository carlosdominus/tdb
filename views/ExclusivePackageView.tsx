
import React from 'react';
import { ChevronLeft, Crown, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface ExclusivePackageViewProps {
  onBack: () => void;
}

export const ExclusivePackageView: React.FC<ExclusivePackageViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className="bg-[#1B4D3E] text-white px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase tracking-widest flex items-center gap-2">
          <Crown size={12} className="text-yellow-400" /> CONTEÚDO VIP
        </span>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1B4D3E] uppercase tracking-tighter mb-2">Pacote Exclusivo n°1</h1>
        <p className="text-[#86868B] font-medium">Assista ao conteúdo especial preparado para membros premium.</p>
      </div>

      <div className="px-2">
        <GlassCard className="p-0 overflow-hidden shadow-2xl border-none bg-black rounded-[32px]">
          <div style={{ position: 'relative', paddingTop: '125%' }}>
            <iframe 
              id="panda-986c4e76-193f-494e-be5f-f907c5f07f9e" 
              src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=986c4e76-193f-494e-be5f-f907c5f07f9e" 
              style={{ border: 'none', position: 'absolute', top: 0, left: 0 }} 
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
              allowFullScreen={true} 
              width="100%" 
              height="100%" 
              // @ts-ignore
              fetchpriority="high"
            ></iframe>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-[#1B4D3E] rounded-2xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#1B4D3E]">Acesso Vitalício</h4>
            <p className="text-xs text-[#86868B]">Este conteúdo estará sempre disponível em sua conta.</p>
          </div>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-[#86868B] font-black uppercase tracking-widest opacity-60 px-10">
        Problemas com o vídeo? Entre em contato com o suporte premium.
      </p>
    </div>
  );
};
