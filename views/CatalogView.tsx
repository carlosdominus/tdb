
import React from 'react';
import { TONICS, PROBLEM_TO_TONIC } from '../constants';
import { View, ProblemType } from '../types';
import { GlassCard } from '../components/GlassCard';
import { ChevronLeft, Beaker, ChevronRight, Zap, Timer, Activity, Flame, Sparkles, ShieldCheck } from 'lucide-react';

const iconMap: any = {
  Zap, Timer, Activity, Flame, Sparkles, ShieldCheck
};

interface CatalogViewProps {
  onBack: () => void;
  onTonicNavigate: (id: string) => void;
  onNavigate: (view: View) => void;
  mainProblem: ProblemType;
}

export const CatalogView: React.FC<CatalogViewProps> = ({ onBack, onTonicNavigate, onNavigate, mainProblem }) => {
  const mainTonicId = PROBLEM_TO_TONIC[mainProblem];
  const mainTonics = Object.values(TONICS).filter(t => t.type === 'main');
  const complementaryTonics = Object.values(TONICS).filter(t => t.type === 'complementary');

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="space-y-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <h1 className="text-4xl font-bold text-[#1B4D3E] font-poppins uppercase tracking-tighter">Catálogo de Tônicos</h1>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between ml-2">
           <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em]">Seu Foco Atual</h2>
           <button onClick={() => onNavigate(View.ONBOARDING)} className="text-[11px] font-black text-[#1B4D3E] hover:underline uppercase tracking-widest">Mudar Foco</button>
        </div>
        <GlassCard 
          className="border-2 border-[#1B4D3E] p-8 relative overflow-hidden group cursor-pointer bg-white"
          onClick={() => onTonicNavigate(mainTonicId)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
             <div className="w-20 h-20 bg-[#1B4D3E]/5 text-[#1B4D3E] rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm border border-[#1B4D3E]/10">
                {React.createElement(iconMap[TONICS[mainTonicId].icon] || Beaker, { size: 40 })}
             </div>
             <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                   <h3 className="text-2xl font-bold text-[#1B4D3E] uppercase tracking-tight">{TONICS[mainTonicId].name}</h3>
                   <span className="bg-yellow-400 text-[#1D1D1F] px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase tracking-widest self-start sm:self-auto">SEU PRINCIPAL</span>
                </div>
                <p className="text-sm text-[#86868B] font-medium leading-relaxed italic">"Você selecionou '{mainProblem}' como seu desafio principal."</p>
             </div>
          </div>
          <ChevronRight size={24} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-[#1B4D3E] transition-all" />
        </GlassCard>
      </section>

      <section className="space-y-6">
        <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">Outras Opções</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mainTonics.filter(t => t.id !== mainTonicId).map(t => (
            <TonicCard key={t.id} tonic={t} onClick={() => onTonicNavigate(t.id)} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">Complementares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {complementaryTonics.map(t => (
            <TonicCard key={t.id} tonic={t} onClick={() => onTonicNavigate(t.id)} />
          ))}
        </div>
      </section>

      <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl flex items-start gap-5 shadow-sm">
         <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
            <Beaker size={24} />
         </div>
         <p className="text-sm text-blue-800 font-medium leading-relaxed">
           <b>COMO USAR:</b> Você deve focar no seu tônico <b>Principal</b> diariamente. Os complementares são para situações de emergência ou necessidades específicas da sua rotina.
         </p>
      </div>
    </div>
  );
};

const TonicCard: React.FC<{ tonic: any; onClick: () => void }> = ({ tonic, onClick }) => (
  <GlassCard onClick={onClick} hoverEffect className="group flex items-center gap-6 p-6 bg-white border-none shadow-sm hover:shadow-md">
    <div className="w-14 h-14 bg-gray-50 text-[#1B4D3E] rounded-2xl flex items-center justify-center group-hover:bg-[#1B4D3E] group-hover:text-white transition-all shadow-inner border border-gray-100">
       {React.createElement(iconMap[tonic.icon] || Beaker, { size: 28 })}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-[#1B4D3E] text-lg uppercase leading-tight tracking-tight">{tonic.name.split('Tônico ')[1]}</h4>
      <p className="text-[10px] text-[#86868B] font-black uppercase tracking-[0.15em] mt-2">{tonic.timing.split(' ')[0]}</p>
    </div>
    <ChevronRight size={20} className="text-gray-300 group-hover:text-[#1B4D3E] transition-all" />
  </GlassCard>
);
