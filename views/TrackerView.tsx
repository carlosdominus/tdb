
import React from 'react';
import { AppState } from '../types';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Flame, Trophy, CheckCircle2, Circle, Info, TrendingUp } from 'lucide-react';

interface TrackerViewProps {
  state: AppState;
  onBack: () => void;
  toggleCheck: (date: string, type: 'morning' | 'night') => void;
}

const allChartData = [
  { day: 'Dia 1', val: 5, dayNum: 1 },
  { day: 'Dia 4', val: 15, dayNum: 4 },
  { day: 'Dia 7', val: 25, dayNum: 7 },
  { day: 'Dia 10', val: 32, dayNum: 10 },
  { day: 'Dia 14', val: 48, dayNum: 14 },
  { day: 'Dia 18', val: 72, dayNum: 18 },
  { day: 'Dia 21', val: 95, dayNum: 21 },
];

export const TrackerView: React.FC<TrackerViewProps> = ({ state, onBack, toggleCheck }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCheck = state.checklist[today] || { date: today, morning: false, night: false };

  const currentDay = state.user?.currentDay || 1;
  
  // Filtra os dados para mostrar apenas até o dia atual do usuário
  const filteredData = allChartData.filter(d => d.dayNum <= currentDay);
  
  // Se o usuário está no dia 1, adicionamos o ponto do dia 1 mesmo que não existisse no array fixo
  const displayData = filteredData.length > 0 ? filteredData : [allChartData[0]];

  const totalLessons = state.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = state.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.completed).length, 0);
  const realProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500 pb-12">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold text-[#1B4D3E] tracking-tight uppercase">Seu Progresso</h1>
        <p className="text-[#86868B] mt-2 font-medium">Acompanhe sua transformação em tempo real.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex flex-col items-center justify-center py-10 shadow-sm border-none bg-white">
          <Flame size={40} className={(state.user?.streak || 0) > 0 ? "text-orange-500 mb-4" : "text-gray-200 mb-4"} />
          <span className="text-4xl font-black text-[#1D1D1F]">{state.user?.streak || 0}</span>
          <span className="text-[11px] text-[#86868B] font-black uppercase tracking-[0.2em] mt-1">DIAS SEGUIDOS</span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center py-10 shadow-sm border-none bg-white">
          <Trophy size={40} className="text-yellow-500 mb-4" />
          <span className="text-4xl font-black text-[#1D1D1F]">{state.user?.streak || 0}</span>
          <span className="text-[11px] text-[#86868B] font-black uppercase tracking-[0.2em] mt-1">RECORDE</span>
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center py-10 shadow-sm border-none bg-white">
          <TrendingUp size={40} className="text-[#2ECC71] mb-4" />
          <span className="text-4xl font-black text-[#1D1D1F]">{realProgress}%</span>
          <span className="text-[11px] text-[#86868B] font-black uppercase tracking-[0.2em] mt-1">CONCLUÍDO</span>
        </GlassCard>
      </div>

      <GlassCard className="p-8 shadow-xl border-none bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
           <div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">Evolução de Performance</h3>
              <p className="text-xs text-[#86868B] mt-1 font-medium">Crescimento da Vitalidade Arterial</p>
           </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-100">
              <Info size={16} />
              <span>O que é isso?</span>
           </div>
        </div>
        
        <div className="h-72 md:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#86868B'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#86868B'}} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="val" stroke="#2ECC71" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 p-5 bg-[#F5F5F7] rounded-2xl border border-gray-100">
           <p className="text-xs text-[#1D1D1F] font-medium leading-relaxed">
             <span className="font-black text-[#1B4D3E] uppercase tracking-tighter">EXPLICAÇÃO:</span> Este gráfico representa o seu **Índice de Vitalidade Arterial**. Ele sobe conforme você acumula dias de consistência no protocolo e relata melhora na rigidez. O objetivo é manter a linha em subida constante até o 21º dia para consolidar os ganhos.
           </p>
        </div>
      </GlassCard>

      <section className="pt-4">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-4 text-[#1B4D3E]">
          <Calendar size={28} className="text-[#2ECC71]" /> Registro Diário
        </h3>
        <GlassCard className="space-y-8 p-10 bg-white shadow-lg border-none">
           <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div>
                <p className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.2em] mb-1">HOJE</p>
                <p className="text-2xl font-bold text-[#1B4D3E] capitalize">
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'numeric' })}
                </p>
              </div>
              <span className="px-4 py-2 bg-[#2ECC71]/10 text-[#2ECC71] rounded-full text-[11px] font-black uppercase tracking-widest">Ativo</span>
           </div>

           <div className="space-y-6">
              <ChecklistItem 
                label="Dose Personalizada" 
                time="Siga o horário sugerido na receita" 
                checked={todayCheck.morning} 
                onToggle={() => toggleCheck(today, 'morning')} 
              />
           </div>

           <div className="pt-4">
             <Button fullWidth variant="primary" className="h-14 text-base font-black tracking-widest uppercase">
               Salvar Resultados do Dia
             </Button>
           </div>
        </GlassCard>
      </section>
    </div>
  );
};

const ChecklistItem: React.FC<{ label: string; time: string; checked: boolean; onToggle: () => void }> = ({ label, time, checked, onToggle }) => (
  <div 
    onClick={onToggle}
    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between gap-6 ${checked ? 'bg-[#2ECC71]/5 border-[#2ECC71]' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}
  >
    <div className="flex items-center gap-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${checked ? 'bg-[#2ECC71] text-white shadow-lg' : 'bg-white text-gray-200 shadow-sm'}`}>
        {checked ? <CheckCircle2 size={32} /> : <Circle size={32} />}
      </div>
      <div>
        <h5 className={`text-lg font-bold transition-colors mb-1 ${checked ? 'text-[#1B4D3E]' : 'text-gray-400'}`}>{label}</h5>
        <p className={`text-sm transition-colors ${checked ? 'text-[#1B4D3E]/70' : 'text-[#86868B]'}`}>{time}</p>
      </div>
    </div>
    {checked && <span className="text-[11px] font-black text-[#2ECC71] uppercase tracking-widest">FEITO</span>}
  </div>
);
