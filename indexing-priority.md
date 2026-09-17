# 색인 요청 URL 우선순위

기준일: 2026-08-16
대표 도메인: https://geonbocalc.com
사이트맵: https://geonbocalc.com/sitemap.xml

이 문서의 순서는 감이 아니라 2026-08-16 Search Console 데이터(지난 3개월)를 기준으로 정했습니다.
색인 35건 / 미색인 23건(발견됨 18, 크롤링됨 4, 리디렉션 1), 총 노출 130회, 클릭 2회 상태입니다.

## 순서를 정한 기준

미색인 URL은 추정하지 않고 Search Console의 실제 목록을 그대로 사용했습니다.
그 위에 아래 순서를 얹었습니다.

1. **새로 생겼거나 주소가 바뀐 페이지** — 재수집하지 않으면 존재 자체가 반영되지 않습니다.
2. **링크를 새로 내보내는 페이지** — 이 페이지가 먼저 크롤링되어야 오늘 추가한
   내부 링크가 발견됩니다. 대상 글보다 먼저 넣는 이유입니다.
3. **목록이 바뀐 카테고리 허브**
4. **미색인 글 본체** — `cases`가 5개 전부 미색인이라 가장 앞에 둡니다.

정책 페이지(`contact`, `privacy`, `disclaimer`)와 `/index.html`은 요청 대상에서 뺍니다.
사유는 아래 "제출하지 않는 주소"에 적었습니다.

## 오늘 제출할 주소 (2026-08-16 작업분, 33건)

`naver-index-urls-today.txt`에 아래 순서 그대로 담겨 있습니다.
색인 요청은 위에서부터 순서대로 넣으면 됩니다.

순서를 이렇게 잡은 이유는, 링크를 내보내는 페이지를 먼저 크롤링시켜야
Google이 오늘 추가한 내부 링크를 발견하기 때문입니다.

### 1. 신규 또는 주소가 바뀐 페이지 (2건)

```text
https://geonbocalc.com/editorial-policy
https://geonbocalc.com/voluntary-continuation-premium
```

`editorial-policy`는 오늘 새로 만든 페이지이고, `voluntary-continuation-premium`은
URL 충돌을 풀면서 주소가 바뀐 글입니다. 구 주소 `/voluntary-continuation`은 카테고리
허브로 301되므로 제출하지 않습니다.

### 2. 링크를 새로 내보내는 페이지 (7건)

```text
https://geonbocalc.com/
https://geonbocalc.com/local-subscriber-health-insurance
https://geonbocalc.com/resignation-health-insurance-checklist
https://geonbocalc.com/four-insurance-after-resignation
https://geonbocalc.com/retiree-guide
https://geonbocalc.com/dependent-eligibility
https://geonbocalc.com/financial-income
```

이 7개 페이지에 미색인 글로 향하는 문맥 링크를 추가했습니다. 이 페이지들이 먼저
크롤링되어야 아래 4~5번 글로 가는 경로가 인식됩니다.

### 3. 목록이 바뀐 허브와 글 (4건)

```text
https://geonbocalc.com/guides/
https://geonbocalc.com/dependent/
https://geonbocalc.com/local-subscriber/
https://geonbocalc.com/guides/health-insurance-after-reemployment
```

### 4. 사례 5건 — 최우선 색인 대상

```text
https://geonbocalc.com/cases/case-120k-before-after
https://geonbocalc.com/cases/case-spouse-dependent-before-after
https://geonbocalc.com/cases/case-voluntary-continuation-better
https://geonbocalc.com/cases/case-rent-deposit-unemployed
https://geonbocalc.com/cases/case-freelancer-after-resignation
```

`cases`는 5개 글이 전부 미색인인 유일한 카테고리입니다. 오늘
`four-insurance-after-resignation`과 홈에서 링크를 연결했습니다.

### 5. 링크를 새로 받게 된 나머지 미색인 글 (15건)

