import { catalog } from '../data/catalog'
import { buildMockExam, isPass, scorePercent, shuffle } from './quiz'

function seeded(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

describe('shuffle', () => {
  it('keeps every item and does not mutate the input', () => {
    const input = [1, 2, 3, 4, 5, 6]
    const out = shuffle(input, seeded(42))
    expect(input).toEqual([1, 2, 3, 4, 5, 6])
    expect([...out].sort()).toEqual(input)
  })

  it('handles empty and single-item lists', () => {
    expect(shuffle([])).toEqual([])
    expect(shuffle(['a'])).toEqual(['a'])
  })
})

describe('buildMockExam', () => {
  it.each(catalog.map((c) => [c.title, c] as const))('%s: draws unique questions, capped at the exam length', (_t, cert) => {
    const exam = buildMockExam(cert, seeded(7))
    const pool = cert.modules.flatMap((m) => m.quiz).length
    expect(exam.length).toBe(Math.min(cert.exam.questions, pool))
    expect(new Set(exam.map((q) => q.id)).size).toBe(exam.length)
  })
})

describe('scoring', () => {
  it('calculates percentages', () => {
    expect(scorePercent(36, 60)).toBe(60)
    expect(scorePercent(1, 3)).toBe(33)
    expect(scorePercent(0, 0)).toBe(0)
  })

  it('applies the pass mark inclusively', () => {
    expect(isPass(36, 60, 60)).toBe(true)
    expect(isPass(35, 60, 60)).toBe(false)
    expect(isPass(24, 40, 60)).toBe(true)
    expect(isPass(0, 0, 60)).toBe(false)
  })
})
