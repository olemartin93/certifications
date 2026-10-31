import { catalog, getCertification, getModule } from './catalog'

/** Only cite official bodies or the original authors of a framework. */
const TRUSTED_DOMAINS = ['peoplecert.org', 'axelos.com', 'agilemanifesto.org', 'scrumguides.org', 'kanbanguides.org']

const allQuestions = catalog.flatMap((c) => c.modules.flatMap((m) => m.quiz))

describe('catalog', () => {
  it('starts with the PRINCE2 Foundation and PRINCE2 Agile tracks', () => {
    expect(catalog.map((c) => c.id)).toEqual(expect.arrayContaining(['prince2-foundation', 'prince2-agile-foundation']))
  })

  it('has unique certification ids that are URL safe', () => {
    const ids = catalog.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9-]+$/))
  })

  it('has globally unique quiz question ids', () => {
    const ids = allQuestions.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('looks up certifications and modules', () => {
    const cert = getCertification('prince2-foundation')
    expect(cert?.title).toBe('PRINCE2 Foundation')
    expect(cert && getModule(cert, 'principles')?.title).toBe('The 7 principles')
    expect(getCertification('nope')).toBeUndefined()
    expect(getCertification(undefined)).toBeUndefined()
  })
})

describe.each(catalog.map((c) => [c.title, c] as const))('%s', (_title, cert) => {
  it('has sensible exam facts', () => {
    expect(cert.exam.questions).toBeGreaterThan(0)
    expect(cert.exam.durationMinutes).toBeGreaterThan(0)
    expect(cert.exam.passMarkPercent).toBeGreaterThan(0)
    expect(cert.exam.passMarkPercent).toBeLessThanOrEqual(100)
  })

  it('has a TL;DR and a valid review date', () => {
    expect(cert.tldr.length).toBeGreaterThan(0)
    expect(cert.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(Number.isNaN(Date.parse(cert.lastReviewed))).toBe(false)
  })

  it('cites only HTTPS sources from trusted, official domains', () => {
    expect(cert.sources.length).toBeGreaterThan(0)
    for (const source of cert.sources) {
      const url = new URL(source.url)
      expect(url.protocol).toBe('https:')
      const trusted = TRUSTED_DOMAINS.some((d) => url.hostname === d || url.hostname.endsWith(`.${d}`))
      expect(trusted, `${source.url} is not a trusted domain`).toBe(true)
    }
  })

  it('has unique, URL safe module ids', () => {
    const ids = cert.modules.map((m) => m.id)
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => expect(id).toMatch(/^[a-z0-9-]+$/))
    expect(ids).not.toContain('mock')
  })

  it.each(cert.modules.map((m) => [m.title, m] as const))('module "%s" is complete', (_t, mod) => {
    expect(mod.tldr.length).toBeGreaterThanOrEqual(3)
    expect(mod.sections.length).toBeGreaterThan(0)
    expect(mod.keyTerms.length).toBeGreaterThan(0)
    expect(mod.quiz.length).toBeGreaterThanOrEqual(5)
    for (const section of mod.sections) {
      expect((section.paragraphs?.length ?? 0) + (section.bullets?.length ?? 0)).toBeGreaterThan(0)
    }
  })

  it('has well-formed quiz questions', () => {
    for (const q of cert.modules.flatMap((m) => m.quiz)) {
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(3)
      expect(new Set(q.options).size, `${q.id} has duplicate options`).toBe(q.options.length)
      expect(Number.isInteger(q.answerIndex), q.id).toBe(true)
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0)
      expect(q.answerIndex, q.id).toBeLessThan(q.options.length)
      expect(q.explanation.length, q.id).toBeGreaterThan(10)
    }
  })

  it('does not always put the right answer in the same position', () => {
    const positions = new Set(cert.modules.flatMap((m) => m.quiz.map((q) => q.answerIndex)))
    expect(positions.size).toBeGreaterThan(1)
  })
})
