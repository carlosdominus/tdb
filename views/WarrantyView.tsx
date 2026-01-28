import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { ChevronLeft, ShieldCheck, CheckCircle2, Clock, DollarSign, X, Mail, MessageCircle } from 'lucide-react';

export const WarrantyView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500 relative">
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
            Você está 100% protegido. Se por qualquer motivo você achar que o Protocolo Força Natural não é para você, basta entrar em contato. Sem perguntas, sem burocracia.
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
         <p className="text-white/80 text-sm mb-6 font-medium">
            Confiamos tanto no método que, se após os 90 dias você provar que seguiu o checklist e não teve resultados, devolvemos o valor em dobro como forma de compensar seu tempo.
         </p>
         <Button 
            variant="secondary" 
            fullWidth 
            className="h-14 font-black uppercase tracking-widest text-[#1B4D3E] shadow-xl hover:scale-105 active:scale-95 transition-all"
            onClick={() => setIsModalOpen(true)}
          >
            Solicitar Reembolso
          </Button>
         <p className="text-center text-[10px] text-white/50 mt-4 uppercase tracking-[0.2em] font-black">Válido somente após 30 dias de uso</p>
      </GlassCard>

      {/* Reembolso Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <GlassCard className="relative w-full max-w-sm bg-white border-none shadow-2xl p-8 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#1B4D3E]/10 text-[#1B4D3E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#1B4D3E] uppercase tracking-tighter">Solicitar Reembolso</h2>
              <p className="text-[#86868B] text-sm font-medium mt-2">Escolha como deseja prosseguir com sua solicitação de garantia.</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => window.open('https://wa.me/558394186965', '_blank')}
                className="w-full flex items-center gap-4 p-5 rounded-2xl bg-green-50 border border-green-100 hover:bg-green-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#2ECC71] shadow-sm">
                  <MessageCircle size={24} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-[#1B4D3E] uppercase tracking-widest">WhatsApp</p>
                  <p className="text-[10px] font-bold text-[#86868B] uppercase">Falar com atendente</p>
                </div>
              </button>

              <button 
                onClick={() => window.location.href = 'mailto:contato@suportmedia.com'}
                className="w-full flex items-center gap-4 p-5 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                  <Mail size={24} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-[#1B4D3E] uppercase tracking-widest">E-mail</p>
                  <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-tighter">contato@suportmedia.com</p>
                </div>
              </button>
            </div>

            <p className="mt-8 text-center text-[9px] text-[#86868B] font-black uppercase tracking-widest opacity-60 px-4">
              Ao solicitar, nossa equipe entrará em contato em até 48 horas úteis.
            </p>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

const TimelineStep: React.FC<{ day: string; title: string; desc: string; active?: boolean }> = ({ day, title, desc, active }) => (
  <div className="relative flex items-start gap-6 pl-1 text-left">
    <div className={`z-10 w-11 h-11 rounded-2xl flex items-center justify-center text-xs font-bold border-4 border-white shadow-md transition-colors ${active ? 'bg-[#1B4D3E] text-white' : 'bg-gray-100 text-[#86868B]'}`}>
      {day.split(' ')[1]}
    </div>
    <div className="flex-1 pt-1">
      <h4 className={`font-bold transition-colors ${active ? 'text-[#1B4D3E]' : 'text-gray-400'}`}>{title}</h4>
      <p className="text-sm text-[#86868B]">{desc}</p>
    </div>
  </div>
);
