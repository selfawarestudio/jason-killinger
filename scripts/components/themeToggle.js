import { component } from 'picoapp'
import choozy from 'choozy'
import hover from '../lib/hover'
import { round, lerp, on, wrap, remove, add, qsa } from 'martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { spiral } = choozy(node)

  let targetSpeed = 0
  let currentSpeed = 0
  let rotation = 0

  let offClick = on(node, 'click', () =>
    ctx.emit('site:theme', {
      isAltTheme: !ctx.getState().isAltTheme,
    }),
  )

  let offHover = hover(
    node,
    () => {
      targetSpeed = 10
    },
    () => {
      targetSpeed = 0
    },
  )

  ctx.on('tick', () => {
    currentSpeed = round(lerp(currentSpeed, targetSpeed, 0.1), 1000)

    if (Math.abs(currentSpeed - targetSpeed) < 0.1) {
      currentSpeed = targetSpeed
    }

    rotation = wrap(rotation + currentSpeed, 361)

    gsap.set(spiral, { rotation })
  })

  return () => {
    offHover()
    offClick()
  }
})
