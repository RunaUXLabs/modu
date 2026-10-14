# 서비스 내부 디자인 시스템

이 저장소는 디자인 시스템을 별도 배포 패키지로 설치하지 않는다. `src/design-system`의 TypeScript/React 소스를 Vite가 직접 빌드한다. 서비스와 Storybook이 같은 구현을 사용한다.

## 책임과 조립 규모

- `src/design-system/components/atoms`: Button, Avatar, Field 등 기본 UI.
- `src/design-system/components/molecules`: SlotCard, BubbleShell, MatrixTable 등 재사용 조합 UI. 데이터는 props/Provider로 주입한다.
- `src/features/scheduling/model`: 회의 시나리오 데이터, reducer, 선택 결과, 마감 규칙.
- `src/features/scheduling/components`: 공통 UI를 조합하고 상태·액션을 연결하는 회의 버블과 시트.
- `src/features/simulation`: 계정·시점·시간을 바꾸는 데모 컨트롤.
- `src/pages`: 채팅방과 데모 컨트롤을 배치하는 전체 화면.

조합 규모와 책임은 다른 기준이다. BubbleShell은 UI 조합이므로 디자인 시스템에, SchedulingBubble은 같은 조합 규모여도 회의 상태를 해석하므로 feature에 속한다. 기능 상태를 디자인 시스템에서 import하지 않는다.

## 인스턴스 사용

```jsx
import { SlotCard, Button, BubbleShell } from '@design-system';

<BubbleShell title={meeting.title} subtitle="가능한 시간을 알려주세요">
  <SlotCard slot={slot} variant="respond" myValue={value} onChange={setValue} />
  <Button full onClick={saveResponse}>응답 저장</Button>
</BubbleShell>
```

컴포넌트를 화면에 복사하지 않고 import한다. Figma의 인스턴스 오버라이드는 props, 슬롯 삽입은 children, 행동 연결은 callback으로 표현한다. 공통 스타일은 `src/design-system/styles.css`, 토큰 값은 `src/design-system/tokens/tokens.css`에서 수정한다.

`src/components`, `src/store.jsx`, `src/data.js`는 기존 경로를 위한 재노출 파일이다. 신규 화면은 실제 소유 디렉토리에서 import한다. 이 파일들에는 구현과 상태 로직을 추가하지 않는다.

## 실행과 검증

```bash
pnpm dev
pnpm storybook
pnpm test
pnpm test:service-stories
pnpm build:pages
```

Storybook의 Atoms/Molecules는 내부 모듈을 직접 렌더링한다. Patterns/Service Screens는 실제 feature·page 소스를 사용하고 실제 reducer 액션으로 초기 시나리오를 구성한다.

`build:pages`는 서비스를 `dist/`, Storybook을 `dist/storybook/`에 조립한다. GitHub Actions가 이 폴더를 배포하며 서비스는 `/modu/`, Storybook은 `/modu/storybook/`에서 열린다. 로컬 파일을 수정한 것만으로 공개 사이트가 갱신되지는 않는다.

원본 형제 `modu-design-system` 폴더와 기존 `vendor` tarball은 이 앱의 실행 의존성이 아니다. 내부 통합 시 원본은 수정하지 않았다. 이후 이 서비스의 컴포넌트 변경은 내부 모듈에 반영한다.
