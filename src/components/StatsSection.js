import { useEffect, useRef, useState } from 'react';
import { TbTargetArrow, TbDatabase, TbRadar, TbClock } from 'react-icons/tb';

const stats = [
  { value: 95.3, suffix: '%', label: 'AUC-ROC', desc: '모델 판별 성능', color: '#a78bfa', icon: <TbTargetArrow size={24} /> },
  { value: 32476, suffix: '', label: '학습 케이스', desc: 'INSPIRE 수술 데이터', color: '#60a5fa', icon: <TbDatabase size={24} /> },
  { value: 89.7, suffix: '%', label: '민감도', desc: '저산소혈증 탐지율', color: '#34d399', icon: <TbRadar size={24} /> },
  { value: 5, suffix: '분', label: '사전 예측', desc: '발생 전 조기 경보', color: '#f59e0b', icon: <TbClock size={24} /> },
];

function AnimatedNumber({ target, suffix, color }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          setCount(current);
          if (current >= target) clearInterval(timer);
        }, duration / steps);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ color }}>
      {Number.isInteger(target) ? Math.round(count) : count.toFixed(1)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="glass glass-hover rounded-3xl p-6 text-center">
              <div className="flex justify-center mb-3" style={{ color: s.color }}>{s.icon}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedNumber target={s.value} suffix={s.suffix} color={s.color} />
              </div>
              <div className="font-semibold text-white mb-1">{s.label}</div>
              <div className="text-sm text-slate-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
