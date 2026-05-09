export const datasetSummary = {
  cases: 1583,
  columns: 33,
  features: 30,
  positiveCases: 255,
  negativeCases: 1328,
  positiveRate: 16.1,
  trainCases: 1266,
  testCases: 317,
};

export const modelMetrics = {
  lightgbm: {
    name: 'LightGBM',
    auroc: 0.7966,
    auprc: 0.4776,
    f1: 0.3980,
    recall: 0.7843,
    precision: 0.2667,
    threshold: 0.25,
    confusion: { tn: 156, fp: 110, fn: 11, tp: 40 },
  },
  xgboost: {
    name: 'XGBoost',
    auroc: 0.7822,
    auprc: 0.4564,
    f1: 0.4039,
    recall: 0.8039,
    precision: 0.2697,
    threshold: 0.22,
    confusion: { tn: 155, fp: 111, fn: 10, tp: 41 },
  },
  randomForest: {
    name: 'RandomForest',
    auroc: 0.7916,
    auprc: 0.4962,
    f1: 0.4103,
    recall: 0.7843,
    precision: 0.2778,
    threshold: 0.44,
    confusion: { tn: 162, fp: 104, fn: 11, tp: 40 },
  },
  weightedVoting: {
    name: 'Weighted Voting',
    auroc: 0.7944,
    auprc: 0.4957,
    f1: 0.4121,
    recall: 0.8039,
    precision: 0.2770,
    threshold: 0.31,
    confusion: { tn: 159, fp: 107, fn: 10, tp: 41 },
  },
};

export const finalResultRows = [
  { metric: 'AUROC', lightgbm: '0.7966', xgboost: '0.7822', randomForest: '0.7916' },
  { metric: 'AUPRC', lightgbm: '0.4776', xgboost: '0.4564', randomForest: '0.4962' },
  { metric: 'F1', lightgbm: '0.3980', xgboost: '0.4039', randomForest: '0.4103' },
  { metric: 'Recall', lightgbm: '0.7843', xgboost: '0.8039', randomForest: '0.7843', highlight: 'xgboost' },
  { metric: 'Precision', lightgbm: '0.2667', xgboost: '0.2697', randomForest: '0.2778' },
  { metric: 'Threshold', lightgbm: '0.2500', xgboost: '0.2200', randomForest: '0.4400' },
];

export const topClinicalSignals = [
  {
    feature: 'PT-INR',
    value: 0.24,
    direction: 'pos',
    clinical: '응고 이상이 클수록 수술 전후 스트레스와 염증 반응이 커져 POAF 위험이 상승했습니다.',
  },
  {
    feature: 'CPB 시행 여부 ',
    value: 0.22,
    direction: 'pos',
    clinical: '본 데이터에서는 CPB 미시행군에서 POAF 비율이 더 높게 나타나 수술 맥락 차이를 반영했습니다.',
  },
  {
    feature: 'CPB duration',
    value: -0.19,
    direction: 'neg',
    clinical: 'CPB 관련 변수는 수술 유형과 강하게 연결되어 있으며, 데이터에서는 길수록 POAF와 음의 상관을 보였습니다.',
  },
  {
    feature: 'SpO2 mean',
    value: -0.15,
    direction: 'neg',
    clinical: '산소화가 안정적으로 유지될수록 심방 스트레스가 낮아져 POAF 위험 감소 방향으로 작용했습니다.',
  },
  {
    feature: 'SpO2 std',
    value: 0.14,
    direction: 'pos',
    clinical: '산소포화도 변동성이 클수록 수술 중 생리적 불안정성을 시사해 위험 증가 신호로 작동했습니다.',
  },
  {
    feature: 'Age',
    value: 0.10,
    direction: 'pos',
    clinical: '고령 환자에서 심방 리모델링과 자율신경 취약성이 누적되어 POAF 발생 경향이 커졌습니다.',
  },
];

export const demoFeatures = [
  { key: 'age', label: '나이', min: 40, max: 90, step: 1, unit: '세' },
  { key: 'lab_ptinr', label: 'PT-INR', min: 0.9, max: 2.6, step: 0.01, unit: '' },
  { key: 'cpb_duration', label: 'CPB 시간', min: 0, max: 390, step: 5, unit: '분' },
  { key: 'spo2_mean', label: '평균 SpO2', min: 90, max: 100, step: 0.1, unit: '%' },
  { key: 'hr_min', label: '최저 심박수', min: 35, max: 90, step: 1, unit: 'bpm' },
];
