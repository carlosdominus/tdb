
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, AppState, UserProfile, Tonic, ProblemType } from './types';
import { MOCK_USER, INITIAL_MODULES, TONICS, PROBLEM_TO_TONIC } from './constants';
import { LoginView } from './views/LoginView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';
import { TonicDetailView } from './views/TonicDetailView';
import { CatalogView } from './views/CatalogView';
import { ModuleView } from './views/ModuleView';
import { TrackerView } from './views/TrackerView';
import { BonusesView } from './views/BonusesView';
import { ProfileView } from './views/ProfileView';
import { ScienceView } from './views/ScienceView';
import { WarrantyView } from './views/WarrantyView';
import { HelpView } from './views/HelpView';
import { Logo } from './components/Logo';
import { Sidebar } from './components/Sidebar';
import { Beaker, TrendingUp, Gift, ChevronLeft, Menu, Home } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [activeTonicId, setActiveTonicId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, setState] = useState<AppState>({
    user: null,
    modules: INITIAL_MODULES,
    checklist: {},
    isLoggedIn: false
  });

  // Ensure scroll is at the top when switching views or tonics
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, activeTonicId]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('protocolo_v2_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.isLoggedIn) {
        setState(parsed);
        if (parsed.user?.onboardingCompleted) {
          setCurrentView(View.DASHBOARD);
        } else {
          setCurrentView(View.ONBOARDING);
        }
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('protocolo_v2_state', JSON.stringify(state));
  }, [state]);

  const handleLogin = (name: string, email: string) => {
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      user: { 
        ...MOCK_USER, 
        name: name || MOCK_USER.name, 
        email: email || MOCK_USER.email 
      }
    }));
    setCurrentView(View.ONBOARDING);
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { 
        ...prev.user, 
        profile, 
        onboardingCompleted: true,
        currentDay: 1
      } : null
    }));
    setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setState({
      user: null,
      modules: INITIAL_MODULES,
      checklist: {},
      isLoggedIn: false
    });
    setCurrentView(View.LOGIN);
    localStorage.removeItem('protocolo_v2_state');
  };

  const navigateToTonic = (id: string) => {
    setActiveTonicId(id);
    setCurrentView(View.TONIC_DETAIL);
  };

  const toggleTonicCheck = (date: string, type: 'main' | 'complementary', tonicId?: string) => {
    setState(prev => {
      const current = prev.checklist[date] || { date, mainTonic: false, complementary: [] };
      if (type === 'main') {
        const isNowDone = !current.mainTonic;
        const newStreak = isNowDone ? (prev.user?.streak || 0) + 1 : Math.max(0, (prev.user?.streak || 0) - 1);
        return {
          ...prev,
          user: prev.user ? { ...prev.user, streak: newStreak } : null,
          checklist: {
            ...prev.checklist,
            [date]: { ...current, mainTonic: isNowDone }
          }
        };
      } else if (tonicId) {
        const isPresent = current.complementary.includes(tonicId);
        const newComp = isPresent 
          ? current.complementary.filter(id => id !== tonicId) 
          : [...current.complementary, tonicId];
        return {
          ...prev,
          checklist: {
            ...prev.checklist,
            [date]: { ...current, complementary: newComp }
          }
        };
      }
      return prev;
    });
  };

  const renderView = () => {
    const today = new Date().toISOString().split('T')[0];
    const isTodayDone = state.checklist[today]?.mainTonic || false;

    switch (currentView) {
      case View.LOGIN:
        return <LoginView onLogin={handleLogin} />;
      case View.ONBOARDING:
        return <OnboardingView onComplete={handleOnboardingComplete} />;
      case View.DASHBOARD:
        return <DashboardView 
          state={state} 
          onNavigate={setCurrentView} 
          onTonicNavigate={navigateToTonic}
          onTonicToggle={toggleTonicCheck}
        />;
      case View.TONIC_DETAIL:
        return <TonicDetailView 
          tonic={TONICS[activeTonicId || 'anti-broxada']} 
          isMain={activeTonicId === (PROBLEM_TO_TONIC[state.user?.profile?.mainProblem as ProblemType])}
          onBack={() => setCurrentView(View.DASHBOARD)}
          onNavigate={setCurrentView}
          onMarkDone={(id) => toggleTonicCheck(today, id === (PROBLEM_TO_TONIC[state.user?.profile?.mainProblem as ProblemType]) ? 'main' : 'complementary', id)}
          isDone={activeTonicId === (PROBLEM_TO_TONIC[state.user?.profile?.mainProblem as ProblemType]) ? isTodayDone : state.checklist[today]?.complementary?.includes(activeTonicId!)}
        />;
      case View.CATALOG:
        return <CatalogView 
          onBack={() => setCurrentView(View.DASHBOARD)} 
          onTonicNavigate={navigateToTonic}
          onNavigate={setCurrentView}
          mainProblem={state.user?.profile?.mainProblem as ProblemType || 'broxada'}
        />;
      case View.TRACKER:
        return <TrackerView state={state} onBack={() => setCurrentView(View.DASHBOARD)} toggleCheck={(date, type) => toggleTonicCheck(date, type === 'morning' ? 'main' : 'complementary')} />;
      case View.BONUSES:
        return <BonusesView onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.PROFILE:
        return <ProfileView state={state} onBack={() => setCurrentView(View.DASHBOARD)} onLogout={handleLogout} onNavigate={setCurrentView} />;
      case View.SCIENCE:
        return <ScienceView onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.WARRANTY:
        return <WarrantyView onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.HELP:
        return <HelpView onBack={() => setCurrentView(View.DASHBOARD)} />;
      case View.MODULE:
        return <ModuleView module={state.modules[0]} onBack={() => setCurrentView(View.DASHBOARD)} onNavigate={setCurrentView} />;
      default:
        return <DashboardView state={state} onNavigate={setCurrentView} onTonicNavigate={navigateToTonic} onTonicToggle={toggleTonicCheck} />;
    }
  };

  if (currentView === View.LOGIN) {
    return <LoginView onLogin={handleLogin} />;
  }

  if (currentView === View.ONBOARDING) {
    return <OnboardingView onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pt-16">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={setCurrentView} 
        onLogout={handleLogout}
        currentView={currentView}
      />

      <header className="fixed top-0 left-0 right-0 glass z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-[#1B4D3E] hover:bg-gray-100 rounded-xl transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3" onClick={() => setCurrentView(View.DASHBOARD)} style={{cursor: 'pointer'}}>
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              <Logo size={24} />
            </div>
            <span className="font-poppins font-bold text-lg hidden sm:block whitespace-nowrap text-[#1B4D3E]">Protocolo Força Natural</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div onClick={() => setCurrentView(View.PROFILE)} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded-2xl transition-all">
            <div className="w-8 h-8 bg-[#1B4D3E]/10 text-[#1B4D3E] rounded-full flex items-center justify-center overflow-hidden font-bold text-xs uppercase">
              {state.user?.name.charAt(0)}
            </div>
            <span className="text-sm font-bold text-[#1B4D3E] hidden sm:block">{state.user?.name.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20 md:py-16 animate-in fade-in duration-500">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 glass md:hidden z-50 grid grid-cols-5 items-center py-4 px-2 border-t border-gray-100">
        <NavButton active={currentView === View.DASHBOARD} icon={<Home size={24} />} label="Home" onClick={() => setCurrentView(View.DASHBOARD)} />
        <NavButton active={currentView === View.CATALOG} icon={<Beaker size={24} />} label="Tônicos" onClick={() => setCurrentView(View.CATALOG)} />
        <NavButton active={currentView === View.TRACKER} icon={<TrendingUp size={24} />} label="Stats" onClick={() => setCurrentView(View.TRACKER)} />
        <NavButton active={currentView === View.BONUSES} icon={<Gift size={24} />} label="Bônus" onClick={() => setCurrentView(View.BONUSES)} />
        {/* Dedicated empty space for the floating support button */}
        <div className="flex flex-col items-center justify-center opacity-0 pointer-events-none select-none">
          <div className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-widest">Suporte</span>
        </div>
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 flex-1 transition-all ${active ? 'text-[#1B4D3E] scale-110' : 'text-[#86868B]'}`}>
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default App;
