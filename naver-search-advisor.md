# 네이버 서치어드바이저 등록 및 수집 요청 정리

기준일: 2026-06-23  
대상 사이트: https://geonbocalc.com  
대표 도메인: https://geonbocalc.com  
사이트맵: https://geonbocalc.com/sitemap.xml  
robots.txt: https://geonbocalc.com/robots.txt

## 1. 사이트 등록

1. 네이버 서치어드바이저에 접속한다.
   - https://searchadvisor.naver.com/
2. 오른쪽 위 `웹마스터 도구`로 이동한다.
3. 사이트 등록 입력칸에 아래 주소를 넣는다.

```text
https://geonbocalc.com
```

4. 소유확인 방식은 네이버가 안내하는 방식 중 하나를 선택한다.
   - HTML 파일 업로드: 네이버가 발급한 HTML 파일을 사이트 루트에 업로드
   - HTML 태그 삽입: 네이버가 발급한 meta 태그를 `index.html`의 `<head>` 안에 삽입

## 2. 소유확인 파일을 받았을 때

네이버가 `naverXXXXXXXXXXXX.html` 형태의 파일을 주면 이 폴더 루트에 추가한다.

예상 위치:

```text
C:\Users\user\Documents\도구1\naverXXXXXXXXXXXX.html
```

추가 후 Cloudflare Pages에 다시 배포하고 아래 주소가 200으로 열리는지 확인한다.

```text
https://geonbocalc.com/naverXXXXXXXXXXXX.html
```

## 3. 소유확인 meta 태그를 받았을 때

네이버가 아래와 비슷한 태그를 주면 `index.html`의 `<head>` 안에 넣는다.

```html
<meta name="naver-site-verification" content="네이버가_발급한_값">
```

삽입 후 Cloudflare Pages에 다시 배포하고 네이버에서 소유확인을 진행한다.

## 4. 사이트맵 제출

사이트 등록과 소유확인이 끝난 뒤:

1. 웹마스터 도구에서 `https://geonbocalc.com` 사이트를 선택한다.
2. `요청 > 사이트맵 제출`로 이동한다.
3. 아래 주소를 제출한다.

```text
https://geonbocalc.com/sitemap.xml
```

네이버 입력칸이 도메인 뒤 경로만 받는 형태라면 아래처럼 입력한다.

```text
/sitemap.xml
```

## 5. robots.txt 수집 요청

1. 웹마스터 도구에서 `검증 > robots.txt`로 이동한다.
2. `수집요청`을 실행한다.
3. 현재 robots.txt 내용은 전체 수집 허용과 사이트맵 위치 안내로 구성되어 있다.

```text
User-agent: *
Allow: /

Sitemap: https://geonbocalc.com/sitemap.xml
```

## 6. 오늘 수집 요청할 URL

네이버의 웹페이지 수집 요청은 사이트별 제한과 우선순위 처리가 있으므로, 한 번에 전체 URL을 반복 제출하지 말고 이전 작업일에 제출한 핵심 URL 다음 묶음부터 넣는다.

```text
https://geonbocalc.com/guides/why-health-premium-rises-after-resignation
https://geonbocalc.com/guides/when-local-subscriber-starts-after-resignation
https://geonbocalc.com/guides/unemployed-health-insurance-check-order
https://geonbocalc.com/guides/dependent-registration-after-resignation
https://geonbocalc.com/dependent/dependent-application-timing-after-resignation
https://geonbocalc.com/local-subscriber/income-decrease-adjustment-after-resignation
https://geonbocalc.com/guides/health-insurance-after-reemployment
https://geonbocalc.com/guides/questions-before-calling-nhis
https://geonbocalc.com/local-subscriber/income-used-for-local-health-premium
https://geonbocalc.com/local-subscriber/local-premium-without-income
https://geonbocalc.com/local-subscriber/rent-deposit-local-health-premium
https://geonbocalc.com/local-subscriber/property-tax-base-health-premium
https://geonbocalc.com/local-subscriber/housing-debt-deduction-health-premium
```

## 7. 다음 작업일에 이어서 요청할 URL

```text
https://geonbocalc.com/voluntary-continuation/before-voluntary-continuation-application
https://geonbocalc.com/voluntary-continuation/when-voluntary-continuation-is-better
https://geonbocalc.com/voluntary-continuation/when-local-can-be-better-than-continuation
https://geonbocalc.com/voluntary-continuation/paystub-items-for-voluntary-continuation
https://geonbocalc.com/dependent/spouse-dependent-eligibility-check
https://geonbocalc.com/dependent/parents-dependent-eligibility
https://geonbocalc.com/dependent/financial-income-dependent-risk
https://geonbocalc.com/dependent/business-registration-dependent-risk
https://geonbocalc.com/income/financial-income-over-10m-health-insurance
https://geonbocalc.com/income/freelancer-health-premium-after-resignation
https://geonbocalc.com/income/pension-income-health-insurance
https://geonbocalc.com/income/severance-pay-health-insurance
```

## 8. 제출하지 않을 URL

아래 파일은 일반 검색 색인 요청 대상에서 제외한다.

```text
https://geonbocalc.com/404.html
https://geonbocalc.com/googlefa76c3e8fcf3b216.html
https://geonbocalc.com/ads.txt
```

## 9. 제출 후 확인 메모

- 수집 요청이 접수되어도 즉시 검색 노출을 보장하지 않는다.
- 같은 URL을 매일 반복 제출하지 않는다.
- 사이트맵 제출 후 핵심 페이지 수집 요청을 먼저 넣고, 이후 콘텐츠 보강이 끝난 글부터 순차 제출한다.
- `site:geonbocalc.com` 검색 결과는 며칠에서 몇 주 간격으로 확인한다.
