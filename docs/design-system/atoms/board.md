# Board
> 대기/현황 안내 박스 — 이름 나열 + 마감 규칙줄. 탭하면 응답 시트로.

**Tier** Atom · **Figma** `ChatRoom/Board` · **Source** 앱 인라인(`.board`, bubbles)

## 설계 의도 (왜 이렇게 만들었나)
- **침묵(미응답)을 버블 하단에 상시 가시화**: 누가 응답을 안 했는지, 안 하면 어떻게 정리되는지(마감 규칙)를 항상 보여 '침묵=동의'를 투명하게. NameFlow(이름)+마감줄 조합.
- 박스 자체가 클릭 타깃(→ 시트)이라 현황에서 바로 응답 진입.

## React 구현
```jsx
<div className="board" onClick={openSheet}>
  <NameFlow ids={waiting} suffix="님의 확인이 꼭 필요해요" />
  <span className="board__deadline">응답하지 않은 분들은 참석 가능한 것으로 정리돼요</span>
</div>
```
CSS: `.board`(surface-sub·radius-md) · `.board b`(강조) · `.board__deadline`(text-weak)

## 토큰
`--color-surface-sub/primary-weak`(hover), `--color-text-sub/text/text-weak`, `--radius-md`, `--text-sm`

## Figma 매핑
`ChatRoom/Board` · TEXT prop **Names·Deadline**

## Uses / Used by
- **Uses**: [NameFlow](./name-flow.md)
- **Used by**: [ProposalBubble](../organisms/proposal-bubble.md), CoordinationBubble
