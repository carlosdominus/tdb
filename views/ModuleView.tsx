
import React, { useState } from 'react';
import { Module, View } from '../types';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { Beaker, ChevronLeft, Info, Play, CheckSquare, Clock, ArrowRight } from 'lucide-react';

interface ModuleViewProps {
  module: Module;
  onBack: () => void;
  onNavigate: (view: View) => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ module, onBack, onNavigate }) => {
  const isRecipeModule = module.id === 'mod2';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-medium">
          <ChevronLeft size={20} /> Voltar
        </button>
        <div className="px-3 py-1 rounded-full bg-[#1B4D3E]/10 text-[#1B4D3E] text-xs font-bold">MÓDULO ATIVO</div>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B4D3E]">{module.title}</h1>
        <p className="text-[#86868B] mt-2">Siga cada passo com atenção para garantir resultados máximos.</p>
      </div>

      {isRecipeModule ? (
        <div className="space-y-6">
          <GlassCard className="relative overflow-hidden border-none shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2ECC71]/10 rounded-full -mr-24 -mt-24"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
                  <Beaker size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#1B4D3E]">🥤 A Receita do Bicarbonato</h2>
              </div>

              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-6 flex gap-3">
                <Info className="text-orange-500 shrink-0" size={20} />
                <p className="text-sm text-orange-800">
                  <span className="font-bold">ATENÇÃO:</span> Siga as proporções exatas para máxima eficácia. O excesso ou falta de um ingrediente pode alterar o pH necessário.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-4 flex items-center gap-2"><CheckSquare size={18} className="text-[#2ECC71]" /> Ingredientes</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Bicarbonato de Sódio', qty: '1 colher de chá' },
                      { name: 'Mel Orgânico', qty: '2 colheres de sopa' },
                      { name: 'Suco de Limão', qty: '1/2 limão siciliano' },
                      { name: 'Água Filtrada', qty: '200ml (morninho)' }
                    ].map((ing, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-sm font-medium">{ing.name}</span>
                        <span className="text-xs font-bold text-[#1B4D3E]">{ing.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Clock size={18} className="text-[#2ECC71]" /> Quando Tomar</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-[#1B4D3E]"></div>
                        <span><span className="font-bold">Manhã:</span> 7h-9h (em jejum)</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-[#1B4D3E]"></div>
                        <span><span className="font-bold">Noite:</span> 20h-22h (antes de dormir)</span>
                      </li>
                    </ul>
                  </div>
                  <Button fullWidth onClick={() => onNavigate(View.TRACKER)}>
                    Configurar Lembretes
                  </Button>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-red-50 border-red-100">
             <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2"><Info size={18} /> Contraindicações</h3>
             <ul className="text-sm text-red-700 space-y-1 list-disc ml-5">
               <li>Diabetes (consulte médico devido ao mel)</li>
               <li>Hipertensão arterial severa</li>
               <li>Problemas renais crônicos</li>
             </ul>
             <button className="text-xs font-bold text-red-800 mt-4 hover:underline">Ver lista completa de referências</button>
          </GlassCard>
        </div>
      ) : (
        <div className="space-y-4">
          {module.lessons.map((lesson, i) => (
            <GlassCard key={lesson.id} className="hoverEffect group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {lesson.completed ? <CheckSquare size={20} /> : <Play size={20} />}
                  </div>
                  <div>
                    <p className="text-[10px] text-[#86868B] uppercase font-bold tracking-widest">AULA 0{i+1}</p>
                    <h4 className="font-bold text-[#1B4D3E]">{lesson.title}</h4>
                  </div>
                </div>
                <ArrowRight size={20} className="text-[#86868B] group-hover:text-[#1B4D3E] group-hover:translate-x-1 transition-all" />
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
