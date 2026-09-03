# SectionTitle
> 바텀 시트 섹션 라벨 — "선 위의 라벨" 형태(12px·bold·약색·자간 + 옆으로 채우는 1px 라인).

**Tier** Atom · **Figma** `Common/SectionTitle` · **Source** 앱 인라인(`.sheet__sectiontitle`)

## 설계 의도 (왜 이렇게 만들었나)
- **본문(16px)과 명확히 구분되는 라벨 위계**: 12px·bold·약한 색·자간으로 "이건 구획 라벨"임을 신호. `::after`가 남은 폭을 1px 선으로 채워 섹션 경계를 강조(구분선 역할까지 겸함).

## React 구현
- 인라인 `<div className="sheet__sectiontitle">가능한 시간</div>` (CSS ::after가 라인 생성)

## 토큰
`--text-xs`, `--weight-bold`, `--color-text-weak`, `--color-line`, letter-spacing 0.6

## Figma 매핑
`Common/SectionTitle`(라벨 + 1px 라인 프레임) · TEXT prop **Title**

## Uses / Used by
- **Used by**: [Sheet/Respond](../organisms/sheet-respond.md)
