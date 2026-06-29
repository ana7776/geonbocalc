const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const site = "https://geonbocalc.com";
const updated = "2026-06-24";
const operatorName = "건보계산기 편집팀";

const categories = [
  {
    id: "guides",
    title: "퇴사 후 건강보험 가이드",
    description: "퇴사 직후 건강보험 자격과 보험료를 어떤 순서로 확인해야 하는지 정리합니다.",
    color: "#167761"
  },
  {
    id: "local-subscriber",
    title: "지역가입자 보험료",
    description: "소득, 재산, 전월세가 지역가입자 건강보험료에 어떻게 연결되는지 설명합니다.",
    color: "#0057ff"
  },
  {
    id: "voluntary-continuation",
    title: "임의계속가입",
    description: "퇴사 전 보험료와 지역가입자 예상액을 비교해 임의계속가입을 판단합니다.",
    color: "#7038ff"
  },
  {
    id: "dependent",
    title: "피부양자 자격",
    description: "가족 피부양자 등록 가능성과 소득 조건을 퇴사자 관점에서 확인합니다.",
    color: "#ffb000"
  },
  {
    id: "income",
    title: "소득별 건강보험",
    description: "금융소득, 사업소득, 연금소득 등 소득 종류별 건강보험 영향을 정리합니다.",
    color: "#ff3b30"
  },
  {
    id: "cases",
    title: "Before / After 사례",
    description: "퇴사 전후 건강보험료 선택지가 어떻게 달라지는지 사례로 비교합니다.",
    color: "#17201f"
  },
  {
    id: "checklists",
    title: "서류와 체크리스트",
    description: "공단 문의와 신청 전에 준비해야 할 자료를 체크리스트로 정리합니다.",
    color: "#51606f"
  }
];

