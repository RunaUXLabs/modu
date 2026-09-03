# MessageRow
> 채팅 한 줄 — 아바타(sm) + 이름 + MessageBubble. Type: incoming / mine.

**Tier** Molecule · **Figma** `ChatRoom/MessageRow` · **Source** 앱 인라인(`Message`, ChatRoom)

## 설계 의도 (왜 이렇게 만들었나)
- **받은 메시지**만 아바타+이름 노출, **내 메시지**는 우측 정렬·아바타 생략(메신저 관습). 발신자 식별과 정렬로 대화 흐름을 자연스럽게.

## React 구현
```jsx
function Message({ from, me, children }) {
  const mine = from === me;
  return (
    <div className={`chat__msg ${mine ? 'chat__msg--mine' : ''}`}>
      {!mine && <Avatar id={from} size="sm" />}
      <div className="chat__msgbody">
        {!mine && <span className="chat__name">{MEMBERS[from].name}</span>}
        <div className={`chat__text ${mine ? 'chat__text--mine' : ''}`}>{children}</div>
      </div>
    </div>
  );
}
```
CSS: `.chat__msg` · `--mine`(row-reverse) · `.chat__msgbody/name`

## Figma 매핑
`ChatRoom/MessageRow` · Variant **Type(incoming/mine)** · TEXT prop **Name** · 중첩 노출 **Avatar·MessageBubble**

## Uses / Used by
- **Uses**: [Avatar](../atoms/avatar.md)(sm), [MessageBubble](../atoms/message-bubble.md)
- **Used by**: [Shell/ChatChrome](../organisms/shell-chatchrome.md) Body
