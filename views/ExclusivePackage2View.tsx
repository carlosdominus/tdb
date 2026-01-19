
import React from 'react';
import { ChevronLeft, BookOpen, Download } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface ExclusivePackage2ViewProps {
  onBack: () => void;
}

export const ExclusivePackage2View: React.FC<ExclusivePackage2ViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className="bg-[#1B4D3E] text-white px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase tracking-widest flex items-center gap-2">
          <BookOpen size={12} className="text-yellow-400" /> GUIAS DIGITAIS
        </span>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1B4D3E] uppercase tracking-tighter mb-2">Pacote Exclusivo n°2</h1>
        <p className="text-[#86868B] font-medium">Acesse sua biblioteca de manuais estratégicos abaixo.</p>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 ml-2">
            <div className="w-1.5 h-6 bg-[#2ECC71] rounded-full"></div>
            <h2 className="text-lg font-bold text-[#1B4D3E] uppercase tracking-tight">Guia Estratégico 01</h2>
          </div>
          <GlassCard className="p-0 overflow-hidden shadow-xl border-none bg-white rounded-[32px]">
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '140%' }}>
              <iframe 
                src="https://drive.google.com/file/d/1rYLln70gHfTpU_57oU5baKIz0nqABclY/preview" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
                allowFullScreen={true}
              ></iframe>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 ml-2">
            <div className="w-1.5 h-6 bg-[#2ECC71] rounded-full"></div>
            <h2 className="text-lg font-bold text-[#1B4D3E] uppercase tracking-tight">Manual de Performance 02</h2>
          </div>
          <GlassCard className="p-0 overflow-hidden shadow-xl border-none bg-white rounded-[32px]">
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '140%' }}>
              <iframe 
                src="https://drive.google.com/file/d/1i6WheI8SUpHrRee61MrwqpJnyOdYh2_d/preview" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
                allowFullScreen={true}
              ></iframe>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8">
        <div className="p-6 bg-[#1B4D3E]/5 rounded-3xl border border-[#1B4D3E]/10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white text-[#1B4D3E] rounded-2xl flex items-center justify-center shadow-sm">
            <Download size={24} />
          </div>
          <div>
            <h4 className="font-bold text-[#1B4D3E]">Disponível Offline</h4>
            <p className="text-xs text-[#86868B]">Estes documentos são carregados automaticamente para acesso rápido.</p>
          </div>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-[#86868B] font-black uppercase tracking-widest opacity-60 px-10">
        Não consegue visualizar? Tente atualizar a página ou verificar sua conexão.
      </p>
    </div>
  );
};
