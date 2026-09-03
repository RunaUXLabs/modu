# MemberCard
> 테스터 바의 멤버 카드 — 아바타 + 이름 + 역할 배지(주최자/필참/선택). 현재 시점이면 active.

**Tier** Molecule · **Figma** `JudgeBar/MemberCard` · **Source** 앱 인라인(`.judge__member`, JudgeBar)

## 설계 의도 (왜 이렇게 만들었나)
- 6명 시점을 오가는 테스터용 스위처. **누구로 보는가**를 아바타(유저색)+이름+역할로 한 번에. active(현재 계정)만 primary 보더로.
- 역할 배지 문구는 규칙에서 파생(주최자=runa, 필참=required, 그 외 선택 참석; 마라는 '수요일 외근' 부기).

## React 구현
```jsx
<button className={`judge__member ${current===id?'judge__member--active':''}`} onClick={()=>switchUser(id)}>
  <Avatar id={id} size="md" />
  <span className="judge__membername">{MEMBERS[id].name}</span>
  <span className="judge__memberdesc">{role}</span>
</button>
```
CSS: `.judge__member` · `--active`(primary 보더+surface-active-dark) · `.judge__membername/memberdesc`

## Figma 매핑
`JudgeBar/MemberCard` · Variant **State(default/active)** · TEXT prop **Name·Desc** · 중첩 노출 **Avatar**

## Uses / Used by
- **Uses**: [Avatar](../atoms/avatar.md)(md)
- **Used by**: [JudgeBar](../organisms/judgebar.md)
