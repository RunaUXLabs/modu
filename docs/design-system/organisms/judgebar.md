# JudgeBar
> 테스터 컨트롤(제품 밖 레이어). 6명 시점 전환 · 시간 흐름 진행 · 리셋. 어두운 배경으로 제품과 분리.

**Tier** Organism · **Figma** `JudgeBar` · **Source** `src/components/JudgeBar.jsx`

## 설계 의도 (왜 이렇게 만들었나)
- **제품 밖 '심사/데모용' 레이어**라 다크 표면으로 제품과 시각 분리. 하나의 화면을 6명 시점·4단계로 검증할 수 있게 함(시연 도구).
- "**건드리지 않은 팀원만 기본 행동을 수행**" — 직접 응답한 팀원은 그 선택대로, 나머지는 기본 행동. 이 규칙을 하단 설명으로 명시.
- 버튼은 통합 [Button](../atoms/button.md)으로(advance=primary, reset=ghost).

## React 구현
- `useStore` 기반. 3영역: 시점 전환(MemberCard ×6) · 시간 흐름(StageTrack + advance/reset) · 설명.

## Figma 매핑
`JudgeBar` · 조립: [MemberCard](../molecules/member-card.md) ×6 · [StageTrack](../molecules/stage-track.md) · [Button](../atoms/button.md)(primary/ghost) · [Label](../atoms/label.md)

## Uses / Used by
- **Uses**: MemberCard, StageTrack, Button, Label, Avatar
- **Used by**: App(좌측 aside)
