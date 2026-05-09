import { useState } from 'react';
import { finalResultRows } from '../data/poafResults';
import { TbTrophy, TbX, TbChartLine, TbChartBar, TbZoomQuestion } from 'react-icons/tb';

const headers = [
  { key: 'metric', label: '지표' },
  { key: 'lightgbm', label: 'LightGBM' },
  { key: 'xgboost', label: 'XGBoost' },
  { key: 'randomForest', label: 'RandomForest' },
];

const BASE = process.env.PUBLIC_URL || '';

const CHARTS = [
  { icon: <TbChartLine size={22} />, title: 'Optuna 탐색 히스토리', sub: 'OOF AUROC', src: `${BASE}/optuna_history.png`, color: '#60a5fa' },
  { icon: <TbChartBar size={22} />, title: '이상치 분포', sub: 'POAF별 박스플롯', src: `${BASE}/boxplot.png`, color: '#f472b6' },
  { icon: <TbZoomQuestion size={22} />, title: 'SHAP Feature Importance', sub: '3개 모델 비교', src: `${BASE}/shap_importance.png`, color: '#34d399' },
];

function Modal({ chart, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden"
        style={{ border: `1px solid ${chart.color}44` }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4"
          style={{ background: 'rgba(20,20,30,0.95)' }}>
          <div className="flex items-center gap-3">
            <span style={{ color: chart.color }}>{chart.icon}</span>
            <div>
              <div className="font-bold text-white">{chart.title}</div>
              <div className="text-base" style={{ color: chart.color }}>{chart.sub}</div>
            </div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <TbX size={18} className="text-slate-300" />
          </button>
        </div>
        <div style={{ background: '#fff', maxHeight: '75vh', overflowY: 'auto' }}>
          <img src={chart.src} alt={chart.title} className="w-full h-auto block" />
        </div>
      </div>
    </div>
  );
}

export default function FinalResultSection() {
  const [active, setActive] = useState(null);

  return (
    <section id="final-result" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-base text-slate-400">
            <TbTrophy size={14} style={{ color: '#f59e0b' }} />
            모델 성능 비교
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span style={{ background: 'linear-gradient(135deg, #f59e0b, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              어떻게 성능이 나왔나요?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Optuna 튜닝 기반 3개 모델의 테스트셋 성능을 비교합니다
          </p>
        </div>

        <div className="glass rounded-[2rem] p-4 md:p-8">
          <div
            className="rounded-[1.5rem] border px-4 py-5 md:px-8 md:py-7"
            style={{
              background: '#1a1b1d',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
            }}
          >
            <div className="font-mono text-slate-300">
              <div className="text-xl md:text-3xl leading-snug">
                <span className="font-semibold text-white">성능 지표</span>
                <span className="ml-2 text-slate-400">(Optuna 튜닝 / 목표 Recall ≥ 0.8)</span>
              </div>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[760px] border-separate border-spacing-y-4">
                  <thead>
                    <tr className="text-left text-2xl text-slate-300">
                      {headers.map((header) => (
                        <th
                          key={header.key}
                          className={`pb-5 font-normal ${header.key === 'metric' ? 'w-[28%]' : 'w-[24%]'}`}
                        >
                          {header.label}
                        </th>
                      ))}
                    </tr>
                    <tr>
                      <th colSpan={4} className="h-px bg-white/10 p-0" />
                    </tr>
                  </thead>
                  <tbody className="text-2xl md:text-[2rem] leading-none text-slate-300">
                    {finalResultRows.map((row) => (
                      <tr key={row.metric}>
                        <td className="py-1 pr-6 text-white/90">{row.metric}</td>
                        {['lightgbm', 'xgboost', 'randomForest'].map((model, i) => (
                          <td key={model} className={`py-1 ${i < 2 ? 'pr-6' : ''}`}>
                            <span className={row.highlight === model ? 'text-white' : ''}>{row[model]}</span>
                            {row.highlight === model ? <span className="ml-3 text-white">✓</span> : null}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 그래프 버튼 */}
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {CHARTS.map((chart, i) => (
              <button
                key={i}
                onClick={() => setActive(chart)}
                className="flex items-center gap-3 rounded-2xl px-5 py-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: `${chart.color}10`,
                  border: `1px solid ${chart.color}30`,
                }}
              >
                <span style={{ color: chart.color }}>{chart.icon}</span>
                <div>
                  <div className="font-semibold text-white text-base leading-snug">{chart.title}</div>
                  <div className="text-sm mt-0.5" style={{ color: chart.color }}>{chart.sub}</div>
                </div>
                <span className="ml-auto text-slate-500 text-lg">↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {active && <Modal chart={active} onClose={() => setActive(null)} />}
    </section>
  );
}
