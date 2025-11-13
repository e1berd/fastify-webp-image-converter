import { convert } from './convert.mjs'
import { resize } from './resize.mjs'
import { rotate } from './rotate.mjs'
import { flip } from './flip.mjs'
import { blur } from './blur.mjs'
import { tint } from './tint.mjs'
import { greyscale } from './greyscale.mjs'
import { removeAlpha } from './removeAlpha.mjs'
import { ensureAlpha } from './ensureAlpha.mjs'

/**
 * @param {import('fastify').FastifyInstance} app
*/
export default function any2webpConverterPlugin(app, { apiPrefix = '/api/v1/' } = {}, done) {
  const normalizedApiPrefix = apiPrefix.endsWith('/') ? apiPrefix : apiPrefix + '/'

  app.post(normalizedApiPrefix + 'convert', convert)
  app.post(normalizedApiPrefix + 'resize', resize)
  app.post(normalizedApiPrefix + 'rotate', rotate)
  app.post(normalizedApiPrefix + 'flip', flip)
  app.post(normalizedApiPrefix + 'blur', blur)
  app.post(normalizedApiPrefix + 'tint', tint)
  app.post(normalizedApiPrefix + 'greyscale', greyscale)
  app.post(normalizedApiPrefix + 'grayscale', greyscale)
  app.post(normalizedApiPrefix + 'remove-alpha', removeAlpha)
  app.post(normalizedApiPrefix + 'ensure-alpha', ensureAlpha)

  done()
}
