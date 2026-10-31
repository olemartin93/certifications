import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { App } from './App'
import { catalog } from './data/catalog'

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
  return userEvent.setup()
}

beforeAll(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
})

describe('App navigation', () => {
  it('lists every certification in the catalog', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: 'Certified 😏' })).toBeInTheDocument()
    for (const cert of catalog) {
      expect(screen.getByRole('heading', { name: cert.title })).toBeInTheDocument()
    }
  })

  it('goes from catalog to certification to module and back', async () => {
    const user = renderAt('/')
    await user.click(screen.getByRole('link', { name: /PRINCE2 Foundation/ }))
    expect(screen.getByRole('heading', { level: 1, name: 'PRINCE2 Foundation' })).toBeInTheDocument()
    expect(screen.getByText('TL;DR')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Take a mock exam/ })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /The 7 principles/ }))
    expect(screen.getByRole('heading', { level: 1, name: 'The 7 principles' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Key terms' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Back to PRINCE2 Foundation' }))
    expect(screen.getByRole('heading', { level: 1, name: 'PRINCE2 Foundation' })).toBeInTheDocument()
  })

  it('tracks read modules and shows progress in the catalog', async () => {
    const user = renderAt('/prince2-agile-foundation/modules/agile-basics')
    await user.click(screen.getByRole('button', { name: 'Mark as read' }))
    expect(screen.getByRole('button', { name: /Marked as read/ })).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('link', { name: 'Back to PRINCE2 Agile Foundation' }))
    await user.click(screen.getByRole('link', { name: 'Back to catalog' }))
    const card = screen.getByRole('link', { name: /PRINCE2 Agile Foundation/ })
    expect(within(card).getByText('1 of 6 modules read')).toBeInTheDocument()
  })

  it('runs a module quiz and saves the best score', async () => {
    const user = renderAt('/prince2-foundation/quiz/principles')
    const total = catalog[0]?.modules.find((m) => m.id === 'principles')?.quiz.length ?? 0
    for (let i = 0; i < total; i++) {
      const options = within(screen.getByRole('list', { name: 'Answer options' })).getAllByRole('button')
      await user.click(options[0] as HTMLElement)
      await user.click(screen.getByRole('button', { name: i === total - 1 ? 'See results' : 'Next question' }))
    }
    expect(screen.getByRole('heading', { name: new RegExp(`/ ${total} correct`) })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: /Back to The 7 principles/ }))
    await user.click(screen.getByRole('link', { name: 'Back to PRINCE2 Foundation' }))
    expect(screen.getByText(new RegExp(`best \\d+/${total}`))).toBeInTheDocument()
  })

  it.each(catalog.map((c) => [c.id, c] as const))('builds a mock exam for %s capped at the real exam length', (id, cert) => {
    renderAt(`/${id}/quiz/mock`)
    const pool = cert.modules.flatMap((m) => m.quiz).length
    expect(screen.getByText(`Question 1 of ${Math.min(pool, cert.exam.questions)}`)).toBeInTheDocument()
  })

  it.each(['/unknown', '/prince2-foundation/modules/nope', '/prince2-foundation/quiz/nope', '/a/b/c/d'])('shows not found for %s', (path) => {
    renderAt(path)
    expect(screen.getByRole('heading', { name: /couldn.t find that page/ })).toBeInTheDocument()
  })
})
