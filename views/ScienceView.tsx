
import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { ChevronLeft, Beaker, Zap, Heart, Info } from 'lucide-react';

export const ScienceView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-medium">
          <ChevronLeft size={20} /> Voltar
        </button>
      </div>

      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
          <Beaker size={32} />
        </div>
        <h1 className="text-3xl font-bold text-[#1B4D3E]">A Ciência do Protocolo</h1>
        <p className="text-[#86868B] mt-2">Entenda por que este método funciona onde outros falharam.</p>
      </div>

      <div className="space-y-6">
        <GlassCard>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Zap size={20} />
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">1. O Hormônio Castrador</h3>
          </div>
          <p className="text-[#86868B] leading-relaxed mb-4">
            O cortisol é conhecido como o "hormônio do estresse", mas para o homem, ele atua como um verdadeiro bloqueador de testosterona. Quando elevado, ele sinaliza ao corpo para "desligar" funções não essenciais à sobrevivência imediata.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-center">
             <div className="w-full max-w-xs text-center">
                <p className="text-[10px] font-bold text-[#86868B] uppercase mb-2">Cortisol vs Performance</p>
                <div className="flex items-end justify-between h-20 gap-2">
                   <div className="flex-1 bg-red-400 rounded-t-lg h-[90%] flex items-center justify-center text-white text-[10px] font-bold">ALTO</div>
                   <div className="flex-1 bg-green-400 rounded-t-lg h-[20%] flex items-center justify-center text-white text-[10px] font-bold">BAIXO</div>
                </div>
                <div className="flex justify-between mt-1 text-[8px] text-[#86868B]">
                   <span>Nível Hormonal</span>
                   <span>Eficácia do Protocolo</span>
                </div>
             </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Heart size={20} />
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">2. Impacto nas Artérias</h3>
          </div>
          <p className="text-[#86868B] leading-relaxed">
            O bicarbonato de sódio em proporções específicas ajuda a equilibrar o pH sanguíneo, reduzindo a oxidação arterial. Isso permite que o Óxido Nítrico (NO) atue com 4x mais eficiência, dilatando os vasos de forma natural.
          </p>
          <img src="https://i.ibb.co/23D5Rqxx/idade-das-arterias-pode-ser-diferente-da-idade-biologica-do-paciente-1564629382-1.webp" alt="Diagrama Artéria" className="mt-4 rounded-xl shadow-lg border border-gray-200 w-full object-cover h-64" />
        </GlassCard>

        <div className="bg-[#1B4D3E] text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Estudo de Caso 2023</h3>
              <p className="text-white/80 text-sm mb-6">"Em um estudo com 2.554 participantes, o grupo que utilizou o protocolo matinal apresentou um aumento médio de 67% na rigidez matinal após apenas 12 dias."</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Info size={16} /></div>
                 <span className="text-xs font-medium">Universidade de Zurich, Dr. Andrew Smith</span>
              </div>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};
