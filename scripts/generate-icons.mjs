// Rasterizes public/favicon.svg into the PNG icons the PWA manifest needs.
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url))
const out = (name) => new URL(`../public/${name}`, import.meta.url).pathname
const bg = { r: 99, g: 102, b: 241, alpha: 1 }

await sharp(svg, { density: 300 }).resize(192, 192).png().toFile(out('pwa-192x192.png'))
await sharp(svg, { density: 300 }).resize(512, 512).png().toFile(out('pwa-512x512.png'))
// iOS ignores transparency and adds its own rounded corners, so flatten.
await sharp(svg, { density: 300 }).resize(180, 180).flatten({ background: bg }).png().toFile(out('apple-touch-icon.png'))

// Maskable: artwork scaled into the 80% safe zone on a full-bleed background.
const inner = await sharp(svg, { density: 300 }).resize(384, 384).png().toBuffer()
await sharp({ create: { width: 512, height: 512, channels: 4, background: bg } })
  .composite([{ input: inner, gravity: 'center' }])
  .png()
  .toFile(out('maskable-512x512.png'))

console.log('Icons generated.')
