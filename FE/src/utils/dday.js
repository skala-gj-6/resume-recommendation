export function dDayLabel(deadline) {
  if (!deadline) return ''
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(deadline)
  if (Number.isNaN(target.getTime())) return ''
  target.setHours(0, 0, 0, 0)
  const diffDays = Math.round((target - today) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'D-DAY'
  if (diffDays > 0) return `D-${diffDays}`
  return '마감'
}

// 마감 5일 이내는 강조색(--color-danger)으로 표시한다. 프로토타입의 `hot` 기준과 동일.
export function isDeadlineHot(deadline) {
  const label = dDayLabel(deadline)
  if (label === 'D-DAY') return true
  const m = /^D-(\d+)$/.exec(label)
  return m ? Number(m[1]) <= 5 : false
}
