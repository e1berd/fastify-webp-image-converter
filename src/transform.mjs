import sharp from 'sharp'
import { extractFilesFromRequest } from './extractFilesFromRequest.mjs'
import { SUPPORTED_FORMATS } from './convert.mjs'

export async function transform(request, reply) {
  let {
     width,
     height,
     rotate,
     flip,
     blur,
     r,
     g,
     b,
     grayscale,
     greyscale,
     removeAlpha,
     ensureAlpha,
     convertTo
   } = request.query

  grayscale ||= greyscale

  const [file] = await extractFilesFromRequest(request)
  if (!file) {
    return reply.status(400).send({ error: 'No files found' })
  }
  let image = sharp(file.content)

  if (removeAlpha === 'true') {
    image = image.removeAlpha()
  }

  if (ensureAlpha === 'true') {
    image = image.ensureAlpha()
  }

  if (r || g || b) {
    const tintOptions = {}
    try {
      r = parseInt(r)
    } catch(error) {
      reply.status(400).send({ error: 'Invalid red color value' })
      return
    }

    try {
      g = parseInt(g)
    } catch(error) {
      reply.status(400).send({ error: 'Invalid green color value' })
      return
    }

    try {
      b = parseInt(b)
    } catch(error) {
      reply.status(400).send({ error: 'Invalid blue color value' })
      return
    }

    if (typeof r === 'number') {
      if (r > 255) {
        reply.status(400).send({ error: 'Invalid red color value' })
        return
      }
      tintOptions.r = r
    }
    if (typeof g === 'number') {
      if (g > 255) {
        reply.status(400).send({ error: 'Invalid green color value' })
        return
      }
      tintOptions.g = g
    }
    if (typeof b === 'number') {
      if (b > 255) {
        reply.status(400).send({ error: 'Invalid blue color value' })
        return
      }
      tintOptions.b = b
    }

    image = image.tint(tintOptions)
  }

  if (grayscale) {
    try {
      grayscale = parseInt(grayscale)
    } catch (error) {
      return reply.status(400).send('Invalid grayscale value')
    }
    image = image.greyscale(grayscale)
  }

  if (blur) {
    try {
      blur = parseInt(blur)
    } catch (error) {
      return reply.status(400).send('Invalid blur value')
    }
    image = image.blur(blur)
  }

  if (flip === 'true') {
    image = image.flip()
  }

  if (rotate) {
    try {
      rotate = parseInt(rotate)
    } catch (error) {
      return reply.status(400).send('Invalid rotate value')
    }
    image = image.rotate(rotate)
  }

  if (width || height) {
    const resizeOptions = {}
    if (width) {
      try {
        width = parseInt(width)
      } catch (error) {
        return reply.status(400).send('Invalid width value')
      }
      resizeOptions.width = width
    }
    if (height) {
      try {
        height = parseInt(height)
      } catch (error) {
        return reply.status(400).send('Invalid height value')
      }
      resizeOptions.height = height
    }
    image = image.resize(resizeOptions)
  }

  if (convertTo) {
    if (!SUPPORTED_FORMATS.includes(convertTo)) {
      return reply.status(400).send('Invalid convert format target')
    }
    image = image.toFormat(convertTo)
  }

  return image.toBuffer()

}
