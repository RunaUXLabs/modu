# Button
> 액션 버튼. 의미(variant)와 크기(size)만으로 모든 쓰임을 커버. JudgeBar·버블·시트 공용.

**Tier** Atom · **Figma** `Common/Button` · **Source** `src/components/primitives.jsx`

## 설계 의도 (왜 이렇게 만들었나)
- **JudgeBar 전용 advance/reset을 따로 두지 않고 단일 `Button`으로 통합**: 둘 다 '주요 액션/텍스트 버튼'으로 의미가 같고 **크기만 다름**. 별도 컴포넌트는 중복 유지보수를 낳아, 이름도 `Button` 하나로 양쪽에서 인스턴스.
- **variant를 컴포넌트 variant로 굽지 않고 `styleButton` 인스턴스 오버라이드**: variant(4)×size(2)×state(2)=16 폭발 → base는 **Size만**, primary/secondary/danger/ghost·disabled는 토큰 오버라이드. 중급+ 디자이너가 용도에 맞게 입힘.
- **disabled=opacity 오버라이드**: 상태 variant를 늘리지 않음.

## React API
| prop | type | default | 설명 |
|---|---|---|---|
| `variant` | `'primary'`\|`'secondary'`\|`'danger'`\|`'ghost'` | `'primary'` | 의미별 색 |
| `size` | `'md'`\|`'sm'` | `'md'` | md=12/16·text-md, sm=8/12·text-sm |
| `full` | boolean | `false` | 폭 100% |
| `disabled` | boolean | — | 비활성(opacity) |
| `onClick` | fn | — | 클릭 |
| `children` | node | — | 라벨 |

## 코드 (현재 구현)
```jsx
export function Button({ variant = 'primary', size = 'md', full = false, disabled, onClick, children }) {
  return (
    <button type="button"
      className={`btn btn--${variant} btn--${size} ${full ? 'btn--full' : ''}`}
      disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
```
관련 CSS: `.btn` · `.btn--primary/secondary/danger/ghost` · `.btn--md/sm` · `.btn--full` · `:disabled`(opacity)

## 사용 예시
```jsx
<Button variant="primary" full onClick={openSheet}>확인하기</Button>
<Button variant="secondary" size="sm" onClick={edit}>내 응답 수정하기</Button>
<Button variant="primary" disabled>확정 완료</Button>
```
- ✅ Do: CTA=primary, 보조=secondary, 파괴적=danger, 텍스트버튼=ghost.
- ❌ Don't: 크기별 별도 컴포넌트 만들지 말 것 — `size`로.

## 토큰
`--color-primary`, `--color-primary-weak`, `--color-danger`/`--color-danger-weak`, `--color-text-inverse`/`--color-text-sub`, `--radius-md`/`--radius-sm`, `--text-md`/`--text-sm`, `--weight-semibold`

## Figma 매핑
- `Common/Button` · Variant **Size(md/sm)** (base=primary) · TEXT prop **Label**
- 인스턴스 오버라이드: `styleButton(inst, 'primary'|'secondary'|'danger'|'ghost', disabled)` — fill·라벨색·opacity

## Uses / Used by
- **Uses**: —
- **Used by**: [JudgeBar](../organisms/judgebar.md), [ProposalBubble](../organisms/proposal-bubble.md) 등 버블 전반, [Sheet](../organisms/sheet-respond.md)
