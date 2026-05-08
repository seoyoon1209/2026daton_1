import { useEffect, useRef, useState } from 'react';
import { TbTargetArrow, TbChartBar, TbRadar, TbMathFunction } from 'react-icons/tb';

// TODO: 실제 confusion matrix 값으로 교체하세요
const CM = { tp: 312, fp: 48, fn: 67, tn: 1043 };

const total = CM.tp + CM.fp + CM.fn + CM.tn;
const accuracy  = ((CM.tp + CM.tn) / total * 100).toFixed(1);
const precision = (CM.tp / (CM.tp + CM.fp) * 100).toFixed(1);
const recall    = (CM.tp / (CM.tp + CM.fn) * 100).toFixed(1);
const f1        = (2 * CM.tp / (2 * CM.tp + CM.fp + CM.fn) * 100).toFixed(1);
const auc       = '91.4'; // TODO: 실제 값으로 교체

const metrics = [
  { label: 'Accuracy',  value: accuracy,  suffix: '%', color: '#a78bfa', icon: <TbTargetArrow size={20} /> },
  { label: 'Precision', value: precision, suffix: '%', color: '#60a5fa', icon: <TbChartBar size={20} /> },
  { label: 'Recall',    value: recall,    suffix: '%', color: '#f472b6', icon: <TbRadar size={20} /> },
  { label: 'F1-Score',  value: f1,        suffix: '%', color: '#34d399', icon: <TbMathFunction size={20} /> },
];

function AnimatedBar({ value, color, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(parseFloat(value)), delay);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay]);
  return (
    <div ref={ref} className="h-2 bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, background: color }} />
    </div>
  );
}

export default function PerformanceSection() {
  return (
    <section id="performance" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-slate-400">
            <TbTargetArrow size={14} style={{ color: '#a78bfa' }} />
            모델 성능 평가
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">이런 성능이 나왔습니다</span>
          </h2>
          <p className="text-slate-400 text-lg">심방세동 예측 모델의 분류 성능 결과</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Confusion Matrix */}
          <div className="glass rounded-3xl p-8">
            <div className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <TbChartBar size={20} style={{ color: '#f472b6' }} />
              Confusion Matrix
            </div>

            {/* axis labels */}
            <div className="flex gap-4">
              <div className="w-20 shrink-0" />
              <div className="flex-1 grid grid-cols-2 gap-2 mb-2">
                <div className="text-center text-xs text-slate-500 font-medium">예측: 음성 (0)</div>
                <div className="text-center text-xs text-slate-500 font-medium">예측: 양성 (1)</div>
              </div>
            </div>

            <div className="space-y-2">
              {/* TN / FP row */}
              <div className="flex items-center gap-4">
                <div className="w-20 text-xs text-slate-500 text-right leading-tight shrink-0">
                  실제:<br />음성 (0)
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl p-5 text-center"
                    style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
                    <div className="text-3xl font-bold" style={{ color: '#34d399' }}>{CM.tn.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 mt-1">TN</div>
                    <div className="text-xs text-slate-500">정확한 음성</div>
                  </div>
                  <div className="rounded-2xl p-5 text-center"
                    style={{ background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.3)' }}>
                    <div className="text-3xl font-bold" style={{ color: '#fb923c' }}>{CM.fp.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 mt-1">FP</div>
                    <div className="text-xs text-slate-500">오탐지</div>
                  </div>
                </div>
              </div>
              {/* FN / TP row */}
              <div className="flex items-center gap-4">
                <div className="w-20 text-xs text-slate-500 text-right leading-tight shrink-0">
                  실제:<br />양성 (1)
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div className="rounded-2xl p-5 text-center"
                    style={{ background: 'rgba(251,146,60,0.12)', border: '1px solid rgba(251,146,60,0.3)' }}>
                    <div className="text-3xl font-bold" style={{ color: '#fb923c' }}>{CM.fn.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 mt-1">FN</div>
                    <div className="text-xs text-slate-500">미탐지</div>
                  </div>
                  <div className="rounded-2xl p-5 text-center"
                    style={{ background: 'rgba(244,114,182,0.12)', border: '1px solid rgba(244,114,182,0.3)' }}>
                    <div className="text-3xl font-bold" style={{ color: '#f472b6' }}>{CM.tp.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 mt-1">TP</div>
                    <div className="text-xs text-slate-500">정확한 양성</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between text-sm text-slate-500">
              <span>전체 {total.toLocaleString()}건</span>
              <span style={{ color: '#f472b6' }}>AUC-ROC <strong>{auc}%</strong></span>
            </div>
          </div>

          {/* Metrics bars */}
          <div className="space-y-5">
            {metrics.map((m, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span style={{ color: m.color }}>{m.icon}</span>
                    <span className="font-semibold text-white">{m.label}</span>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: m.color }}>
                    {m.value}{m.suffix}
                  </span>
                </div>
                <AnimatedBar value={m.value} color={m.color} delay={i * 150} />
              </div>
            ))}

            {/* AUC card */}
            <div className="glass rounded-2xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TbTargetArrow size={20} style={{ color: '#a78bfa' }} />
                <span className="font-semibold text-white">AUC-ROC</span>
              </div>
              <span className="text-2xl font-bold" style={{ color: '#a78bfa' }}>{auc}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
