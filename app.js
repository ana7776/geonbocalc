const HEALTH_INSURANCE_RATE = 0.0719;
const LONG_TERM_CARE_RATE = 0.1314;
const PROPERTY_POINT_VALUE = 211.5;
const PROPERTY_DEDUCTION = 100000000;
const LOCAL_MIN_HEALTH_PREMIUM = 20160;
const LOW_INCOME_THRESHOLD = 3360000;

const PROPERTY_GRADES = [
  [4500000, 22],
  [9000000, 44],
  [13500000, 66],
  [18000000, 97],
  [22500000, 122],
  [27000000, 146],
  [31500000, 171],
  [36000000, 195],
  [40500000, 219],
  [45000000, 244],
  [50200000, 268],
  [55900000, 294],
  [62200000, 320],
  [69300000, 344],
  [77100000, 365],
  [85900000, 386],
  [95700000, 412],
  [107000000, 439],
  [119000000, 465],
  [133000000, 490],
  [148000000, 516],
  [164000000, 535],
  [183000000, 559],
  [204000000, 586],
  [227000000, 611],
  [253000000, 637],
  [281000000, 659],
  [313000000, 681],
  [349000000, 706],
  [388000000, 731],
  [432000000, 757],
  [481000000, 785],
  [536000000, 812],
  [597000000, 841],
  [665000000, 881],
  [740000000, 921],
  [824000000, 961],
  [918000000, 1001],
  [1030000000, 1041],
  [1140000000, 1091],
  [1270000000, 1141],
  [1420000000, 1191],
  [1580000000, 1241],
  [1760000000, 1291],
  [1960000000, 1341],
  [2180000000, 1391],
  [2420000000, 1451],
  [2700000000, 1511],
  [3000000000, 1571],
  [3300000000, 1641],
  [3630000000, 1711],
  [3993000000, 1781],
  [4392300000, 1851],
  [4831530000, 1921],
  [5314680000, 1991],
  [5846150000, 2061],
  [6430770000, 2131],
  [7073850000, 2201],
  [7781240000, 2271],
  [Infinity, 2341]
];

const form = document.querySelector("#healthForm");
const localPremiumEl = document.querySelector("#localPremium");
const continuationPremiumEl = document.querySelector("#continuationPremium");
const dependentStatusEl = document.querySelector("#dependentStatus");
const recommendationEl = document.querySelector("#recommendation");
const breakdownEl = document.querySelector("#breakdown");
const actionPlanEl = document.querySelector("#actionPlan");