const articles = [
  ["guides", "퇴사 후 건강보험료가 갑자기 오른 이유", "why-health-premium-rises-after-resignation", "퇴사 후 직장가입자 자격이 끝나면서 소득과 재산 기준이 달라져 보험료가 오를 수 있습니다.", ["직장가입자와 지역가입자는 보험료 산정 기준이 다릅니다.", "퇴사 직후에는 피부양자, 임의계속가입, 지역가입자 순서로 확인하는 편이 안전합니다.", "실제 고지는 국민건강보험공단의 최신 자료와 자격 심사를 기준으로 합니다."]],
  ["guides", "퇴사 후 지역가입자로 바뀌는 시점", "when-local-subscriber-starts-after-resignation", "직장가입자 자격 상실 후 지역가입자 전환 시점과 확인해야 할 고지 흐름을 정리합니다.", ["퇴사일과 자격상실 신고 처리 시점이 중요합니다.", "고지서는 뒤늦게 확인될 수 있어 미리 예상액을 점검하는 것이 좋습니다.", "전환 전 피부양자 가능성을 먼저 확인하세요."]],
  ["guides", "무직자 건강보험료 줄이는 확인 순서", "unemployed-health-insurance-check-order", "무직 상태에서 건강보험료 부담을 줄이기 위해 어떤 선택지를 먼저 봐야 하는지 안내합니다.", ["피부양자 등록 가능성이 있다면 가장 먼저 확인합니다.", "퇴사 전 보험료가 낮았다면 임의계속가입이 유리할 수 있습니다.", "소득이 없어도 재산과 전월세 자료가 영향을 줄 수 있습니다."]],
  ["guides", "퇴사 후 건강보험 피부양자 등록 방법", "dependent-registration-after-resignation", "가족의 직장가입자 밑으로 피부양자 등록을 검토할 때 필요한 기준과 자료를 설명합니다.", ["가족관계와 소득 조건을 함께 확인해야 합니다.", "사업소득과 금융소득은 피부양자 판단에 민감합니다.", "등록 가능성이 있어도 공단 심사 결과가 우선합니다."]],
  ["guides", "퇴사 후 건강보험 공단 문의 전 준비할 질문", "questions-before-calling-nhis", "국민건강보험공단에 문의하기 전 준비하면 좋은 질문과 자료를 정리합니다.", ["퇴사일, 소득 종류, 가족 등록 가능성을 정리합니다.", "예상 보험료와 실제 고지 차이를 질문할 수 있습니다.", "문의 전 계산기 결과를 메모해두면 상담이 쉬워집니다."]],

  ["local-subscriber", "지역가입자 보험료 계산에 반영되는 소득", "income-used-for-local-health-premium", "지역가입자 건강보험료에서 어떤 소득이 반영되는지 퇴사자 관점으로 설명합니다.", ["사업소득, 금융소득, 연금소득, 기타소득을 나눠 봐야 합니다.", "소득금액과 총수입은 다를 수 있습니다.", "반영 시점은 실제 고지와 차이가 날 수 있습니다."]],
  ["local-subscriber", "전월세 보증금이 건강보험료에 미치는 영향", "rent-deposit-local-health-premium", "전월세 보증금과 월세가 지역가입자 보험료 판단에 연결될 수 있는 이유를 정리합니다.", ["전월세 자료는 재산성 요소로 검토될 수 있습니다.", "무주택이라도 보증금 자료를 준비하는 것이 좋습니다.", "임대차계약서 기준으로 확인하세요."]],
  ["local-subscriber", "재산세 과세표준과 건강보험료 관계", "property-tax-base-health-premium", "지역가입자 보험료에서 시세가 아니라 과세표준을 확인해야 하는 이유를 설명합니다.", ["주택, 건물, 토지 자료를 구분합니다.", "재산세 과세표준 합계가 중요합니다.", "대출 공제 가능성은 별도로 확인해야 합니다."]],
  ["local-subscriber", "주택금융부채 공제 확인 방법", "housing-debt-deduction-health-premium", "주택 관련 부채가 지역가입자 보험료에 영향을 줄 수 있는지 확인하는 흐름을 정리합니다.", ["모든 대출이 자동 공제되는 것은 아닙니다.", "공제 대상 여부와 신청 필요 여부를 확인해야 합니다.", "대출잔액 증빙을 준비하세요."]],
  ["local-subscriber", "소득이 없는데 지역보험료가 나오는 이유", "local-premium-without-income", "퇴사 후 소득이 없어도 지역가입자 보험료가 발생할 수 있는 이유를 설명합니다.", ["소득 외 재산과 전월세 자료가 반영될 수 있습니다.", "세대 구성과 자격 상태도 영향을 줄 수 있습니다.", "고지 전 예상액을 계산해보는 것이 좋습니다."]],

  ["voluntary-continuation", "임의계속가입 신청 전 확인할 것", "before-voluntary-continuation-application", "임의계속가입이 유리한지 판단하기 전에 확인할 자료와 비교 방법을 정리합니다.", ["퇴사 전 본인 부담 건강보험료를 확인합니다.", "지역가입자 예상액과 비교해야 합니다.", "신청 가능 기간과 요건을 놓치지 않아야 합니다."]],
  ["voluntary-continuation", "임의계속가입이 유리한 경우", "when-voluntary-continuation-is-better", "퇴사 전 보험료가 지역가입자 예상액보다 낮을 때 임의계속가입이 유리할 수 있습니다.", ["재산이나 금융소득이 큰 경우 비교 가치가 큽니다.", "퇴사 전 보험료 기준을 정확히 확인합니다.", "피부양자 가능성이 없다면 두 번째로 검토합니다."]],
  ["voluntary-continuation", "임의계속가입보다 지역가입자가 나을 수 있는 경우", "when-local-can-be-better-than-continuation", "항상 임의계속가입이 유리한 것은 아니며, 지역가입자 예상액이 낮을 수도 있습니다.", ["퇴사 전 보험료가 높았다면 지역가입자와 비교해야 합니다.", "소득과 재산이 적으면 지역가입자 부담이 낮을 수 있습니다.", "계산 결과를 공단 자료와 함께 확인하세요."]],
  ["voluntary-continuation", "임의계속가입 계산에 필요한 급여명세서 항목", "paystub-items-for-voluntary-continuation", "급여명세서에서 어떤 항목을 봐야 임의계속가입 예상액을 비교할 수 있는지 설명합니다.", ["건강보험료 본인 부담액을 확인합니다.", "장기요양보험료와 구분해서 봅니다.", "여러 달 변동이 있으면 평균적으로 확인하세요."]],

  ["dependent", "배우자 피부양자 등록 가능성 체크", "spouse-dependent-eligibility-check", "퇴사 후 배우자의 직장가입자 밑으로 피부양자 등록을 검토하는 기준을 정리합니다.", ["가족관계와 소득 요건을 함께 봅니다.", "사업소득이 있으면 주의가 필요합니다.", "등록 가능성이 있으면 보험료 부담이 크게 줄 수 있습니다."]],
  ["dependent", "부모님 피부양자 등록 기준", "parents-dependent-eligibility", "부모님을 피부양자로 등록하거나 본인이 부모님 밑으로 등록되는 경우의 확인 항목을 정리합니다.", ["관계와 동거 여부뿐 아니라 소득 조건도 중요합니다.", "연금과 금융소득을 함께 확인합니다.", "공단 심사 결과가 최종 기준입니다."]],
  ["dependent", "사업자등록 후 피부양자 탈락 가능성", "business-registration-dependent-risk", "사업자등록이 있거나 사업소득이 생긴 경우 피부양자 자격에 어떤 위험이 있는지 설명합니다.", ["사업자등록 여부는 피부양자 판단에서 민감합니다.", "소득금액이 작아도 확인이 필요합니다.", "프리랜서 전환 전 미리 비교하세요."]],
  ["dependent", "금융소득 때문에 피부양자 등록이 어려운 경우", "financial-income-dependent-risk", "이자와 배당소득이 피부양자 자격 판단에 어떤 영향을 주는지 정리합니다.", ["금융소득은 합산 소득 판단에서 중요합니다.", "예금, 배당, 채권 이자 자료를 확인합니다.", "소득 발생 시점과 귀속연도를 구분해야 합니다."]],

  ["income", "금융소득 1천만원 이상이면 확인할 것", "financial-income-over-10m-health-insurance", "금융소득 규모가 커질 때 건강보험료와 피부양자 자격을 어떻게 확인해야 하는지 설명합니다.", ["이자와 배당소득을 합산해 봅니다.", "피부양자 가능성과 지역보험료를 함께 점검합니다.", "국세청 자료와 공단 자료 반영 시점이 다를 수 있습니다."]],
  ["income", "연금소득과 건강보험료 관계", "pension-income-health-insurance", "공적연금과 사적연금이 건강보험료 판단에서 어떻게 검토될 수 있는지 정리합니다.", ["연금 종류별로 반영 방식이 다를 수 있습니다.", "피부양자 판단과 지역가입자 산정 모두 확인합니다.", "연금 수령 예정자라면 미리 계산해보세요."]],
  ["income", "프리랜서 전환 후 건강보험료 변화", "freelancer-health-premium-after-resignation", "퇴사 후 프리랜서로 일할 때 사업소득과 건강보험료가 어떻게 연결되는지 설명합니다.", ["사업소득 발생 여부가 중요합니다.", "피부양자 등록이 어려워질 수 있습니다.", "필요경비를 뺀 소득금액 기준으로 자료를 확인하세요."]],
  ["income", "퇴직금은 건강보험료에 반영될까", "severance-pay-health-insurance", "퇴직금과 건강보험료의 관계를 오해하지 않도록 확인해야 할 기준을 설명합니다.", ["퇴직금 자체와 이후 발생 소득은 구분해야 합니다.", "금융상품에 넣은 뒤 이자·배당이 생기면 별도 확인이 필요합니다.", "세금 자료와 보험료 자료는 기준이 다를 수 있습니다."]],

  ["cases", "퇴사 전 월 12만원 보험료의 전후 비교", "case-120k-before-after", "퇴사 전 본인 부담 보험료가 월 12만원인 사람이 어떤 순서로 비교하면 좋은지 사례로 봅니다.", ["피부양자 가능성을 먼저 확인합니다.", "임의계속가입 예상액과 지역가입자 예상액을 비교합니다.", "결과에 따라 준비 자료가 달라집니다."]],
  ["cases", "배우자 피부양자로 등록 가능한 경우", "case-spouse-dependent-before-after", "배우자 직장가입자 밑으로 등록 가능한 경우 보험료 부담이 어떻게 달라지는지 정리합니다.", ["보험료 0원 가능성이 있어 가장 먼저 확인합니다.", "소득 조건을 넘으면 대안이 필요합니다.", "등록 전 가족관계와 소득 자료를 준비합니다."]],
  ["cases", "전월세 보증금이 있는 무직자의 보험료 변화", "case-rent-deposit-unemployed", "소득이 없어도 전월세 보증금 때문에 지역보험료를 확인해야 하는 사례입니다.", ["전월세 자료를 빠뜨리면 예상액이 달라질 수 있습니다.", "재산 반영 여부를 공단 기준으로 확인합니다.", "임의계속가입과 함께 비교하세요."]],
  ["cases", "프리랜서 전환 후 보험료가 바뀌는 사례", "case-freelancer-after-resignation", "퇴사 후 프리랜서 수입이 생긴 경우 건강보험 선택지가 어떻게 달라지는지 설명합니다.", ["사업소득은 피부양자 판단에 영향을 줍니다.", "지역가입자 예상액이 변동될 수 있습니다.", "소득 발생 시점과 신고 시점을 구분합니다."]],
  ["cases", "임의계속가입이 유리한 사례", "case-voluntary-continuation-better", "재산이나 금융소득 때문에 지역가입자 예상액이 높아질 수 있는 경우를 비교합니다.", ["퇴사 전 보험료가 낮으면 임의계속가입이 유리할 수 있습니다.", "피부양자 가능성이 없을 때 특히 중요합니다.", "신청 가능 기간을 놓치지 않아야 합니다."]],

  ["checklists", "퇴사 전 건강보험 확인 체크리스트", "before-resignation-health-checklist", "퇴사 전에 미리 확인하면 좋은 건강보험 자료와 질문을 정리합니다.", ["급여명세서 건강보험료를 확인합니다.", "퇴사 후 소득 발생 계획을 적어봅니다.", "가족 피부양자 가능성을 확인합니다."]],
  ["checklists", "피부양자 등록 준비서류", "dependent-documents-checklist", "피부양자 등록을 검토할 때 준비하면 좋은 자료를 체크리스트로 정리합니다.", ["가족관계 자료를 준비합니다.", "소득금액과 금융소득 자료를 확인합니다.", "사업자등록 여부를 확인합니다."]],
  ["checklists", "임의계속가입 신청 체크리스트", "voluntary-continuation-checklist", "임의계속가입 신청 전 비교해야 할 항목과 자료를 정리합니다.", ["퇴사 전 보험료를 확인합니다.", "지역가입자 예상액을 계산합니다.", "신청 기한과 요건을 확인합니다."]],
  ["checklists", "지역가입자 계산 자료 목록", "local-subscriber-documents-checklist", "지역가입자 예상액을 계산하기 전에 준비하면 좋은 소득·재산 자료를 정리합니다.", ["소득금액증명을 준비합니다.", "재산세 과세표준을 확인합니다.", "전월세 계약 자료를 확인합니다."]],
  ["checklists", "퇴사자 30일 점검표", "30-day-after-resignation-checklist", "퇴사 후 첫 30일 동안 건강보험 자격과 보험료를 점검하는 순서를 정리합니다.", ["자격상실 처리 여부를 확인합니다.", "피부양자 또는 임의계속가입을 검토합니다.", "고지서가 나오기 전 예상액을 계산합니다."]],
  ["checklists", "퇴사자 90일 점검표", "90-day-after-resignation-checklist", "퇴사 후 90일 안에 소득과 자격 변동을 다시 확인하는 체크리스트입니다.", ["새 소득 발생 여부를 점검합니다.", "가족 등록 상태와 고지 금액을 확인합니다.", "필요하면 공단에 다시 문의합니다."]]
];

