
import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { ProblemType, UserProfile } from '../types';
import { Zap, Timer, Activity, Flame, ChevronRight } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: (profile: UserProfile) => void;
}

const PROBLEMS = [
  { id: 'broxada' as ProblemType, label: 'Broxada', desc: 'Não subir ou cair no meio do ato', icon: '🔥', LucideIcon: Zap },
  { id: 'gozo-rapido' as ProblemType, label: 'Gozo Rápido', desc: 'Ejacular em 1-3 minutos', icon: '⏱️', LucideIcon: Timer },
  { id: 'pau-meia-bomba' as ProblemType, label: 'Pau Meia-Bomba', desc: 'Falta de firmeza/rigidez', icon: '🪨', LucideIcon: Activity },
  { id: 'sem-tesao' as ProblemType, label: 'Não Tenho Tesão', desc: 'Falta de vontade/disposição', icon: '🐂', LucideIcon: Flame }
];

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    age: undefined,
    weight: undefined,
    mainProblem: undefined
  });

  const isFormValid = profile.age && profile.weight && profile.mainProblem;

  const handleGenerate = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2800);
  };

  const finish = () => {
    onComplete(profile);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] py-10 px-6 flex flex-col items-center animate-in fade-in duration-700">
        <div className="w-16 h-16 text-[#1B4D3E] mb-8 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <Logo size={40} />
        </div>
        
        <div className="text-center mb-10 max-w-sm">
          <h1 className="text-2xl font-bold text-[#1B4D3E] font-poppins uppercase tracking-tight">Personalize seu Plano</h1>
          <p className="text-[#86868B] mt-2 text-sm font-medium">Ajustaremos as doses para o seu caso específico.</p>
        </div>

        <div className="w-full max-w-[420px] space-y-8">
          <GlassCard className="p-8 space-y-6 bg-white border-none shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">IDADE</label>
                <input 
                  type="number" 
                  placeholder="Ex: 35"
                  value={profile.age || ''}
                  onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
                  className="w-full p-4 rounded-xl bg-[#F5F5F7] border-2 border-transparent focus:border-[#2ECC71] focus:bg-white transition-all outline-none font-bold text-center text-lg"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">PESO (KG)</label>
                <input 
                  type="number" 
                  placeholder="Ex: 80"
                  value={profile.weight || ''}
                  onChange={e => setProfile({...profile, weight: parseInt(e.target.value)})}
                  className="w-full p-4 rounded-xl bg-[#F5F5F7] border-2 border-transparent focus:border-[#2ECC71] focus:bg-white transition-all outline-none font-bold text-center text-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">3. QUAL SEU PROBLEMA PRINCIPAL?</label>
              <div className="grid gap-3">
                {PROBLEMS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setProfile({...profile, mainProblem: p.id})}
                    className={`text-left p-5 rounded-[24px] border border-transparent transition-all duration-300 flex items-center gap-5 shadow-sm ${profile.mainProblem === p.id ? 'gradient-primary text-white shadow-xl scale-[1.02]' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${profile.mainProblem === p.id ? 'bg-white/20' : 'bg-[#F5F5F7] text-[#1B4D3E]'}`}>
                       <span className="text-2xl">{p.icon}</span>
                    </div>
                    <div>
                       <div className={`font-bold text-base leading-tight mb-1 ${profile.mainProblem === p.id ? 'text-white' : 'text-[#1D1D1F]'}`}>{p.label}</div>
                       <div className={`text-xs leading-tight font-medium ${profile.mainProblem === p.id ? 'text-white/80' : 'text-[#86868B]'}`}>{p.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              fullWidth 
              disabled={!isFormValid}
              onClick={handleGenerate}
              className="h-16 text-base font-black tracking-widest uppercase"
            >
              GERAR MEU PROTOCOLO
            </Button>
          </GlassCard>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (step_2_placeholder()); // Helper below for brevity
  }

  const selectedProb = PROBLEMS.find(p => p.id === profile.mainProblem);

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-16 px-6 flex flex-col items-center animate-in zoom-in duration-500">
      <div className="w-20 h-20 text-[#2ECC71] mb-10 bg-white p-4 rounded-3xl shadow-xl border border-gray-100">
        <Logo size={48} />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#1B4D3E] font-poppins uppercase tracking-tighter">Tudo Pronto!</h1>
        <p className="text-[#86868B] mt-2 font-medium">Seu protocolo foi ajustado com sucesso.</p>
      </div>

      <GlassCard className="w-full max-w-[420px] p-10 space-y-8 shadow-2xl relative overflow-hidden bg-white border-none">
        <div className="absolute top-0 right-0 w-48 h-48 gradient-primary opacity-5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        
        <div className="space-y-3">
          <p className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.2em] ml-1">SEU RESUMO:</p>
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-[#F5F5F7] rounded-xl text-xs font-black text-[#1B4D3E]">{profile.age} ANOS</div>
             <div className="px-4 py-2 bg-[#F5F5F7] rounded-xl text-xs font-black text-[#1B4D3E]">{profile.weight}KG</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-[32px] border-2 border-[#2ECC71]/10 bg-white shadow-xl relative group">
             <div className="absolute -top-3 right-4 bg-yellow-400 text-[#1D1D1F] px-4 py-1.5 rounded-xl text-[10px] font-black shadow-lg uppercase tracking-widest z-20">
                Principal
             </div>
             <div className="w-16 h-16 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-[#1B4D3E] mb-6">
               <selectedProb.LucideIcon size={32} />
             </div>
             <h3 className="text-xl font-bold text-[#1B4D3E] uppercase tracking-tight mb-2">
                Tônico {selectedProb?.label}
             </h3>
             <p className="text-sm text-[#86868B] font-medium leading-relaxed">
                As proporções foram ajustadas para seu perfil. Esse tônico vai focar direto na sua {selectedProb?.label.toLowerCase()}.
             </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button fullWidth onClick={finish} className="h-16 text-lg font-black tracking-widest uppercase">COMEÇAR AGORA</Button>
          <button onClick={() => setStep(1)} className="w-full text-[11px] text-[#86868B] hover:text-[#1B4D3E] transition-colors py-2 font-black uppercase tracking-widest">
             Alterar Dados
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

function step_2_placeholder() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 mb-8 relative">
         <div className="absolute inset-0 border-4 border-[#1B4D3E]/10 rounded-[28px]"></div>
         <div className="absolute inset-0 border-4 border-[#2ECC71] rounded-[28px] border-t-transparent animate-spin-slow"></div>
         <div className="absolute inset-0 flex items-center justify-center text-[#1B4D3E]">
           <Logo size={40} />
         </div>
      </div>
      <h2 className="text-2xl font-bold text-[#1B4D3E] font-poppins uppercase">Montando seu Guia...</h2>
      <p className="text-[#86868B] mt-2 font-medium animate-pulse">Equilibrando a dose</p>
    </div>
  );
}
