import { expect, test } from '@playwright/test'

test('browse the catalog, read a module and answer a quiz question', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { level: 1, name: 'Certified 😏' })).toBeVisible()
  await page.getByRole('link', { name: /PRINCE2 Agile Foundation/ }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'PRINCE2 Agile Foundation' })).toBeVisible()
  await page.getByRole('link', { name: /Agile fundamentals/ }).click()
  await expect(page.getByText('TL;DR')).toBeVisible()
  await page.getByRole('link', { name: /Take the quiz/ }).click()
  const options = page.getByRole('list', { name: 'Answer options' }).getByRole('button')
  await options.first().click()
  await expect(page.getByRole('button', { name: 'Next question' })).toBeVisible()
})

test('serves a valid web app manifest with reachable icons', async ({ page, request }) => {
  await page.goto('./')
  const href = await page.locator('link[rel="manifest"]').getAttribute('href')
  expect(href).toBeTruthy()
  const manifestUrl = new URL(href ?? '', page.url()).toString()
  const res = await request.get(manifestUrl)
  expect(res.ok()).toBe(true)
  const manifest = (await res.json()) as {
    name: string
    display: string
    start_url: string
    icons: { src: string; sizes: string; purpose?: string }[]
  }
  expect(manifest.name).toBe('Certified 😏')
  expect(manifest.display).toBe('standalone')
  expect(manifest.icons.some((i) => i.sizes === '512x512')).toBe(true)
  expect(manifest.icons.some((i) => i.purpose === 'maskable')).toBe(true)
  for (const icon of manifest.icons) {
    const iconRes = await request.get(new URL(icon.src, manifestUrl).toString())
    expect(iconRes.ok(), icon.src).toBe(true)
    expect(iconRes.headers()['content-type']).toContain('image/png')
  }
})

test('works offline after the first visit', async ({ page, context }) => {
  await page.goto('./')
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready
  })
  // Reload so the page is controlled by the service worker.
  await page.reload()
  await expect.poll(() => page.evaluate(() => navigator.serviceWorker.controller !== null)).toBe(true)

  await context.setOffline(true)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1, name: 'Certified 😏' })).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('Offline')

  await page.getByRole('link', { name: /PRINCE2 Foundation/ }).click()
  await page.getByRole('link', { name: /The 7 processes/ }).click()
  await expect(page.getByRole('heading', { name: 'Key terms' })).toBeVisible()
  await context.setOffline(false)
})
