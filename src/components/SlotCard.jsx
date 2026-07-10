/* ============================================================
   SlotCard — 하나의 컴포넌트가 세 맥락에서 재사용된다.
   · variant="hero"    잠정 확정 버블: 확정 슬롯을 크게
   · variant="tally"   조율 버블: 슬롯별 가능 인원 집계 + 내 응답 상태
   · variant="respond" 응답 시트: SegButton으로 가능/어려움 입력
   ============================================================ */
import React from 'react'
import { Chip, SegButton } from './primitives.jsx'

export default function SlotCard({
  slot,
  variant = 'tally',
  okCount,          // tally: 가능 인원
  total,            // tally: 전체 인원 — 하단 게이지(쏠림 시각화)의 분모
  myValue,          // tally/respond: 내 응답 ('ok'|'hard'|undefined)
  best = false,     // tally: 현재 1순위 표시
  preset = false,   // respond: 캘린더 제안값 여부 (확정 아님 → 확인 필요)
  onChange,         // respond
  onClick,          // tally: 카드 탭 → 응답 시트
}) {
  if (variant === 'hero') {
    return (
      <div className="slotcard slotcard--hero">
        <div className="slotcard__day">{slot.day}</div>
        <div className="slotcard__main">
          <span className="slotcard__date">{slot.date}</span>
          <span className="slotcard__time">{slot.time}</span>
        </div>
        <div className="slotcard__room">{slot.room} 예약됨</div>
      </div>
    )
  }

  if (variant === 'respond') {
    return (
      <div className={`slotcard slotcard--respond ${preset ? 'slotcard--preset' : ''}`}>
        <div className="slotcard__info">
          <span className="slotcard__date">
            {slot.day} {slot.date}
          </span>
          <span className="slotcard__time">
            {slot.time} · {slot.room}
          </span>
          {preset && <span className="slotcard__presetlabel">캘린더 기준 제안 — 확인해주세요</span>}
        </div>
        <SegButton value={myValue} onChange={onChange} />
      </div>
    )
  }

  /* tally — 인코딩 분리: 색 칩은 '내 상태', 하단 게이지는 '팀의 쏠림'.
     게이지 위에 인원 문구를 겹쳐 오독을 줄이고, '지금 1순위'는 우상단 플래그로 분리 */
  const gaugeText = okCount > 0 ? `팀원 ${okCount}명이 가능하대요` : '아직 응답을 모으는 중이에요'
  return (
    <button type="button" className="slotcard slotcard--tally" onClick={onClick}>
      {best && (
        <span className="slotcard__flag">
          <Chip tone="neutral">지금 1순위</Chip>
        </span>
      )}
      <div className="slotcard__info">
        <span className="slotcard__date">
          {slot.day} {slot.date}
        </span>
        <span className="slotcard__time">
          {slot.time} · {slot.room}
        </span>
      </div>
      <div className="slotcard__meta">
        {myValue === 'ok' && <Chip tone="success">가능해요</Chip>}
        {myValue === 'hard' && <Chip tone="danger">어려워요</Chip>}
      </div>
      <span className="slotcard__gauge" aria-hidden="true">
        <i style={{ width: `${total ? Math.round(((okCount || 0) / total) * 100) : 0}%` }} />
        <em className="slotcard__gaugetext">{gaugeText}</em>
      </span>
    </button>
  )
}