```text
https://geonbocalc.com/guides/unemployed-health-insurance-check-order
https://geonbocalc.com/guides/dependent-registration-after-resignation
https://geonbocalc.com/guides/when-local-subscriber-starts-after-resignation
https://geonbocalc.com/guides/dependent-premium-relief-ends-2026
https://geonbocalc.com/local-subscriber/income-used-for-local-health-premium
https://geonbocalc.com/local-subscriber/property-tax-base-health-premium
https://geonbocalc.com/local-subscriber/rent-deposit-local-health-premium
https://geonbocalc.com/local-subscriber/housing-debt-deduction-health-premium
https://geonbocalc.com/local-subscriber/income-decrease-adjustment-after-resignation
https://geonbocalc.com/dependent/dependent-application-timing-after-resignation
https://geonbocalc.com/checklists/30-day-after-resignation-checklist
https://geonbocalc.com/checklists/90-day-after-resignation-checklist
https://geonbocalc.com/voluntary-continuation/before-voluntary-continuation-application
https://geonbocalc.com/voluntary-continuation/when-local-can-be-better-than-continuation
https://geonbocalc.com/income/freelancer-health-premium-after-resignation
```

이 목록에 Search Console의 미색인 콘텐츠 글 19개가 모두 포함됩니다.

### 제출하지 않는 주소

- `https://geonbocalc.com/index.html` — 리디렉션 항목으로 잡혀 있지만 301이 정상 동작입니다.
  유효성 검사를 다시 돌려도 계속 실패로 남습니다. 무시합니다.
- `/contact`, `/privacy`, `/disclaimer` — 미색인이지만 유입 링크가 20건 이상입니다.
  링크 문제가 아니라 정보 가치가 낮아 색인되지 않는 유형이라 요청 대상에서 뺍니다.
- 푸터 링크만 바뀐 나머지 39개 페이지 — 본문이 그대로라 재크롤링 우선순위가 낮습니다.
  sitemap 재제출로 충분합니다.

## 참고: 노출이 나오고 있는 페이지 (2026-08-16 기준)

색인 요청보다 콘텐츠 보강이 필요한 구간입니다.

| URL | 노출 | 평균 순위 | 메모 |
| --- | --- | --- | --- |
| /financial-income | 38 | 8.4 | 2026-09-17 보강: 제목·설명에 1,000만원/2,000만원 기준선을 명시하고, 두 기준선을 구분하는 표와 FAQ를 본문에 추가. CTR 변화는 다음 점검에서 확인 |
| / | 26 | 17.5 | 2026-09-17 보강: 계산기 의도 검색어("지역가입자 건강보험료 계산기" 등)에 답하는 FAQ 추가 |
| /guides/health-insurance-after-reemployment | 22 | 19.6 | 2026-09-17 보강: FAQ 3건 추가 |
| /voluntary-continuation/ | 14 | 5.7 | 2026-09-17 보강: 제목·설명에 신청 기한(2개월)·유지 기간(36개월) 명시, 기준 표 추가 |
| /income/ | 10 | 12.5 | 2026-09-17 보강: 소득 종류별 기준 표(금융소득 1,000만/2,000만원, 연금 50%) 추가 |
| /retiree-guide | 8 | 33.1 | 2026-09-17 보강: 세 경로 핵심 숫자 표 추가 |
| /dependent/ | 6 | 10.5 | 2026-09-17 보강: 제목·설명에 소득요건 2,000만원 명시, 기준 표 추가 |
| /local-subscriber/ | 5 | 4.0 | 2026-09-17 보강: 제목·설명에 보증금 30%·재산공제 1억원 명시, 기준 표 추가 |
| /data-sources | 5 | 6.0 | |
| /resignation-health-insurance-checklist | 5 | 8.6 | 2026-09-17 보강: FAQ 2건 추가 |
| /dependent-eligibility | 5 | 10.4 | 2026-09-17 보강: FAQ 답변에 2,000만원 기준 명시 |
| /voluntary-continuation-premium | 5 | 51.0 | 구 주소 기준. URL 충돌 해소 후 재측정 필요 |
| /local-subscriber-health-insurance | 4 | 11.3 | 클릭 1건 |
| /income/financial-income-over-10m-health-insurance | 3 | 2.0 | 사이트 최고 순위 |
| /income/pension-income-health-insurance | 3 | 4.0 | |
| /dependent/spouse-dependent-eligibility-check | 3 | 8.0 | |
| /dependent/financial-income-dependent-risk | 2 | 8.0 | |
| /cases/ | 1 | 3.0 | 허브만 노출, 하위 글은 전부 0 |
| /checklists/ | 1 | 5.0 | 허브만 노출, 하위 글은 전부 0 |
| /four-insurance-after-resignation | 1 | 94.0 | |
| /voluntary-continuation/paystub-items-for-voluntary-continuation | 1 | 189.0 | |

