
import React from 'react';
import { AppState, View, ProblemType } from '../types';
import { TONICS, PROBLEM_TO_TONIC } from '../constants';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { CheckCircle2, Clock, Calendar, TrendingUp, Gift, ArrowRight, Circle, ChevronRight, Zap, Timer, Activity, Flame, Sparkles, ShieldCheck, Beaker, BookOpen } from 'lucide-react';

const iconMap: any = {
  Zap, Timer, Activity, Flame, Sparkles, ShieldCheck
};

interface DashboardViewProps {
  state: AppState;
  onNavigate: (view: View) => void;
  onTonicNavigate: (id: string) => void;
  onTonicToggle: (date: string, type: 'main' | 'complementary', tonicId?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ state, onNavigate, onTonicNavigate, onTonicToggle }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCheck = state.checklist[today] || { mainTonic: false, complementary: [] };

  const mainTonicId = PROBLEM_TO_TONIC[state.user?.profile?.mainProblem as ProblemType] || 'anti-broxada';
  const mainTonic = TONICS[mainTonicId];
  const MainIcon = iconMap[mainTonic.icon] || Zap;

  return (
    <div className="space-y-10 pb-12 mt-4">
      {/* Hero Section */}
      <GlassCard className="gradient-primary text-white border-none overflow-hidden relative shadow-2xl p-8">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md shadow-inner">
                <span className="text-3xl">👋</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Olá, {state.user?.name.split(' ')[0]}!</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="bg-yellow-400 text-[#1D1D1F] text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">PREMIUM</span>
                   <p className="text-white/80 text-xs uppercase font-bold tracking-widest">Dia {state.user?.currentDay} de 21</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate(View.ONBOARDING)}
              className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/20 self-start sm:self-center"
            >
              Ajustar Plano
            </button>
          </div>
          
