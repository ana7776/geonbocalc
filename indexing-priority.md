# 색인 요청 URL 우선순위

기준일: 2026-08-16
대표 도메인: https://geonbocalc.com
사이트맵: https://geonbocalc.com/sitemap.xml

이 문서의 순서는 감이 아니라 2026-08-16 Search Console 데이터(지난 3개월)를 기준으로 정했습니다.
색인 35건 / 미색인 23건(발견됨 18, 크롤링됨 4, 리디렉션 1), 총 노출 130회, 클릭 2회 상태입니다.

## 순서를 정한 기준

1. **이번 수정으로 URL이 바뀌거나 새로 생긴 주소** — 재수집하지 않으면 변경이 반영되지 않습니다.
2. **내부 링크가 처음 연결된 글** — 그동안 크롤러가 도달할 경로 자체가 없었습니다.
3. **3개월간 노출 0인 글** — 색인되지 않았을 가능성이 높은 구간입니다. 58개 중 37개가 여기 해당합니다.
4. **이미 노출이 나오는 페이지** — 색인은 되어 있으므로 마지막입니다.

노출 0 구간은 카테고리별로 뭉쳐 있습니다. `guides/` 허브와 그 아래 글 6개, `cases/` 5개,
`checklists/` 6개가 전부 노출 0입니다. "발견됨 - 현재 색인이 생성되지 않음 18건"과 거의 일치하므로,
이 세 카테고리를 허브부터 순서대로 밀어 넣는 것이 이번 색인 요청의 핵심입니다.

## 1일차: 이번 변경분 (11건)

`naver-index-urls-today.txt`에 그대로 담겨 있습니다. 가장 먼저 제출하세요.

```text
https://geonbocalc.com/voluntary-continuation-premium
https://geonbocalc.com/editorial-policy
https://geonbocalc.com/guides/
https://geonbocalc.com/dependent/
https://geonbocalc.com/local-subscriber/
https://geonbocalc.com/guides/health-insurance-after-reemployment
https://geonbocalc.com/dependent/dependent-application-timing-after-resignation
https://geonbocalc.com/local-subscriber/income-decrease-adjustment-after-resignation
https://geonbocalc.com/
https://geonbocalc.com/guides/dependent-premium-relief-ends-2026
https://geonbocalc.com/financial-income
```

- `voluntary-continuation-premium`은 URL 충돌을 풀면서 새로 생긴 주소입니다. 구 주소 `/voluntary-continuation`은 카테고리 허브로 301되므로 따로 제출하지 않습니다.
- `editorial-policy`는 신규 페이지입니다.
- 허브 3곳은 목록에 글이 추가되어 내용이 바뀌었습니다.
- 그다음 3건은 이번에 내부 링크가 처음 연결된 글입니다. 특히 `health-insurance-after-reemployment`는 노출 22회로 사이트 3위인데 링크가 0건이었습니다.

## 2일차: guides 카테고리 (6건)

허브를 1일차에 넣었으므로 이어서 본문 글을 넣습니다. 전부 노출 0입니다.

```text
https://geonbocalc.com/guides/why-health-premium-rises-after-resignation
https://geonbocalc.com/guides/when-local-subscriber-starts-after-resignation
https://geonbocalc.com/guides/unemployed-health-insurance-check-order
https://geonbocalc.com/guides/dependent-registration-after-resignation
https://geonbocalc.com/guides/questions-before-calling-nhis
https://geonbocalc.com/retiree-guide
```

## 3일차: 지역가입자와 피부양자 (10건)

```text
https://geonbocalc.com/local-subscriber/income-used-for-local-health-premium
https://geonbocalc.com/local-subscriber/local-premium-without-income
https://geonbocalc.com/local-subscriber/rent-deposit-local-health-premium
https://geonbocalc.com/local-subscriber/property-tax-base-health-premium
https://geonbocalc.com/local-subscriber/housing-debt-deduction-health-premium
https://geonbocalc.com/dependent/parents-dependent-eligibility
https://geonbocalc.com/dependent/business-registration-dependent-risk
https://geonbocalc.com/dependent-eligibility
https://geonbocalc.com/local-subscriber-health-insurance
https://geonbocalc.com/four-insurance-after-resignation
```

