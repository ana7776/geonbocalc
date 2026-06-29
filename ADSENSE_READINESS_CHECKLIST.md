# AdSense 승인 점검 체크리스트

점검일: 2026-06-29

## 공식 기준 요약

Google AdSense 공식 도움말은 가입 전 사이트가 Google 정책을 준수하는 자체 콘텐츠를 가져야 하고, 콘텐츠가 독창적이며 방문자에게 가치가 있어야 한다고 안내한다. 또한 사이트 페이지는 명확하고 쉬운 내비게이션, 독창적 콘텐츠, 좋은 사용자 경험을 갖춰야 한다.

참고:

- https://support.google.com/adsense/answer/9724
- https://support.google.com/adsense/answer/7299563
- https://support.google.com/adsense/answer/48182

## 현재 강점

- 퇴사 후 건강보험이라는 명확한 주제가 있고 계산기, 가이드, 사례, 체크리스트로 콘텐츠 범위가 일관적이다.
- 개인정보처리방침, 문의, 면책 안내, 공공데이터 출처 페이지가 존재한다.
- 대부분의 글에 작성자, 최종 검토일, 공식 출처 안내가 포함되어 있다.
- `robots.txt`, `sitemap.xml`, `ads.txt`가 준비되어 있다.

## 이번 보강 내용

- 개인정보처리방침을 현재 AdSense 스크립트 사용 상태와 맞게 수정했다.
- 소개, 문의, 면책 페이지의 검토일을 갱신했다.
- 소개 페이지에 광고와 운영 투명성 문단을 추가했다.
- 문의/면책/소개/개인정보 페이지에서 공공데이터 출처로 가는 내부 링크를 보강했다.
- 주요 정책성 페이지의 상단 메뉴와 푸터에 공공데이터 출처 링크를 추가했다.

## 배포 전 확인

- GitHub `main` 브랜치에 push한 뒤 Cloudflare Pages 배포가 성공하는지 확인한다.
- `https://geonbocalc.com/ads.txt`가 `google.com, pub-5804969457082424, DIRECT, f08c47fec0942fa0`로 열리는지 확인한다.
- `https://geonbocalc.com/sitemap.xml`과 `https://geonbocalc.com/robots.txt`가 200으로 응답하는지 확인한다.
- AdSense 신청 전 Google Search Console에서 색인 가능한 주요 카테고리 페이지를 확인한다.

## 추가 권장 작업

- 사이트 공개 후 실제 URL 기준으로 깨진 링크와 모바일 표시를 재점검한다.
- 승인 전에는 광고 클릭 유도 문구, 과도한 광고 배치, 빈 페이지, 중복 페이지를 만들지 않는다.
- 계산 결과와 광고 영역이 시각적으로 혼동되지 않도록 광고 단위 배치 후 다시 확인한다.
