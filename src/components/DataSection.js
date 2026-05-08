import { TbDatabase, TbTable, TbFilter, TbVariable, TbArrowsExchange } from 'react-icons/tb';
import { RiFlowChart } from 'react-icons/ri';
import { MdOutlineBalance } from 'react-icons/md';

// TODO: 실제 사용한 테이블·변수·케이스 수로 교체하세요
const tables = [
  { name: 'operations',  desc: '수술 기본 정보 (수술 종류, 마취 방법, 수술 시간 등)', rows: '대상 케이스', color: '#a78bfa' },
  { name: 'vitalsign',   desc: '수술 중 생체신호 (HR, SpO₂, BP, EtCO₂, CVP 등)',    rows: '시계열 다수',  color: '#60a5fa' },
  { name: 'labs',        desc: '수술 전 검사 결과 (전해질, CBC 등)',                   rows: '다수 항목',   color: '#34d399' },
  { name: 'patients',    desc: '환자 기본 정보 (나이, 성별, BMI, 기저질환 등)',          rows: '흉부외과 환자', color: '#f472b6' },
];

const keyFeatures = [
  '나이 (Age)', 'BMI', '수술 시간 (an_duration)', 'HR 평균/변동성',
  'SpO₂ 최솟값', '수축기 혈압', 'EtCO₂ 평균/최솟값/표준편차',
  'doubi_max', 'nepi_max', 'cpb_duration', 'CVP 존재 여부 (0/1)',
  '마취 방법', 'CPB 시행 여부', '수술 종류',
];

