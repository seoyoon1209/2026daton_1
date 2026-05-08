import { useState } from 'react';
import { TbChartBar, TbSearch, TbHeartbeat } from 'react-icons/tb';
import { HiOutlineSparkles } from 'react-icons/hi';

// TODO: 실제 SHAP/LIME 값으로 교체하세요 (AF=1 예측 시 평균 기여도)
const SHAP_DATA = [
  { feature: '나이',           value: 0.38,  direction: 'pos' },
  { feature: '수술 시간',       value: 0.31,  direction: 'pos' },
  { feature: '심박수 변동성',    value: 0.27,  direction: 'pos' },
  { feature: 'SpO₂ 최솟값',    value: -0.22, direction: 'neg' },
  { feature: '수축기 혈압',     value: 0.19,  direction: 'pos' },
  { feature: 'EtCO₂ 변동',     value: 0.15,  direction: 'pos' },
  { feature: '체온',            value: -0.11, direction: 'neg' },
];

const LIME_DATA = [
  { feature: '나이 ≥ 65',       value: 0.41,  direction: 'pos' },
  { feature: '수술 시간 > 3h',   value: 0.29,  direction: 'pos' },
  { feature: '심박수 변동 > 20', value: 0.24,  direction: 'pos' },
  { feature: 'SpO₂ < 96%',      value: -0.20, direction: 'neg' },
  { feature: '고혈압 이력',      value: 0.18,  direction: 'pos' },
  { feature: '전신마취',         value: 0.13,  direction: 'pos' },
  { feature: '체온 < 36°C',      value: -0.10, direction: 'neg' },
];

function FeatureBar({ feature, value, direction, maxVal }) {
  const pct = Math.abs(value) / maxVal * 100;
  const color = direction === 'pos' ? '#f472b6' : '#60a5fa';
  const label = direction === 'pos' ? '위험↑' : '위험↓';

  return (
    <div className="flex items-center gap-3 py-1">
      <div className="text-sm text-slate-300 w-36 shrink-0">{feature}</div>
      <div className="flex-1 flex items-center">
        {direction === 'neg' ? (
          <div className="flex-1 flex justify-end pr-2">
            <div className="h-4 rounded-sm transition-all duration-700 flex items-center justify-end pr-1"
              style={{ width: `${pct}%`, background: `${color}22`, border: `1px solid ${color}66`, minWidth: 32 }}>
              <span className="text-xs font-mono" style={{ color }}>{value.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 pl-2">
            <div className="h-4 rounded-sm transition-all duration-700 flex items-center pl-1"
              style={{ width: `${pct}%`, background: `${color}22`, border: `1px solid ${color}66`, minWidth: 32 }}>
              <span className="text-xs font-mono" style={{ color }}>+{value.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
      <div className="text-xs px-2 py-0.5 rounded-full shrink-0"
        style={{ background: `${color}18`, color, border: `1px solid ${color}44` }}>
        {label}
      </div>
    </div>
  );
}

export default function ExplainSection() {
  const [tab, setTab] = useState('shap');
  const data = tab === 'shap' ? SHAP_DATA : LIME_DATA;
  const maxVal = Math.max(...data.map(d => Math.abs(d.value)));

  return (
    <section id="explain" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-slate-400">
            <HiOutlineSparkles size={14} style={{ color: '#f472b6' }} />
            모델 설명 가능성
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              왜 심방세동으로 예측했나요?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            AF 양성(1)으로 예측됐을 때, 어떤 변수가 예측에 얼마나 영향을 미쳤는지 분석합니다
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* main chart */}
          <div className="glass rounded-3xl p-8">
            {/* tab */}
            <div className="flex gap-2 mb-8">
              {['shap', 'lime'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={tab === t
                    ? { background: 'linear-gradient(135deg, #be185d, #7c3aed)', color: '#fff' }
                    : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>
                  {t === 'shap' ? 'SHAP' : 'LIME'}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-1 text-xs text-slate-500">
                <TbHeartbeat size={14} style={{ color: '#f472b6' }} />
                AF = 1 기준
              </div>
            </div>

            {/* axis center line */}
            <div className="relative">
              <div className="absolute left-[calc(9rem+0.75rem+50%)] top-0 bottom-0 w-px bg-slate-700" style={{ left: 'calc(9rem + 0.75rem + 50%)' }} />
              <div className="space-y-2">
                {data.map((d, i) => (
                  <FeatureBar key={i} {...d} maxVal={maxVal} />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-center gap-8 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#60a5fa44', border: '1px solid #60a5fa66' }} />
                AF 예측 확률 낮춤
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#f472b444', border: '1px solid #f472b466' }} />
                AF 예측 확률 높임
              </span>
            </div>
          </div>

          {/* explanation cards */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <TbChartBar size={20} style={{ color: '#a78bfa' }} />
                <span className="font-bold text-white">SHAP (SHapley Additive exPlanations)</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                게임 이론 기반으로 각 변수가 예측값에 기여한 양을 계산합니다.
                전체 데이터셋에서의 평균적인 기여도를 보여주어
                모델이 전반적으로 어떤 변수를 중요하게 보는지 파악합니다.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <TbSearch size={20} style={{ color: '#f472b6' }} />
                <span className="font-bold text-white">LIME (Local Interpretable Model-agnostic)</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                개별 예측 사례 주변에 근사 모델을 만들어 설명합니다.
                특정 환자 케이스에서 어떤 조건이 AF 예측을 결정했는지
                로컬하게 해석할 수 있습니다.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <TbHeartbeat size={20} style={{ color: '#f43f5e' }} />
                <span className="font-bold text-white">핵심 위험 변수 요약</span>
              </div>
              <div className="space-y-2">
                {['고령 (65세 이상)', '장시간 수술 (3h+)', '심박수 변동성 증가', '고혈압 병력'].map((v, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#f472b6' }} />
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
