import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BackgroundSection from './components/BackgroundSection';
import DataSection from './components/DataSection';
import MethodSection from './components/MethodSection';
import PerformanceSection from './components/PerformanceSection';
import ClinicalSection from './components/ClinicalSection';
import ApplicationSection from './components/ApplicationSection';
import DemoSection from './components/DemoSection';
import { TbHeartbeat } from 'react-icons/tb';

function App() {
  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <BackgroundSection />
      <DataSection />
      <MethodSection />
      <PerformanceSection />
      <ClinicalSection />
      <ApplicationSection />
      <DemoSection />
      <footer className="py-12 text-center text-slate-600 text-sm border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TbHeartbeat size={18} style={{ color: '#f472b6' }} />
            <span className="font-medium text-slate-400">MADE Dataton 2026</span>
          </div>
          <p>INSPIRE Dataset · 심방세동(AF) 발생 예측 AI · SHAP · LIME · XGBoost</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