## 4일차: 임의계속과 소득별 (7건)

```text
https://geonbocalc.com/voluntary-continuation/
https://geonbocalc.com/voluntary-continuation/before-voluntary-continuation-application
https://geonbocalc.com/voluntary-continuation/when-voluntary-continuation-is-better
https://geonbocalc.com/voluntary-continuation/when-local-can-be-better-than-continuation
https://geonbocalc.com/voluntary-continuation/paystub-items-for-voluntary-continuation
https://geonbocalc.com/income/freelancer-health-premium-after-resignation
https://geonbocalc.com/income/severance-pay-health-insurance
```

## 5일차: 체크리스트 (8건)

허브를 포함해 `checklists/` 아래 7건이 전부 노출 0입니다. 루트의 체크리스트 페이지를 함께 넣습니다.

```text
https://geonbocalc.com/checklists/
https://geonbocalc.com/checklists/before-resignation-health-checklist
https://geonbocalc.com/checklists/dependent-documents-checklist
https://geonbocalc.com/checklists/voluntary-continuation-checklist
https://geonbocalc.com/checklists/local-subscriber-documents-checklist
https://geonbocalc.com/checklists/30-day-after-resignation-checklist
https://geonbocalc.com/checklists/90-day-after-resignation-checklist
https://geonbocalc.com/resignation-health-insurance-checklist
```

## 6일차: 사례 (6건)

허브 포함 6건 전부 노출 0입니다.

```text
https://geonbocalc.com/cases/
https://geonbocalc.com/cases/case-120k-before-after
https://geonbocalc.com/cases/case-spouse-dependent-before-after
https://geonbocalc.com/cases/case-rent-deposit-unemployed
https://geonbocalc.com/cases/case-freelancer-after-resignation
https://geonbocalc.com/cases/case-voluntary-continuation-better
```

## 7일차: 이미 노출이 있는 페이지와 보조 페이지 (10건)

색인이 되어 있을 가능성이 높으므로 마지막입니다.

```text
https://geonbocalc.com/income/
https://geonbocalc.com/income/financial-income-over-10m-health-insurance
https://geonbocalc.com/income/pension-income-health-insurance
https://geonbocalc.com/dependent/spouse-dependent-eligibility-check
https://geonbocalc.com/dependent/financial-income-dependent-risk
https://geonbocalc.com/data-sources
https://geonbocalc.com/about
https://geonbocalc.com/contact
https://geonbocalc.com/privacy
https://geonbocalc.com/disclaimer
```

## 참고: 노출이 나오고 있는 페이지 (2026-08-16 기준)

색인 요청보다 콘텐츠 보강이 필요한 구간입니다.

| URL | 노출 | 평균 순위 | 메모 |
| --- | --- | --- | --- |
| /financial-income | 38 | 8.4 | 노출 1위인데 CTR 0%. 1페이지권이므로 제목·설명과 본문 깊이 점검 대상 |
| / | 26 | 17.5 | 계산기 의도 검색어에서 순위가 낮음 |
| /guides/health-insurance-after-reemployment | 22 | 19.6 | 이번에 링크가 처음 연결됨 |
| /voluntary-continuation/ | 14 | 5.7 | 사이트 최고 순위, 클릭 1건 |
| /income/ | 10 | 12.5 | |
| /retiree-guide | 8 | 33.1 | |
| /dependent/ | 6 | 10.5 | |
| /local-subscriber/ | 5 | 4.0 | |
| /data-sources | 5 | 6.0 | |
| /resignation-health-insurance-checklist | 5 | 8.6 | |
| /dependent-eligibility | 5 | 10.4 | |
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
