
import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { ChevronLeft, ShieldCheck, CheckCircle2, Clock, DollarSign } from 'lucide-react';

export const WarrantyView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-medium">
          <ChevronLeft size={20} /> Voltar
        </button>
      </div>

      <div className="text-center mb-10">
        <div className="w-20 h-20 gradient-primary text-white rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-xl">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-3xl font-bold text-[#1B4D3E]">Garantia de 90 Dias</h1>
        <p className="text-[#86868B] mt-2">Sua satisfação ou cada centavo de volta.</p>
      </div>

      <GlassCard className="border-2 border-[#1B4D3E]/20">
         <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-[#1B4D3E] flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">Risco Zero Absoluto</h3>
         </div>
         <p className="text-[#86868B] leading-relaxed mb-6">
            Você está 100% protegido. Se por qualquer motivo você achar que o Protocolo Força Natural não é para você, basta enviar um e-mail. Sem perguntas, sem burocracia, sem ressentimentos.
         </p>

         <div className="space-y-8 relative">
            <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gray-100"></div>
            
            <TimelineStep 
              day="Dia 0" 
              title="Acesso Imediato" 
              desc="Você recebe todos os materiais e começa sua jornada hoje mesmo." 
              active 
            />
            <TimelineStep 
              day="Dia 30" 
              title="Avaliação Inicial" 
              desc="Nesse ponto, 95% dos alunos já relatam melhoras significativas no vigor." 
            />
            <TimelineStep 
              day="Dia 90" 
              title="Fim do Prazo" 
              desc="Sua garantia finaliza. Se não teve resultados, peça o reembolso agora." 
            />
         </div>
      </GlassCard>

      <GlassCard className="bg-[#1B4D3E] text-white p-8">
         <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
               <DollarSign size={24} />
            </div>
            <h3 className="text-xl font-bold">Compromisso em Dobro</h3>
         </div>
         <p className="text-white/80 text-sm mb-6">
            Confiamos tanto no método que, se após os 90 dias você provar que seguiu o checklist e não teve resultados, devolvemos o valor em dobro como forma de compensar seu tempo.
         </p>
         <Button variant="secondary" fullWidth className="opacity-50 cursor-not-allowed">Solicitar Reembolso (Bloqueado)</Button>
         <p className="text-center text-[10px] text-white/50 mt-4 uppercase tracking-widest font-bold">Válido somente após 30 dias de uso</p>
      </GlassCard>
    </div>
  );
};

const TimelineStep: React.FC<{ day: string; title: string; desc: string; active?: boolean }> = ({ day, title, desc, active }) => (
  <div className="relative flex items-start gap-6 pl-1">
    <div className={`z-10 w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-bold border-4 border-white shadow-md transition-colors ${active ? 'bg-[#1B4D3E] text-white' : 'bg-gray-100 text-[#86868B]'}`}>
      {day.split(' ')[1]}
    </div>
    <div className="flex-1 pt-1">
      <h4 className={`font-bold transition-colors ${active ? 'text-[#1B4D3E]' : 'text-gray-400'}`}>{title}</h4>
      <p className="text-sm text-[#86868B]">{desc}</p>
    </div>
  </div>
);
