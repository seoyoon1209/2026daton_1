import { TbHeartbeat, TbAlertTriangle, TbBulb, TbLungs } from 'react-icons/tb';
import { MdOutlineLocalHospital } from 'react-icons/md';
import { RiSurgicalMaskLine } from 'react-icons/ri';

const reasons = [
  {
    icon: <TbLungs size={28} />,
    title: '흉부외과 수술과 AF의 연관성',
    body: '폐엽절제술·식도절제술 등 흉부 수술은 심장 주변 조직을 직접 조작합니다. 수술 중 심낭 자극, 폐정맥 주변 박리가 심방 조직에 직접적인 부하를 가해 AF 발생 기질을 만듭니다.',
    color: '#f472b6',
  },
  {
    icon: <TbAlertTriangle size={28} />,
    title: '타 수술 대비 압도적으로 높은 발생률',
    body: '흉부외과 수술 후 AF 발생률은 폐 수술 10–20%, 식도 수술 20–30%로, 일반 복부 수술(4–5%)과 비교해 4~6배 높습니다. 고위험군으로서의 개입 효과가 가장 큽니다.',
    color: '#fb923c',
  },
  {
    icon: <TbHeartbeat size={28} />,
    title: '심폐 기능이 이미 취약한 환자군',
    body: '흉부외과 환자는 수술 전부터 폐기능 저하, 흡연력, 고령 등 AF 기저 위험인자를 다수 보유합니다. 수술 스트레스가 더해지면 AF 발생 임계값을 쉽게 초과합니다.',
    color: '#a78bfa',
  },
  {
    icon: <TbBulb size={28} />,
    title: '예방 중재의 효과가 가장 큰 집단',
    body: '발생률이 높은 만큼 예측 모델을 적용했을 때 임상적 편익도 큽니다. 고위험 환자를 사전에 식별해 예방적 베타차단제 투여, 집중 모니터링 등 선제 조치를 취할 수 있습니다.',
    color: '#34d399',
  },
];

export default function BackgroundSection() {
  return (
    <section id="background" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-base text-slate-400">
            <MdOutlineLocalHospital size={14} style={{ color: '#f472b6' }} />
            주제 설정 배경
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            왜 <span style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>흉부외과 환자</span>인가요?
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            심방세동은 흉부외과 수술 후 가장 흔하고 위험한 합병증입니다.<br />
            예측 모델의 임상적 가치가 가장 높은 대상군입니다.
          </p>
        </div>

        {/* stat highlight row */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[
            { value: '10–20%', label: '폐 수술 후 AF 발생률', sub: '폐엽절제술 기준', color: '#f472b6' },
            { value: '20–30%', label: '식도 수술 후 AF 발생률', sub: '식도절제술 기준', color: '#fb923c' },
            { value: '4–6×', label: '일반 수술 대비 발생 위험', sub: '복부 수술 대비', color: '#a78bfa' },
          ].map((s, i) => (
            <div key={i} className="glass rounded-3xl p-6 text-center"
              style={{ border: `1px solid ${s.color}22`, background: `${s.color}08` }}>
              <div className="text-4xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-slate-300 text-base font-medium">{s.label}</div>
              <div className="text-slate-500 text-base mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* 선정 이유 카드 */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <RiSurgicalMaskLine size={18} style={{ color: '#f472b6' }} />
            <span className="font-semibold text-white">흉부외과 환자를 선택한 이유</span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {reasons.map((r, i) => (
              <div key={i} className="glass glass-hover rounded-3xl p-7">
                <div className="mb-4" style={{ color: r.color }}>{r.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{r.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{r.body}</p>
                <div className="mt-4 h-px w-10 rounded-full" style={{ background: r.color }} />
              </div>
            ))}
          </div>
        </div>

        {/* 임상적 필요성 요약 */}
        <div className="glass rounded-3xl p-8"
          style={{ border: '1px solid rgba(244,114,182,0.15)', background: 'rgba(244,114,182,0.04)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #be185d, #7c3aed)' }}>
              <MdOutlineLocalHospital size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white mb-2">임상적 필요성 요약</div>
              <p className="text-slate-400 text-base leading-relaxed">
                흉부외과 수술 후 AF는 발생 시 뇌졸중, 혈역학적 불안정, 중환자실 재입실로 이어져
                <strong className="text-white"> 사망률과 재원 기간을 유의하게 높입니다.</strong> 그러나 현재 임상에서는
                발생 후 약물 전복 또는 전기 복율에 의존하는 수동적 대응이 대부분입니다.
                수술 중 실시간 생체신호 데이터를 활용한 <strong className="text-white">사전 예측 모델</strong>이 있다면,
                고위험 환자에서의 예방적 중재로 이 합병증을 줄일 수 있다는 것이 본 연구의 출발점입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
