
import React, { useState, useLayoutEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { BONUSES_DATA } from '../constants';
import { Bonus, BonusSection } from '../types';
import { Gift, Lock, Download, Star, FileText, ChevronRight, X, Eye, ChevronLeft, Info, CheckCircle2, AlertCircle, Flame } from 'lucide-react';

const iconMap: any = {
  Star, FileText, Download, Lock, Flame, Activity: FileText, Sparkles: Gift
};

export const BonusesView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedBonus, setSelectedBonus] = useState<Bonus | null>(null);

  // Scroll to top when switching between list and detail view
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedBonus]);

  if (selectedBonus) {
    return <BonusDetailView bonus={selectedBonus} onBack={() => setSelectedBonus(null)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1B4D3E] mb-2 uppercase tracking-tight">Bônus Exclusivos</h1>
        <p className="text-[#86868B] font-medium">Conteúdo premium para acelerar seus resultados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BONUSES_DATA.map((bonus) => {
          const IconComp = iconMap[bonus.icon] || Gift;
          return (
            <BonusListItem 
              key={bonus.id}
              bonus={bonus}
              icon={<IconComp size={24} />}
              onClick={() => setSelectedBonus(bonus)}
            />
          );
        })}
      </div>

      <GlassCard className="bg-[#1B4D3E] text-white overflow-hidden relative border-none shadow-xl mt-4">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">🛡️</div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-xl font-bold mb-1">Garantia de 90 Dias</h3>
            <p className="text-white/70 text-sm">Sua satisfação é nossa prioridade absoluta.</p>
          </div>
          <div className="md:ml-auto w-full md:w-auto">
             <Button variant="secondary" onClick={() => window.open('mailto:suporte@protocoloforcanatural.com')}>Falar com Suporte</Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      </GlassCard>
    </div>
  );
};

const BonusListItem: React.FC<{ bonus: Bonus; icon: React.ReactNode; onClick: () => void }> = ({ bonus, icon, onClick }) => (
  <GlassCard 
    className={`relative group h-full flex flex-col bg-white border-none shadow-md ${bonus.locked ? 'opacity-70' : ''}`} 
    hoverEffect={!bonus.locked}
    onClick={!bonus.locked ? onClick : undefined}
  >
    <div className={`absolute top-4 right-4 px-3 py-1 ${bonus.badgeColor} text-white text-[10px] font-black rounded-full shadow-sm uppercase tracking-widest`}>
      {bonus.badge}
    </div>
    
    <div className="mb-6 w-14 h-14 rounded-2xl bg-gray-50 text-[#1B4D3E] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
      {icon}
    </div>

    <h3 className="text-xl font-bold text-[#1B4D3E] mb-1">{bonus.title}</h3>
    <p className="text-xs text-[#86868B] uppercase font-bold tracking-widest mb-2 opacity-70">{bonus.subtitle}</p>
    <p className="text-sm text-[#86868B] mb-8 flex-grow font-medium leading-relaxed">{bonus.description}</p>

    <div className="flex flex-col gap-2">
      <Button 
        variant={bonus.locked ? 'outline' : 'primary'} 
        fullWidth 
        className="text-xs py-3 font-black uppercase tracking-widest"
        disabled={bonus.locked}
      >
        {bonus.locked ? 'BLOQUEADO' : 'VER CONTEÚDO'}
      </Button>
      <p className="text-center text-[10px] font-black text-[#1B4D3E] opacity-40 uppercase tracking-tighter">Valor Original: {bonus.value}</p>
    </div>
  </GlassCard>
);

