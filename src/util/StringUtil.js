export const fromCharCode = (C) => {
  if (C < 0x10000) {
    return String.fromCharCode(C)
  }
  const H = Math.floor((C - 0x10000) / 0x400) + 0xd800
  const L = ((C - 0x10000) % 0x400) + 0xdc00
  return String.fromCharCode(H, L)
}

// taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
export const knownCharCodeAt = (S, I) => {
  S += ''
  const E = S.length
  const surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
  while (surrogatePairs.exec(S) != null) {
    const li = surrogatePairs.lastIndex
    if (li - 2 < I) {
      I++
    } else {
      break
    }
  }
  if (I >= E || I < 0) {
    return NaN
  }
  let C = S.charCodeAt(I)
  let H, L
  if (0xd800 <= C && C <= 0xdbff) {
    H = C
    L = S.charCodeAt(I + 1)
    return (H - 0xd800) * 0x400 + (L - 0xdc00) + 0x10000
  }
  return C
}

export const charCodeInfo = (C) => {
  return {
    page: C >> 8,
    pageHex: (C >> 8).toString(16).toUpperCase(),
    char: fromCharCode(C),
    charHex: C.toString(16).toUpperCase(),
    charCode: C,
  }
}
