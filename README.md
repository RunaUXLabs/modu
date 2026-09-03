# Mod U — 모두의 시간

![cover](./resources/cover.png)
**modu** = 모두(everyone), 그리고 **Mod U** — 회의를 잡는 방식을 개조하다.
침묵은 동의다(tacit consent). 각자의 일정과 응답이 달라도 시스템이 조율해 회의가 확정되는, 팀 채팅방 안의 회의 확정 시스템.
토스 2026 프로덕트 디자이너 챌린지 주제를 기반으로 만든 인터랙티브 프로토타입이자 교육자료입니다.
[피그마 링크](https://www.figma.com/design/ADGZA9in8smWNHWctdr4ao/%EB%AA%A8%EB%91%90%EC%9D%98-%EC%8B%9C%EA%B0%84--Mod-U-?node-id=0-1&t=CZLdYDLyUwqfK2up-1) | [프로토타입 배포 링크](runauxlabs.github.io/modu/)

## 실행

요구 사항: Node 22+, pnpm 9+

```bash
pnpm install
pnpm dev      # 개발 서버
pnpm build    # 프로덕션 빌드 (dist/)
```

## 배포 (GitHub Pages)

1. GitHub 저장소 생성 후 push (main 브랜치)
2. 저장소 Settings → Pages → Source를 **GitHub Actions**로 설정
3. `.github/workflows/deploy.yml`이 push마다 자동 빌드·배포

## 테스터 사용법

- **시점 전환**: 좌측 컨트롤에서 팀원 6명의 아바타를 탭하면 그 사람 시점의 메신저 화면으로 전환됩니다. 상태는 전 계정이 공유합니다.
- **시작은 생성부터**: 첫 진입은 회의 생성 전입니다. 루나 시점에서 [회의 만들기]로 필참자를 직접 지정해보세요(전원 필참으로 바꾸면 무응답 처리가 어떻게 달라지는지도 볼 수 있습니다). 생성하지 않고 시간을 진행하면 기본 조건으로 자동 생성됩니다.
- **시간 진행**: T0(생성·잠정 확정) → T1(조율 모드) → T2(마감 임박) → T3(마감 이후). 직접 응답하지 않은 팀원만 각자의 기본 행동대로 움직입니다.
- **초기값에는 출처가 있습니다**: 생성 시트의 제목·길이·기간·마감은 시스템이 채팅방 대화를 읽고 미리 채운 값으로, 각 값 아래에 근거가 표기됩니다. 값을 누르면 수정할 수 있습니다.
- 어떤 조작을 해도 시스템은 말이 되는 종착지에 도착합니다. 필참자를 전 슬롯 '어려움'으로 만들어 교집합을 무너뜨려 보세요. 확정 화면 마지막 줄의 **조율 영수증**("단체방 독촉 0회…")까지 확인해보세요.

## 구조 — 디자인 시스템 관점

```
DESIGN-SYSTEM.md              토큰 스펙 (플러그인 판독용) — md-to-figma 플러그인이 파싱해 Figma 배리어블·스타일 생성.
                              tokens.css와 1:1, 이식하면 그대로 반영되므로 템플릿 규약을 유지한다
docs/design-system/           디자인 시스템 문서 (사람이 읽는 해설 트랙)
  README.md                     인덱스 + 설계 원칙 + 문서 구성(두 트랙) + 컴포넌트 트리
  foundation-guide.md           토큰 해설 — 2계층 구조·CSS↔Figma 매핑 규칙·용도/대비율 (값 정본은 DESIGN-SYSTEM.md)
  atoms/ molecules/ organisms/  컴포넌트 문서 — 정의·설계 의도·API·Figma 매핑·Uses/Used by
src/
  tokens.css                  디자인 토큰 (색·타이포·간격·모션) — 유일한 값의 출처
  styles.css                  컴포넌트 스타일 — 토큰만 참조, 하드코딩 금지
  data.js                     시나리오 데이터 + 회의 메타 초기값·출처 + 유저컬러 6색 round-robin (앱 '오늘' = 2026-07-09 고정)
  store.jsx                   상태 머신 — 2계층 골조 + 기본 행동 규칙, 필참 구성은 동적 (reducer는 순수 함수)
  components/
    primitives.jsx            Avatar · Button · Chip · SegButton · NameFlow · Notice · Icons(Settings/Back/Send/Pin)
    SlotCard.jsx              하나의 컴포넌트, 세 variant (hero / tally / respond) + 쏠림 게이지
    bubbles.jsx               시스템 명의의 중앙 카드 — 생성→잠정 확정→조율→확정/붕괴 전환 (BubbleShell 공통 껍데기)
    Sheet.jsx                 바텀시트 — .phone 자식으로 렌더(dim 스코핑) · 본문 스크롤 + 고정 푸터, 보는 사람별 상태
    ChatRoom.jsx              메신저 셸 — 타겟 푸시 배너 + 버블 상단 고정(핀) + 벡터 아이콘
    JudgeBar.jsx              테스터 컨트롤 (제품 밖 레이어)
```

**디자인 시스템은 두 트랙으로 관리한다.** `DESIGN-SYSTEM.md`는 md-to-figma로 이식하는 **기계 판독 스펙**이고, [`docs/design-system/`](./docs/design-system/README.md)은 사람이 읽는 **해설**이다. 값의 정본은 `src/tokens.css` → `DESIGN-SYSTEM.md`.

**Figma 디자인 시스템**은 base + 인스턴스 오버라이드 · 컴포넌트 프로퍼티(TEXT/BOOLEAN/INSTANCE_SWAP) · slot 구조로 구성 — 컴포넌트별 정의와 설계 의도는 [`docs/design-system/`](./docs/design-system/README.md) 참조.

핵심 재사용: `SlotCard`는 잠정 확정 버블(hero), 조율 버블(tally), 응답 시트(respond) 세 맥락을
variant prop 하나로 커버합니다. `primitives`의 6개 컴포넌트가 모든 화면의 어휘입니다.

## 설계 요약

- **계층 1 — 잠정 확정**: 캘린더∩회의룸 최적 슬롯으로 시스템이 잠정 확정. 침묵 = 동의.
  필참자만 확인 탭 1회. 이의는 주최자에게만 비공개 전달.
- **계층 2 — 조율 모드 (폴백)**: 이의 발생 또는 교집합 부재 시에만. 후보 3개 탭 응답,
  이름 현황판, 마감 후 역할별 무응답 처리 (선택→불참 정리, 필참→에스컬레이션).
- **침묵의 비용 귀속**: 필참자의 침묵은 집단의 비용 → 시스템이 쫓아간다. 선택 참석자의 침묵은
  본인의 비용 → 시스템이 존중한다. 입력이 결과에 영향을 주는 순간에만 응답을 요청한다.
- **집행 명의의 원칙**: 독촉·불참 정리·확정 통보의 주어는 언제나 시스템/규칙 — 사람이 아니다.
  버블도 주최자의 말풍선이 아닌 시스템 명의의 중앙 카드로 게시된다. 조율의 악역을 사람에게 남기지 않기 위함이다.
- 조율은 기본이 아니라 예외. 응답 비용의 이상값은 0.

## 디자인 시스템 노트

- **토큰이 유일한 값의 출처**: 색·타이포·간격·라디우스·모션 전부 `tokens.css`. 컴포넌트 CSS에 raw 값 금지.
- **4px 그리드**: 모든 치수는 4배수. 허용 예외(타입 스케일 14/18px, 폰 프레임 390px, 자간, 1px 선)는 토큰 주석에 명문화.
- **타이포**: Pretendard Variable, 기준 16px. 위계 caption(12) < sub(14) < body(16) < title(18) < display(24). 라벨은 12px 허용, 문장형 텍스트는 14px 이상.
- **접근성**: 전 텍스트 색 조합을 WCAG AA(4.5:1)로 계산 검증 — 대비율은 토큰 주석에 기록. `#ff9500`처럼 텍스트 사용이 금지된 색은 텍스트 전용 토큰으로 분리. 키보드 포커스 링(`:focus-visible`) 제공.
- **인코딩 분리**: 조율 카드에서 색 칩은 '내 상태', 하단 게이지 길이는 '팀의 쏠림'. 집단 추세가 개인 선택으로 오독되지 않도록 시각 채널을 나눔.
