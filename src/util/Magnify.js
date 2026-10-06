// TODO:
// convert this to npm library

export default class Magnify {
  lens = {
    radius: 150,
    zoom: 6,
    light: 80,
    distort: true,
    distortFactor: 0.0012,
  }

  getLens() {
    if (!this.lens.can) {
      var l = this.lens
      l.can = document.createElement('canvas')
      l.can.id = 'lens'
      l.can.className = 'lens'
      l.ctx = l.can.getContext('2d')
      this.setLensSize(l.radius)
      l.can.onclick = function () {
        l.distort = !l.distort
        this.moveLens()
      }.bind(this)
      l.can.onmousemove = this.moveLens.bind(this)
      l.can.onmousewheel = this.changeLens.bind(this)
      if (l.can.addEventListener)
        l.can.addEventListener('DOMMouseScroll', this.changeLens.bind(this), false)
    }
    return this.lens
  }

  init(img) {
    this.getLens()
    if (img instanceof HTMLImageElement) {
      var can = document.createElement('canvas'),
        ctx = can.getContext('2d', { willReadFrequently: true })
      can.width = img.width
      can.height = img.height
      img.parentElement.insertBefore(can, img)
      img.parentElement.removeChild(img)
      ctx.drawImage(img, 0, 0)
      can.className = `${img.className} magnify`
      img = can
    }
    if (this.lens.can.parentElement) {
      this.lens.can.parentElement.removeChild(this.lens.can)
    }
    img.parentElement.appendChild(this.lens.can)
    img.addEventListener('mousemove', this.moveLens.bind(this))
    return this.lens.can
  }

  setLensSize(lr) {
    if (lr < 10 || lr > 250) return
    var l = this.lens
    l.r = l.radius = lr
    l.r2 = lr << 1
    l.rq = lr * lr
    l.can.width = l.r2
    l.can.height = l.r2
    l.img = l.ctx.createImageData(l.r2, l.r2)
    l.glimg = Array.from({ length: l.r2 * l.r2 })
    this.setLensLight(l.light)
  }

  setLensLight(light) {
    if (l < 0 || l > 255) return
    var l = this.lens
    l.light = light
    for (var px = 0; px < l.glimg.length; px++) {
      var y = ~~(px / l.r2),
        x = px % l.r2,
        dx = 0.9 * l.r - x,
        dy = 0.7 * l.r - y
      l.glimg[px] = l.light - ~~((l.light * (dx * dx + dy * dy)) / (l.r * l.r))
    }
  }

  changeLens(e) {
    var e = window.event || e,
      delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail))
    e.preventDefault()
    var l = this.lens
    if (e.shiftKey) {
      this.setLensSize(l.radius + 5 * delta)
    } else if (e.ctrlKey) {
      this.setLensLight(l.light + 4 * delta)
    } else if (e.altKey) {
      this.lens.distortFactor += delta / 10000.0
    } else {
      l.zoom += delta / 4
      if (l.zoom < 1) l.zoom = 1
      else if (l.zoom > 80) l.zoom = 80
    }
    this.moveLens(e)
  }

  moveLens(e) {
    if (!e) {
      e = this.lastEvent
      if (!e) return
    } else this.lastEvent = e
    var l = this.lens,
      can = l.above
    if (!can) this.lens.above = can = e.target
    var ctx = can.getContext('2d'),
      b = can.getBoundingClientRect(),
      mx = Math.round(e.clientX - b.x + 1),
      my = Math.round(e.clientY - b.y + 1)
    if (mx < can.clientWidth && my < can.clientHeight && mx >= 0 && my >= 0) {
      var df,
        sr = ~~(l.r / l.zoom)
      if (l.distort) {
        df = l.distortFactor / l.r
        sr *= 2
      } else {
        df = 0
        sr += 2
      }
      try {
        var img = ctx.getImageData(mx - sr, my - sr, 2 * sr, 2 * sr)
        for (var y = 0; y < l.r2; y++) {
          var dy = y - l.r,
            dyq = dy * dy
          for (var x = 0; x < l.r2; x++) {
            var dx = x - l.r,
              dxq = dx * dx,
              rd = Math.sqrt(dxq + dyq),
              ru = rd * (1 - df * rd * rd),
              rf = rd / ru,
              xs = Math.round((dx * rf) / l.zoom) + sr,
              ys = Math.round((dy * rf) / l.zoom) + sr,
              ti = (l.r2 * y + x) * 4,
              si = (2 * sr * ys + xs) * 4
            if (xs > 0 && ys > 0 && xs < 2 * sr && ys < 2 * sr)
              for (var i = 0; i < 4; i++)
                l.img.data[ti + i] = img.data[si + i] + (l.light ? l.glimg[~~(ti / 4)] : 0)
            else for (var i = 0; i < 4; i++) l.img.data[ti + i] = 0
            l.img.data[(l.r2 * y + x) * 4 + 3] = dxq + dyq < l.rq ? 255 : 0
          }
        }
        l.ctx.putImageData(l.img, 0, 0)
        l.can.style.display = 'block'
        l.can.style.opacity = 1.0
        //console.log(e.clientX+', '+e.clientY);
        l.can.style.left = e.clientX - l.r + 'px'
        l.can.style.top = e.clientY - l.r + 'px'
      } catch (e) {
        console.log(e)
      }
    } else {
      l.can.style.display = 'none'
      l.above = null
    }
  }
}
