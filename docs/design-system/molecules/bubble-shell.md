# BubbleShell
> 스케줄링 버블 공통 껍데기 — "모두의 시간" 헤더(앱·제목·서브) + 콘텐츠 슬롯.

**Tier** Molecule · **Figma** `ChatRoom/BubbleShell` · **Source** `src/components/bubbles.jsx`

## 설계 의도 (왜 이렇게 만들었나)
- **모든 버블 상태(생성/제안/조율/확정/붕괴)가 같은 껍데기를 공유** → 상태 전환이 '같은 메시지의 변화'로 읽힘. 헤더는 시스템 명의("모두의 시간")로 고정해 집행 주체가 시스템임을 각인.
- `children` 슬롯으로 상태별 콘텐츠만 갈아끼움 → 버블 조립의 공통 틀.

## React API
| prop | type | 설명 |
|---|---|---|
| `title` | string | 회의 제목·소요시간 |
| `subtitle` | string? | 상태 설명 |
| `children` | node | 상태별 본문(SlotCard·Notice·Button·Board 등) |

## 코드 (현재 구현)
```jsx
function BubbleShell({ title, subtitle, children }) {
  return (
    <div className="bubble">
      <div className="bubble__head">
        <span className="bubble__app">모두의 시간</span>
        <span className="bubble__title">{title}</span>
        {subtitle && <span className="bubble__subtitle">{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}
```
CSS: `.bubble`(surface·radius 4/16·shadow) · `.bubble__head/app/title/subtitle`

## Figma 매핑
`ChatRoom/BubbleShell` · TEXT prop **App·Title·Subtitle** · 중첩 노출 **content**(slot성)

## Uses / Used by
- **Used by**: 모든 [버블](../organisms/proposal-bubble.md)
