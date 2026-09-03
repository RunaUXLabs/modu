# modu · 디자인 시스템 문서

컴포넌트는 **아톰 → 분자 → 유기체**로 조립되며 커진다. 각 문서는 **정의 → 설계 의도(왜) → React API/구현 → 사용(Do/Don't) → 토큰 → Figma 매핑 → Uses/Used by** 순.
새 컴포넌트는 [`_template.md`](./_template.md) 복사.

- 규칙: 컴포넌트 1개 = 파일 1개. tier는 폴더/섹션으로만(이름엔 안 붙임).

## 문서 구성 — 두 트랙

| 트랙 | 파일 | 성격 |
|---|---|---|
| **기계 판독 스펙** | [`DESIGN-SYSTEM.md`](../../DESIGN-SYSTEM.md) (루트) | 자사 **md-to-figma** 플러그인이 파싱 → Figma 배리어블·스타일 생성. 이식하면 그대로 반영. **템플릿 규약 유지 필수** |
| **사람용 해설** | [`foundation-guide.md`](./foundation-guide.md) | 토큰 2계층 구조·CSS↔Figma 매핑 규칙·용도/대비율·동기화 메모 |
| **사람용 해설** | `atoms/` `molecules/` `organisms/` | 컴포넌트별 정의·설계 의도·API·Figma 매핑 |

값의 정본은 `src/tokens.css` → `DESIGN-SYSTEM.md`. 해설 문서의 표는 읽기 편의용 미러이며 불일치 시 정본 우선.

## 설계 원칙
- **base + 인스턴스 오버라이드**(variant 폭발 금지) — 색/톤/상태는 오버라이드(코드=prop, Figma=styleX).
- **크기만 variant**(Avatar·Button). 색=semantic 변수, 유저색만 `--user-N` round-robin(Primitive 전용).
- **프로퍼티**: 편집 텍스트=TEXT, 표시/숨김=BOOLEAN, 콘텐츠 삽입=INSTANCE_SWAP(slot), 중첩=노출.
- **인스턴스 재활용**: 상위는 하위 원자를 인스턴스로 조립(재생성 금지).

## 컴포넌트 트리

### Atoms
- [Avatar](./atoms/avatar.md) · [Button](./atoms/button.md) · [Chip](./atoms/chip.md) · [Notice](./atoms/notice.md) · [SegButton](./atoms/seg-button.md) · [NameFlow](./atoms/name-flow.md) · [Field](./atoms/field.md) · [SectionTitle](./atoms/section-title.md) · [Icons](./atoms/icons.md)
- [StagePill](./atoms/stage-pill.md) · [Label](./atoms/label.md) · [DateDivider](./atoms/date-divider.md) · [MessageBubble](./atoms/message-bubble.md) · [Board](./atoms/board.md) · [Matrix/Cell](./atoms/matrix-cell.md)

### Molecules
- [MemberCard](./molecules/member-card.md) · [StageTrack](./molecules/stage-track.md) · [MessageRow](./molecules/message-row.md) · [BubbleShell](./molecules/bubble-shell.md) · [SlotCard](./molecules/slot-card.md) · [Matrix/Row](./molecules/matrix-row.md) · [Matrix/Table](./molecules/matrix-table.md)

### Organisms
- [JudgeBar](./organisms/judgebar.md)
- Bubbles: [Compose](./organisms/compose-card.md) · [Proposal](./organisms/proposal-bubble.md) · [Coordination](./organisms/coordination-bubble.md) · [Confirmed](./organisms/confirmed-bubble.md) · [NoSlot](./organisms/noslot-bubble.md)
- [Sheet](./organisms/sheet-respond.md) · [Shell/Phone](./organisms/shell-phone.md) · [Shell/ChatChrome](./organisms/shell-chatchrome.md)

## 상태
- ✍️ 전 컴포넌트 문서화 완료 (설계 의도 포함).
- 유지: 코드/Figma 변경 시 해당 문서만 갱신. 조립 관계는 각 문서의 **Uses / Used by**로 추적.
