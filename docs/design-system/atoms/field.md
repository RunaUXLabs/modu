# Field
> 회의 생성 폼의 한 행 — 라벨 + 값 박스(클릭형) + source 힌트.

**Tier** Atom · **Figma** `Common/Field` · **Source** 앱 인라인(`.field*`, Sheet Compose)

## 설계 의도 (왜 이렇게 만들었나)
- **값이 '입력값'이 아니라 '제안값'임을 드러냄**: 캘린더/조건 기반으로 시스템이 미리 채운 값을 클릭형 박스 + `source`("캘린더 기준 제안 — 눌러서 바꿀 수 있어요")로 표시. 확정이 아니라 확인·수정 대상임을 UI로.
- **source는 필요 없을 때 숨김**(Figma BOOLEAN `Show source`) → 값만 있는 필드와 제안 필드를 한 컴포넌트로.

## React 구현
- 별도 React 컴포넌트 아님 — Sheet의 Compose 섹션에서 `.field` 마크업 인라인.
```jsx
<div className="field">
  <div className="field__row"><span className="field__label">제목</span>
    <span className="field__value">우리팀 회의 <em className="field__editicon">✎</em></span></div>
  <span className="field__source">캘린더 기준 제안 — 눌러서 바꿀 수 있어요</span>
</div>
```
CSS: `.field` · `.field__row/label/value/editicon/source/input/options`

## 토큰
`--color-surface-sub/line/primary`, `--color-text/text-sub/text-weak`, `--radius-sm`, `--text-md/sm/xs`, `--weight-medium/semibold`

## Figma 매핑
`Common/Field` · TEXT prop **Label·Value·Source** · BOOLEAN **Show source**

## Uses / Used by
- **Used by**: [Sheet](../organisms/sheet-respond.md)(Compose 섹션)
