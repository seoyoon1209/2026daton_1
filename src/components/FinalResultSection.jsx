import { finalResultRows } from '../data/poafResults';
import { TbTrophy } from 'react-icons/tb';
import { HiOutlineSparkles } from 'react-icons/hi';

const headers = [
  { key: 'metric', label: '지표' },
  { key: 'lightgbm', label: 'LightGBM' },
  { key: 'xgboost', label: 'XGBoost' },
  { key: 'randomForest', label: 'RandomForest' },
];

export default function FinalResultSection() {
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
        </div>
      </div>
    </section>
  );
}
