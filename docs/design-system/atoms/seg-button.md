# SegButton
> 슬롯 응답용 [가능 / 어려움] 이분 토글. 응답 시트·SlotCard(respond) 공용.

**Tier** Atom · **Figma** `Common/SegButton` · **Source** `src/components/primitives.jsx`

## 설계 의도 (왜 이렇게 만들었나)
- **이분 응답을 한 번의 탭으로** — 별도 라디오/드롭다운 없이. 선택된 쪽만 색(가능=success, 어려움=danger)으로 채워 '내 응답'을 명확히.
- **base+override**: 선택 상태를 variant로 굽지 않고 `styleSeg('none/ok/hard')`로 해당 아이템만 오버라이드.

## React API
| prop | type | default | 설명 |
|---|---|---|---|
| `value` | `'ok'`\|`'hard'`\|undefined | — | 현재 응답 |
| `onChange` | fn(v) | — | 변경 콜백 |
| `disabled` | boolean | — | 비활성(opacity 0.5) |

## 코드 (현재 구현)
```jsx
export function SegButton({ value, onChange, disabled }) {
  return (
    <div className={`seg ${disabled ? 'seg--disabled' : ''}`} role="radiogroup">
      <button className={`seg__item ${value==='ok'?'seg__item--ok':''}`} onClick={()=>!disabled&&onChange('ok')}>가능</button>
      <button className={`seg__item ${value==='hard'?'seg__item--hard':''}`} onClick={()=>!disabled&&onChange('hard')}>어려움</button>
    </div>
  );
}
```
CSS: `.seg`(surface·보더·radius-sm·overflow hidden) · `.seg__item` · `--ok/--hard` · `.seg--disabled`

## 사용 예시
```jsx
<SegButton value={myValue} onChange={setMyValue} />
```

## 토큰
`--color-surface/line`, `--color-success(-weak)/danger(-weak)`, `--color-text-weak`, `--radius-sm`, `--text-sm`, `--weight-medium/semibold`

## Figma 매핑
`Common/SegButton` base(미선택) + `styleSeg('none|ok|hard', disabled)`

## Uses / Used by
- **Used by**: [SlotCard](../molecules/slot-card.md)(respond), [Sheet/Respond](../organisms/sheet-respond.md)
