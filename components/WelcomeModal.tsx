
import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { GlassCard } from './GlassCard';

interface WelcomeModalProps {
  onClose: () => void;
  userName: string;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose, userName }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Modal Content - Adaptado para vídeo vertical (portrait) */}
      <GlassCard className="relative w-full max-w-lg bg-white border-none shadow-[0_20px_80px_rgba(0,0,0,0.3)] p-0 overflow-hidden animate-in zoom-in-95 duration-500 animate-pulse-glow max-h-[90vh] flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-[#1B4D3E] hover:bg-black/20 transition-all"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto flex-1">
          <div className="p-8 pb-4 text-center">
            <h2 className="text-sm font-black text-[#86868B] uppercase tracking-[0.3em] mb-2">Seja muito bem-vindo</h2>
            <h1 className="text-2xl font-bold text-[#1B4D3E] uppercase tracking-tighter">👋 Olá, {userName}!</h1>
          </div>

          {/* Video Container - Embed Portrait (vertical) solicitado */}
          <div className="px-6 pb-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black">
              <div style={{ position: 'relative', paddingTop: '133.33333333333331%' }}>
                <iframe 
                  id="panda-30a435a0-5dbc-4778-9c3f-4c9f5dd4889c" 
                  src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=30a435a0-5dbc-4778-9c3f-4c9f5dd4889c" 
                  style={{ border: 'none', position: 'absolute', top: 0, left: 0 }} 
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                  allowFullScreen={true} 
                  width="100%" 
                  height="100%" 
                  // @ts-ignore
                  fetchpriority="high"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="px-8 pb-8 space-y-6">
            <div className="space-y-3">
               <div className="flex items-center gap-3 text-sm font-bold text-[#1B4D3E]">
                  <CheckCircle2 size={18} className="text-[#2ECC71]" />
                  Assista ao vídeo de introdução acima
               </div>
               <div className="flex items-center gap-3 text-sm font-bold text-[#1B4D3E]">
                  <CheckCircle2 size={18} className="text-[#2ECC71]" />
                  Prepare sua primeira dose hoje
               </div>
               <div className="flex items-center gap-3 text-sm font-bold text-[#1B4D3E]">
                  <CheckCircle2 size={18} className="text-[#2ECC71]" />
                  Siga o checklist de 21 dias
               </div>
            </div>

            <Button fullWidth onClick={onClose} className="h-16 text-lg font-black tracking-widest uppercase shadow-[0_10px_25px_rgba(46,204,113,0.3)]">
              COMEÇAR AGORA
            </Button>
            
            <p className="text-center text-[10px] text-[#86868B] font-black uppercase tracking-widest opacity-60">
              Pressione para entrar no painel principal
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
