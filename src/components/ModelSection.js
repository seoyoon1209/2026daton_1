import { TbLungs, TbChartBar, TbBolt, TbSearch } from 'react-icons/tb';
import { MdOutlineMonitorHeart } from 'react-icons/md';
import { RiFlowChart } from 'react-icons/ri';
import { HiOutlineSparkles } from 'react-icons/hi';
import { BiNetworkChart } from 'react-icons/bi';
import { LuAlarmClock } from 'react-icons/lu';

const features = [
  {
    icon: <TbLungs size={32} />,
    title: 'SpO₂ 저하 예측',
    desc: '수술 중 산소포화도가 95% 아래로 떨어지기 5분 전에 경보를 발송합니다',
    color: '#7c3aed',
  },
  {
    icon: <TbChartBar size={32} />,
    title: 'INSPIRE 데이터셋',
    desc: '서울대학교 병원 수술실 30만+ 케이스 기반의 실제 임상 데이터로 학습',
    color: '#2563eb',
  },
  {
    icon: <TbBolt size={32} />,
    title: 'XGBoost + LightGBM',
    desc: '앙상블 부스팅 모델로 빠르고 정확한 실시간 추론 지원',
    color: '#059669',
  },
  {
    icon: <TbSearch size={32} />,
    title: 'SHAP 설명 가능성',
    desc: '예측 근거를 SHAP value로 시각화해 의료진이 신뢰할 수 있는 AI',
    color: '#d97706',
  },
];

const pipeline = [
  { step: '01', label: '생체신호 입력', desc: 'HR, SpO₂, BP, EtCO₂...', color: '#7c3aed', icon: <MdOutlineMonitorHeart size={16} /> },
  { step: '02', label: '피처 엔지니어링', desc: '슬라이딩 윈도우 + 통계 특성', color: '#2563eb', icon: <RiFlowChart size={16} /> },
  { step: '03', label: 'AI 추론', desc: 'XGBoost 앙상블 모델', color: '#059669', icon: <BiNetworkChart size={16} /> },
  { step: '04', label: '리스크 스코어', desc: '0~100% 저산소혈증 확률', color: '#d97706', icon: <HiOutlineSparkles size={16} /> },
  { step: '05', label: '임상 경보', desc: '고위험 시 즉시 알림 발송', color: '#e11d48', icon: <LuAlarmClock size={16} /> },
];

export default function ModelSection() {
  return (
    <section id="model" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-slate-400">
            <HiOutlineSparkles size={14} style={{ color: '#a78bfa' }} />
            AI 모델 아키텍처
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">어떻게 작동하나요?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            실제 수술실 데이터를 기반으로 훈련된 머신러닝 파이프라인
          </p>
        </div>

        {/* feature cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((f, i) => (
            <div key={i} className="glass glass-hover rounded-3xl p-8">
              <div className="mb-4" style={{ color: f.color }}>{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              <div className="mt-4 h-0.5 w-12 rounded-full" style={{ background: f.color }} />
            </div>
          ))}
        </div>

        {/* pipeline */}
        <div className="glass rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-center mb-10 text-white">예측 파이프라인</h3>
          <div className="flex flex-col md:flex-row items-stretch gap-4">
            {pipeline.map((p, i) => (
              <div key={i} className="flex-1 flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-3"
                  style={{ background: p.color }}
                >
                  {p.icon}
                </div>
                <div className="font-semibold text-white text-sm mb-1">{p.label}</div>
                <div className="text-xs text-slate-500">{p.desc}</div>
              </div>
            ))}
          </div>
          {/* connector */}
          <div className="hidden md:flex justify-center mt-6">
            <div className="flex items-center">
              {pipeline.map((p, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
                  {i < pipeline.length - 1 && (
                    <div className="w-16 h-0.5" style={{ background: `linear-gradient(90deg, ${p.color}, ${pipeline[i+1].color})` }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