function valueOf(id) {
  const value = Number(document.querySelector(id).value || 0);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function formatWon(value) {
  return `${Math.max(0, Math.round(value)).toLocaleString("ko-KR")}원`;
}

function propertyPoints(value) {
  if (value <= 0) {
    return 0;
  }

  const grade = PROPERTY_GRADES.find(([limit]) => value <= limit);
  return grade ? grade[1] : 0;
}

function estimateLocalPremium(data) {
  const incomeBase =
    data.businessIncome +
    data.financialIncome +
    data.otherIncome +
    data.pensionIncome * 0.5;

  const rentAssessment = data.deposit * 0.3 + data.monthlyRent * 40 * 0.3;
  const propertyAfterDeduction = Math.max(0, data.propertyBase + rentAssessment - PROPERTY_DEDUCTION);
  const debtDeduction = Math.min(propertyAfterDeduction, data.housingDebt * 0.6);
  const adjustedPropertyBase = Math.max(0, propertyAfterDeduction - debtDeduction);
  const propertyPoint = propertyPoints(adjustedPropertyBase);
  const monthlyIncomePremium =
    incomeBase > LOW_INCOME_THRESHOLD
      ? (incomeBase / 12) * HEALTH_INSURANCE_RATE
      : LOCAL_MIN_HEALTH_PREMIUM;
  const monthlyPropertyPremium = propertyPoint * PROPERTY_POINT_VALUE;
  const healthPremium = monthlyIncomePremium + monthlyPropertyPremium;
  const longTermCare = healthPremium * LONG_TERM_CARE_RATE;

  return {
    incomeBase,
    propertyAfterDeduction,
    adjustedPropertyBase,
    debtDeduction,
    propertyPoint,
    monthlyIncomePremium,
    monthlyPropertyPremium,
    healthPremium,
    longTermCare,
    total: healthPremium + longTermCare
  };
}

function estimateContinuationHealthPremium(data) {
  if (data.employeePremium > 0) {
    return {
      healthPremium: data.employeePremium,
      source: "퇴사 전 건강보험료 본인부담액"
    };
  }

  if (data.monthlyPay > 0) {
    return {
      healthPremium: (data.monthlyPay * HEALTH_INSURANCE_RATE) / 2,
      source: "퇴사 전 월 보수 기준 추정"
    };
  }

  return {
    healthPremium: 0,
    source: "입력값 없음"
  };
}

function judgeDependent(data) {
  const totalIncome = data.businessIncome + data.financialIncome + data.pensionIncome + data.otherIncome;

  if (data.familyOption === "no") {
    return { label: "어려움", reason: "등록 가능한 직장가입자 가족이 없다고 선택했습니다." };
  }

  if (data.businessIncome > 0) {
    return { label: "확인 필요", reason: "사업소득 또는 프리랜서 소득이 있으면 피부양자 인정이 까다로울 수 있습니다." };
  }

  if (totalIncome > 20000000) {
    return { label: "어려움", reason: "연간 합산 소득이 2,000만원을 초과하면 피부양자 자격 유지가 어려울 수 있습니다." };
  }

  if (data.financialIncome >= 10000000) {
    return { label: "확인 필요", reason: "금융소득이 1,000만원 이상이면 합산 반영 여부를 확인해야 합니다." };
  }

  if (data.familyOption === "unknown") {
    return { label: "확인 필요", reason: "직장가입자 가족에게 등록 가능한 가족관계인지 먼저 확인하세요." };
  }

  return { label: "가능성 있음", reason: "입력값 기준으로는 피부양자 등록 가능성을 먼저 확인해볼 만합니다." };
}

function recommend(localTotal, continuationTotal, dependent) {
  if (dependent.label === "가능성 있음") {
    return {
      title: "피부양자 확인 우선",
      text: "보험료 부담이 없을 수 있으므로 가족 피부양자 등록 가능성을 먼저 확인하세요."
    };
  }

  if (continuationTotal > 0 && continuationTotal < localTotal) {
    return {
      title: "임의계속가입 검토",
      text: "입력값 기준으로는 임의계속가입 예상액이 지역가입자 예상액보다 낮습니다."
    };
  }

  return {
    title: "지역가입자 전환 대비",
    text: "피부양자 가능성이 낮거나 임의계속가입보다 지역가입자 예상액이 낮은 상황입니다."
  };
}

function buildActionPlan(data, local, continuation, dependent) {
  const steps = [];
  const totalIncome = data.businessIncome + data.financialIncome + data.pensionIncome + data.otherIncome;

  if (dependent.label === "가능성 있음") {
    steps.push("직장가입자인 가족에게 피부양자 등록 가능 여부를 먼저 확인하세요.");
  } else {
    steps.push("피부양자 등록이 어려울 수 있으므로 지역가입자와 임의계속가입을 비교하세요.");
  }

  if (continuation > 0 && continuation < local.total) {
    steps.push("퇴사 전 건강보험료가 낮은 편이므로 임의계속가입 신청 가능 기간과 요건을 확인하세요.");
  } else {
    steps.push("지역가입자 예상액이 크게 높지 않다면 실제 고지 자료 반영 시점을 확인하세요.");
  }

  if (totalIncome > 0) {
    steps.push("퇴사 후 발생하는 소득은 종류별로 반영 시점이 다를 수 있으니 소득금액증명 기준으로 다시 확인하세요.");
  }

  if (data.propertyBase > 0 || data.deposit > 0 || data.monthlyRent > 0) {
    steps.push("재산 과세표준과 전월세 자료가 섞이지 않도록 각각 따로 정리하세요.");
  }

  if (data.housingDebt > 0) {
    steps.push("주택 관련 대출은 자동 공제가 아닐 수 있으므로 공제 대상과 신청 여부를 공단에서 확인하세요.");
  }

  if (data.financialIncome >= 10000000) {
    steps.push("금융소득이 있는 경우 피부양자 자격과 지역보험료를 함께 점검하세요.");
  }

  return steps.slice(0, 5);
}

function render() {
  const data = {
    employeePremium: valueOf("#employeePremium"),
    monthlyPay: valueOf("#monthlyPay"),
    businessIncome: valueOf("#businessIncome"),
    financialIncome: valueOf("#financialIncome"),
    pensionIncome: valueOf("#pensionIncome"),
    otherIncome: valueOf("#otherIncome"),
    propertyBase: valueOf("#propertyBase"),
    deposit: valueOf("#deposit"),
    monthlyRent: valueOf("#monthlyRent"),
    housingDebt: valueOf("#housingDebt"),
    familyOption: document.querySelector("#familyOption").value
  };

  const local = estimateLocalPremium(data);
  const continuationEstimate = estimateContinuationHealthPremium(data);
  const continuationHealth = continuationEstimate.healthPremium;
  const continuation = continuationHealth + continuationHealth * LONG_TERM_CARE_RATE;
  const dependent = judgeDependent(data);
  const advice = recommend(local.total, continuation, dependent);
  const actionSteps = buildActionPlan(data, local, continuation, dependent);

  localPremiumEl.textContent = formatWon(local.total);
  continuationPremiumEl.textContent = formatWon(continuation);
  dependentStatusEl.textContent = dependent.label;
  recommendationEl.innerHTML = `
    <span>추천 선택지</span>
    <strong>${advice.title}</strong>
    <p>${advice.text}</p>
  `;
  breakdownEl.innerHTML = `
    <p>지역가입자 계산 반영 소득: <strong>${formatWon(local.incomeBase)}</strong></p>
    <p>지역가입자 소득보험료 추정: <strong>${formatWon(local.monthlyIncomePremium)}</strong></p>
    <p>기본 공제 후 재산 반영액: <strong>${formatWon(local.propertyAfterDeduction)}</strong></p>
    <p>주택 관련 대출 참고 공제: <strong>${formatWon(local.debtDeduction)}</strong></p>
    <p>최종 재산 반영 참고액: <strong>${formatWon(local.adjustedPropertyBase)}</strong></p>
    <p>재산보험료 부과점수: <strong>${local.propertyPoint.toLocaleString("ko-KR")}점</strong></p>
    <p>지역가입자 재산보험료 추정: <strong>${formatWon(local.monthlyPropertyPremium)}</strong></p>
    <p>임의계속가입 추정 기준: <strong>${continuationEstimate.source}</strong></p>
    <p>임의계속가입 장기요양 추정: <strong>${formatWon(continuationHealth * LONG_TERM_CARE_RATE)}</strong></p>
    <p>장기요양보험료 추정: <strong>${formatWon(local.longTermCare)}</strong></p>
    <p>피부양자 판단 메모: ${dependent.reason}</p>
  `;
  actionPlanEl.innerHTML = `
    <strong>다음 확인 순서</strong>
    <ol>${actionSteps.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  render();
});

form.addEventListener("reset", () => {
  window.setTimeout(render, 0);
});

render();
