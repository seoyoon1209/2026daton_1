import { useState } from 'react';
import { TbHeartbeat, TbUser, TbAlertTriangle, TbCheck, TbChartBar } from 'react-icons/tb';
import { RiLoader4Line } from 'react-icons/ri';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdOutlineWarningAmber } from 'react-icons/md';

// TODO: 실제 예측 API 연동 시 이 로직을 백엔드 호출로 교체하세요
function mockPredict(inputs) {
  const ageFactor   = (inputs.age - 40) / 40;
  const hrFactor    = Math.abs(inputs.hr - 75) / 40;
  const spo2Factor  = (100 - inputs.spo2) / 10;
  const durationFactor = inputs.duration / 6;
  const bpFactor    = (inputs.sbp - 120) / 60;

  let score = 0.1
    + ageFactor * 0.3
    + hrFactor  * 0.2
    + spo2Factor * 0.2
    + durationFactor * 0.15
    + bpFactor * 0.1;

  if (inputs.hypertension) score += 0.12;
  if (inputs.diabetes)     score += 0.06;

  score = Math.min(0.97, Math.max(0.03, score));

  // shap contributions for this patient
  const shap = [
    { feature: '나이',        value: +(ageFactor * 0.38).toFixed(3),     direction: ageFactor > 0 ? 'pos' : 'neg' },
    { feature: '수술 시간',   value: +(durationFactor * 0.31).toFixed(3), direction: 'pos' },
    { feature: '심박수 변동', value: +(hrFactor * 0.27).toFixed(3),       direction: 'pos' },
    { feature: 'SpO₂',       value: +(-spo2Factor * 0.22).toFixed(3),    direction: spo2Factor > 0 ? 'neg' : 'pos' },
    { feature: '수축기 혈압', value: +(bpFactor * 0.19).toFixed(3),       direction: bpFactor > 0 ? 'pos' : 'neg' },
  ].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

  return { score: +(score * 100).toFixed(1), shap };
}

const RISK_META = {
  low:  { label: '저위험',  desc: '심방세동 발생 가능성이 낮습니다. 표준 모니터링을 유지하세요.', color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.3)'  },
  mid:  { label: '중위험',  desc: '일부 위험 요인이 감지됩니다. 주의 깊은 모니터링이 필요합니다.', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.3)'  },
  high: { label: '고위험',  desc: '심방세동 발생 가능성이 높습니다. 즉각적인 임상 조치를 권고합니다.', color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.3)'  },
};

function InputField({ label, value, onChange, min, max, step = 1, unit }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <label className="text-xs text-slate-400">{label}</label>
        <span className="text-xs font-mono text-white">{value}<span className="text-slate-500 ml-0.5">{unit}</span></span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, #f472b6 0%, #f472b6 ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)` }}
      />
    </div>
  );
}

