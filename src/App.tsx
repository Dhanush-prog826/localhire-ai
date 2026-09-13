import { useState, useEffect } from 'react';
import type { SeekerTab, MerchantTab, Job } from './types';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SeekerDashboard } from './components/seeker/SeekerDashboard';
import { MerchantDashboard } from './components/merchant/MerchantDashboard';
import { JobDetailModal } from './components/JobDetailModal';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { Sparkles, Battery, Wifi, Signal } from 'lucide-react';

function MainAppShell() {
  const { currentUser, login, switchRole, applyToJob } = useApp();

  const [currentView, setCurrentView] = useState<'home' | 'portal' | 'login'>('home');
  const [seekerTab, setSeekerTab] = useState<SeekerTab>('dashboard');
  const [merchantTab, setMerchantTab] = useState<MerchantTab>('dashboard');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // If user logs out while on portal, transition back to home
  useEffect(() => {
    if (!currentUser && currentView === 'portal') {
      setCurrentView('home');
    }
  }, [currentUser, currentView]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 4000);
  };

  const handleApplyFromModal = (job: Job) => {
    const res = applyToJob(job);
    showToast(res.message);
  };

  const handleFindJob = () => {
    if (!currentUser) {
      login('seeker', '', true);
    } else if (currentUser.role !== 'seeker') {
      switchRole('seeker');
    }
    setSeekerTab('jobs');
    setCurrentView('portal');
    showToast('Switched to Job Seeker mode (Rahul • 94% Match)');
  };

  const handlePostJob = () => {
    if (!currentUser) {
      login('merchant', '', true);
    } else if (currentUser.role !== 'merchant') {
      switchRole('merchant');
    }
    setMerchantTab('dashboard');
    setCurrentView('portal');
    showToast('Switched to Merchant mode (ABC Supermarket)');
  };

  // If viewing explicit Login Page
  if (currentView === 'login') {
    return (
      <>
        <LoginPage
          onLoginSuccess={() => setCurrentView('portal')}
          onBackToHome={() => setCurrentView('home')}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </>
    );
  }

  // Active Role Dashboard
  const renderDashboard = () => {
    if (!currentUser) {
      return (
        <LoginPage
          onLoginSuccess={() => setCurrentView('portal')}
          onBackToHome={() => setCurrentView('home')}
        />
      );
    }

    if (currentUser.role === 'seeker') {
      return (
        <SeekerDashboard
          activeTab={seekerTab}
          setActiveTab={setSeekerTab}
          onViewJob={(job) => setSelectedJob(job)}
        />
      );
    }

    return (
      <MerchantDashboard
        activeTab={merchantTab}
        setActiveTab={setMerchantTab}
        onNotify={showToast}
      />
    );
  };

  // View body
  const renderMainContent = () => {
    if (currentView === 'home') {
      return (
        <HomePage
          onFindJob={handleFindJob}
          onPostJob={handlePostJob}
          onSignIn={() => setCurrentView('login')}
        />
      );
    }
    return renderDashboard();
  };

  // Responsive full-width layout
  const content = (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100 relative selection:bg-cyan-500 selection:text-zinc-950">
      <Navbar
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
        currentView={currentView}
        onNavigateHome={() => setCurrentView('home')}
        onNavigatePortal={() => setCurrentView('portal')}
        onFindJob={handleFindJob}
        onPostJob={handlePostJob}
        onOpenLogin={() => setCurrentView('login')}
      />

      <main className="flex-1 w-full">{renderMainContent()}</main>

      {/* Show BottomNav only when on portal and user is logged in */}
      {currentView === 'portal' && currentUser && (
        <BottomNav
          role={currentUser.role}
          seekerTab={seekerTab}
          setSeekerTab={setSeekerTab}
          merchantTab={merchantTab}
          setMerchantTab={setMerchantTab}
        />
      )}

      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={handleApplyFromModal}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );

  // Smartphone simulator for hackathon showcase
  if (isMobileFrame) {
    return (
      <div className="min-h-screen bg-black/95 py-6 px-4 flex flex-col items-center justify-center">
        {/* Frame Top Controls */}
        <div className="text-center mb-3 text-zinc-400 text-xs flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cyan-400 font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            HOLOGRAPHIC MOBILE VIEW // 412x860
          </span>
          <span className="text-zinc-600">•</span>
          <button
            type="button"
            onClick={() => setIsMobileFrame(false)}
            className="text-white underline hover:text-cyan-400 transition-colors cursor-pointer font-mono"
          >
            [FULL VIEW]
          </button>
        </div>

        {/* Smartphone Shell Frame */}
        <div className="w-full max-w-[412px] h-[860px] bg-black rounded-[48px] p-3 shadow-[0_0_50px_rgba(14,165,233,0.25)] ring-8 ring-zinc-900 ring-offset-4 ring-offset-black flex flex-col overflow-hidden relative border border-blue-950/70">
          {/* Speaker / Dynamic Island Notch */}
          <div className="w-28 h-5 bg-zinc-950 rounded-full mx-auto my-1.5 flex items-center justify-center shrink-0 z-50 border border-zinc-900">
            <div className="w-3 h-3 rounded-full bg-zinc-900 mr-2" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-950/80 border border-cyan-500/40" />
          </div>

          {/* Mobile Status Bar */}
          <div className="px-6 py-1 flex items-center justify-between text-[11px] font-mono font-bold text-zinc-400 bg-black shrink-0 z-40 select-none border-b border-zinc-900">
            <span>09:41</span>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>

          {/* Screen Content Scroll Area */}
          <div className="flex-1 bg-[#050505] text-slate-100 overflow-y-auto relative rounded-b-[36px] flex flex-col">
            <Navbar
              isMobileFrame={isMobileFrame}
              setIsMobileFrame={setIsMobileFrame}
              currentView={currentView}
              onNavigateHome={() => setCurrentView('home')}
              onNavigatePortal={() => setCurrentView('portal')}
              onFindJob={handleFindJob}
              onPostJob={handlePostJob}
              onOpenLogin={() => setCurrentView('login')}
            />

            <div className={`flex-1 ${currentView === 'portal' ? 'pb-16' : ''}`}>
              {renderMainContent()}
            </div>

            {/* Mobile Bottom Navigation Bar inside frame */}
            {currentView === 'portal' && currentUser && (
              <BottomNav
                role={currentUser.role}
                seekerTab={seekerTab}
                setSeekerTab={setSeekerTab}
                merchantTab={merchantTab}
                setMerchantTab={setMerchantTab}
              />
            )}

            <JobDetailModal
              job={selectedJob}
              onClose={() => setSelectedJob(null)}
              onApply={handleApplyFromModal}
            />

            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
          </div>

          {/* Home Bar */}
          <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto my-1.5 shrink-0" />
        </div>
      </div>
    );
  }

  return content;
}

export function App() {
  return (
    <AppProvider>
      <MainAppShell />
    </AppProvider>
  );
}

export default App;
