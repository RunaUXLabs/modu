# Shell/Phone
> 기기 프레임(iPhone 16 Pro, 402×874). 얇은 베젤 + Dynamic Island + Screen 슬롯.

**Tier** Organism(셸) · **Figma** `Shell/Phone` · **Source** 앱 `.phone`(App/ChatRoom)

## 설계 의도 (왜 이렇게 만들었나)
- **최신 플래그십 비율(2.17:1)**로 현실감. 베젤 5px·Dynamic Island·살짝 각진 코너(38)로 구형 느낌 제거(과도한 라운드=올드).
- **Screen을 slot(INSTANCE_SWAP)**으로: 어떤 화면이든 기기 안에 꽂아 보게 — Figma에서 기기/화면 관심사 분리.
- `.phone`은 `position:relative + overflow:hidden` → 바텀 시트 dim을 폰 안에 가둠(뷰포트 오염 방지).

## 코드 (CSS 핵심)
```css
.phone { width:402px; height:874px; border-radius:38px; border:5px solid var(--color-black); overflow:hidden; position:relative; }
.phone__notch { top:12px; width:126px; height:37px; border-radius:var(--radius-full); } /* Dynamic Island */
```

## Figma 매핑
`Shell/Phone` · INSTANCE_SWAP **Screen**(slot) · Dynamic Island

## Uses / Used by
- **Uses(slot)**: [Shell/ChatChrome](./shell-chatchrome.md)
- **Used by**: 화면 조립(프로토타입)
