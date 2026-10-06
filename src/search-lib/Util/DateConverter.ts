export const DateConverter = {
  dateFromISO(iso: string): Date {
    const d: Date = new Date(946681200000)
    const t: string[] = iso.split(/[ T\-+:.]/)
    d.setFullYear(1 * +t[0])
    d.setMonth(1 * +t[1] - 1)
    d.setDate(1 * +t[2])
    if (t.length > 3) {
      d.setHours(1 * +t[3])
    }
    if (t.length > 4) {
      d.setMinutes(1 * +t[4])
    }
    if (t.length > 6) {
      d.setSeconds(1 * +t[5])
    }
    return d
  },

  dateToISO(n: Date): string {
    const Y = n.getFullYear()
    const M = n.getMonth() + 1
    const D = n.getDate()
    const h = n.getHours()
    const m = n.getMinutes()
    const s = n.getSeconds()
    return (
      Y +
      (M < 10 ? '-0' : '-') +
      M +
      (D < 10 ? '-0' : '-') +
      D +
      (h < 10 ? ' 0' : ' ') +
      h +
      (m < 10 ? ':0' : ':') +
      m +
      (s < 10 ? ':0' : ':') +
      s
    )
  },
}
