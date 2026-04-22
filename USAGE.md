# TTC Korea 예약 시스템 사용 가이드

## 1. 다른 상품으로 변경하기

### 방법 1: 설정 파일 수정 (권장)

`lib/config/tour-config.ts` 파일을 수정합니다:

```typescript
// 1. CURRENT_TOUR_ID를 원하는 상품 ID로 변경
export const CURRENT_TOUR_ID = "best-of-spain"  // 예: 스페인 투어로 변경

// 2. TOURS 객체에 새 상품 정보 추가 (없는 경우)
export const TOURS: Record<string, TourConfig> = {
  "best-of-spain": {
    id: "best-of-spain",
    brand: "IV",  // 브랜드 코드 (IV=Insight, TT=Trafalgar 등)
    tourCode: {
      "2026": "E831M26",  // TTC API 투어 코드
      "2027": "E831M27",
    },
    name: "Best of Spain",
    nameKo: "베스트 오브 스페인",
    duration: 14,
    destinations: ["마드리드", "바르셀로나", "세비야"],
    highlights: ["프라도 미술관", "사그라다 파밀리아"],
    inclusions: ["호텔 13박", "조식 제공"],
    websiteUrl: "https://www.insightvacations.com/en-sg/tours/best-of-spain",
  },
}

// 3. PROMOTIONS에 할인 정보 추가
export const PROMOTIONS: Record<string, PromotionConfig[]> = {
  "best-of-spain": [
    { date: "2026-06-15", originalPrice: 6500, salePrice: 5850, promotionName: "LAST MINUTE DEAL" },
  ],
}
```

### 방법 2: URL 파라미터로 상품 지정 (향후 구현 예정)

```
/embed?tour=best-of-spain
```

---

## 2. 아이프레임으로 웹사이트에 삽입하기

### 기본 삽입 코드

```html
<iframe 
  src="https://your-domain.vercel.app/embed" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>
```

### 반응형 삽입 (권장)

```html
<div style="position: relative; width: 100%; padding-bottom: 120%; min-height: 600px;">
  <iframe 
    src="https://your-domain.vercel.app/embed" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 8px;"
    allowfullscreen
  ></iframe>
</div>
```

### WordPress 삽입

1. 페이지/포스트 편집기에서 "Custom HTML" 블록 추가
2. 위의 iframe 코드 붙여넣기

### Cafe24/고도몰 삽입

1. 디자인 > HTML 편집
2. 원하는 위치에 iframe 코드 삽입

---

## 3. 브랜드별 코드

| 브랜드 | 코드 | 아시아 리전 |
|--------|------|-------------|
| Insight Vacations | IV | IVSINS |
| Trafalgar | TT | TTSINS |
| Costsaver | CJ | CJSINS |
| Contiki | UT | UTSINS |
| AAT Kings | AT | ATSINS |
| Luxury Gold | LX | LXSINS |

---

## 4. 투어 코드 찾는 방법

1. TTC Content API에서 투어 코드 확인:
   ```
   https://content.travcorp.com/tour_departure/{BRAND}/V3_1/{TOUR_CODE}.xml?token=...
   ```

2. 투어 코드 형식: `{코드}{년도}`
   - 예: E921M26 = Grand Italy & Sicily 2026년

---

## 5. 할인 정보 업데이트

`lib/config/tour-config.ts`의 `PROMOTIONS` 객체에 추가:

```typescript
{ 
  date: "2026-07-03",        // 출발일 (YYYY-MM-DD)
  originalPrice: 7250,       // 원가 (USD)
  salePrice: 6525,           // 할인가 (USD)
  promotionName: "LAST MINUTE DEAL"  // 프로모션명
}
```

---

## 6. 관리자 페이지

- **약관 관리**: `/admin/terms`
- **상품 관리**: `lib/config/tour-config.ts` 직접 수정

---

## 7. API 엔드포인트

| 엔드포인트 | 설명 |
|------------|------|
| `/api/tour` | 투어 정보 및 출발일 |
| `/api/exchange-rate` | 환율 정보 |
| `/api/terms` | 약관/개인정보 |
| `/api/bookings` | 예약 신청 (POST) |

---

## 8. 환경 변수

| 변수 | 설명 |
|------|------|
| `RESEND_API_KEY` | 예약 이메일 발송용 |
| `CRON_SECRET` | Cron Job 인증용 |
