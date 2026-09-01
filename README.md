# 심방세동 예측 AI 

> **2026 데이터톤 · 7조 MADE**
> 수술 전·중 생체 데이터를 기반으로 **수술 후 심방세동(POAF, Post-Operative Atrial Fibrillation)** 발생 여부를 예측하고, 예측에 영향을 준 변수를 설명하는 프로젝트

<br />

## 프로젝트 개요

심장 수술 후 흔히 발생하는 합병증인 **심방세동(Atrial Fibrillation)** 을 조기에 예측하여 임상 의사결정을 지원하는 것을 목표로 합니다.
INSPIRE 수술 전후(perioperative) 공개 데이터셋을 활용해 머신러닝 모델을 학습하고, SHAP 기반 해석으로 환자별 위험 변수를 분석합니다.

- **심방세동 발생 예측**
- **환자별 위험 변수 분석**
- **SHAP 기반 예측 설명**
- **임상 의사결정 지원**

<br />

## 📊 데이터셋

[INSPIRE — a publicly available research dataset for perioperative medicine](https://physionet.org/content/inspire/) 기반

| 항목 | 값 |
|------|-----|
| 전체 케이스 | 1,583건 |
| 사용 피처 | 30개 |
| POAF 발생(양성) | 255건 (16.1%) |
| POAF 미발생(음성) | 1,328건 |
| Train / Test | 1,266 / 317 |

> 양성 비율이 약 16%로 **클래스 불균형**이 존재하여, 재현율(Recall) 중심의 threshold 튜닝을 적용했습니다.

<br />

## 🤖 모델 성능

여러 트리 기반 모델과 앙상블(Weighted Voting)을 비교했습니다.

| Metric | LightGBM | XGBoost | RandomForest | Weighted Voting |
|--------|:--------:|:-------:|:------------:|:---------------:|
| **AUROC** | **0.7966** | 0.7822 | 0.7916 | 0.7944 |
| **AUPRC** | 0.4776 | 0.4564 | 0.4962 | 0.4957 |
| **Recall** | 0.7843 | **0.8039** | 0.7843 | 0.8039 |
| **Precision** | 0.2667 | 0.2697 | **0.2778** | 0.2770 |
| **F1** | 0.3980 | 0.4039 | 0.4103 | **0.4121** |

<br />

## 🔍 주요 임상 신호 (SHAP)

| 변수 | 영향 방향 | 해석 |
|------|:---------:|------|
| PT-INR | ↑ | 응고 이상이 클수록 수술 전후 스트레스·염증 반응 증가 |
| CPB 시행 여부 | ↑ | 수술 맥락 차이 반영 |
| SpO₂ 변동성 | ↑ | 산소포화도 변동이 클수록 생리적 불안정성 시사 |
| 평균 SpO₂ | ↓ | 안정적 산소화 유지 시 심방 스트레스 감소 |
| Age | ↑ | 고령일수록 심방 리모델링·자율신경 취약성 누적 |

<br />

## 🛠 기술 스택

- **Frontend**: React 19, Tailwind CSS
- **ML**: LightGBM, XGBoost, RandomForest, Optuna(하이퍼파라미터 튜닝), SHAP

<br />

##실행 방법

```bash
cd 프론트/2026daton
npm install
npm start        # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run deploy   # GitHub Pages 배포
```
