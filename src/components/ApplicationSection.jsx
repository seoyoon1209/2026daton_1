import { TbHeartbeat, TbAlertTriangle, TbClipboardCheck, TbTrendingUp } from 'react-icons/tb';
import { MdOutlineMonitorHeart, MdOutlineLocalHospital } from 'react-icons/md';
import { RiRobot2Line } from 'react-icons/ri';

const scenarios = [
  {
    icon: <MdOutlineMonitorHeart size={30} />,
    title: '수술 중 실시간 모니터링',
    desc: '마취과 모니터에 AF 위험도 게이지를 연동합니다. 수술 중 실시간으로 AF 위험도 변화를 확인할 수 있습니다.',
    tag: '즉각 적용 가능',
    tagColor: '#34d399',
    color: '#f472b6',
  },
  {
    icon: <TbClipboardCheck size={30} />,
    title: '수술 전 위험 환자 선별',
    desc: '수술 예약 단계에서 환자 정보(나이, 기저질환, 수술 계획)를 입력하면 AF 고위험 환자를 사전 식별해 마취 계획을 최적화합니다.',
    tag: '단기 적용 가능',
    tagColor: '#60a5fa',
    color: '#a78bfa',
  },
  {
    icon: <TbAlertTriangle size={30} />,
    title: '예방적 약물 투여 의사결정 지원',
    desc: '고위험으로 분류된 환자에서 베타차단제 또는 아미오다론 예방 투여 여부를 임상의가 판단할 때 근거 자료를 제공합니다.',
    tag: '임상 검증 필요',
    tagColor: '#f59e0b',
    color: '#fb923c',
  },
  {
    icon: <RiRobot2Line size={30} />,
    title: 'EMR 통합 AI 보조 시스템',
    desc: '전자의무기록(EMR)에 AI 예측 결과를 자동 기록하여 의료진이 수술 노트 작성 시 참조할 수 있는 임상 보조 시스템으로 발전시킵니다.',
    tag: '장기 로드맵',
    tagColor: '#a78bfa',
    color: '#60a5fa',
  },
];

const effects = [
  { value: '↓ 30%', label: '수술 관련 AF 발생률 감소 기대', color: '#34d399' },
  { value: '↓ ICU', label: '심방세동 합병 중환자실 전실 감소', color: '#f472b6' },
  { value: '↑ 신뢰', label: 'AI 해석 가능성으로 의료진 수용도 향상', color: '#a78bfa' },
];

export default function ApplicationSection() {
  return (
    <section id="application" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-base text-slate-400">
            <MdOutlineLocalHospital size={14} style={{ color: '#34d399' }} />
            활용 가능성
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span style={{ background: 'linear-gradient(135deg, #34d399, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              실제로 어떻게 쓸 수 있나요?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            예측 모델을 임상 현장에 적용하는 구체적인 시나리오와 기대 효과
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {scenarios.map((s, i) => (
            <div key={i} className="glass glass-hover rounded-3xl p-7">
              <div className="flex items-start justify-between mb-4">
                <div style={{ color: s.color }}>{s.icon}</div>
                <span className="text-sm font-semibold px-3 py-1 rounded-full"
                  style={{ background: `${s.tagColor}18`, color: s.tagColor, border: `1px solid ${s.tagColor}44` }}>
                  {s.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 text-base leading-relaxed">{s.desc}</p>
              <div className="mt-5 h-px rounded-full" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
            </div>
          ))}
        </div>

        {/* expected effects */}
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-8">
            <TbTrendingUp size={18} style={{ color: '#34d399' }} />
            <span className="font-bold text-white">기대 효과</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {effects.map((e, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold mb-2" style={{ color: e.color }}>{e.value}</div>
                <div className="text-sm text-slate-400">{e.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-start gap-3">
              <TbHeartbeat size={18} style={{ color: '#f472b6', marginTop: 2, flexShrink: 0 }} />
              <p className="text-sm text-slate-400 leading-relaxed">
                본 모델은 의료진의 임상 판단을 <strong className="text-white">대체하는 것이 아니라 보조</strong>하는 도구입니다.
                SHAP 기반 설명 가능성을 통해 의료진이 예측 근거를 이해하고 최종 결정에 활용할 수 있도록 설계되었습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
