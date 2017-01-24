
const FastSimplexNoise = require('fast-simplex-noise').default

const getBiomeLevel =
  (e) => {
    if (e < 0.4)
      return 'WATER'

    return 'GRASS'
  }

const fill2d =
  (rows, cols, fn) => Array(rows)
    .fill(true)
    .map((_, x) => {
      return Array(cols)
        .fill(true)
        .map((_, y) => {
          return fn(x, y)
        })
    })

const main =
  (ctx, width, height) => {
    const gen = new FastSimplexNoise({
      frequency: 0.001,
      octaves: 8,
      min: 0.0,
      max: 1.0
    })

    const grid = fill2d(
      width,
      height,
      (x, y) => gen.scaled([x, y])
    )

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const noise = grid[x][y]

        if (noise < 0.4) {
          ctx.fillStyle = 'rgb(30, 144, 255)'
        } else if (noise > 0.4 && noise < 0.43) {
          ctx.fillStyle = 'rgb(255, 238, 173)'
        } else {
          ctx.fillStyle = 'rgb(50,205,50)'
        }

        ctx.fillRect(x, y, 1, 1)
      }
    }
  }

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
main(ctx, canvas.width, canvas.height)