const categoryGuidance = {
  guides: {
    intent: "퇴사 직후 무엇부터 확인해야 하는지 모르는 독자를 위해 자격 전환 흐름을 먼저 잡아주는 글입니다.",
    caution: "퇴사일, 자격상실 신고일, 공단 자료 반영일이 서로 다를 수 있어 고지서가 뒤늦게 도착하거나 금액이 조정될 수 있습니다.",
    checklist: ["퇴사일과 마지막 근무월", "급여명세서의 건강보험료 본인부담액", "가족 중 직장가입자 존재 여부", "퇴사 후 예정 소득"]
  },
  "local-subscriber": {
    intent: "지역가입자로 전환될 때 소득이 없어도 왜 보험료가 나올 수 있는지 설명하는 글입니다.",
    caution: "지역보험료는 소득뿐 아니라 재산, 자동차, 세대 자료, 임차 자료가 함께 검토될 수 있으므로 한 항목만으로 판단하지 않습니다.",
    checklist: ["소득금액증명 또는 종합소득 신고 자료", "재산세 과세표준", "임대차계약서", "세대 구성 변동 여부"]
  },
  "voluntary-continuation": {
    intent: "임의계속가입이 무조건 유리하다는 오해를 줄이고, 지역가입자 예상액과 비교하도록 돕는 글입니다.",
    caution: "임의계속가입은 신청 가능 기간과 직장가입 유지 요건을 확인해야 하며, 신청 시점이 늦어지면 선택지가 줄어들 수 있습니다.",
    checklist: ["퇴사 전 건강보험료 본인부담액", "퇴사 전 직장가입 유지 기간", "지역가입자 예상 보험료", "신청 가능 기한"]
  },
  dependent: {
    intent: "가족 피부양자 등록 가능성을 보기 전에 소득과 관계 요건을 차분히 확인하도록 돕는 글입니다.",
    caution: "피부양자는 가족관계만으로 결정되지 않고 소득, 재산, 사업자등록 여부가 함께 검토됩니다.",
    checklist: ["가족관계증명서", "소득금액증명", "금융소득 및 연금 자료", "사업자등록 여부"]
  },
  income: {
    intent: "소득 종류가 바뀌거나 새로 생길 때 건강보험료와 피부양자 자격이 어떻게 흔들릴 수 있는지 설명하는 글입니다.",
    caution: "소득은 발생 시점, 신고 시점, 공단 반영 시점이 다를 수 있어 올해 받은 돈이 바로 같은 달 보험료로 연결되지 않을 수 있습니다.",
    checklist: ["소득 종류와 귀속연도", "국세청 신고 자료", "금융소득·연금·사업소득 내역", "피부양자 등록 상태"]
  },
  cases: {
    intent: "비슷한 상황의 예시를 통해 어떤 자료를 먼저 확인해야 하는지 감을 잡도록 만든 사례형 글입니다.",
    caution: "사례의 금액은 이해를 돕기 위한 예시이며 실제 고지액은 세대와 자료 반영 상태에 따라 달라질 수 있습니다.",
    checklist: ["퇴사 전 보험료", "퇴사 후 예상 소득", "재산과 전월세 자료", "가족 피부양자 가능성"]
  },
  checklists: {
    intent: "공단 문의나 신청 전에 필요한 자료를 빠뜨리지 않도록 정리하는 실무형 글입니다.",
    caution: "제출 자료는 개인 상황과 공단 요청에 따라 달라질 수 있으므로 체크리스트를 최종 제출 목록으로 단정하지 않습니다.",
    checklist: ["본인 상황 메모", "공식 서류 발급 가능 여부", "최근 고지서 또는 급여명세서", "공단에 확인할 질문"]
  }
};

