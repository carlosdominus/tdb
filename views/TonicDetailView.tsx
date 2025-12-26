
import React from 'react';
import { Tonic, View } from '../types.ts';
import { GlassCard } from '../components/GlassCard.tsx';
import { Button } from '../components/Button.tsx';
import { ChevronLeft, Info, Play, CheckSquare, Clock, Download, RefreshCcw, Zap, Timer, Activity, Flame, Sparkles, ShieldCheck, Beaker } from 'lucide-react';

const iconMap: any = {
  Zap, Timer, Activity, Flame, Sparkles, ShieldCheck
};

interface TonicDetailViewProps {
  tonic: Tonic;
  isMain: boolean;
  onBack: () => void;
  onNavigate: (view: View) => void;
  onMarkDone: (tonicId: string) => void;
  isDone: boolean;
}

export const TonicDetailView: React.FC<TonicDetailViewProps> = ({ tonic, isMain, onBack, onNavigate, onMarkDone, isDone }) => {
  const TonicIcon = iconMap[tonic.icon] || Beaker;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        {isMain && <span className="bg-yellow-400 text-[#1D1D1F] px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase tracking-widest">SEU PRINCIPAL</span>}
      </div>

      <div className="text-center">
        <div className="w-24 h-24 bg-white rounded-3xl mx-auto flex items-center justify-center text-[#1B4D3E] shadow-xl mb-8 border border-gray-100">
           <TonicIcon size={56} />
        </div>
        <h1 className="text-4xl font-bold text-[#1B4D3E] uppercase tracking-tighter mb-4">{tonic.name}</h1>
        <div className="flex items-center justify-center gap-3">
           <span className="px-4 py-1.5 bg-[#1B4D3E]/5 text-[#1B4D3E] rounded-full text-[11px] font-black uppercase tracking-widest border border-[#1B4D3E]/10">{tonic.type === 'main' ? 'PROTOCOLO DIÁRIO' : 'TÔNICO EXTRA'}</span>
           <span className="px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-[11px] font-black uppercase tracking-widest border border-orange-100">{tonic.timing.split(' ')[0]}</span>
        </div>
      </div>

      <div className="space-y-10">
        <GlassCard className="border-none shadow-lg overflow-hidden relative p-8 bg-white">
           <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-full -mr-16 -mt-16"></div>
           <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
             <Info size={16} /> Para que serve
           </h3>
           <p className="text-lg text-[#1D1D1F] font-medium leading-relaxed mb-8 relative z-10">{tonic.serve}</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {tonic.benefits.map((b, i) => (
               <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-green-50 text-[#1B4D3E] text-xs font-bold border border-green-100 shadow-sm">
                  <CheckSquare size={20} className="text-[#2ECC71] shrink-0" />
                  {b}
               </div>
             ))}
           </div>
        </GlassCard>

        <section className="space-y-6">
          <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">🧪 Ingredientes</h3>
          <div className="grid grid-cols-1 gap-3">
             {tonic.ingredients.map((ing, i) => (
               <div key={i} className="flex items-center justify-between p-5 rounded-3xl bg-white border border-gray-100 shadow-sm">
                  <span className="text-base font-bold text-[#1D1D1F]">{ing.name}</span>
                  <span className="text-sm font-black text-[#1B4D3E] bg-[#F5F5F7] px-4 py-2 rounded-xl">{ing.qty}</span>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">👨‍🍳 Modo de Preparo</h3>
          <div className="space-y-4">
             {tonic.instructions.map((step, i) => (
               <div key={i} className="flex gap-6 p-6 rounded-3xl bg-[#F5F5F7] border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-2xl gradient-primary text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg">
                    {i+1}
                  </div>
                  <p className="text-base font-medium text-[#1D1D1F] py-1.5 leading-relaxed">{step}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">⏰ Horário Sugerido</h3>
          <GlassCard className="bg-orange-50 border-orange-100 p-8 shadow-sm">
             <div className="flex items-center gap-5 mb-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                   <Clock className="text-orange-500" size={28} />
                </div>
                <span className="text-2xl font-bold text-orange-800">{tonic.timing}</span>
             </div>
             <p className="text-sm text-orange-700 font-medium leading-relaxed opacity-90">Para resultados máximos, consuma rigorosamente dentro desta janela de tempo.</p>
          </GlassCard>
        </section>

        <div className="space-y-4 pt-6">
          <Button fullWidth className="h-16 text-lg font-black tracking-widest uppercase" onClick={() => onMarkDone(tonic.id)} disabled={isDone}>
            {isDone ? '✅ CONCLUÍDO HOJE' : '✅ MARCAR COMO FEITO'}
          </Button>
          <div className="grid grid-cols-2 gap-4">
             <Button variant="outline" fullWidth className="h-14 text-sm font-bold"><Download size={18} /> BAIXAR GUIA</Button>
             <Button variant="outline" fullWidth className="h-14 text-sm font-bold" onClick={() => onNavigate(View.CATALOG)}><RefreshCcw size={18} /> OUTRO TÔNICO</Button>
          </div>
        </div>

        <div className="p-6 bg-red-50 border border-red-100 rounded-3xl mt-12 flex items-start gap-4">
           <Info size={24} className="text-red-800 shrink-0" />
           <p className="text-[11px] text-red-800 leading-relaxed uppercase tracking-widest font-black">
             Importante: Ingredientes naturais. Não exceda as doses recomendadas. Consulte seu médico se tiver sensibilidade gástrica severa.
           </p>
        </div>
      </div>
    </div>
  );
};
