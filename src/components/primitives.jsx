/* ============================================================
   Primitives — 최소 단위 컴포넌트. 시스템의 어휘.
   variant/size prop만으로 모든 쓰임을 커버하고, 화면별 예외를 만들지 않는다.
   ============================================================ */
import React from 'react';
import { MEMBERS, userColorOf } from '../data.js';

/* Avatar — 재사용처: 테스터 바, 채팅 메시지, 현황판, 확정 요약, 주최자 매트릭스
   색은 멤버 인덱스 기반 round-robin(--user-color-N)으로 주입 → 정체성과 색을 분리 */
export function Avatar({ id, size = 'md', dimmed = false }) {
  const m = MEMBERS[id];
  return (
    <span
      className={`avatar avatar--${size} ${dimmed ? 'avatar--dimmed' : ''}`}
      style={{ '--avatar-bg': userColorOf(id) }}
      aria-label={m.name}
    >
      {m.name[0]}
    </span>
  );
}

/* Button — variant: primary | secondary | danger | ghost / size: md | sm */
export function Button({ variant = 'primary', size = 'md', full = false, disabled, onClick, children }) {
  return (
    <button
      type="button"
      className={`btn btn--${variant} btn--${size} ${full ? 'btn--full' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* Chip — 상태 표시. tone: neutral | primary | danger | success | warn */
export function Chip({ tone = 'neutral', children }) {
  return <span className={`chip chip--${tone}`}>{children}</span>;
}

/* SegButton — 슬롯 응답용 [가능/어려움] 토글. 응답 시트·버블 공용 */
export function SegButton({ value, onChange, disabled }) {
  return (
    <div className={`seg ${disabled ? 'seg--disabled' : ''}`} role="radiogroup">
      <button
        type="button"
        className={`seg__item ${value === 'ok' ? 'seg__item--ok' : ''}`}
        onClick={() => !disabled && onChange('ok')}
      >
        가능
      </button>
      <button
        type="button"
        className={`seg__item ${value === 'hard' ? 'seg__item--hard' : ''}`}
        onClick={() => !disabled && onChange('hard')}
      >
        어려움
      </button>
    </div>
  );
}

/* NameFlow — "댄, 마라, 윌리엄님의 응답을 기다리고 있어요" 현황판 문장 */
export function NameFlow({ ids, suffix }) {
  if (!ids.length) return null;
  return (
    <span className="nameflow">
      {ids.map((id, i) => (
        <React.Fragment key={id}>
          <b>{MEMBERS[id].name}</b>
          {i < ids.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
      {suffix}
    </span>
  );
}

/* Notice — 버블/시트 안의 보조 안내줄 */
export function Notice({ tone = 'neutral', children }) {
  return <p className={`notice notice--${tone}`}>{children}</p>;
}

/* Icons — 챗룸에 사용되는 아이콘 */
export function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function IconBack() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function IconSend() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}