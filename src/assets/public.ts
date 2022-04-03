export interface AdType {
  id: number
  content: string
  img: string
  category: string
}

export function getBeforeDate (n: number) { // 获取今天前第n天的日期
  const d = new Date()
  let mon = d.getMonth() + 1
  let day = d.getDate()
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1
    } else {
      mon = 12
    }
  }
  d.setDate(d.getDate() - n)
  mon = d.getMonth() + 1
  day = d.getDate()
  return (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
}

export const chartColor = ['#ead7bb', '#5d7599', '#abb6c8', '#9fcaa3', '#e78764', '#e1d839']