const categoryDeepDive = {
  guides: {
    audience: "퇴사일이 정해졌지만 건강보험 자격이 언제, 어떤 방식으로 바뀌는지 아직 감이 잡히지 않는 사람에게 맞춘 안내입니다.",
    method: "먼저 피부양자 가능성을 확인하고, 어렵다면 임의계속가입과 지역가입자 예상액을 비교합니다. 이후 실제 고지서가 나오면 자격 취득일과 소득 반영 시점을 대조합니다.",
    warning: "퇴사일과 자격상실 신고일, 공단 자료 반영일이 다르면 같은 달 안에서도 안내문과 고지서가 따로 도착할 수 있습니다.",
    useCases: ["퇴사 전 체크 순서 잡기", "첫 지역보험료 고지 대비", "공단 문의 전 질문 정리"]
  },
  "local-subscriber": {
    audience: "퇴사 후 지역가입자로 전환될 가능성이 있거나, 소득이 없는데도 보험료가 나올까 걱정하는 사람을 위한 묶음입니다.",
    method: "소득금액, 재산세 과세표준, 전월세 자료를 분리해서 확인합니다. 자동차 부과 폐지, 재산 기본공제, 주택금융부채 공제처럼 최근 개편으로 달라진 항목도 함께 봅니다.",
    warning: "시세, 통장 잔액, 월급 총액을 그대로 넣으면 실제 산정 기준과 달라질 수 있습니다. 공단이 활용하는 과세자료 기준으로 다시 확인해야 합니다.",
    useCases: ["소득 없는 퇴사자의 고지 원인 확인", "전월세 보증금 영향 확인", "재산 과세표준 자료 준비"]
  },
  "voluntary-continuation": {
    audience: "퇴사 전 보험료가 지역가입자 예상액보다 낮을 수 있거나, 다음 직장까지 공백이 있는 사람에게 필요한 비교 자료입니다.",
    method: "급여명세서의 건강보험료 본인부담액을 기준으로 지역가입자 예상액과 나란히 비교합니다. 피부양자 가능성이 남아 있다면 임의계속가입보다 먼저 확인합니다.",
    warning: "임의계속가입은 신청 기한과 자격 요건이 있습니다. 고지서가 나온 뒤에도 무조건 선택할 수 있다고 보면 위험합니다.",
    useCases: ["퇴사 전 보험료 기준 비교", "신청 전 준비서류 확인", "지역가입자 예상액과 손익 비교"]
  },
  dependent: {
    audience: "배우자, 자녀, 부모 등 직장가입자인 가족 밑으로 피부양자 등록이 가능한지 확인하려는 퇴사자를 위한 자료입니다.",
    method: "가족관계만 보지 않고 사업자등록, 사업소득, 금융소득, 연금소득, 재산 기준을 함께 확인합니다. 등록 가능성이 있으면 지역가입자 계산보다 먼저 살펴봅니다.",
    warning: "피부양자 자격은 소득 자료가 나중에 반영되면서 재검토될 수 있습니다. 퇴사 후 새 소득이 생기면 다시 확인해야 합니다.",
    useCases: ["배우자 피부양자 가능성 확인", "부모님 또는 자녀 밑 등록 검토", "금융소득·사업자등록 리스크 점검"]
  },
  income: {
    audience: "퇴사 후 프리랜서, 사업소득, 연금, 이자·배당처럼 월급이 아닌 소득이 생기거나 커지는 사람에게 맞춘 설명입니다.",
    method: "소득의 종류와 귀속연도, 신고 시점, 공단 반영 시점을 구분합니다. 피부양자 자격과 지역가입자 보험료가 동시에 영향을 받을 수 있는 항목을 먼저 봅니다.",
    warning: "올해 실제로 받은 돈과 건강보험 고지서에 반영되는 소득 자료의 연도가 다를 수 있습니다. 현금흐름만으로 판단하지 않는 편이 안전합니다.",
    useCases: ["프리랜서 전환 전 보험료 예측", "배당·이자 소득 영향 확인", "연금 수령 시작 전 점검"]
  },
  cases: {
    audience: "제도 설명보다 비슷한 상황의 예시를 먼저 보고 싶은 퇴사자를 위한 사례형 콘텐츠입니다.",
    method: "퇴사 전 보험료, 가족관계, 소득 발생 여부, 전월세와 재산 자료를 조합해 어떤 선택지를 먼저 볼지 정리합니다.",
    warning: "사례의 금액과 판단 순서는 이해를 돕기 위한 예시입니다. 실제 고지는 개인별 세대 자료와 공단 심사 결과에 따라 달라질 수 있습니다.",
    useCases: ["내 상황과 비슷한 케이스 찾기", "공단 상담 전 설명 정리", "계산기 입력값 점검"]
  },
  checklists: {
    audience: "공단 문의, 피부양자 신청, 임의계속가입 검토 전에 어떤 자료를 준비해야 할지 정리하고 싶은 사람에게 맞춘 실무형 자료입니다.",
    method: "급여명세서, 소득금액증명, 가족관계 자료, 전월세 계약서, 재산세 과세표준처럼 상담에서 자주 필요한 자료를 상황별로 나눕니다.",
    warning: "체크리스트는 준비를 돕는 참고 자료이며, 실제 제출 서류는 개인 상황과 공단 요청에 따라 달라질 수 있습니다.",
    useCases: ["퇴사 전 자료 정리", "피부양자 신청 준비", "지역가입자 고지서 문의 준비"]
  }
};

const articleGuidance = {
  "why-health-premium-rises-after-resignation": {
    decision: "보험료가 오른 것처럼 보이면 먼저 직장가입자 종료 후 어떤 자격으로 넘어갔는지 확인하세요. 지역가입자로 전환되었다면 소득이 없더라도 재산이나 전월세 자료가 반영되었을 수 있고, 피부양자 등록 가능성이 남아 있다면 고지 전후로 신청 가능성을 따져볼 필요가 있습니다.",
    example: "퇴사 전 월급에서 건강보험료가 12만원 공제되던 사람이 지역가입자로 바뀐 뒤 더 높은 고지서를 받았다면, 단순히 월급이 없어졌다는 사실만으로 판단하면 안 됩니다. 급여 외 소득, 보유 주택의 과세표준, 전월세 보증금, 세대 구성까지 함께 확인해야 실제 원인을 좁힐 수 있습니다."
  },
  "when-local-subscriber-starts-after-resignation": {
    decision: "지역가입자 전환은 퇴사일 하나만으로 체감되지 않을 수 있습니다. 회사의 자격상실 신고, 공단 처리, 고지서 발송 시점이 이어지므로 퇴사 직후에는 아직 고지가 없더라도 예상액을 먼저 계산해 두는 편이 안전합니다.",
    example: "예를 들어 6월 말 퇴사 후 7월에 별다른 고지서가 없더라도 안심하기보다는 자격상실 처리 여부를 확인하세요. 이후 한꺼번에 고지되거나 피부양자 신청이 늦어져 선택지가 좁아질 수 있습니다."
  },
  "unemployed-health-insurance-check-order": {
    decision: "무직 상태라면 보험료를 줄이는 첫 단계는 소득이 없다는 사실을 설명하는 것이 아니라 피부양자 가능성을 확인하는 것입니다. 그다음 임의계속가입과 지역가입자 예상액을 비교해야 불필요한 선택을 줄일 수 있습니다.",
    example: "소득이 0원이라도 주택, 토지, 전월세 보증금 자료가 있으면 지역보험료가 나올 수 있습니다. 그래서 무직이라는 표현보다 공단이 확인하는 자료 목록을 기준으로 정리하는 것이 상담에 더 도움이 됩니다."
  },
  "dependent-registration-after-resignation": {
    decision: "피부양자 등록은 보험료 부담을 크게 줄일 수 있지만 가족 밑으로 들어간다는 사실만으로 결정되지 않습니다. 관계, 소득, 재산, 사업자등록 여부를 차례로 확인해야 반려 가능성을 줄일 수 있습니다.",
    example: "배우자가 직장가입자라도 본인에게 사업소득이나 일정 규모 이상의 금융소득이 있으면 심사 결과가 달라질 수 있습니다. 신청 전 소득금액증명과 금융소득 자료를 함께 준비하는 이유가 여기에 있습니다."
  },
  "questions-before-calling-nhis": {
    decision: "공단에 전화하기 전에는 질문을 금액, 자격, 일정으로 나눠 적어두세요. 같은 상황이라도 '얼마인가요'만 묻는 것보다 어떤 자료가 반영됐는지 묻는 편이 답을 더 정확히 받을 수 있습니다.",
    example: "상담 메모에는 퇴사일, 마지막 직장보험료, 가족 직장가입자 여부, 최근 소득 종류, 전월세 또는 재산 자료를 한 줄씩 적어두면 좋습니다. 상담 후에는 안내받은 신청 기한과 필요한 서류를 바로 표시해 두세요."
  }
};

