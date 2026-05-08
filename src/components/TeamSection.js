import { TbBrain, TbChartDots, TbCode, TbStethoscope } from 'react-icons/tb';

const members = [
  { name: '팀원 1', role: 'ML Engineer', icon: <TbBrain size={40} />, desc: '모델 아키텍처 & 피처 엔지니어링', color: '#7c3aed' },
  { name: '팀원 2', role: 'Data Scientist', icon: <TbChartDots size={40} />, desc: 'EDA & 데이터 전처리 파이프라인', color: '#2563eb' },
  { name: '팀원 3', role: 'Frontend Dev', icon: <TbCode size={40} />, desc: 'UI/UX & 시각화 구현', color: '#059669' },
  { name: '팀원 4', role: 'Clinical Advisor', icon: <TbStethoscope size={40} />, desc: '임상 도메인 지식 & 검증', color: '#d97706' },
];

export default function TeamSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">MADE 팀</span>
          </h2>
          <p className="text-slate-400">데이터와 의학을 잇는 팀</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <div key={i} className="glass glass-hover rounded-3xl p-6 text-center">
              <div className="flex justify-center mb-4" style={{ color: m.color }}>{m.icon}</div>
              <div className="font-bold text-white mb-1">{m.name}</div>
              <div className="text-sm font-medium mb-3" style={{ color: '#a78bfa' }}>{m.role}</div>
              <div className="text-xs text-slate-500 leading-relaxed">{m.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