          <div className="space-y-4 mb-4">
            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-90">
              <span>Sequência Atual</span>
              <span>{state.user?.streak || 0} Dias 🔥</span>
            </div>
            <div className="w-full h-3.5 bg-white/20 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-white transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.6)]" 
                style={{ width: `${Math.min(100, ((state.user?.currentDay || 1) / 21) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </GlassCard>

      {/* Main Grid: Personalized Tonic Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <GlassCard className="relative overflow-hidden border border-gray-100 shadow-sm p-8" onClick={() => onTonicNavigate(mainTonicId)}>
            <div className="flex justify-between items-start mb-8">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#1B4D3E]/5 text-[#1B4D3E] rounded-2xl flex items-center justify-center">
                    <MainIcon size={36} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] mb-1">TÔNICO DO DIA</h3>
                    <h2 className="text-2xl font-bold text-[#1B4D3E] uppercase tracking-tight">{mainTonic.name}</h2>
                  </div>
               </div>
               <span className="badge-personalized whitespace-nowrap hidden sm:block">SUGESTÃO PARA VOCÊ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
               <div className="p-6 rounded-2xl bg-[#F5F5F7] border border-gray-100">
                  <p className="text-[10px] font-black text-[#86868B] uppercase tracking-widest mb-3">HORÁRIO IDEAL</p>
                  <div className="flex items-center gap-3 mb-4">
                     <Clock size={20} className="text-[#1B4D3E]" />
                     <span className="text-base font-bold text-[#1D1D1F]">{mainTonic.timing}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-[11px] font-black tracking-widest ${todayCheck.mainTonic ? 'text-[#2ECC71]' : 'text-orange-500'}`}>
                     {todayCheck.mainTonic ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                     {todayCheck.mainTonic ? 'CONCLUÍDO' : 'PENDENTE'}
                  </div>
               </div>
               <div className="flex flex-col gap-3">
                  <Button variant="primary" fullWidth className="h-14" onClick={(e) => {
                    e.stopPropagation();
                    onTonicNavigate(mainTonicId);
                  }}>Ver Receita</Button>
                  {!todayCheck.mainTonic && (
                    <Button variant="outline" fullWidth className="h-14" onClick={(e) => {
                      e.stopPropagation();
                      onTonicToggle(today, 'main');
                    }}>Marcar como Feito</Button>
                  )}
               </div>
            </div>

            <div className="flex items-start gap-3 text-xs text-[#86868B] italic bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
               <span className="shrink-0 text-[#1B4D3E]">💡</span>
               <span>Foco atual: <b className="uppercase">{state.user?.profile?.mainProblem}</b>. Este tônico foi escolhido para agir na raiz desse desafio.</span>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar Complementary Tonics */}
        <div className="md:col-span-4 space-y-6">
           <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-2">EXTRAS</h3>
           <div className="grid grid-cols-1 gap-4">
              {['pre-encontro', 'anti-alergico'].map(id => {
                const t = TONICS[id];
                const Icon = iconMap[t.icon] || Beaker;
                return (
                  <GlassCard 
                    key={t.id} 
                    className="p-5 hoverEffect group flex items-center justify-between border-transparent hover:border-gray-100 shadow-sm"
                    onClick={() => onTonicNavigate(t.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 text-[#1B4D3E] rounded-xl flex items-center justify-center group-hover:bg-[#1B4D3E] group-hover:text-white transition-all">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1B4D3E] text-sm leading-tight mb-1">{t.name.split('Tônico ')[1]}</h4>
                        <p className="text-[10px] text-[#86868B] uppercase font-bold tracking-widest">{t.timing.split(' ')[0]}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-[#1B4D3E] transition-all" />
                  </GlassCard>
                );
              })}
              <GlassCard 
                className="p-5 hoverEffect group flex items-center justify-between bg-white border-2 border-dashed border-gray-100"
                onClick={() => onNavigate(View.CATALOG)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shadow-md">
                    <Beaker size={20} />
                  </div>
                  <h4 className="font-bold text-[#1B4D3E] text-sm uppercase tracking-tight">Outros Tônicos</h4>
                </div>
                <ArrowRight size={20} className="text-[#1B4D3E] group-hover:translate-x-1 transition-all" />
              </GlassCard>
           </div>
        </div>
      </div>

      {/* Simplified Quick Access Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <GlassCard onClick={() => onNavigate(View.BONUSES)} hoverEffect className="flex items-center gap-6 p-8 border-none shadow-md bg-white">
             <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Gift size={32} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-[#1B4D3E]">Meus Bônus</h3>
                <p className="text-sm text-[#86868B] font-medium">Acesse conteúdos exclusivos e guias práticos.</p>
             </div>
             <ChevronRight size={24} className="ml-auto text-gray-300" />
          </GlassCard>

          <GlassCard onClick={() => onNavigate(View.TRACKER)} hoverEffect className="flex items-center gap-6 p-8 border-none shadow-md bg-white">
             <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp size={32} />
             </div>
             <div>
                <h3 className="text-xl font-bold text-[#1B4D3E]">Meu Progresso</h3>
                <p className="text-sm text-[#86868B] font-medium">Veja sua evolução nos últimos 21 dias.</p>
             </div>
             <ChevronRight size={24} className="ml-auto text-gray-300" />
          </GlassCard>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
         <QuickCard icon={<BookOpen size={24} />} label="Ciência" onClick={() => onNavigate(View.SCIENCE)} />
         <QuickCard icon={<ShieldCheck size={24} />} label="Garantia" onClick={() => onNavigate(View.WARRANTY)} />
         <QuickCard icon={<Calendar size={24} />} label="Checklist" onClick={() => onNavigate(View.TRACKER)} />
         <QuickCard icon={<BookOpen size={24} />} label="Manual" onClick={() => onNavigate(View.MODULE)} />
      </div>
    </div>
  );
};

const QuickCard: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
  <GlassCard onClick={onClick} hoverEffect className="flex flex-col items-center justify-center py-8 gap-4 border-none shadow-md bg-white">
    <div className="text-[#1B4D3E]">{icon}</div>
    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#86868B]">{label}</span>
  </GlassCard>
);