const officialReferenceMap = {
  common: [
    {
      label: "보건복지부: 2026년 건강보험료율 7.19% 결정",
      url: "https://www.mohw.go.kr/board.es?act=view&bid=0027&list_no=1487279&mid=a10503010100&nPage=1&tag=",
      note: "2026년 건강보험료율과 직장·지역가입자 평균 보험료 변동을 확인할 때 봅니다."
    },
    {
      label: "보건복지부: 2026년도 장기요양보험료율",
      url: "https://www.mohw.go.kr/board.es?act=view&bid=0027&list_no=1487817&mid=a10503010100&nPage=1&tag=",
      note: "장기요양보험료를 건강보험료에 곱하는 방식과 13.14% 기준을 확인할 때 봅니다."
    },
    {
      label: "국민건강보험공단: 4대 보험료 모의계산",
      url: "https://www.nhis.or.kr/nhis/minwon/initCtrbCalcView.do",
      note: "개인별 입력값으로 공단 모의계산 결과를 다시 대조할 때 사용합니다."
    }
  ],
  guides: [
    {
      label: "찾기쉬운 생활법령정보: 실업자의 직장가입자 자격 유지",
      url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=1&cnpClsNo=3&csmSeq=1063&popMenu=ov",
      note: "퇴직 후 임의계속가입 신청, 보험료 부담 방식, 탈퇴 안내를 확인할 때 봅니다."
    }
  ],
  "local-subscriber": [
    {
      label: "공공데이터포털: 국민건강보험공단 건강보험 산정기준 개편",
      url: "https://www.data.go.kr/data/15122261/fileData.do",
      note: "지역가입자 산정 기준 데이터와 개편 흐름을 확인할 때 봅니다."
    },
    {
      label: "국민건강보험공단: 지역가입자 부과체계",
      url: "https://www.nhis.or.kr/static/html/wbma/b/wbmab0101.html",
      note: "소득, 재산, 세대 자료가 지역보험료에 연결되는 구조를 확인할 때 봅니다."
    }
  ],
  "voluntary-continuation": [
    {
      label: "찾기쉬운 생활법령정보: 임의계속가입의 신청 및 탈퇴",
      url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=1&cnpClsNo=3&csmSeq=1063&popMenu=ov",
      note: "임의계속가입 신청서, 보험료 부담, 탈퇴 절차를 확인할 때 봅니다."
    }
  ],
  dependent: [
    {
      label: "국가법령정보센터: 국민건강보험법 시행규칙 제2조",
      url: "https://www.law.go.kr/LSW/lumLsLinkPop.do?chrClsCd=010202&lspttninfSeq=69276",
      note: "피부양자 부양요건과 소득·재산요건의 법령상 근거를 확인할 때 봅니다."
    }
  ],
  income: [
    {
      label: "공공데이터포털: 국민건강보험공단 건강보험 산정기준 개편",
      url: "https://www.data.go.kr/data/15122261/fileData.do",
      note: "소득 종류와 지역가입자 보험료 산정 기준을 대조할 때 봅니다."
    },
    {
      label: "국가법령정보센터: 피부양자 소득·재산요건",
      url: "https://www.law.go.kr/LSW/lumLsLinkPop.do?chrClsCd=010202&lspttninfSeq=69276",
      note: "소득 발생이 피부양자 자격에 미치는 영향을 확인할 때 봅니다."
    }
  ],
  cases: [
    {
      label: "국민건강보험공단: 4대 보험료 모의계산",
      url: "https://www.nhis.or.kr/nhis/minwon/initCtrbCalcView.do",
      note: "사례의 비교 결과를 본인 입력값으로 다시 계산할 때 사용합니다."
    }
  ],
  checklists: [
    {
      label: "국민건강보험공단",
      url: "https://www.nhis.or.kr/",
      note: "개인별 제출 서류, 자격 신고, 실제 고지 내역을 최종 확인할 때 봅니다."
    },
    {
      label: "찾기쉬운 생활법령정보: 임의계속가입 서류 안내",
      url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?ccfNo=2&cciNo=1&cnpClsNo=3&csmSeq=1063&popMenu=ov",
      note: "임의계속가입과 피부양자 관련 첨부서류 흐름을 확인할 때 봅니다."
    }
  ]
};

