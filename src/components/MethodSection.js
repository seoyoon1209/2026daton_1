import { TbBolt, TbBrain, TbScale, TbRefresh } from 'react-icons/tb';
import { BiNetworkChart } from 'react-icons/bi';

const models = [
  {
    name: 'XGBoost',
    badge: '최종 선택',
    badgeColor: '#f472b6',
    desc: '그래디언트 부스팅 기반 앙상블 모델. 불균형 데이터에 강하고, scale_pos_weight 파라미터로 소수 클래스(AF 양성) 가중치 조절 가능.',
    pros: ['높은 예측 성능', '결측치에 강건', 'SHAP 연동 용이'],
    color: '#f472b6',
    icon: <TbBolt size={24} />,
  },
  {
    name: 'LightGBM',
    badge: '비교 모델',
    badgeColor: '#60a5fa',
    desc: '리프 중심 트리 성장 방식으로 대용량 데이터에서 빠른 학습. XGBoost와 앙상블 조합으로 최종 성능 향상에 기여.',
    pros: ['빠른 학습 속도', '메모리 효율', '고차원 변수 처리'],
    color: '#60a5fa',
    icon: <TbBrain size={24} />,
  },
  {
    name: 'Random Forest',
    badge: '베이스라인',
    badgeColor: '#34d399',
    desc: '배깅 기반 앙상블 모델로 과적합에 강함. 베이스라인 성능 확인 및 변수 중요도 1차 검증에 활용.',
    pros: ['과적합 방지', '변수 중요도 제공', '빠른 초기 검증'],
    color: '#34d399',
    icon: <BiNetworkChart size={24} />,
  },
];

const validations = [
  { icon: <TbRefresh size={20} />, title: '5-Fold 교차 검증', desc: '과적합을 방지하고 일반화 성능을 보장하기 위해 stratified k-fold 사용', color: '#a78bfa' },
  { icon: <TbScale size={20} />, title: 'SMOTE 오버샘플링', desc: 'AF 발생 클래스 불균형 해소. 소수 클래스의 합성 샘플 생성으로 모델 편향 방지', color: '#f472b6' },
  { icon: <TbBolt size={20} />, title: 'Optuna 하이퍼파라미터 튜닝', desc: 'Tree-structured Parzen Estimator(TPE) 기반 자동 최적화로 최적 파라미터 탐색', color: '#60a5fa' },
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
              어떤 모델을 왜 썼나요?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            클래스 불균형·임상 해석 가능성·예측 성능을 모두 고려한 모델 선택
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
            검증 전략
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
        </div>
      </div>
    </section>
  );
}
