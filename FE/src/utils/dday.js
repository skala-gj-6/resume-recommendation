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