## 검색어 현황 (2026-08-16 기준)

| 검색어 | 노출 | 평균 순위 |
| --- | --- | --- |
| 금융소득 피부양자 | 3 | 9.7 |
| 퇴사 후 건강보험 | 2 | 60.5 |
| 임의계속가입자 보험료 | 1 | 15.0 |
| 퇴사 후 건강보험 처리 | 1 | 49.0 |
| 지역 가입자 건강 보험료 계산기 | 1 | 64.0 |
| 지역건강보험료 계산기 | 1 | 67.0 |
| 퇴직 후 건강보험료 계산 | 1 | 79.0 |

- "금융소득 피부양자"가 평균 9.7위로 가장 높습니다. 다만 이 주제를 `financial-income`,
  `dependent/financial-income-dependent-risk`, `income/financial-income-over-10m-health-insurance`
  셋이 나눠 갖고 있어 서로 잠식하지 않는지 확인이 필요합니다.
- 계산기 의도 검색어 3개가 모두 60~79위입니다. 사이트의 주력 기능인데 이를 설명하는 페이지가
  홈 외에 없다는 점이 원인일 수 있습니다.

## 2026-08-16 색인 점검 기록

Search Console 미색인 23건의 구조적 원인을 아래와 같이 정리해 수정했습니다.

- **URL 충돌 1건**: `voluntary-continuation.html`과 `voluntary-continuation/index.html`이
  `/voluntary-continuation` 하나를 두고 겹쳐, 둘 중 하나가 항상 리디렉션되거나 도달 불가
  상태였습니다. 루트 글을 `/voluntary-continuation-premium`으로 분리했습니다.
- **고아 페이지 4건**: 아래 글이 사이트 어디에서도 링크되지 않아 크롤러가 도달할 경로가
  없었습니다. 각 카테고리 허브 목록에 추가하고 관련 글에서 상호 링크를 연결했습니다.
  - `guides/health-insurance-after-reemployment` (노출 22회로 사이트 3위였는데 링크 0건)
  - `dependent/dependent-application-timing-after-resignation`
  - `local-subscriber/income-decrease-adjustment-after-resignation`
  - `voluntary-continuation` (위 충돌 건)
- **lastmod 고정**: 전체 URL이 `2026-06-24`로 묶여 있어 재크롤링 신호가 없었습니다.
  본문이 실제로 바뀐 URL만 갱신하는 방식으로 정리했습니다.

## 2026-08-16 2차 점검: 미색인 URL 실목록 확인

Search Console에서 실제 URL 목록을 확인한 결과, 1차 점검의 추정 두 가지를 정정합니다.

- **"리디렉션이 포함된 페이지" 1건은 `/index.html`이었습니다.** 배포 초기에 크롤링된 구 주소이고
  지금은 `_redirects`의 `/index.html / 301` 규칙으로 정상 리디렉션됩니다. 내부에서 이 주소를
  링크하는 곳은 없으므로 코드로 고칠 것이 없고, 유효성 검사는 계속 "실패"로 남습니다.
  리디렉션이 의도된 동작이기 때문입니다. 이 항목은 무시해도 됩니다.
- **"크롤링됨 - 색인 안 됨" 4건은 고아 페이지가 아니었습니다.** 실제로는
  `guides/dependent-premium-relief-ends-2026`, `cases/case-spouse-dependent-before-after`,
  `guides/when-local-subscriber-starts-after-resignation`,
  `guides/dependent-registration-after-resignation`입니다. 크롤링은 됐지만 색인이 보류된 상태입니다.

1차에서 고친 URL 충돌과 고아 페이지는 그 자체로 실재한 문제였지만, 위 두 항목의 직접 원인은
아니었습니다.

### 미색인 22건의 실제 분포

| 카테고리 | 미색인 / 전체 |
| --- | --- |
| cases | 5 / 5 |
| local-subscriber | 4 / 6 |
| guides | 4 / 7 |
| voluntary-continuation | 2 / 4 |
| checklists | 2 / 6 |
| dependent | 1 / 5 |
| income | 1 / 4 |
| 루트 정책 페이지 | 3 (contact, privacy, disclaimer) |

`contact`, `privacy`, `disclaimer`는 유입 링크가 20건 이상인데도 미색인입니다. 링크 문제가 아니라
정보 가치가 낮아 색인되지 않는 페이지이므로 손대지 않습니다. 실제 대상은 콘텐츠 글 19개입니다.

