export interface AdType {
  id: number
  content: string
  img: string
  category: string
}

export function getBeforeDate(n: number) { // 获取今天前第n天的日期
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

const th = ['', 'Thousand', 'Million', 'Billion', 'Trillion']
const dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
const tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
const tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
export function toWords(number: number) {
  const s = number.toString().replace(/[\, ]/g, '')

  var x = s.indexOf('.')
  if (x == -1)
    x = s.length
  if (x > 15)
    return 'too big'
  var n = s.split('')
  var str = ''
  var sk = 0
  for (var i = 0; i < x; i++) {
    if ((x - i) % 3 == 2) {
      if (n[i] == '1') {
        str += tn[Number(n[i + 1])] + ' '
        i++
        sk = 1
      } else if (n[i] != 0) {
        str += tw[n[i] - 2] + ' '
        sk = 1
      }
    } else if (n[i] != 0) { // 0235
      str += dg[n[i]] + ' '
      if ((x - i) % 3 == 0) str += 'hundred '
      sk = 1
    }
    if ((x - i) % 3 == 1) {
      if (sk)
        str += th[(x - i - 1) / 3] + ' '
      sk = 0
    }
  }

  if (x != s.length) {
    var y = s.length
    str += 'point '
    for (var i = x + 1; i < y; i++)
      str += dg[n[i]] + ' '
  }
  return str.replace(/\s+/g, ' ')
}
