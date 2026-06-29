# GitHub Actions Cloudflare Pages 자동 배포 Secret 설정

이 저장소는 `.github/workflows/deploy-cloudflare-pages.yml`로 `main` 브랜치 push 시 Cloudflare Pages 프로젝트 `geonbocalc`에 자동 배포되도록 구성되어 있다.

## 필요한 GitHub Secret

GitHub 저장소에서 아래 Secret을 추가한다.

```text
Name: CLOUDFLARE_API_TOKEN
Value: Cloudflare에서 발급한 API Token
```

이 Secret이 없으면 GitHub Actions는 Cloudflare 배포를 건너뛰도록 설정되어 있다. 실패 메일을 막기 위한 안전장치이며, 실제 자동 배포를 사용하려면 반드시 Secret을 추가해야 한다.

저장소 Secret 설정 위치:

```text
https://github.com/ana7776/geonbocalc/settings/secrets/actions/new
```

## Cloudflare API Token 권한

Cloudflare Dashboard > My Profile > API Tokens > Create Token에서 Custom token을 만들고 아래 권한을 부여한다.

```text
Account - Cloudflare Pages - Edit
Account - Account Settings - Read
Zone - Zone - Read
```

Account Resources는 `Anagim7776@gmail.com's Account`로 제한한다.

## 자동 배포 흐름

1. 로컬에서 파일 수정
2. `git add .`
3. `git commit -m "Update site"`
4. `git push origin main`
5. GitHub Actions가 Wrangler로 `geonbocalc` Pages 프로젝트에 배포
6. `https://geonbocalc.com`에 반영

## 확인 위치

GitHub Actions 실행 기록:

```text
https://github.com/ana7776/geonbocalc/actions
```

Cloudflare Pages 프로젝트:

```text
geonbocalc
```

## 실패 메일이 온 경우

메일 제목이 `Cloudflare Pages 워크플로 실행에 배포`이고 실패 작업이 `Cloudflare Pages에 배포 / 배포`라면 대부분 아래 중 하나다.

```text
1. GitHub Secret CLOUDFLARE_API_TOKEN이 없음
2. API Token 권한에 Cloudflare Pages Edit이 없음
3. Account ID 또는 project-name이 다른 값으로 들어감
```

현재 워크플로우는 Secret이 없으면 실패하지 않고 배포를 건너뛰게 되어 있다. 자동 배포까지 완료하려면 `CLOUDFLARE_API_TOKEN`을 추가한 뒤 GitHub Actions에서 `Run workflow`를 눌러 다시 실행한다.
