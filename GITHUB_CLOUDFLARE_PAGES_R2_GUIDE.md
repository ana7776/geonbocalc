# GitHub, Cloudflare Pages, R2 이미지 자동화 가이드

이 저장소는 정적 사이트 루트에 `index.html`, `styles.css`, `_headers`, `_redirects`가 있는 구조이므로 Cloudflare Pages의 빌드 출력 디렉토리는 저장소 루트(`/`)로 두면 된다.

## 초기 디렉토리 구조

```text
.
├─ index.html
├─ styles.css
├─ app.js
├─ _headers
├─ _redirects
├─ assets/
├─ scripts/
│  └─ r2-image-pipeline.mjs
├─ .env.example
├─ package.json
├─ DEPLOYMENT.md
└─ GITHUB_CLOUDFLARE_PAGES_R2_GUIDE.md
```

## GitHub main push 후 Pages 자동 배포

1. GitHub에 저장소를 생성하고 로컬 저장소를 연결한다.

```powershell
git remote add origin https://github.com/<owner>/<repo>.git
git branch -M main
git push -u origin main
```

2. Cloudflare Dashboard에서 Workers & Pages > Create application > Pages > Connect to Git을 선택한다.
3. GitHub 계정을 연결하고 이 저장소를 선택한다.
4. Pages 빌드 설정을 아래처럼 둔다.

```text
Production branch: main
Framework preset: None
Build command: 비움
Build output directory: /
Root directory: /
Environment variables: 필요 시 별도 추가
```

5. 저장 후 배포하면 이후 로컬에서 아래 명령으로 `main`에 push할 때마다 자동 빌드 및 전 세계 CDN 배포가 실행된다.

```powershell
git add .
git commit -m "Update site"
git push origin main
```

## Cloudflare R2 준비

1. Cloudflare Dashboard > R2 Object Storage에서 버킷을 생성한다.
2. R2 > Manage R2 API Tokens에서 Object Read & Write 권한 토큰을 만든다.
3. 버킷 공개 URL을 준비한다. 권장 방식은 R2 custom domain 연결이다.
   - 예: `https://images.example.com`
4. `.env.example`을 참고해 로컬 환경변수를 설정한다.

```powershell
$env:R2_ACCOUNT_ID="your_cloudflare_account_id"
$env:R2_ACCESS_KEY_ID="your_r2_access_key_id"
$env:R2_SECRET_ACCESS_KEY="your_r2_secret_access_key"
$env:R2_BUCKET="your_bucket_name"
$env:R2_PUBLIC_BASE_URL="https://images.example.com"
$env:R2_PREFIX="site-images"
$env:IMAGE_QUALITY="80"
```

## 설치

```powershell
npm install
```

## 이미지 크롤링, WebP 변환, R2 업로드

특정 URL의 `<img>` 이미지를 다운로드하고, `sharp`로 WebP 품질 80 변환 후, `@aws-sdk/client-s3`로 Cloudflare R2에 업로드한다. 실행 결과는 최종 이미지 URL을 JSON으로 반환한다.

```powershell
npm run images:r2 -- --url https://example.com/article
```

특정 영역의 이미지만 처리하려면 CSS selector를 지정한다.

```powershell
npm run images:r2 -- --url https://example.com/article --selector "main article img" --limit 10
```

출력 예시:

```json
{
  "sourceUrl": "https://example.com/article",
  "count": 1,
  "images": [
    {
      "source": "https://example.com/photo.jpg",
      "key": "site-images/2026-06-29/photo-a1b2c3d4e5f6.webp",
      "url": "https://images.example.com/site-images/2026-06-29/photo-a1b2c3d4e5f6.webp",
      "bytes": 52314
    }
  ]
}
```

## 운영 팁

- `R2_PUBLIC_BASE_URL`은 R2 버킷의 실제 공개 접근 주소와 같아야 한다.
- R2 API 키는 GitHub 저장소에 커밋하지 않는다.
- Pages 자동 배포용 환경변수와 로컬 R2 업로드용 환경변수는 분리해 관리한다.
- 업로드된 이미지는 `Cache-Control: public, max-age=31536000, immutable`로 저장되므로 같은 이미지를 교체하기보다 새 파일명으로 업로드하는 방식이 안전하다.
