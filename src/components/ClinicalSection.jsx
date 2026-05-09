import { useState } from 'react';
import { TbStethoscope, TbChartBar, TbHeartbeat } from 'react-icons/tb';
import { HiOutlineSparkles } from 'react-icons/hi';

const MODEL_TABLES = {
  model1: {
    title: 'LightGBM',
    subtitle: 'Top variables',
    rows: [
      { rank: 1, feature: 'lab_ptinr', mean: '0.477', direction: '▼', average: '1.030' },
      { rank: 2, feature: 'has_cpb', mean: '0.457', direction: '▼', average: '0.562' },
      { rank: 3, feature: 'age', mean: '0.451', direction: '▲', average: '64.95세' },
      { rank: 4, feature: 'etco2_std', mean: '0.247', direction: '▲', average: '2.187' },
      { rank: 5, feature: 'uo_total', mean: '0.214', direction: '▼', average: '582.1mL' },
    ],
    summary: [
      'lab_ptinr와 has_cpb가 상위 변수로 나타났습니다.',
      'age와 etco2_std도 강한 기여를 보였습니다.',
      '수술 중/전 변수들이 함께 상위권에 분포합니다.',
    ],
  },
  model2: {
    title: 'XGBoost',
    subtitle: 'Top variables',
    rows: [
      { rank: 1, feature: 'has_cpb', mean: '0.648', direction: '▼', average: '0.562' },
      { rank: 2, feature: 'lab_ptinr', mean: '0.634', direction: '▼', average: '1.030' },
      { rank: 3, feature: 'age', mean: '0.411', direction: '▼', average: '64.95세' },
      { rank: 4, feature: 'etco2_std', mean: '0.266', direction: '▼', average: '2.187' },
      { rank: 5, feature: 'hr_std', mean: '0.258', direction: '▼', average: '7.258' },
    ],
    summary: [
      'has_cpb와 lab_ptinr가 가장 크게 작용했습니다.',
      'age, etco2_std, hr_std가 뒤를 이었습니다.',
      '양성 탐지 관점에서 가장 강한 변수 구성이 보입니다.',
    ],
  },
  model3: {
    title: 'RandomForest',
    subtitle: 'Top variables',
    rows: [
      { rank: 1, feature: 'cpb_duration', mean: '0.062', direction: '▼', average: '99.68분' },
      { rank: 2, feature: 'lab_ptinr', mean: '0.056', direction: '▼', average: '1.030' },
      { rank: 3, feature: 'has_cpb', mean: '0.052', direction: '▼', average: '0.562' },
    ],
    summary: [
      'cpb_duration이 1순위로 나타났습니다.',
      'lab_ptinr와 has_cpb가 뒤를 이었습니다.',
      '다른 모델보다 더 짧은 상위 변수 집합을 보여줍니다.',
    ],
  },
};

function directionColor(direction) {
  return direction === '▲' ? '#f472b6' : '#60a5fa';
}

function ModelTable({ model }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#1a1b1d] p-4 md:p-7">
      <div className="font-mono text-slate-300">
        <div className="text-lg md:text-2xl text-white mb-6">
          {model.title} {model.subtitle}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm md:text-lg text-slate-300">
                <th className="pb-3 font-normal w-[8%] pr-4 whitespace-nowrap">순위</th>
                <th className="pb-3 font-normal w-[46%] pl-16 pr-4">피처</th>
                <th className="pb-3 font-normal w-[46%] pr-4">SHAP</th>
              </tr>
              <tr>
                <th colSpan={5} className="h-px bg-white/10 p-0" />
              </tr>
            </thead>
            <tbody className="text-sm md:text-l leading-relaxed">
              {model.rows.map((row) => (
                <tr key={row.rank}>
                  <td className="py-3 pr-4 text-white whitespace-nowrap">{row.rank}</td>
                  <td className="py-3 pl-16 pr-4 text-white/90">{row.feature}</td>
                  <td className="py-3 pr-4 text-white/90">{row.mean}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ClinicalSection() {
  const [tab, setTab] = useState('model1');
  const model = MODEL_TABLES[tab];

  return (
    <section id="clinical" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-slate-400">
            <TbStethoscope size={14} style={{ color: '#f472b6' }} />
            모델별 변수 해석
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              어떤 변수가 예측을 이끌었나요?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            각 모델의 상위 변수와 SHAP 값을 같은 형식의 표로 비교합니다.<br />
            <span className="text-slate-500 text-sm">버튼을 눌러 모델별 표를 전환하세요</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="glass rounded-3xl p-4 md:p-6">
              <div className="flex gap-2 mb-6">
                {Object.keys(MODEL_TABLES).map((key, idx) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className="px-3 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={tab === key
                      ? { background: 'linear-gradient(135deg, #be185d, #7c3aed)', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8' }}
                  >
                    모델 {idx + 1}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-1 text-xs text-slate-500">
                  <TbHeartbeat size={14} style={{ color: '#f472b6' }} />
                  AF = 1 기준
                </div>
              </div>

              <ModelTable model={model} />

            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <TbChartBar size={18} style={{ color: '#a78bfa' }} />
                <span className="font-bold text-white text-sm">모델 요약</span>
              </div>
              <div className="space-y-2">
                {model.summary.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#f472b6' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <HiOutlineSparkles size={16} style={{ color: '#34d399' }} />
                <span className="font-bold text-white text-sm">표 해석</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                순위, 피처, mean| SHAP |를 그대로 표시했습니다.
              </p>
            </div>

            {/*<div className="glass rounded-2xl p-6">*/}
            {/*  <div className="flex items-center gap-2 mb-3">*/}
            {/*    <HiOutlineSparkles size={16} style={{ color: '#60a5fa' }} />*/}
            {/*    <span className="font-bold text-white text-sm">모델 전환</span>*/}
            {/*  </div>*/}
            {/*  <p className="text-slate-400 text-sm leading-relaxed">*/}
            {/*    버튼을 누르면 모델 1, 모델 2, 모델 3 표가 전환됩니다.*/}
            {/*  </p>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </section>
  );
}
