import { useState } from 'react';
import { TbHeartbeat, TbSearch, TbChartBar, TbStethoscope } from 'react-icons/tb';
import { HiOutlineSparkles } from 'react-icons/hi';

// TODO: 실제 SHAP/LIME 값으로 교체
const SHAP_DATA = [
  { feature: '나이',          value: 0.38, direction: 'pos', clinical: '고령일수록 심방 리모델링 진행, AF 기질 증가' },
  { feature: '수술 시간',      value: 0.31, direction: 'pos', clinical: '장시간 수술 시 교감신경 자극 누적, 전해질 불균형 심화' },
  { feature: '심박수 변동성',  value: 0.27, direction: 'pos', clinical: '자율신경 불균형의 지표, 부정맥 발생 전구 신호' },
  { feature: 'SpO₂ 최솟값',   value: -0.22, direction: 'neg', clinical: '산소화 유지 시 심방에 대한 저산소 스트레스 완화' },
  { feature: '수축기 혈압',    value: 0.19, direction: 'pos', clinical: '고혈압성 심방 확장 → AF 발생 취약성 증가' },
  { feature: 'EtCO₂ 변동',    value: 0.15, direction: 'pos', clinical: '환기 불안정이 심장에 가하는 부하 반영' },
  { feature: '체온',           value: -0.11, direction: 'neg', clinical: '정상 체온 유지 시 심근 흥분성 안정화' },
];

const LIME_DATA = [
  { feature: '나이 ≥ 65',        value: 0.41, direction: 'pos', clinical: '65세 이상에서 AF 발생률 급격히 상승' },
  { feature: '수술 시간 > 3h',    value: 0.29, direction: 'pos', clinical: '3시간 이상 수술에서 AF 발생 위험 2배 이상' },
  { feature: '심박수 변동 > 20',  value: 0.24, direction: 'pos', clinical: '변동폭 클수록 자율신경 교란 심각' },
  { feature: 'SpO₂ < 96%',       value: -0.20, direction: 'neg', clinical: '96% 이하로 떨어지면 심방 저산소 스트레스 증가' },
  { feature: '고혈압 이력',       value: 0.18, direction: 'pos', clinical: '기존 심방 구조적 변화로 AF 기질 존재' },
  { feature: '전신마취',          value: 0.13, direction: 'pos', clinical: '부위마취 대비 전신마취 시 자율신경 영향 더 큼' },
  { feature: '체온 < 36°C',      value: -0.10, direction: 'neg', clinical: '저체온이 심근 흥분성에 영향, 역설적 보호 효과도 보고' },
];

function FeatureBar({ feature, value, direction, clinical, maxVal }) {
  const [open, setOpen] = useState(false);
  const pct = Math.abs(value) / maxVal * 100;
  const color = direction === 'pos' ? '#f472b6' : '#60a5fa';

  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ border: `1px solid ${open ? color + '44' : 'rgba(255,255,255,0.06)'}`, background: open ? `${color}08` : 'transparent' }}>
      <button className="w-full flex items-center gap-3 p-3 text-left" onClick={() => setOpen(o => !o)}>
        <div className="text-xs text-slate-400 w-32 shrink-0">{feature}</div>
        <div className="flex-1 h-4 flex items-center">
          <div className="h-2.5 rounded-sm transition-all duration-700"
            style={{ width: `${pct}%`, background: `${color}44`, border: `1px solid ${color}77`, minWidth: 20 }} />
        </div>
        <div className="text-xs font-mono w-12 text-right shrink-0" style={{ color }}>
          {direction === 'pos' ? '+' : ''}{value.toFixed(2)}
        </div>
        <div className="text-slate-600 text-xs">{open ? '▲' : '▼'}</div>
      </button>
      {open && (
        <div className="px-3 pb-3 flex items-start gap-2">
          <TbStethoscope size={14} style={{ color, marginTop: 2, flexShrink: 0 }} />
          <p className="text-xs text-slate-300 leading-relaxed">{clinical}</p>
        </div>
      )}
    </div>
  );
}

export default function ClinicalSection() {
  const [tab, setTab] = useState('shap');
  const data = tab === 'shap' ? SHAP_DATA : LIME_DATA;
  const maxVal = Math.max(...data.map(d => Math.abs(d.value)));

  return (
    <section id="clinical" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-slate-400">
            <TbStethoscope size={14} style={{ color: '#f472b6' }} />
            임상적 해석
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              어떤 변수가 예측을 이끌었나요?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            AF 양성(1) 예측 시 영향을 미친 변수와 그 임상적 의미를 해석합니다.<br />
            <span className="text-slate-500 text-sm">각 변수를 클릭하면 임상 해석이 펼쳐집니다</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* chart — 3 cols */}
          <div className="lg:col-span-3 glass rounded-3xl p-7">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {['shap', 'lime'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={tab === t
                      ? { background: 'linear-gradient(135deg, #be185d, #7c3aed)', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}>
                    {t === 'shap' ? 'SHAP' : 'LIME'}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <TbHeartbeat size={14} style={{ color: '#f472b6' }} />
                AF = 1 기준
              </div>
            </div>

            <div className="space-y-1.5">
              {data.map((d, i) => <FeatureBar key={`${tab}-${i}`} {...d} maxVal={maxVal} />)}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex justify-center gap-8 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm inline-block" style={{ background: '#60a5fa44', border: '1px solid #60a5fa66' }} />
                AF 위험 감소
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-2 rounded-sm inline-block" style={{ background: '#f472b444', border: '1px solid #f472b466' }} />
                AF 위험 증가
              </span>
            </div>
          </div>

          {/* method cards — 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <TbChartBar size={18} style={{ color: '#a78bfa' }} />
                <span className="font-bold text-white text-sm">SHAP 해석</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                게임 이론 기반 Shapley value로 각 변수의 기여도를 계산합니다. 전체 데이터 평균 기여도를 보여줘 모델이 전반적으로 어떤 변수를 중요시하는지 파악합니다.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <TbSearch size={18} style={{ color: '#f472b6' }} />
                <span className="font-bold text-white text-sm">LIME 해석</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                개별 환자 예측 주변에 근사 선형 모델을 만들어 로컬 해석을 제공합니다. "이 환자가 왜 고위험으로 분류됐는가"를 조건부로 설명합니다.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <HiOutlineSparkles size={16} style={{ color: '#34d399' }} />
                <span className="font-bold text-white text-sm">핵심 임상 인사이트</span>
              </div>
              <div className="space-y-2">
                {[
                  '고령 + 장시간 수술 조합이 AF 위험 가장 높임',
                  '심박수 변동성은 부정맥 전구 신호로 해석 가능',
                  'SpO₂ 유지가 AF 예방에 보호적 역할',
                  '기저 고혈압 환자는 구조적 취약성 보유',
                ].map((v, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#34d399' }} />
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
