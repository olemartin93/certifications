import { act, renderHook } from '@testing-library/react'
import { __resetProgressCache, recordQuizResult, resetProgress, setModuleRead, useProgress } from './progress'

describe('progress store', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current).toEqual({ quizzes: {}, readModules: {} })
  })

  it('keeps the best score and counts attempts', () => {
    const { result } = renderHook(() => useProgress())
    act(() => recordQuizResult('cert', 'mod', 3, 5))
    act(() => recordQuizResult('cert', 'mod', 2, 5))
    expect(result.current.quizzes['cert/mod']).toEqual({ best: 3, total: 5, attempts: 2 })
  })

  it('marks modules as read and unread', () => {
    const { result } = renderHook(() => useProgress())
    act(() => setModuleRead('cert', 'mod', true))
    expect(result.current.readModules['cert/mod']).toBe(true)
    act(() => setModuleRead('cert', 'mod', false))
    expect(result.current.readModules['cert/mod']).toBeUndefined()
  })

  it('persists to localStorage and reloads', () => {
    recordQuizResult('cert', 'mod', 4, 5)
    __resetProgressCache()
    const { result } = renderHook(() => useProgress())
    expect(result.current.quizzes['cert/mod']?.best).toBe(4)
  })

  it('ignores corrupt stored data', () => {
    localStorage.setItem('certified:progress:v1', '{not json')
    const { result } = renderHook(() => useProgress())
    expect(result.current.quizzes).toEqual({})
  })

  it('can be reset', () => {
    recordQuizResult('cert', 'mod', 4, 5)
    resetProgress()
    const { result } = renderHook(() => useProgress())
    expect(result.current.quizzes).toEqual({})
  })
})
