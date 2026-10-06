export const N = (tag, c, att) => {
  const n = document.createElement(tag)
  if (att) for (let a of Object.keys(att)) n.setAttribute(a, att[a])
  if (typeof c === 'undefined' || c === null || c === false) return n
  if (!(c instanceof Array)) c = [c]
  for (let i in c) {
    const tc = typeof c[i]
    if (tc !== 'undefined')
      try {
        n.appendChild(
          tc === 'object' ? c[i] : document.createTextNode(tc === 'string' ? c[i] : '' + c[i]),
        )
      } catch {
        const pre = document.createElement('pre')
        pre.appendChild(document.createTextNode(JSON.stringify(c[i], null, 4)))
        n.appendChild(pre)
      }
  }
  return n
}

export const clear = (n) => {
  if (!n) return
  while (n.childNodes.length > 0) n.removeChild(n.firstChild)
  return n
}

export const SL = (value, label) =>
  N('a', label ? label : value, {
    href: location.pathname + '?q=' + encodeURIComponent(value),
    class: 'search',
  })

export const addEvents = (node, evts) => {
  Object.keys(evts).forEach((key) => node.addEventListener(key, evts[key]))
  return node
}
