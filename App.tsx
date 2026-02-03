
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, AppState, UserProfile, Tonic, ProblemType } from './types.ts';
import { MOCK_USER, INITIAL_MODULES, TONICS, PROBLEM_TO_TONIC, COLORS } from './constants.tsx';
import { LoginView } from './views/LoginView.tsx';
import { OnboardingView } from './views/OnboardingView.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { TonicDetailView } from './views/TonicDetailView.tsx';
import { CatalogView } from './views/CatalogView.tsx';
import { PremiumView } from './views/PremiumView.tsx';
import { TrackerView } from './views/TrackerView.tsx';
import { ChecklistView } from './views/ChecklistView.tsx';
import { BonusesView } from './views/BonusesView.tsx';
import { ProfileView } from './views/ProfileView.tsx';
import { WarrantyView } from './views/WarrantyView.tsx';
import { HelpView } from './views/HelpView.tsx';
import { ScienceView } from './views/ScienceView.tsx';
import { ExclusivePackageView } from './views/ExclusivePackageView.tsx';
import { ExclusivePackage2View } from './views/ExclusivePackage2View.tsx';
import { WelcomeModal } from './components/WelcomeModal.tsx';
import { Logo } from './components/Logo.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Home, Beaker, Crown, Zap, Gift, Menu, ListChecks } from 'lucide-react';

const VIEW_TO_HASH: Record<View, string> = {
  [View.DASHBOARD]: 'dashboard',
  [View.CATALOG]: 'catalogo',
  [View.PREMIUM]: 'premium',
  [View.TRACKER]: 'turbo',
  [View.CHECKLIST]: 'checklist',
  [View.BONUSES]: 'bonus',
  [View.WARRANTY]: 'garantia',
  [View.HELP]: 'suporte',
  [View.SCIENCE]: 'ciencia',
  [View.PROFILE]: 'perfil',
  [View.MODULE]: 'modulo',
  [View.TONIC_DETAIL]: 'tonico',
  [View.EXCLUSIVE_PACKAGE]: 'tonico-cavalo',
  [View.EXCLUSIVE_PACKAGE_2]: 'guia-posicoes',
  [View.LOGIN]: 'login',
  [View.ONBOARDING]: 'onboarding'
};

const HASH_TO_VIEW: Record<string, View> = Object.entries(VIEW_TO_HASH).reduce(
  (acc, [view, hash]) => ({ ...acc, [hash]: view as View }),
  {}
);

