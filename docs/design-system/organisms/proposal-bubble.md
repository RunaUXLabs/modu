# ProposalBubble
> 계층 1 '잠정 확정' 버블. 시스템이 고른 슬롯을 크게 보이고, 침묵=동의 규칙 아래 확인/대기 현황을 노출. **여러 원자·분자를 조립한 유기체**.

**Tier** Organism · **Figma** `ChatRoom/Bubble/ProposalBubble` · **Source** `src/components/bubbles.jsx`

## 언제 쓰나
- `state.mode`가 잠정 확정(및 `proposalEscalated`)일 때 채팅방 스케줄링 버블로 렌더. 상태는 store에서 읽음(계정 시점별 분기).

## 설계 의도 (왜 이렇게 만들었나)
- **props 없이 store 구독**: 심사(테스터) 바로 6명 시점을 자유롭게 전환하며, 같은 버블이 **시점별로 다른 문구·CTA**를 보여야 함. 단일 store가 진실원천이라, props로 데이터를 흘리면 시점 분기가 흩어짐.
- **침묵=동의 · 집행 명의의 원칙**: 독촉의 주어는 주최자가 아니라 **시스템**. 그래서 Notice/Board 문구가 시스템 명의("응답하지 않은 분들은 참석 가능한 것으로 정리돼요")이고, 이는 '침묵=동의' 규칙의 UI 표현.
- **대기 현황을 Board로 하단 상시 노출 + 탭 시 시트**: 제안이 대화에 밀려 올라가 침묵을 낳는 문제를 차단(핀바와 함께). 침묵을 '보이게' 만든다.
- **호스트/필참/응답여부 분기**: 필참엔 '확인하기', 선택엔 '응답하기' + "안 해도 괜찮아요" — 강제 대신 규칙을 투명하게.

## React API
- **props 없음** — `useStore()`로 상태 구독. (계정=`state.currentUser`, 응답=`state.proposal`, 대기=`waitingIds(state)` 등)

## 코드 (현재 구현)
```jsx
export function ProposalBubble() {
  const { state, dispatch } = useStore()
  const me = state.currentUser, mine = state.proposal[me]
  const waiting = waitingIds(state), escalated = state.mode === 'proposalEscalated', isHost = me === 'runa'
  return (
    <BubbleShell title={`${state.meeting.title} · ${state.meeting.duration}`} subtitle="캘린더와 회의룸이 모두 비는 시간으로 잡았어요">
      <SlotCard slot={PROPOSAL_SLOT} variant="hero" />
      <Notice tone="neutral">어려우면 <b>{state.meeting.deadline}</b>까지 알려주세요. 이의가 없으면 그대로 확정돼요.</Notice>
      {!isHost && (
        <div className="bubble__actions">
          {mine === 'ok'
            ? <Chip tone="success">확인 완료 — 참석으로 정리됐어요</Chip>
            : <>
                <Button variant="primary" size="md" full onClick={() => dispatch({ type: 'SHEET', open: true })}>
                  {isRequired(state, me) ? '확인하기' : '응답하기'}
                </Button>
                {!isRequired(state, me) && <Notice tone="weak">응답하지 않아도 괜찮아요 — 참석 가능한 것으로 정리돼요.</Notice>}
              </>}
        </div>
      )}
      {waiting.length > 0 && (
        <div className="board" onClick={() => dispatch({ type: 'SHEET', open: true })}>
          <NameFlow ids={waiting} suffix="님의 확인이 꼭 필요해요" />
          <span className="board__deadline">응답하지 않은 분들은 참석 가능한 것으로 정리돼요</span>
        </div>
      )}
      {escalated && isHost && <Notice tone="warn">확인 기한이 지나 아직 확인하지 않은 필참자에게만 다시 알렸어요.</Notice>}
    </BubbleShell>
  )
}
```
관련 CSS: `.bubble__actions` · `.board` · `.board__deadline`

## 사용 예시
```jsx
// bubbles.jsx의 SchedulingBubble 라우터가 mode에 따라 선택
{state.mode === '…' && <ProposalBubble />}
```
- ✅ Do: 분기(호스트/필참/응답여부)는 store 값으로. 문구·CTA는 계정 시점에 따라 달라짐.
- ❌ Don't: 버블에 props로 데이터 넘기지 말 것 — 단일 store가 진실원천.

## 토큰
하위 컴포넌트 토큰 상속(`--color-surface`, `--shadow-card`, `--radius-lg`, primary/warn 계열 …)

## Figma 매핑
- `ChatRoom/Bubble/ProposalBubble` — 껍데기(카드+헤더) + 인스턴스 조립
- 대표 상태 1종으로 구성(코드 분기는 Figma에서 대표형)

## Uses / Used by
- **Uses**: [BubbleShell](../molecules/bubble-shell.md), [SlotCard](../molecules/slot-card.md)(hero), [Notice](../atoms/notice.md), [Chip](../atoms/chip.md), [Button](../atoms/button.md), [NameFlow](../atoms/name-flow.md), Board
- **Used by**: ChatRoom(SchedulingBubble 라우터)
