import { TbBolt, TbBrain, TbRefresh, TbTargetArrow, TbStack2 } from 'react-icons/tb';
import { BiNetworkChart } from 'react-icons/bi';

const models = [
  {
    name: 'XGBoost',
    badge: 'Recall 기준 충족',
    badgeColor: '#f472b6',
    desc: '소규모 데이터에서도 규제 기능을 통해 과적합을 억제하며 일반화된 성능을 기대할 수 있는 부스팅 계열 모델입니다.',
    pros: ['규제 기반 일반화 성능', 'Recall 0.8039 달성', 'Optuna 튜닝 효과 확인'],
    color: '#f472b6',
    icon: <TbBolt size={24} />,
  },
  {
    name: 'LightGBM',
    badge: '비교 모델',
    badgeColor: '#60a5fa',
    desc: 'XGBoost와 같은 부스팅 계열로, 규제 옵션을 활용해 작은 데이터셋에서도 안정적인 일반화 가능성을 비교하기 위해 함께 사용했습니다.',
    pros: ['규제 기능 활용 가능', '부스팅 계열 비교 기준', 'AUROC 0.7966'],
    color: '#60a5fa',
    icon: <TbBrain size={24} />,
  },
  {
    name: 'Random Forest',
    badge: '과적합 방어용',
    badgeColor: '#34d399',
    desc: '여러 트리의 평균을 내는 배깅 방식이라 특정 데이터 포인트에 덜 휘둘릴 수 있어, 약 1,500건 규모 데이터에서 과적합 가능성을 점검하는 데 적합했습니다.',
    pros: ['트리 평균으로 안정성 확보', '소규모 데이터 대응', '베이스라인 비교 역할'],
    color: '#34d399',
    icon: <BiNetworkChart size={24} />,
  },
];

const validations = [
  {
    icon: <TbStack2 size={20} />,
    title: '데이터 규모 고려',
    desc: '데이터 수가 약 1,500건 수준이라 복잡한 모델은 과적합 위험이 있다고 보고, 트리 기반 모델 중심으로 후보군을 좁혔습니다.',
    color: '#a78bfa',
  },
  {
    icon: <TbTargetArrow size={20} />,
    title: '튜닝 목표 설정',
    desc: 'Optuna를 적용해 AUROC 최적화를 목표로 하되, Recall은 0.8 이상을 만족하는 모델을 우선적으로 확인했습니다.',
    color: '#f472b6',
  },
  {
    icon: <TbRefresh size={20} />,
    title: '탐색 범위',
    desc: 'max_depth는 3~6, learning_rate는 0.01~0.1 범위에서 탐색했고, trial은 100~200회 수준으로 반복했습니다.',
    color: '#60a5fa',
  },
];

export default function MethodSection() {
  return (
    <section id="method" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-slate-400">
            <TbBrain size={14} style={{ color: '#a78bfa' }} />
            분석 기법 소개
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              모델을 어떻게 개발했나요?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            소규모 데이터셋에서 과적합 가능성을 고려해 트리 기반 모델들을 비교하고 Optuna로 하이퍼파라미터를 조정했습니다
          </p>
        </div>

        {/* model cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {models.map((m, i) => (
            <div key={i} className="glass glass-hover rounded-3xl p-7 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div style={{ color: m.color }}>{m.icon}</div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: `${m.badgeColor}18`, color: m.badgeColor, border: `1px solid ${m.badgeColor}44` }}>
                  {m.badge}
                </span>
              </div>
              <div className="text-xl font-bold text-white mb-3">{m.name}</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{m.desc}</p>
              <div className="space-y-1.5">
                {m.pros.map((p, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: m.color }} />
                    {p}
                  </div>
                ))}
              </div>
              <div className="mt-5 h-px w-full rounded-full" style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }} />
            </div>
          ))}
        </div>

        {/* validation */}
        <div className="glass rounded-3xl p-8">
          <div className="font-bold text-white mb-7 flex items-center gap-2">
            <TbRefresh size={18} style={{ color: '#a78bfa' }} />
            모델 개발 기준
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {validations.map((v, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${v.color}18`, border: `1px solid ${v.color}33`, color: v.color }}>
                  {v.icon}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{v.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-sm text-slate-400 leading-relaxed">
              최종적으로는 <strong className="text-white">AUROC 최적화</strong>와
              <strong className="text-white"> Recall 0.8 이상</strong>이라는 두 기준을 함께 놓고 비교했고,
              그 결과 XGBoost가 Recall 0.8039로 목표 조건을 만족해 최종 결과 요약에서 체크된 모델로 제시되었습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
