# geonbocalc.com 배포 체크리스트

## 현재 배포 상태

- Cloudflare Pages 프로젝트: `geonbocalc`
- Pages 기본 주소: `https://geonbocalc.pages.dev`
- 배포 방식: Wrangler Direct Upload
- 로컬 배포 명령:

```powershell
npx.cmd wrangler pages deploy . --project-name geonbocalc --branch main --commit-dirty=true
```

## Cloudflare 도메인 연결 순서

1. Cloudflare Dashboard에서 `geonbocalc.com` 사이트를 추가한다.
2. Cloudflare가 발급한 네임서버 2개를 확인한다.
3. 가비아 도메인 관리에서 `geonbocalc.com` 네임서버를 Cloudflare 네임서버 2개로 변경한다.
4. Cloudflare에서 도메인이 Active 상태가 될 때까지 기다린다.
5. Cloudflare Workers & Pages > `geonbocalc` > Custom domains에서 아래 도메인을 추가한다.
   - `geonbocalc.com`
   - `www.geonbocalc.com`
6. DNS 레코드가 자동 생성되지 않으면 아래처럼 추가한다.

```text
Type   Name   Target
CNAME  @      geonbocalc.pages.dev
CNAME  www    geonbocalc.pages.dev
```

7. 연결 후 아래 주소를 확인한다.

```text
https://geonbocalc.com
https://www.geonbocalc.com
https://geonbocalc.com/sitemap.xml
https://geonbocalc.com/robots.txt
```

## 대표 도메인 리다이렉트

대표 도메인은 `https://geonbocalc.com`으로 둔다.

Cloudflare Pages의 `_redirects` 파일은 경로 리다이렉트용으로만 사용하고, `www.geonbocalc.com`에서 `geonbocalc.com`으로 보내는 호스트 리다이렉트는 Cloudflare Dashboard의 Bulk Redirects에서 설정한다.

권장 설정:

```text
Source URL: www.geonbocalc.com
Target URL: https://geonbocalc.com
Status: 301
Options: Preserve query string, Subpath matching, Preserve path suffix
```

설정 후 아래 명령으로 `301`과 `Location: https://geonbocalc.com/`가 나오는지 확인한다.

```powershell
Invoke-WebRequest -Uri "https://www.geonbocalc.com/" -MaximumRedirection 0 -UseBasicParsing
```

2026-06-23 확인 결과, 현재 `https://www.geonbocalc.com/`은 `200`으로 응답하므로 Bulk Redirects 설정이 아직 필요하다.

## 검색엔진/애드센스 신청 전

- Google Search Console에 `https://geonbocalc.com` 등록
- 네이버 서치어드바이저에 `https://geonbocalc.com` 등록
- `sitemap.xml` 제출
- 애드센스 신청 전 콘텐츠 글 15~30개까지 확장
- 개인정보처리방침, 문의, 면책 안내 페이지 유지