### 원인 검증

두 가설을 데이터로 확인했습니다.

- **중복 콘텐츠 가설은 기각.** 카테고리 안에서 글끼리의 텍스트 유사도가 3~7%로 낮습니다.
  본문 길이도 평균 2,900자로 얇지 않습니다.
- **크롤 경로 가설이 맞았습니다.** 미색인 콘텐츠 글 19개 중 18개가 "노출이 발생하는 페이지"
  로부터 링크를 0~1건만 받고 있었습니다. 대부분 그 1건은 자기 카테고리 허브뿐이었습니다.
  핵심 루트 페이지들이 서로만 링크하고 카테고리 글로는 내려가지 않는 구조였습니다.

### 조치

노출이 발생하는 페이지에서 미색인 글로 문맥 링크를 추가했습니다.

- 홈에 상황별 진입 섹션을 추가해 미색인 글 6건을 직접 연결
- `local-subscriber-health-insurance` → 지역가입자 세부 글 6건
- `resignation-health-insurance-checklist` → 체크리스트 6건
- `four-insurance-after-resignation` → 사례 5건
- `retiree-guide`, `dependent-eligibility`, `financial-income`,
  `voluntary-continuation-premium`, `guides/health-insurance-after-reemployment`에 관련 글 추가

결과: 미색인 콘텐츠 글 19개가 받는 "색인된 페이지發 링크"가 최소 2건, 평균 2.7건이 되었습니다.
조치 전에는 18건이 1건 이하였습니다.

## 제출 메모

- Google Search Console에는 먼저 `sitemap.xml`을 다시 제출하고, "리디렉션이 포함된 페이지"
  항목의 유효성 검사를 다시 시작한 뒤, 위 순서대로 URL 검사에서 색인을 요청합니다.
- 네이버 서치어드바이저 수동 수집 요청은 `naver-index-urls-today.txt`의 주소를 위에서부터
  순서대로 넣으면 됩니다. 하루 요청 한도가 있으므로 일차별로 나눠 진행합니다.
- 전체 제출 후보 58개는 `index-urls-all.txt`에 URL만 한 줄씩 정리했습니다.
- `404.html`, `googlefa76c3e8fcf3b216.html`, `ads.txt`는 일반 색인 요청 대상에서 제외합니다.
- 다음 점검 때는 미색인 23건이 줄었는지, 특히 "발견됨 - 현재 색인이 생성되지 않음" 18건의
  추이를 먼저 봅니다.

## 2026-09-17 3차 보강: SEO 진단 도구 지적 사항 반영

외부 SEO 진단 도구가 지적한 항목 중 실제로 고칠 수 있는 것을 반영했습니다.

- **저자·날짜 신호 누락**: `/`, `/about`, 카테고리 허브 7개(`/guides/`, `/local-subscriber/`,
  `/voluntary-continuation/`, `/dependent/`, `/income/`, `/cases/`, `/checklists/`)에는
  화면에는 운영 주체와 검토일이 보여도 JSON-LD 구조화 데이터에는 author/dateModified가
  없었습니다. WebApplication(홈), AboutPage(소개), CollectionPage(허브 7개) 스키마에
  author·publisher·dateModified를 추가했습니다.
- **제목·공유 제목 불일치**: 홈의 `og:title`/`og:description`이 `<title>`/메타 설명보다
  짧게 요약돼 있어 지적됐습니다. 두 값을 동일하게 맞췄습니다.
- **정보성 문서 내용 검토**: FAQ가 없던 `local-subscriber/income-decrease-adjustment-after-resignation`,
  `dependent/dependent-application-timing-after-resignation`에 본문에 이미 있던 구체적
  근거(재산 기본공제 1억원, 90일 소급 인정 규정)를 FAQ 2건씩으로 추가하고 FAQPage 스키마를
  붙였습니다.

반영하지 않은 지적: "페이지 목적 유형 미확인"(`/`, `/guides/`, `/local-subscriber/`,
`/guides/why-health-premium-rises-after-resignation`, `/about`)은 진단 도구의 휴리스틱
기준이 공개되어 있지 않아, 어떤 구조 변경이 실제로 유형을 바꾸는지 확인할 수 없었습니다.
다음 진단 결과에서 이 항목들이 남아 있으면 도구 쪽에 판정 기준을 문의하는 편이 낫습니다.

## 2026-09-17 4차: 재진단 반영과 남은 항목 정리

