# Matrix/Table
> 주최자 응답 현황표 — 헤더행(슬롯 라벨) + 멤버행(Matrix/Row). 폰 폭 안 컴팩트.

**Tier** Molecule · **Figma** `Matrix/Table` · **Source** 앱 인라인(`.matrix`, Sheet OrganizerSheet)

## 설계 의도 (왜 이렇게 만들었나)
- 주최자에게 **누가·어떤 슬롯에 가능/어려움**인지를 한 화면에. 가로 스크롤 없이 폰 폭에 들어가게 셀 고정폭·컴팩트. 넘치면 이름 열만 sticky.

## React 구현
- `.matrix` grid에 헤더행 + `.matrix__row` 반복(멤버×슬롯).

## Figma 매핑
`Matrix/Table` · 내부: 헤더 + Matrix/Row ×N

## Uses / Used by
- **Uses**: [Matrix/Row](./matrix-row.md)
- **Used by**: [Sheet](../organisms/sheet-respond.md)(주최자 현황/에스컬레이션)