// Função auxiliar para carregar o estado inicial de forma síncrona
const loadPersistedState = (): AppState => {
  const saved = localStorage.getItem('protocolo_premium_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Garantir que módulos iniciais existam se o estado salvo for antigo
      return {
        ...parsed,
        modules: parsed.modules || INITIAL_MODULES
      };
    } catch (e) {
      console.error("Erro ao carregar dados salvos", e);
    }
  }
  return {
    user: null,
    modules: INITIAL_MODULES,
    checklist: {},
    isLoggedIn: false,
    hasSeenWelcomeVideo: false
  };
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(loadPersistedState());
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [activeTonicId, setActiveTonicId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Navegação baseada em Hash
  const navigateTo = (view: View, id?: string) => {
    let hash = VIEW_TO_HASH[view];
    if (view === View.TONIC_DETAIL && id) {
      hash = `${hash}/${id}`;
    }
    window.location.hash = hash;
  };

  // Gerenciador de Roteamento Centralizado
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '');
      const [hashBase, id] = fullHash.split('/');
      
      // Decidir qual a view correta baseada no estado de login e na URL desejada
      let targetView = HASH_TO_VIEW[hashBase];

      if (!state.isLoggedIn) {
        // Se não logado, só pode ver Login
        if (targetView !== View.LOGIN) {
          window.location.hash = 'login';
          return;
        }
      } else if (!state.user?.onboardingCompleted) {
        // Se logado mas sem onboarding, forçar onboarding
        if (targetView !== View.ONBOARDING) {
          window.location.hash = 'onboarding';
          return;
        }
      } else {
        // Se logado e com onboarding, não pode ver Login ou Onboarding
        if (!targetView || targetView === View.LOGIN || targetView === View.ONBOARDING) {
          window.location.hash = 'dashboard';
          return;
        }
      }

      setCurrentView(targetView || (state.isLoggedIn ? View.DASHBOARD : View.LOGIN));
      if (id) setActiveTonicId(id);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Disparar uma vez manualmente para validar a rota inicial
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [state.isLoggedIn, state.user?.onboardingCompleted]);

  // Persistência automática
  useEffect(() => {
    localStorage.setItem('protocolo_premium_state', JSON.stringify(state));
  }, [state]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, activeTonicId]);

  const handleLogin = async (name: string, email: string) => {
    const newUser = { 
      ...MOCK_USER, 
      name, 
      email,
      createdAt: new Date().toISOString(),
      loginCount: 1,
      onboardingCompleted: false
    };
    
    // Webhook 1: Clientes (Sincronização de Login)
    try {
      fetch('https://nen.auto-jornada.space/webhook/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, qtd_login: 1, nome: name }),
      }).catch(e => console.error("Webhook 1 failed", e));
    } catch (e) {}

    setState(prev => ({ ...prev, isLoggedIn: true, user: newUser }));
    navigateTo(View.ONBOARDING);
  };

  const handleOnboardingComplete = async (profile: UserProfile) => {
    // Webhook 2: Clientes Infos (Todos os dados do formulário)
    try {
      fetch('https://nen.auto-jornada.space/webhook/clientes-infos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...profile, 
          email: state.user?.email, 
          nome: state.user?.name,
          date: new Date().toISOString()
        }),
      }).catch(e => console.error("Webhook 2 failed", e));
    } catch (e) {}

    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, profile, onboardingCompleted: true } : null
    }));
    navigateTo(View.DASHBOARD);
  };

  const handleLogout = () => {
    localStorage.removeItem('protocolo_premium_state');
    setState({ user: null, modules: INITIAL_MODULES, checklist: {}, isLoggedIn: false, hasSeenWelcomeVideo: false });
    window.location.hash = 'login';
  };

  const handleTonicToggle = (date: string, type: 'main' | 'complementary', tonicId?: string) => {
    setState(prev => {
      const current = prev.checklist[date] || { date, mainTonic: false, complementary: [] };
      let updated = { ...current };

      if (type === 'main') {
        updated.mainTonic = !updated.mainTonic;
      } else if (type === 'complementary' && tonicId) {
        updated.complementary = updated.complementary.includes(tonicId)
          ? updated.complementary.filter(id => id !== tonicId)
          : [...updated.complementary, tonicId];
      }

      return { ...prev, checklist: { ...prev.checklist, [date]: updated } };
    });
  };

  const closeWelcomeModal = () => {
    setState(prev => ({ ...prev, hasSeenWelcomeVideo: true }));
  };

  const renderView = () => {
    switch (currentView) {
      case View.LOGIN: return <LoginView onLogin={handleLogin} />;
      case View.ONBOARDING: return <OnboardingView onComplete={handleOnboardingComplete} />;
      case View.DASHBOARD: return <DashboardView state={state} onNavigate={navigateTo} onTonicNavigate={(id) => navigateTo(View.TONIC_DETAIL, id)} onTonicToggle={handleTonicToggle} />;
      case View.CATALOG: return <CatalogView onBack={() => navigateTo(View.DASHBOARD)} onTonicNavigate={(id) => navigateTo(View.TONIC_DETAIL, id)} onNavigate={navigateTo} mainProblem={state.user?.profile?.mainProblem as ProblemType || 'broxada'} />;
      case View.PREMIUM: return <PremiumView onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.TRACKER: return <TrackerView state={state} onBack={() => navigateTo(View.DASHBOARD)} onNavigate={navigateTo} toggleCheck={handleTonicToggle} />;
      case View.CHECKLIST: return <ChecklistView state={state} onBack={() => navigateTo(View.DASHBOARD)} onTonicToggle={handleTonicToggle} />;
      case View.BONUSES: return <BonusesView onBack={() => navigateTo(View.TRACKER)} />;
      case View.WARRANTY: return <WarrantyView onBack={() => navigateTo(View.DASHBOARD)} firstAccessDate={state.user?.createdAt || ''} />;
      case View.HELP: return <HelpView onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.SCIENCE: return <ScienceView onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.PROFILE: return <ProfileView state={state} onBack={() => navigateTo(View.DASHBOARD)} onLogout={handleLogout} onNavigate={navigateTo} />;
      case View.TONIC_DETAIL: {
        const tonic = TONICS[activeTonicId || ''] || TONICS['anti-broxada'];
        const isMain = activeTonicId === (PROBLEM_TO_TONIC[state.user?.profile?.mainProblem as ProblemType]);
        const today = new Date().toISOString().split('T')[0];
        const isDone = isMain ? (state.checklist[today]?.mainTonic || false) : (state.checklist[today]?.complementary?.includes(activeTonicId || '') || false);
        return <TonicDetailView tonic={tonic} isMain={isMain} onBack={() => navigateTo(View.CATALOG)} onNavigate={navigateTo} onMarkDone={(id) => handleTonicToggle(today, isMain ? 'main' : 'complementary', id)} isDone={isDone} />;
      }
      case View.EXCLUSIVE_PACKAGE: return <ExclusivePackageView onBack={() => navigateTo(View.TRACKER)} />;
      case View.EXCLUSIVE_PACKAGE_2: return <ExclusivePackage2View onBack={() => navigateTo(View.TRACKER)} />;
      default: return <DashboardView state={state} onNavigate={navigateTo} onTonicNavigate={(id) => navigateTo(View.TONIC_DETAIL, id)} onTonicToggle={handleTonicToggle} />;
    }
  };

  // Se o estado inicial já indicar login, renderizamos o layout com sidebar
  const isAuthPage = currentView === View.LOGIN || currentView === View.ONBOARDING;

  if (isAuthPage) return renderView();

  return (
    <div className="min-h-screen pb-24 md:pb-0 bg-[#F8F9FA]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={navigateTo} onLogout={handleLogout} currentView={currentView} />
      
      {state.isLoggedIn && state.user?.onboardingCompleted && !state.hasSeenWelcomeVideo && (
        <WelcomeModal onClose={closeWelcomeModal} userName={state.user.name} />
      )}

      <header className="fixed top-0 left-0 right-0 glass z-50 px-6 py-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-black hover:bg-gray-100 rounded-xl transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo(View.DASHBOARD)}>
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white">
              <Logo size={24} />
            </div>
            <span className="font-poppins font-black text-lg hidden sm:block tracking-tighter text-black uppercase">PROTOCOL <span className="text-[#E63946]">ELITE</span></span>
          </div>
        </div>
        <div onClick={() => navigateTo(View.PROFILE)} className="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center font-black text-sm uppercase shadow-lg cursor-pointer">
          {state.user?.name?.charAt(0) || 'U'}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 md:py-24">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 glass-dark md:hidden z-50 flex items-center py-5 px-6 pr-28 border-t border-white/5 justify-between shadow-2xl">
        <NavButton active={currentView === View.CATALOG} icon={<Beaker size={22} />} label="Tônicos" onClick={() => navigateTo(View.CATALOG)} />
        <NavButton active={currentView === View.PREMIUM} icon={<Crown size={22} />} label="Premium" onClick={() => navigateTo(View.PREMIUM)} />
        <NavButton active={currentView === View.TRACKER} icon={<Zap size={22} />} label="Turbo" onClick={() => navigateTo(View.TRACKER)} />
        <NavButton active={currentView === View.CHECKLIST} icon={<ListChecks size={22} />} label="Progresso" onClick={() => navigateTo(View.CHECKLIST)} />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all ${active ? 'text-[#E63946] scale-110' : 'text-gray-500'}`}>
    {icon}
    <span className="text-[9px] font-black uppercase tracking-[0.2em]">{label}</span>
  </button>
);

export default App;
