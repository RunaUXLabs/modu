# Matrix/Row
> 현황표의 한 줄 — 이름 블록(아바타 sm + 역할 배지 + 이름) + 슬롯별 Cell.

**Tier** Molecule · **Figma** `Matrix/Row` · **Source** 앱 인라인(`.matrix__row`, Sheet)

## 설계 의도 (왜 이렇게 만들었나)
- 멤버 행을 **좌측 이름 열(고정) + 우측 상태 셀**로 — 넘칠 땐 이름 열 sticky. 역할(필/선)은 칩 대신 **얇은 원형 배지**로 행 두께 최소화(정보 밀도).

## React 구현
```jsx
<div className="matrix__row">
  <div className="matrix__name"><Avatar id={id} size="sm" /><i className={`matrix__role ${req?'matrix__role--req':''}`}>{req?'필':'선'}</i><span className="matrix__nametext">{name}</span></div>
  {slots.map(s=><span className={`matrix__cell matrix__cell--${state[s]}`}/>)}
</div>
```
CSS: `.matrix__row/name/nametext/role(--req)`

## Figma 매핑
`Matrix/Row` · TEXT prop **Name** · 중첩 노출 **Avatar·Cell**

## Uses / Used by
- **Uses**: [Avatar](../atoms/avatar.md)(sm), [Matrix/Cell](../atoms/matrix-cell.md)
- **Used by**: [Matrix/Table](./matrix-table.md)
