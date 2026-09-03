# Avatar
> 멤버를 나타내는 원형 이니셜 배지. 색은 멤버 인덱스 기반 6색 round-robin으로 자동 배정(정체성 ≠ 색).

**Tier** Atom · **Figma** `JudgeBar/Avatar` · **Source** `src/components/primitives.jsx`

## 언제 쓰나 / 쓰지 않나
- 쓴다: 채팅 메시지, 현황판, 확정 요약, 주최자 매트릭스, 심사바 등 멤버 식별이 필요한 모든 곳.
- 안 쓴다: 임의 이미지/아이콘. (아바타는 이니셜+유저색 전용)

## 설계 의도 (왜 이렇게 만들었나)
- **색을 멤버에 하드코딩하지 않고 인덱스 round-robin**: 정체성(누구)과 색(표시)을 분리 → 팀원이 6명을 넘어도 `--user-N`이 순환 재사용돼 확장 가능하고, 팔레트만 바꾸면 전 화면 일괄 반영.
- **Figma에서 색을 6개 variant로 굽지 않고 fill 변수 오버라이드**: variant 폭발 방지. Avatar는 **크기(md/sm)만** variant. (색을 '모드'로 안 한 이유 — 모드는 라이트/다크 테마 전용, 유저색과 축이 겹치면 안 됨.)
- **size 2개만**: 채팅=sm, 그 외=md. 화면별 예외를 만들지 않는다는 primitives 원칙.

## React API
| prop | type | default | 설명 |
|---|---|---|---|
| `id` | string (MEMBERS 키) | — (필수) | 멤버 id. 색/이니셜은 여기서 파생 |
| `size` | `'md'` \| `'sm'` | `'md'` | md=40, sm=28 |
| `dimmed` | boolean | `false` | 흐리게(opacity 0.35) |

## 코드 (현재 구현)
```jsx
export function Avatar({ id, size = 'md', dimmed = false }) {
  const m = MEMBERS[id];
  return (
    <span
      className={`avatar avatar--${size} ${dimmed ? 'avatar--dimmed' : ''}`}
      style={{ '--avatar-bg': userColorOf(id) }}   // 인덱스 → --user-N
      aria-label={m.name}
    >
      {m.name[0]}
    </span>
  );
}
```
관련 CSS: `.avatar` (`background: var(--avatar-bg, var(--user-1))`) · `.avatar--md`(40) · `.avatar--sm`(28) · `.avatar--dimmed`

## 사용 예시
```jsx
<Avatar id="dan" />              {/* md */}
<Avatar id="mara" size="sm" />   {/* 채팅/현황판 */}
<Avatar id="jessie" dimmed />    {/* 비활성 */}
```
- ✅ Do: `id`는 반드시 `MEMBERS`의 키.
- ❌ Don't: 색을 직접 지정하지 말 것 — `userColorOf(id)`가 index%6으로 자동 배정.

## 토큰
`--user-1~6`(= primitive/user/N), `--color-text-inverse`, `--radius-full`, `--text-md`/`--text-xs`, `--weight-semibold`

## Figma 매핑
- `JudgeBar/Avatar` · Variant **Size(md/sm) × Dimmed(off/on)** · TEXT prop **Initial**
- 인스턴스 오버라이드: fill → `semantic/user/N` (index%6). (styleX 없음 — 색만 스왑)

## Uses / Used by
- **Uses**: —
- **Used by**: [MessageRow](../molecules/message-row.md), [MemberCard](../molecules/member-card.md), Matrix/Row, [ConfirmedBubble](../organisms/confirmed-bubble.md)