export default function DataSection() {
  return (
    <section id="data" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 text-sm text-slate-400">
            <TbDatabase size={14} style={{ color: '#60a5fa' }} />
            데이터 소개
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span style={{ background: 'linear-gradient(135deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              어떤 데이터를 썼나요?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            서울대학교병원 수술실 빅데이터 <strong className="text-white">INSPIRE</strong> — 흉부외과 환자 대상 다변량 임상 데이터
          </p>
        </div>

        {/* 사용 테이블 */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <TbTable size={18} style={{ color: '#60a5fa' }} />
            <span className="font-semibold text-white">사용 테이블</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {tables.map((t, i) => (
              <div key={i} className="glass glass-hover rounded-2xl p-5 flex gap-4">
                <div className="w-1 rounded-full shrink-0 self-stretch" style={{ background: t.color }} />
                <div>
                  <div className="font-mono text-sm font-bold mb-1" style={{ color: t.color }}>{t.name}</div>
                  <div className="text-slate-300 text-sm mb-1">{t.desc}</div>
                  <div className="text-xs text-slate-500">{t.rows}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 전처리 전체 파이프라인 */}
        <div className="space-y-5 mb-12">

          {/* STEP 1: 대상 선정 기준 */}
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <TbFilter size={18} style={{ color: '#f472b6' }} />
              <span className="font-semibold text-white">STEP 1 · 대상 선정 기준</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: '나이', rule: '40세 이상 환자만 포함', color: '#f472b6' },
                { label: '수술 시간', rule: '600분 이하 케이스만 포함', color: '#f472b6' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl p-4"
                  style={{ background: 'rgba(244,114,182,0.06)', border: '1px solid rgba(244,114,182,0.15)' }}>
                  <div className="text-xs font-mono px-2 py-1 rounded-lg shrink-0"
                    style={{ background: 'rgba(244,114,182,0.15)', color: '#f472b6' }}>{r.label}</div>
                  <span className="text-sm text-slate-300">{r.rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2: 클래스 불균형 처리 */}
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <MdOutlineBalance size={18} style={{ color: '#a78bfa' }} />
              <span className="font-semibold text-white">STEP 2 · 클래스 불균형 처리</span>
              <span className="text-xs px-2 py-0.5 rounded-full ml-1"
                style={{ background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.3)' }}>
                SMOTE 미사용
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <div className="flex-1 rounded-2xl p-5"
                style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.15)' }}>
                <div className="text-xs text-slate-500 mb-2">POAF 발생 (양성, 1)</div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#a78bfa' }}>전체 유지</div>
                <div className="text-xs text-slate-400">AF 발생 환자 케이스 전수 포함</div>
              </div>
              <div className="flex items-center justify-center text-slate-600 shrink-0">
                <TbArrowsExchange size={22} />
              </div>
              <div className="flex-1 rounded-2xl p-5"
                style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)' }}>
                <div className="text-xs text-slate-500 mb-2">No POAF (음성, 0)</div>
                <div className="text-2xl font-bold mb-1" style={{ color: '#60a5fa' }}>다운샘플링</div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  CPB 시행(1) : CPB 미시행(0) = <strong className="text-white">4 : 6</strong> 비율로<br />
                  CPB 미시행 케이스를 줄여 클래스 균형 조정
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: 이상치 제거 */}
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-5">
              <TbFilter size={18} style={{ color: '#fb923c' }} />
              <span className="font-semibold text-white">STEP 3 · 이상치 제거</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { var: 'BMI',                    rule: '12 미만 또는 80 초과 제거',      color: '#fb923c' },
                { var: 'an_duration',             rule: '1,200분 초과 제거',              color: '#fb923c' },
                { var: 'etco2_mean / min / std',  rule: '0 값 제거 (측정 오류로 판단)',   color: '#fb923c' },
              ].map((r, i) => (
                <div key={i} className="rounded-2xl p-4"
                  style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.15)' }}>
                  <div className="font-mono text-xs font-bold mb-2" style={{ color: '#fb923c' }}>{r.var}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{r.rule}</div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 4: 결측치 처리 */}
          <div className="glass rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-6">
              <RiFlowChart size={18} style={{ color: '#34d399' }} />
              <span className="font-semibold text-white">STEP 4 · 결측치 처리 — 변수별 차등 적용</span>
            </div>
            <div className="space-y-3">

              {/* 0으로 대체 */}
              <div className="rounded-2xl p-4"
                style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399' }}>0으로 대체</span>
                  <span className="text-xs text-slate-500">결측 = 해당 약물/처치 미시행으로 해석</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['doubi_max', 'nepi_max', 'cpb_duration'].map(v => (
                    <span key={v} className="font-mono text-xs px-3 py-1 rounded-lg text-white"
                      style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* 범주형 변환 */}
              <div className="rounded-2xl p-4"
                style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{ background: 'rgba(96,165,250,0.2)', color: '#60a5fa' }}>범주형 변환 (0 / 1)</span>
                  <span className="text-xs text-slate-500">측정값 존재 여부 자체를 임상 정보로 활용</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {['cvp_min', 'cvp_mean'].map(v => (
                    <span key={v} className="font-mono text-xs px-3 py-1 rounded-lg text-white"
                      style={{ background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.25)' }}>
                      {v}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  두 컬럼을 <strong className="text-white">하나의 범주형 컬럼</strong>으로 통합 —
                  값이 하나라도 존재하면 <span style={{ color: '#60a5fa' }}>1</span>,
                  모두 결측이면 <span style={{ color: '#60a5fa' }}>0</span>
                </div>
              </div>

              {/* 행 제거 */}
              <div className="rounded-2xl p-4"
                style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{ background: 'rgba(251,146,60,0.2)', color: '#fb923c' }}>해당 행 제거</span>
                  <span className="text-xs text-slate-500">위 3개 규칙 외 나머지 컬럼</span>
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  doubi_max · nepi_max · cpb_duration · cvp 관련 컬럼을 제외한
                  나머지 변수에서 결측치가 발생한 경우 <strong className="text-white">해당 행 전체를 제거</strong>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 최종 입력 변수 */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <TbVariable size={18} style={{ color: '#34d399' }} />
            <span className="font-semibold text-white">최종 입력 변수
              <span className="text-slate-500 font-normal text-sm ml-1">({keyFeatures.length}개)</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {keyFeatures.map((f, i) => (
              <span key={i} className="glass px-4 py-2 rounded-full text-sm text-slate-300"
                style={{ border: '1px solid rgba(96,165,250,0.2)' }}>
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