function RiskGauge({ score }) {
  const level = score < 30 ? 'low' : score < 60 ? 'mid' : 'high';
  const r = RISK_META[level];
  const angle = (score / 100) * 180;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-44 h-22 overflow-hidden">
        <svg viewBox="0 0 200 104" className="w-full">
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke={r.color}
            strokeWidth="14" strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 282.7} 282.7`}
            style={{ transition: 'stroke-dasharray 0.9s ease, stroke 0.4s' }} />
          <g transform={`rotate(${angle - 90}, 100, 100)`}>
            <line x1="100" y1="98" x2="100" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="100" cy="100" r="6" fill="white" />
          </g>
        </svg>
      </div>
      <div className="text-5xl font-bold" style={{ color: r.color, transition: 'color 0.4s' }}>{score}%</div>
      <div className="px-4 py-1.5 rounded-full text-sm font-semibold"
        style={{ background: r.bg, border: `1px solid ${r.border}`, color: r.color }}>
        {r.label}
      </div>
    </div>
  );
}

export default function DemoSection() {
  const [inputs, setInputs] = useState({ age: 58, hr: 82, spo2: 97, sbp: 132, duration: 2.5, hypertension: false, diabetes: false });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (key) => (val) => setInputs(prev => ({ ...prev, [key]: val }));

  const predict = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockPredict(inputs));
      setLoading(false);
    }, 900);
  };

  const level = result ? (result.score < 30 ? 'low' : result.score < 60 ? 'mid' : 'high') : null;
  const maxShap = result ? Math.max(...result.shap.map(s => Math.abs(s.value))) : 1;

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-slate-400">
            <TbHeartbeat size={16} style={{ color: '#f472b6' }} />
            인터랙티브 예측 데모
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              환자 정보를 입력하세요
            </span>
          </h2>
          <p className="text-slate-400 text-lg">수치를 조절하면 AI가 심방세동 발생 위험을 실시간 예측합니다</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* inputs */}
          <div className="space-y-5">
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5 text-sm font-semibold text-slate-300">
                <TbUser size={16} style={{ color: '#a78bfa' }} /> 환자 기본 정보
              </div>
              <div className="space-y-5">
                <InputField label="나이" value={inputs.age} onChange={set('age')} min={20} max={90} unit="세" />
                <InputField label="수술 시간" value={inputs.duration} onChange={set('duration')} min={0.5} max={10} step={0.5} unit="시간" />
              </div>
              {/* 기저질환 */}
              <div className="mt-5 flex gap-3">
                {[{ key: 'hypertension', label: '고혈압' }, { key: 'diabetes', label: '당뇨' }].map(({ key, label }) => (
                  <button key={key} onClick={() => setInputs(p => ({ ...p, [key]: !p[key] }))}
                    className="flex-1 py-2 rounded-xl text-sm font-medium transition-all border"
                    style={inputs[key]
                      ? { background: 'rgba(244,114,182,0.15)', borderColor: 'rgba(244,114,182,0.5)', color: '#f472b6' }
                      : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                    {inputs[key] ? '✓ ' : ''}{label}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5 text-sm font-semibold text-slate-300">
                <TbHeartbeat size={16} style={{ color: '#f472b6' }} /> 수술 중 생체신호
              </div>
              <div className="space-y-5">
                <InputField label="심박수 (HR)" value={inputs.hr} onChange={set('hr')} min={40} max={150} unit="bpm" />
                <InputField label="산소포화도 (SpO₂)" value={inputs.spo2} onChange={set('spo2')} min={85} max={100} unit="%" />
                <InputField label="수축기 혈압 (SBP)" value={inputs.sbp} onChange={set('sbp')} min={70} max={200} unit="mmHg" />
              </div>
            </div>

            <button onClick={predict} disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #be185d, #7c3aed)', boxShadow: '0 0 30px rgba(190,24,93,0.25)' }}>
              {loading ? <RiLoader4Line size={22} style={{ animation: 'spin 1s linear infinite' }} /> : <TbHeartbeat size={22} />}
              {loading ? 'AI 예측 중...' : '심방세동 예측 실행'}
            </button>
          </div>

          {/* result */}
          <div className="space-y-5">
            {/* gauge */}
            <div className="glass rounded-3xl p-6 flex flex-col items-center min-h-[220px] justify-center">
              {!result && !loading && (
                <div className="text-center text-slate-600">
                  <TbHeartbeat size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">환자 정보를 입력하고<br />예측을 실행하세요</p>
                </div>
              )}
              {loading && (
                <div className="flex flex-col items-center gap-3">
                  <RiLoader4Line size={36} style={{ color: '#f472b6', animation: 'spin 1s linear infinite' }} />
                  <span className="text-sm text-slate-400">모델 추론 중...</span>
                </div>
              )}
              {result && !loading && <RiskGauge score={result.score} />}
            </div>

            {/* clinical message */}
            {result && level && (
              <div className="rounded-2xl p-5"
                style={{ background: RISK_META[level].bg, border: `1px solid ${RISK_META[level].border}` }}>
                <div className="flex items-start gap-3">
                  {level === 'high'
                    ? <MdOutlineWarningAmber size={20} style={{ color: RISK_META[level].color, marginTop: 2, flexShrink: 0 }} />
                    : level === 'mid'
                    ? <TbAlertTriangle size={20} style={{ color: RISK_META[level].color, marginTop: 2, flexShrink: 0 }} />
                    : <TbCheck size={20} style={{ color: RISK_META[level].color, marginTop: 2, flexShrink: 0 }} />}
                  <div>
                    <div className="font-bold mb-1" style={{ color: RISK_META[level].color }}>
                      {level === 'high' ? '즉각 조치 권고' : level === 'mid' ? '주의 모니터링' : '정상 범위'}
                    </div>
                    <p className="text-sm text-slate-300">{RISK_META[level].desc}</p>
                  </div>
                </div>
              </div>
            )}

            {/* SHAP for this patient */}
            {result && (
              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-300">
                  <TbChartBar size={16} style={{ color: '#f472b6' }} />
                  이 환자의 예측 기여 변수
                  <HiOutlineSparkles size={14} style={{ color: '#a78bfa', marginLeft: 'auto' }} />
                </div>
                <div className="space-y-2.5">
                  {result.shap.map((s, i) => {
                    const pct = Math.abs(s.value) / maxShap * 100;
                    const color = s.direction === 'pos' ? '#f472b6' : '#60a5fa';
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="text-xs text-slate-400 w-28 shrink-0">{s.feature}</div>
                        <div className="flex-1 h-5 relative flex items-center">
                          <div className="h-3 rounded-sm transition-all duration-700"
                            style={{ width: `${pct}%`, background: `${color}33`, border: `1px solid ${color}66`, minWidth: 20 }} />
                        </div>
                        <div className="text-xs font-mono w-14 text-right shrink-0" style={{ color }}>
                          {s.direction === 'pos' ? '+' : ''}{s.value.toFixed(3)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-500 text-center">
                  이 환자에서 <span style={{ color: '#f472b6' }}>분홍색</span>은 AF 위험 증가,&nbsp;
                  <span style={{ color: '#60a5fa' }}>파란색</span>은 위험 감소 기여
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
