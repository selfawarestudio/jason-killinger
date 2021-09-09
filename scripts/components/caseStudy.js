import choozy from 'choozy'
import { qs, rect } from 'martha'
import { component } from 'picoapp'

export default component((node, ctx) => {
  const { hero } = choozy(node)
  const header = qs('[data-scroll-padding-top]')
  const theme = hero.dataset.theme
  const defaultTheme = 'black'

  let last = null

  ctx.on('resize', () => {
    header.rect = rect(header)
    hero.rect = rect(hero)
  })

  ctx.on('tick', ({ scroll }) => {
    if (scroll.target <= hero.rect.height - header.rect.height * 0.5) {
      if (last !== theme) {
        ctx.emit('header:theme', null, theme)
        last = theme
      }
    } else {
      if (last !== defaultTheme) {
        ctx.emit('header:theme', null, defaultTheme)
        last = defaultTheme
      }
    }
  })

  return () => {
    ctx.emit('header:theme', null, defaultTheme)
  }
})
