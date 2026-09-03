# Sheet (Bottom Sheet)
> 버블/현황 탭 시 열리는 바텀 시트. 모드별로 Compose/Proposal/Response/Organizer 본문을 구성. grab + body + (필요 시) footer.

**Tier** Organism · **Figma** `ChatRoom/Sheet/Respond`(응답 대표) · **Source** `src/components/Sheet.jsx`

## 설계 의도 (왜 이렇게 만들었나)
- **한 시트 틀에서 상황별 본문만 교체**: 여백 위계(필드 4 < 그룹 8~12 < 섹션 24)와 하단 고정 footer + 스크롤 포그로 "더 있다"를 암시. 라운드 코너를 스크롤바가 자르지 않게 body가 스크롤 담당.
- **`.phone`의 자식으로 렌더**해야 dim(`absolute; inset:0`)이 폰 안에 갇힘 — 폰 밖이면 body 스크롤이 번쩍임(중요 구조 규칙).
- 응답은 [SlotCard](../molecules/slot-card.md)(respond)+[SegButton](../atoms/seg-button.md), 생성은 [Field](../atoms/field.md), 주최자 현황은 [Matrix](../molecules/matrix-table.md).

## React 구현
```jsx
export default function Sheet() {
  if (!state.sheetOpen) return null;              // 닫힘 가드
  return (
    <div className="sheet__dim" onClick={close}>
      <div className="sheet" onClick={stop}>
        <div className="sheet__grab" />
        {/* mode별: ComposeSheet / ProposalSheet / ResponseSheet / OrganizerSheet */}
      </div>
    </div>
  );
}
```
CSS: `.sheet__dim/grab/body/footer/section/sectiontitle/title/escalation`

## Figma 매핑
`ChatRoom/Sheet/Respond` · grab + body(SectionTitle + SlotCard respond ×N) + footer(Button)

## Uses / Used by
- **Uses**: [SectionTitle](../atoms/section-title.md), [SlotCard](../molecules/slot-card.md)(respond), [SegButton](../atoms/seg-button.md), [Field](../atoms/field.md), [Matrix/Table](../molecules/matrix-table.md), [Button](../atoms/button.md)
- **Used by**: App / [Shell/Phone](./shell-phone.md) 내부 오버레이
