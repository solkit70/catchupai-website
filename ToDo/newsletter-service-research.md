# Newsletter 구독 기능 개발 조사

## 현재 상태

`index.html`의 "Join the Newsletter" 섹션은 **미완성(stub) 상태**입니다.

**현재 동작** (`main.js:64-72`):
```javascript
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input').value;
  alert(`Success! ${email} has been registered for 2026 updates.`);
  newsletterForm.reset();
});
```

- Subscribe 버튼 클릭 시 팝업 메시지만 표시됨
- 이메일 주소가 실제로 저장되거나 전송되지 않음
- 백엔드 API 연동 없음

---

## 서비스 비교

이 사이트는 **AWS S3 정적 배포** 방식이므로 외부 이메일 서비스 연동이 필요합니다.

| 서비스 | 무료 한도 | 비용 (유료 시) | 크리에이터 적합성 | 연동 난이도 |
|--------|-----------|---------------|------------------|-------------|
| **Substack** | 구독자 무제한 (무료 발송 시) | 유료 구독 수수료 10% | ★★★★★ | 매우 쉬움 |
| **ConvertKit (Kit)** | 10,000명 | $25/월~ | ★★★★★ | 쉬움 |
| **MailerLite** | 1,000명 / 12,000건/월 | $9/월~ | ★★★★☆ | 쉬움 |
| **Mailchimp** | 500명 / 1,000건/월 | $13/월~ | ★★★☆☆ | 보통 |
| **Formspree** | 50건/월 | $10/월~ | ★★☆☆☆ | 매우 쉬움 |

---

## 각 서비스 장단점

### 1. Substack
**장점:**
- 무료 뉴스레터 발송 시 구독자 수 제한 없이 완전 무료
- 별도 플랫폼에서 뉴스레터 작성/발송 UI 제공
- 유료 구독 기능 내장 (수익화 가능)
- 독자 발견 기능 (Substack 내 추천 시스템)

**단점:**
- 유료 구독 활성화 시 10% 수수료 (타 서비스 대비 높음)
- 현재 사이트 폼에서 직접 수집 불가 → Substack 페이지로 리다이렉트 또는 임베드 폼 사용
- 이메일 디자인 커스터마이징 제한

**연동 방법:**
- Substack 가입 후 `https://[name].substack.com/embed` 임베드 코드 삽입
- 또는 "Subscribe on Substack" 버튼으로 링크 연결

---

### 2. ConvertKit (Kit)
**장점:**
- 유튜버/팟캐스터/블로거 등 크리에이터에 최적화
- 무료 10,000명 구독자 지원
- 자동화 시퀀스 (이메일 자동 발송 시리즈)
- 랜딩 페이지 빌더 내장
- API 제공으로 현재 폼에서 직접 이메일 수집 가능

**단점:**
- 10,000명 초과 시 유료 전환 필요
- Mailchimp 대비 UI가 다소 복잡

**연동 방법:**
```javascript
// ConvertKit API를 사용한 fetch 호출
fetch('https://api.convertkit.com/v3/forms/[FORM_ID]/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ api_key: 'YOUR_API_KEY', email: email })
});
```

---

### 3. MailerLite
**장점:**
- 무료 1,000명 / 12,000건/월 (넉넉한 무료 한도)
- 직관적인 드래그&드롭 이메일 에디터
- A/B 테스트, 자동화 기능 포함
- API 제공으로 현재 폼에서 직접 이메일 수집 가능

**단점:**
- 1,000명 초과 시 유료 전환 필요
- 승인 프로세스 필요 (계정 활성화에 1~2일 소요)

**연동 방법:**
```javascript
// MailerLite API를 사용한 fetch 호출
fetch('https://api.mailerlite.com/api/v2/subscribers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-MailerLite-ApiKey': 'YOUR_API_KEY'
  },
  body: JSON.stringify({ email: email })
});
```

---

### 4. Mailchimp
**장점:**
- 가장 널리 알려진 서비스, 레퍼런스 풍부
- 풍부한 이메일 템플릿
- 마케팅 자동화 기능

**단점:**
- 무료 한도가 가장 낮음 (500명 / 1,000건/월)
- GDPR 관련 설정이 복잡
- 최근 가격 정책 변경으로 비용 부담 증가
- API 연동 시 OAuth 등 설정이 타 서비스 대비 복잡

---

### 5. Formspree
**장점:**
- 가장 간단한 연동 (form action URL만 변경)
- 코드 변경 최소화

**단점:**
- 이메일 수집/관리 기능만 있고 뉴스레터 발송 기능 없음
- 무료 50건/월로 매우 제한적
- 단순 이메일 수신 서비스이므로 구독자 관리 기능 별도 필요

---

## 추천

### 1순위: **ConvertKit (Kit)** - 유튜브 크리에이터 최적
- 무료 10,000명으로 가장 여유있음
- 크리에이터 특화 기능 (콘텐츠 업그레이드, 시퀀스)
- 현재 사이트 폼에서 직접 이메일 수집 가능

### 2순위: **Substack** - 가장 간단하고 무제한 무료
- 기술적 구현 부담이 가장 낮음
- 단, 사이트 폼 대신 Substack 페이지 연동 방식

---

## 구현 시 필요한 작업 목록

### ConvertKit 선택 시
- [ ] ConvertKit 계정 생성 (kit.com)
- [ ] API Key 발급
- [ ] Form ID 확인
- [ ] `main.js` 뉴스레터 submit 핸들러에 API 연동 코드 추가
- [ ] 에러 처리 및 성공/실패 UI 메시지 구현
- [ ] API Key를 환경 변수로 관리 (.env)

### Substack 선택 시
- [ ] Substack 계정 생성 (substack.com)
- [ ] 발행 이름(URL slug) 설정
- [ ] 임베드 코드 복사 후 `index.html` newsletter 섹션 교체
- [ ] 또는 현재 폼의 Subscribe 버튼을 Substack 페이지로 리다이렉트

---

*작성일: 2026-02-22*
*작성: Claude Code 분석*
