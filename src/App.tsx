import { useState } from 'react';
import type { SeekerTab, MerchantTab, Job } from './types';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { SeekerDashboard } from './components/seeker/SeekerDashboard';
import { MerchantDashboard } from './components/merchant/MerchantDashboard';
import { JobDetailModal } from './components/JobDetailModal';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { Sparkles, Battery, Wifi, Signal } from 'lucide-react';

function MainAppShell() {
  const { currentUser, applyToJob } = useApp();

  const [seekerTab, setSeekerTab] = useState<SeekerTab>('dashboard');
  const [merchantTab, setMerchantTab] = useState<MerchantTab>('dashboard');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

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

  // If not logged in, render professional Login Portal
  if (!currentUser) {
    return (
      <>
        <LoginPage />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </>
    );
  }

  // Active Role views
  const renderDashboard = () => {
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

  // Content Shell
  const content = (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <Navbar
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
      />

      <main className="flex-1 w-full">{renderDashboard()}</main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        role={currentUser.role}
        seekerTab={seekerTab}
        setSeekerTab={setSeekerTab}
        merchantTab={merchantTab}
        setMerchantTab={setMerchantTab}
      />

      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApply={handleApplyFromModal}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );

  // If mobile frame is enabled on desktop, render within a sleek smartphone mockup container
  if (isMobileFrame) {
    return (
      <div className="min-h-screen bg-slate-900 py-6 px-4 flex flex-col items-center justify-center">
        {/* Frame Top Controls */}
        <div className="text-center mb-3 text-slate-400 text-xs flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Hackathon Mobile Prototype View
          </span>
          <span>•</span>
          <button
            type="button"
            onClick={() => setIsMobileFrame(false)}
            className="text-white underline hover:text-indigo-300 transition-colors cursor-pointer"
          >
            Switch to Full Width
          </button>
        </div>

        {/* Smartphone Shell Frame */}
        <div className="w-full max-w-[412px] h-[860px] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-12 ring-slate-800 ring-offset-4 ring-offset-slate-950 flex flex-col overflow-hidden relative">
          {/* Speaker / Dynamic Island Notch */}
          <div className="w-28 h-5 bg-slate-900 rounded-full mx-auto my-1.5 flex items-center justify-center shrink-0 z-50">
            <div className="w-3 h-3 rounded-full bg-slate-800 mr-2" />
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-950/70" />
          </div>

          {/* Mobile Status Bar */}
          <div className="px-6 py-1 flex items-center justify-between text-[11px] font-semibold text-slate-700 bg-white shrink-0 z-40 select-none">
            <span>9:41 AM</span>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>

          {/* Screen Content Scroll Area */}
          <div className="flex-1 bg-slate-50 overflow-y-auto relative rounded-b-[36px] flex flex-col">
            <Navbar
              isMobileFrame={isMobileFrame}
              setIsMobileFrame={setIsMobileFrame}
            />

            <div className="flex-1 pb-16">{renderDashboard()}</div>

            {/* Mobile Bottom Navigation Bar inside frame */}
            <BottomNav
              role={currentUser.role}
              seekerTab={seekerTab}
              setSeekerTab={setSeekerTab}
              merchantTab={merchantTab}
              setMerchantTab={setMerchantTab}
            />

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