const BonusDetailView: React.FC<{ bonus: Bonus; onBack: () => void }> = ({ bonus, onBack }) => {
  if (bonus.iframeUrl) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12 h-screen flex flex-col">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
            <ChevronLeft size={20} /> Voltar
          </button>
          <span className={`${bonus.badgeColor} text-white px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase tracking-widest`}>PDF LIBERADO</span>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1B4D3E] uppercase tracking-tight mb-2">{bonus.title}</h1>
          <p className="text-[#86868B] font-bold uppercase tracking-[0.1em] text-sm">{bonus.subtitle}</p>
        </div>
        <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          <iframe 
            src={bonus.iframeUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 'none' }} 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }

  if (!bonus.content) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className={`${bonus.badgeColor} text-white px-4 py-1.5 rounded-xl text-[10px] font-black shadow-md uppercase tracking-widest`}>BÔNUS LIBERADO</span>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1B4D3E] uppercase tracking-tight mb-2">{bonus.title}</h1>
        <p className="text-[#86868B] font-bold uppercase tracking-[0.1em] text-sm">{bonus.subtitle}</p>
        <div className="w-16 h-1 px-1 bg-[#2ECC71] mx-auto mt-4 rounded-full"></div>
      </div>

      <GlassCard className="bg-white border-none shadow-sm leading-relaxed text-[#1D1D1F]">
        <h3 className="text-sm font-black text-[#86868B] uppercase tracking-[0.2em] mb-4">INTRODUÇÃO</h3>
        <p className="text-base font-medium opacity-90">{bonus.content.introduction}</p>
      </GlassCard>

      <div className="space-y-10">
        {bonus.content.sections.map((section, idx) => (
          <section key={idx} className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1B4D3E] border-l-4 border-[#2ECC71] pl-4 uppercase tracking-tighter">{section.title}</h2>
            
            {section.description && <p className="text-base font-medium text-[#1D1D1F] opacity-80">{section.description}</p>}

            {section.whyError && (
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-xs font-black text-[#86868B] uppercase tracking-widest mb-2">Por que cometemos este erro?</p>
                <p className="text-sm font-medium">{section.whyError}</p>
              </div>
            )}

            {section.consequences && (
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex gap-4">
                <AlertCircle className="text-red-500 shrink-0" size={24} />
                <div>
                  <p className="text-xs font-black text-red-800 uppercase tracking-widest mb-2">Consequências</p>
                  <p className="text-sm font-medium text-red-900">{section.consequences}</p>
                </div>
              </div>
            )}

            {section.stats && (
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                <Info className="text-blue-500 shrink-0" size={24} />
                <div>
                  <p className="text-xs font-black text-blue-800 uppercase tracking-widest mb-2">Estatística Impactante</p>
                  <p className="text-sm font-bold text-blue-900">{section.stats}</p>
                </div>
              </div>
            )}

            {section.caseStudy && (
               <GlassCard className="bg-yellow-50/50 border-yellow-200">
                  <h4 className="text-xs font-black text-yellow-800 uppercase tracking-widest mb-2">Caso Prático</h4>
                  <p className="text-sm italic text-yellow-900">"{section.caseStudy}"</p>
               </GlassCard>
            )}

            {(section.notToDo || section.howToDo) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.notToDo && (
                  <div className="p-6 rounded-3xl bg-red-50 border border-red-100">
                    <h4 className="text-[10px] font-black text-red-800 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <X size={16} /> O QUE NÃO FAZER
                    </h4>
                    <p className="text-sm font-medium text-red-900">{section.notToDo}</p>
                  </div>
                )}
                {section.howToDo && (
                  <div className="p-6 rounded-3xl bg-green-50 border border-green-100">
                    <h4 className="text-[10px] font-black text-[#1B4D3E] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-[#2ECC71]" /> COMO FAZER CERTO
                    </h4>
                    <ul className="space-y-3">
                      {section.howToDo.map((step, sIdx) => (
                        <li key={sIdx} className="text-sm font-bold text-[#1B4D3E] flex items-start gap-2">
                          <span className="shrink-0">•</span> {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {section.subItems && (
              <div className="grid grid-cols-1 gap-6">
                {section.subItems.map((sub, sIdx) => (
                  <GlassCard key={sIdx} className="bg-[#F5F5F7] border-none">
                    <h4 className="text-sm font-black text-[#1B4D3E] uppercase tracking-widest mb-4">{sub.label}</h4>
                    <div className="flex flex-wrap gap-2">
                      {sub.items.map((it, iIdx) => (
                        <span key={iIdx} className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-[#86868B] shadow-sm">
                          {it}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {section.extraTip && (
              <div className="p-6 rounded-2xl bg-white border border-dashed border-[#2ECC71] flex gap-4">
                 <span className="text-2xl">💡</span>
                 <div>
                    <p className="text-xs font-black text-[#1B4D3E] uppercase tracking-widest mb-1">Dica Extra</p>
                    <p className="text-sm font-medium text-[#1B4D3E]">{section.extraTip}</p>
                 </div>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="pt-10 border-t border-gray-100">
         <div className="bg-[#1B4D3E] text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden text-center">
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">CONCLUSÃO</h3>
            <p className="text-white/80 text-base font-medium mb-8 max-w-lg mx-auto leading-relaxed">
               {bonus.content.conclusion}
            </p>
            <Button variant="secondary" fullWidth className="h-16 text-lg font-black tracking-widest uppercase" onClick={onBack}>
               ENTENDIDO, CONTINUAR
            </Button>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
         </div>
         {bonus.content.disclaimer && (
           <p className="mt-8 text-center text-[10px] text-[#86868B] uppercase font-black tracking-widest opacity-60 px-10">
              Aviso: {bonus.content.disclaimer}
           </p>
         )}
      </div>
    </div>
  );
};
