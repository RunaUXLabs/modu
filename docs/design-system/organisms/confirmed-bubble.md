# ConfirmedBubble
> 확정 요약 버블(전원 통보) — 확정 슬롯 + 참석자 아바타 + '조율 영수증'.

**Tier** Organism · **Figma** `ChatRoom/Bubble/ConfirmedBubble` · **Source** `src/components/bubbles.jsx`

## 설계 의도 (왜 이렇게 만들었나)
- **'조율 영수증'** — 시스템이 주최자 대신 한 일(단체방 독촉 0회, 리마인드/재요청 N회)을 가시화. 주최자가 '받는 것'을 보여줘 가치 교환을 체감시킴.
- 불참·미확인 필참자는 톤별 Notice로 분리 통보(success=등록완료, weak=불참정리, warn=미확인). 참석자는 Avatar(sm)로 요약.

## 코드 (발췌)
```jsx
<div className="confirm__avatars">{attendees.map(id=><Avatar key={id} id={id} size="sm"/>)}</div>
<Notice tone="success">모두의 캘린더에 등록하고 {slot.room}을 예약했어요.</Notice>
<Notice tone="weak">{receipt}</Notice>
```

## Uses / Used by
- **Uses**: [BubbleShell](../molecules/bubble-shell.md), [SlotCard](../molecules/slot-card.md)(hero), [Avatar](../atoms/avatar.md)(sm), [Notice](../atoms/notice.md)
- **Used by**: ChatRoom(SchedulingBubble)