function referencesForCategory(category) {
  const seen = new Set();
  return [...officialReferenceMap.common, ...(officialReferenceMap[category] || [])]
    .filter((item) => {
      if (seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    });
}

function officialSourcesHtml(category, relative = "..") {
  const refs = referencesForCategory(category);
  return `          <section class="official-sources">
            <h2>공식 확인 경로</h2>
            <p>아래 자료를 기준으로 글의 계산 기준과 주의 문구를 검토했습니다. 개인별 금액과 자격 판정은 국민건강보험공단의 최신 자료 반영과 심사 결과가 우선합니다.</p>
            <ul>
              ${refs.map((item) => `<li><a href="${item.url}" rel="nofollow">${esc(item.label)}</a><span>${esc(item.note)}</span></li>`).join("\n              ")}
              <li><a href="${relative}/data-sources">건보계산기 공공데이터 출처</a><span>사이트에서 활용하는 공공데이터와 공식 자료 목록을 모아 둔 페이지입니다.</span></li>
            </ul>
            <p class="updated">작성: ${operatorName} · 최종 검토: ${updated}</p>
          </section>`;
}

function originalityFrameHtml(category, title) {
  const categoryFocus = {
    guides: {
      axis: "시간",
      signal: "퇴사일, 자격상실 신고일, 첫 고지일이 서로 어긋나는지 확인합니다.",
      risk: "고지서가 늦게 오면 선택 기한까지 늦어졌다고 착각하기 쉽습니다."
    },
    "local-subscriber": {
      axis: "자료",
      signal: "소득금액, 재산 과세표준, 전월세 자료를 한 장에 모아 서로 섞이지 않게 봅니다.",
      risk: "시세나 통장 잔액을 그대로 넣으면 공단 산정 자료와 차이가 커질 수 있습니다."
    },
    "voluntary-continuation": {
      axis: "비교",
      signal: "퇴사 전 본인부담액과 지역가입자 예상액의 월 차액을 먼저 봅니다.",
      risk: "임의계속가입이 항상 유리하다고 보고 신청하면 낮은 지역보험료 기회를 놓칠 수 있습니다."
    },
    dependent: {
      axis: "자격",
      signal: "가족관계보다 먼저 새 소득, 사업자등록, 금융소득 발생 가능성을 따로 표시합니다.",
      risk: "신청 시점에는 가능해 보여도 소득 자료가 뒤늦게 반영되면 자격이 재검토될 수 있습니다."
    },
    income: {
      axis: "귀속연도",
      signal: "돈을 받은 달, 국세청 신고 연도, 공단 반영 시점을 나눠 적습니다.",
      risk: "올해 현금흐름만 보면 다음 고지 기간의 보험료 변화를 놓치기 쉽습니다."
    },
    cases: {
      axis: "차이 원인",
      signal: "사례 금액보다 어떤 입력값 때문에 선택지가 바뀌었는지 먼저 확인합니다.",
      risk: "비슷한 월급이어도 가족관계, 재산, 금융소득 하나로 결론이 달라질 수 있습니다."
    },
    checklists: {
      axis: "증빙",
      signal: "공단에 물어볼 질문과 제출 가능한 서류를 같은 순서로 정렬합니다.",
      risk: "서류 목록만 챙기고 질문을 정리하지 않으면 상담 후에도 판단이 남을 수 있습니다."
    }
  };
  const focus = categoryFocus[category] || categoryFocus.guides;

  return `          <section class="originality-frame">
            <p class="eyebrow">건보계산기 독자 체크</p>
            <h2>${esc(title)}${objectParticle(title)} 볼 때 숫자보다 먼저 볼 3가지</h2>
            <div class="decision-map">
              <article>
                <span>01 · ${esc(focus.axis)}</span>
                <h3>판단축을 하나로 고정하지 않기</h3>
                <p>${esc(focus.signal)}</p>
              </article>
              <article>
                <span>02 · 오차</span>
                <h3>계산값과 고지액이 달라지는 이유 표시</h3>
                <p>계산기는 방향을 좁히는 도구입니다. 실제 금액은 자료 반영 시점, 세대 구성, 감면, 정산 여부에 따라 달라질 수 있습니다.</p>
              </article>
              <article>
                <span>03 · 질문</span>
                <h3>공단 문의 문장으로 바꾸기</h3>
                <p>“얼마인가요?”보다 “어떤 소득·재산 자료가 반영됐나요?”와 “신청 기한이 언제까지인가요?”를 함께 확인합니다.</p>
              </article>
            </div>
            <div class="risk-note">
              <strong>놓치기 쉬운 지점</strong>
              <p>${esc(focus.risk)}</p>
            </div>
          </section>`;
}

function guidanceFor(article) {
  const [category, title, slug, description] = article;
  const base = categoryGuidance[category];
  const specific = articleGuidance[slug] || {};
  return {
    intent: base.intent,
    caution: base.caution,
    checklist: base.checklist,
    decision: specific.decision || `${title}${objectParticle(title)} 확인할 때는 ${description} 다만 계산 결과만으로 결론을 내리기보다 본인의 자격 상태와 공단 자료 반영 시점을 함께 확인해야 합니다.`,
    example: specific.example || `예를 들어 같은 퇴사자라도 가족 직장가입자 여부, 소득 발생 여부, 재산 과세표준, 전월세 계약 상태가 다르면 선택지가 달라집니다. 이 글의 기준을 본인 자료에 대입한 뒤 계산기 결과와 공식 안내를 함께 비교하세요.`
  };
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function objectParticle(value) {
  const text = String(value).trim();
  const last = text.charCodeAt(text.length - 1);
  if (last < 0xac00 || last > 0xd7a3) {
    return "를";
  }

  return (last - 0xac00) % 28 === 0 ? "를" : "을";
}

function ensureDir(dir) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

function breadcrumbJsonLd(items = []) {
  if (!items.length) {
    return "";
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return `  <script type="application/ld+json">
${JSON.stringify(data, null, 2)}
  </script>
`;
}

function faqJsonLd(items = []) {
  if (!items.length) {
    return "";
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return `  <script type="application/ld+json">
${JSON.stringify(data, null, 2)}
  </script>
`;
}

function layout({
  title,
  description,
  canonical,
  content,
  relative = "..",
  breadcrumbs = [],
  extraHead = "",
  ogType = "article",
  ogImage = ""
}) {
  const socialImage = ogImage
    ? `  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:image" content="${ogImage}">
`
    : "";

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | 건보계산기</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta property="og:type" content="${ogType}">
  <meta property="og:title" content="${esc(title)} | 건보계산기">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="건보계산기">
  <meta property="og:locale" content="ko_KR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)} | 건보계산기">
  <meta name="twitter:description" content="${esc(description)}">
${socialImage}  <meta name="format-detection" content="telephone=no">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="${relative}/styles.css">
${breadcrumbJsonLd(breadcrumbs)}
${extraHead}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${relative}/" aria-label="건보계산기 홈">
      <span class="brand-mark">건</span>
      <span>건보계산기</span>
    </a>
    <nav class="top-nav" aria-label="주요 메뉴">
      <a href="${relative}/#calculator">계산기</a>
      <a href="${relative}/guides/">퇴사 가이드</a>
      <a href="${relative}/local-subscriber/">지역가입자</a>
      <a href="${relative}/voluntary-continuation/">임의계속</a>
      <a href="${relative}/dependent/">피부양자</a>
      <a href="${relative}/income/">소득별</a>
      <a href="${relative}/cases/">사례</a>
      <a href="${relative}/checklists/">체크리스트</a>
      <a href="${relative}/contact">문의</a>
    </nav>
  </header>
  <main>
${content}
  </main>
  <footer class="site-footer">
    <strong>건보계산기</strong>
    <p>퇴사 후 건강보험료 비교를 돕는 민간 참고 사이트입니다. 실제 자격과 고지는 국민건강보험공단 기준을 확인하세요.</p>
    <nav aria-label="푸터 메뉴">
      <a href="${relative}/about">소개</a>
      <a href="${relative}/data-sources">공공데이터 출처</a>
      <a href="${relative}/privacy">개인정보처리방침</a>
      <a href="${relative}/disclaimer">면책 안내</a>
      <a href="${relative}/contact">문의</a>
    </nav>
  </footer>
</body>
</html>
`;
}

function illustration(category, title, slug) {
  const cat = categories.find((item) => item.id === category);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">퇴사 후 건강보험 선택지를 설명하는 정보형 일러스트</desc>
  <rect width="1200" height="630" fill="#f7fbff"/>
  <rect x="70" y="70" width="1060" height="490" rx="28" fill="#ffffff" stroke="#d8e2ef" stroke-width="4"/>
  <circle cx="170" cy="180" r="58" fill="${cat.color}"/>
  <path d="M160 180h80M200 140v80" stroke="#fff" stroke-width="18" stroke-linecap="round"/>
  <text x="270" y="170" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="#17201f">${esc(cat.title)}</text>
  <text x="270" y="230" font-family="Arial, sans-serif" font-size="30" fill="#51606f">${esc(title)}</text>
  <g transform="translate(150 330)">
    <rect width="240" height="96" rx="14" fill="#eaf2ff"/>
    <rect x="300" width="240" height="96" rx="14" fill="#eef9f4"/>
    <rect x="600" width="240" height="96" rx="14" fill="#fff3d6"/>
    <text x="38" y="58" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#0057ff">피부양자</text>
    <text x="330" y="58" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#167761">임의계속</text>
    <text x="635" y="58" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#9b6500">지역가입</text>
    <path d="M255 48h35M555 48h35" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
  </g>
  <text x="150" y="510" font-family="Arial, sans-serif" font-size="24" fill="#51606f">계산 결과는 참고용이며 공식 판단은 국민건강보험공단 기준을 확인하세요.</text>
</svg>
`;
  const dir = `assets/illustrations/${category}`;
  ensureDir(dir);
  fs.writeFileSync(path.join(root, dir, `${slug}.svg`), svg);
}

function articleBody(article, index) {
  const [category, title, slug, description, points] = article;
  const cat = categories.find((item) => item.id === category);
  const guidance = guidanceFor(article);
  const related = articles
    .filter((item) => item[0] === category && item[2] !== slug)
    .slice(0, 3);
  const sidebarCategories = categories
    .filter((item) => item.id !== category)
    .slice(0, 6);
  const image = `../assets/illustrations/${category}/${slug}.svg`;
  const faqItems = [
    {
      q: "계산 결과가 실제 고지 금액과 같나요?",
      a: "아닙니다. 계산기는 참고용이며 실제 고지는 국민건강보험공단 자료 반영 시점과 자격 심사 결과에 따라 달라질 수 있습니다."
    },
    {
      q: "퇴사 전에 미리 계산해도 되나요?",
      a: "가능합니다. 퇴사 예정일, 급여명세서, 소득·재산 자료를 기준으로 미리 비교하면 선택지를 좁히는 데 도움이 됩니다."
    },
    {
      q: `${title}에서 가장 먼저 확인할 것은 무엇인가요?`,
      a: guidance.decision
    }
  ];
  return layout({
    title,
    description,
    canonical: `${site}/${category}/${slug}`,
    ogType: "article",
    ogImage: `${site}/assets/illustrations/${category}/${slug}.svg`,
    extraHead: faqJsonLd(faqItems),
    breadcrumbs: [
      { name: "홈", url: `${site}/` },
      { name: cat.title, url: `${site}/${category}/` },
      { name: title, url: `${site}/${category}/${slug}` }
    ],
    content: `    <div class="magazine-shell">
      <nav class="breadcrumb" aria-label="현재 위치">
        <a href="../">홈</a>
        <span aria-hidden="true">›</span>
        <a href="./">${esc(cat.title)}</a>
        <span aria-hidden="true">›</span>
        <span>${esc(title)}</span>
      </nav>
      <div class="content-with-sidebar">
        <article class="article-page">
          <p class="eyebrow">${esc(cat.title)}</p>
          <h1>${esc(title)}</h1>
          <p class="article-lead">${esc(description)}</p>
          <div class="content-meta" aria-label="글 정보">
            <span>작성: ${operatorName}</span>
            <span>검토일: ${updated}</span>
            <span>분류: 퇴사 후 건강보험 참고 정보</span>
          </div>
          <img class="article-visual" src="${image}" alt="${esc(title)} 정보 그림" loading="lazy">

          <section class="article-summary">
            <strong>핵심 요약</strong>
            <ul>
              ${points.map((point) => `<li>${esc(point)}</li>`).join("\n              ")}
            </ul>
          </section>

          <section class="trust-box">
            <h2>정보 이용 전 확인하세요</h2>
            <p>이 글은 퇴사자가 건강보험 선택지를 이해할 수 있도록 국민건강보험공단, 보건복지부, 공공데이터포털의 공개 안내를 바탕으로 정리한 민간 참고 자료입니다. 실제 보험료와 자격 판단은 개인별 자료 반영 시점과 공단 심사 결과에 따라 달라질 수 있습니다.</p>
            <p>${esc(guidance.intent)}</p>
          </section>

          <section>
            <h2>이 문제가 생기는 이유</h2>
            <p>퇴사 후에는 직장가입자일 때 적용되던 보험료 기준이 그대로 유지되지 않을 수 있습니다. 직장에서는 보수월액과 회사 부담분이 함께 작동하지만, 퇴사 후에는 가족 피부양자 등록 가능성, 임의계속가입 가능성, 지역가입자 전환 가능성을 순서대로 확인해야 합니다.</p>
            <p>${esc(description)} 이 과정에서 소득, 재산, 전월세, 가족관계 자료가 서로 다른 방식으로 영향을 줄 수 있으므로 한 가지 숫자만 보고 판단하면 실제 고지와 차이가 생길 수 있습니다.</p>
            <p>${esc(guidance.decision)}</p>
          </section>

          <section>
            <h2>해결 방법</h2>
            <ol class="steps">
              <li><strong>피부양자 가능성 확인</strong><span>가족 중 직장가입자가 있고 소득 요건을 충족한다면 보험료 부담이 가장 낮아질 수 있습니다.</span></li>
              <li><strong>임의계속가입 비교</strong><span>퇴사 전 건강보험료 기준으로 지역가입자 예상액보다 낮은지 확인합니다.</span></li>
              <li><strong>지역가입자 자료 정리</strong><span>소득금액, 재산세 과세표준, 전월세 자료를 준비해 예상액을 계산합니다.</span></li>
              <li><strong>공단 최종 확인</strong><span>실제 고지 금액과 자격 판단은 국민건강보험공단의 최신 기준과 심사 결과를 따릅니다.</span></li>
            </ol>
          </section>

          <section>
            <h2>예시로 보는 판단 흐름</h2>
            <div class="comparison-box">
              <div><span>Before</span><strong>직장가입자</strong><p>급여명세서에서 본인 부담 건강보험료를 확인합니다.</p></div>
              <div><span>After</span><strong>퇴사 후 선택지</strong><p>피부양자, 임의계속가입, 지역가입자를 비교합니다.</p></div>
            </div>
            <p>예를 들어 퇴사 전 본인 부담 보험료가 월 12만원이고, 퇴사 후 소득은 없지만 전월세 보증금이 있다면 피부양자 등록 가능성을 먼저 보고, 어렵다면 임의계속가입 예상액과 지역가입자 예상액을 나란히 비교하는 순서가 안전합니다.</p>
            <p>${esc(guidance.example)}</p>
          </section>

          <section>
            <h2>확인 전에 준비할 자료</h2>
            <p>건강보험료는 같은 퇴사자라도 소득 종류, 재산 과세표준, 가족관계, 전월세 계약 상태에 따라 결과가 달라질 수 있습니다. 따라서 상담이나 신청 전에 자료를 한 번에 정리해 두면 공단 문의 과정에서 같은 설명을 반복하지 않아도 되고, 계산 결과와 실제 고지 금액의 차이도 더 쉽게 이해할 수 있습니다.</p>
            <p>가장 먼저 급여명세서에서 퇴사 전 건강보험료 본인부담액을 확인하세요. 이어서 소득금액증명, 금융소득 자료, 재산세 과세표준, 임대차계약서, 가족관계증명서처럼 자격 판단에 연결될 수 있는 자료를 분리해 두는 편이 좋습니다. 특히 사업소득이나 금융소득은 피부양자 판단과 지역보험료 산정에 모두 영향을 줄 수 있어 금액과 발생 시점을 함께 확인해야 합니다.</p>
            <ul class="article-checklist">
              ${guidance.checklist.map((item) => `<li>${esc(item)}</li>`).join("\n              ")}
            </ul>
          </section>

          <section>
            <h2>계산 결과를 볼 때 주의할 점</h2>
            <p>계산기는 퇴사 후 선택지를 빠르게 좁히기 위한 참고 도구입니다. 실제 보험료는 국민건강보험공단이 보유한 소득·재산 자료, 세대 구성, 자격 취득일, 감면 여부, 자료 반영 시점에 따라 달라질 수 있습니다. 따라서 계산 결과가 낮게 나오더라도 바로 확정 금액으로 보지 말고, 어떤 입력값 때문에 결과가 달라졌는지 먼저 확인하는 것이 좋습니다.</p>
            <p>또한 임의계속가입은 신청 가능 기간과 직장가입 유지 기간 요건이 있고, 피부양자 등록은 가족관계뿐 아니라 소득과 재산 기준을 함께 봅니다. 지역가입자로 전환되는 경우에는 소득이 없더라도 재산이나 전월세 자료가 반영될 수 있으므로, 한 가지 항목만 보고 판단하기보다 세 가지 경로를 순서대로 비교하는 방식이 안전합니다.</p>
            <p>${esc(guidance.caution)}</p>
          </section>

${originalityFrameHtml(category, title)}

          <section class="tool-link-box">
            <h2>계산기로 연결하기</h2>
            <p>아래 계산기에 퇴사 전 보험료와 퇴사 후 소득·재산 자료를 입력하면 세 가지 선택지를 한 화면에서 비교할 수 있습니다.</p>
            <a class="button primary" href="../#calculator">퇴사 후 건강보험료 계산하기</a>
          </section>

          <section class="faq">
            <h2>자주 묻는 질문</h2>
            ${faqItems.map((item) => `<details><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`).join("\n            ")}
          </section>

          <section class="related-actions">
            ${related.map((item) => `<a href="./${item[2]}">${esc(item[1])}</a>`).join("\n            ")}
          </section>

${officialSourcesHtml(category, "..")}
        </article>
        <aside class="content-sidebar" aria-label="관련 콘텐츠">
          <section>
            <h2>카테고리</h2>
            ${sidebarCategories.map((item) => `<a href="../${item.id}/">${esc(item.title)}</a>`).join("\n            ")}
          </section>
          <section>
            <h2>인기 글</h2>
            ${related.map((item) => `<a href="./${item[2]}">${esc(item[1])}</a>`).join("\n            ")}
          </section>
          <section>
            <h2>빠른 도구</h2>
            <a href="../#calculator">건강보험료 계산기</a>
            <a href="../dependent/">피부양자 자격 확인</a>
            <a href="../voluntary-continuation/">임의계속가입 비교</a>
          </section>
        </aside>
      </div>
    </div>
`,
    relative: ".."
  });
}

function categoryPage(category) {
  const list = articles.filter((article) => article[0] === category.id);
  const otherCategories = categories.filter((item) => item.id !== category.id).slice(0, 6);
  const deepDive = categoryDeepDive[category.id];
  return layout({
    title: category.title,
    description: category.description,
    canonical: `${site}/${category.id}/`,
    ogType: "website",
    ogImage: list.length ? `${site}/assets/illustrations/${list[0][0]}/${list[0][2]}.svg` : "",
    breadcrumbs: [
      { name: "홈", url: `${site}/` },
      { name: category.title, url: `${site}/${category.id}/` }
    ],
    content: `    <div class="magazine-shell">
      <nav class="breadcrumb" aria-label="현재 위치">
        <a href="../">홈</a>
        <span aria-hidden="true">›</span>
        <span>${esc(category.title)}</span>
      </nav>
      <section class="category-hero">
        <p class="eyebrow">Category</p>
        <h1>${esc(category.title)}</h1>
        <p>${esc(category.description)}</p>
        <div class="content-meta" aria-label="카테고리 정보">
          <span>운영: ${operatorName}</span>
          <span>검토일: ${updated}</span>
        </div>
      </section>
      <section class="category-intro" aria-label="${esc(category.title)} 이용 안내">
        <h2>이 카테고리는 누구에게 필요한가요?</h2>
        <p>${esc(deepDive.audience)}</p>
        <p>${esc(deepDive.method)}</p>
        <div class="two-col">
          <article>
            <h3>먼저 확인할 상황</h3>
            <ul>
              ${deepDive.useCases.map((item) => `<li>${esc(item)}</li>`).join("\n              ")}
            </ul>
          </article>
          <article>
            <h3>읽기 전 주의점</h3>
            <p>${esc(deepDive.warning)}</p>
          </article>
        </div>
      </section>
${officialSourcesHtml(category.id, "..")}
      <div class="content-with-sidebar">
        <section class="article-grid" aria-label="${esc(category.title)} 글 목록">
          ${list.map((article) => `<article>
            <img src="../assets/illustrations/${article[0]}/${article[2]}.svg" alt="${esc(article[1])} 정보 그림" loading="lazy">
            <span>${esc(category.title)}</span>
            <h2>${esc(article[1])}</h2>
            <p>${esc(article[3])}</p>
            <a href="./${article[2]}">자세히 보기</a>
          </article>`).join("\n          ")}
        </section>
        <aside class="content-sidebar" aria-label="관련 카테고리">
          <section>
            <h2>전체 카테고리</h2>
            ${otherCategories.map((item) => `<a href="../${item.id}/">${esc(item.title)}</a>`).join("\n            ")}
          </section>
          <section>
            <h2>추천 도구</h2>
            <a href="../#calculator">퇴사 후 건강보험료 계산기</a>
            <a href="../cases/">Before / After 사례</a>
            <a href="../checklists/">서류 체크리스트</a>
          </section>
        </aside>
      </div>
    </div>
`,
    relative: ".."
  });
}

function writeContent() {
  categories.forEach((category) => ensureDir(category.id));
  articles.forEach((article, index) => {
    const [category, , slug] = article;
    illustration(category, article[1], slug);
    fs.writeFileSync(path.join(root, category, `${slug}.html`), articleBody(article, index));
  });
  categories.forEach((category) => {
    fs.writeFileSync(path.join(root, category.id, "index.html"), categoryPage(category));
  });

  const existing = [
    ["/", "1.0"],
    ["/about", "0.5"],
    ["/data-sources", "0.8"],
    ["/retiree-guide", "0.8"],
    ["/four-insurance-after-resignation", "0.8"],
    ["/local-subscriber-health-insurance", "0.8"],
    ["/resignation-health-insurance-checklist", "0.7"],
    ["/voluntary-continuation", "0.7"],
    ["/dependent-eligibility", "0.7"],
    ["/financial-income", "0.7"],
    ["/guides/health-insurance-after-reemployment", "0.7"],
    ["/local-subscriber/income-decrease-adjustment-after-resignation", "0.7"],
    ["/dependent/dependent-application-timing-after-resignation", "0.7"],
    ["/privacy", "0.3"],
    ["/disclaimer", "0.3"],
    ["/contact", "0.3"]
  ];
  const urls = [
    ...existing.map(([url, priority]) => ({ loc: `${site}${url}`, priority })),
    ...categories.map((category) => ({ loc: `${site}/${category.id}/`, priority: "0.8" })),
    ...articles.map((article) => ({ loc: `${site}/${article[0]}/${article[2]}`, priority: "0.7" }))
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${updated}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
}

writeContent();
console.log(`Generated ${articles.length} articles and ${categories.length} category pages.`);
