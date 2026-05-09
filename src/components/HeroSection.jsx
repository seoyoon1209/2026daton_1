import { useState, useEffect } from 'react';
import { TbHeartbeat } from 'react-icons/tb';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { RiSignalTowerLine } from 'react-icons/ri';

const texts = [
  "심방세동 발생 예측",
  "환자별 위험 변수 분석",
  "SHAP · LIME 기반 설명",
  "임상 의사결정 지원",
];

export default function HeroSection() {
  const [textIdx, setTextIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setTextIdx((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-float"
          style={{ background: 'radial-gradient(circle, #be185d, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 animate-float2"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #f43f5e, transparent 70%)' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-sm">
          <RiSignalTowerLine size={14} style={{ color: '#34d399' }} />
          <span className="text-slate-300">2026 데이터톤</span>
          <span className="text-slate-500">·</span>
          <span className="gradient-text font-semibold">7조 MADE</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
          <span style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            심방세동
          </span>
          <br />
          <span className="text-white">예측 AI</span>
        </h1>

        <div className="text-2xl md:text-3xl text-slate-300 mb-4 h-10 flex items-center justify-center gap-1">
          <span style={{ color: '#f472b6' }}>{displayed}</span>
          <span className="cursor-blink" style={{ background: '#f472b6' }} />
        </div>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          수술 중 수집된 생체 데이터를 바탕으로<br />
          <strong className="text-white">심방세동(Atrial Fibrillation) 발생 여부</strong>를 예측하고<br />
          예측에 영향을 준 변수를 설명합니다
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.getElementById('final-result').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-2xl font-semibold text-lg text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #be185d, #7c3aed)', boxShadow: '0 0 40px rgba(190,24,93,0.3)' }}
          >
            <TbHeartbeat size={20} />
            최종 결과 보기
            <HiOutlineChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-slate-500 tracking-widest uppercase">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}
