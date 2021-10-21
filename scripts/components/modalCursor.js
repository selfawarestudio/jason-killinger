import { component } from 'picoapp'
import { round, lerp, once, on } from 'martha'
import gsap from 'gsap'
import app from '../app'
import ModalLeave from '../transitions/ModalLeave'

export default component((node, ctx) => {
  let e = 0.25
  let x = ctx.getState().mx
  let y = ctx.getState().my

  ctx.on('tick', ({ mx, my }) => {
    x = round(lerp(x, mx, e))
    y = round(lerp(y, my, e))
    gsap.set(node, { x, y })
  })

  once(window, 'mousemove', () =>
    gsap.to(node, { autoAlpha: 1, duration: 0.5, ease: 'power3' }),
  )

  let offClick = on(document, 'click', () => {
    let ref = document.referrer
    let current = location.href
    app.router.redirect(ref === current ? location.origin : ref, 'modalLeave')
  })

  return () => {
    offClick()
  }
})