3차 보강을 배포(PR #1 병합, Cloudflare Pages 배포 성공)한 뒤 같은 진단 도구를 다시 돌린
결과를 반영했습니다.

- **개선 확인됨**: `/guides/`, `/local-subscriber/`가 "유형 미확인"에서 "목록·탐색" 유형으로
  재분류됐습니다. author/dateModified 스키마 추가가 유형 판정에 실제로 영향을 준 것으로
  보입니다. 다만 "목록 스키마 보조 신호 필요"로 남아 있어, 카테고리 허브 7개(guides,
  local-subscriber, voluntary-continuation, dependent, income, cases, checklists) 모두에
  `ItemList`(하위 글 목록) 스키마를 `CollectionPage`의 `mainEntity`로 추가했습니다.
- **누락 발견**: `guides/why-health-premium-rises-after-resignation`은 이미 Article/FAQPage
  스키마가 완비돼 있었는데도 검토일이 2026-06-24로 그대로 남아 있었습니다(3차 작업 때 허브
  index만 갱신하고 개별 글은 빠뜨림). 검토일·dateModified를 갱신했습니다.
- **본문 외부 링크 0건 확인**: `/about`에 국민건강보험공단 등을 언급하는 문장은 있었지만
  실제 `<a>` 링크가 하나도 없었습니다. 기존 문구를 국민건강보험공단·보건복지부·공공데이터포털
  공식 링크로 바꿨습니다.
- **여전히 미해결**: `/`, `/about`, `why-health-premium-rises-after-resignation`은 재진단에서도
  "유형 미확인"으로 남을 가능성이 있습니다. 진단 도구 자체가 "스키마 또는 URL만으로 품질을
  확정하지 않는다"고 명시하고 있어, 이 셋은 구조를 더 바꾸기보다 다음 재진단 결과를 보고
  판단하는 것이 낫습니다.
- **"정보성 문서 · 내용 검토" 3건**은 재진단에서도 동일하게 "검토 필요"로 표시됩니다. 도구
  설명 문구("글이 독자의 질문에 충분히 답하는지는 자동 검사만으로 판단하기 어렵습니다")를
  보면 이 카테고리는 사람이 직접 확인하고 넘어가야 하는 상시 체크 항목으로 보이며, FAQ·근거·
  작성자·날짜를 이미 반영한 상태입니다.

## 2026-09-17 5차: 오늘 반영분 색인 요청 목록

오늘 진행한 콘텐츠 보강 + SEO 진단 반영 작업(financial-income, 홈, 카테고리 허브 7개,
retiree-guide, 체크리스트, 피부양자 체크, 정보성 문서 2건, about)이 전부 배포 완료된
상태에서, 실제로 내용이 바뀐 URL만 골라 재수집 요청 목록으로 정리했습니다.
`naver-index-urls-today.txt`에 아래 순서 그대로 담겨 있습니다.

```text
https://geonbocalc.com/
https://geonbocalc.com/guides/
https://geonbocalc.com/local-subscriber/
https://geonbocalc.com/voluntary-continuation/
https://geonbocalc.com/dependent/
https://geonbocalc.com/income/
https://geonbocalc.com/cases/
https://geonbocalc.com/checklists/
https://geonbocalc.com/about
https://geonbocalc.com/retiree-guide
https://geonbocalc.com/financial-income
https://geonbocalc.com/dependent-eligibility
https://geonbocalc.com/resignation-health-insurance-checklist
https://geonbocalc.com/guides/health-insurance-after-reemployment
https://geonbocalc.com/guides/why-health-premium-rises-after-resignation
https://geonbocalc.com/local-subscriber/income-decrease-adjustment-after-resignation
https://geonbocalc.com/dependent/dependent-application-timing-after-resignation
```

홈과 카테고리 허브 8개를 앞에 둔 이유는 이전과 동일합니다 — 이 페이지들이 먼저
재크롤링되어야 그 안에 걸린 내부 링크와 갱신된 본문이 검색엔진에 반영됩니다.

제출 순서:
1. Google Search Console: `sitemap.xml` 재제출 → 위 목록을 URL 검사 도구에서 순서대로
   "색인 생성 요청"
2. 네이버 서치어드바이저: 수동 웹페이지 수집 요청에 위 목록을 순서대로 제출 (하루 요청
   한도가 있으므로 전부 못 넣으면 상위 8개 허브부터)
