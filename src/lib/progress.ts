import { useSyncExternalStore } from 'react'

export interface QuizResult {
  readonly best: number
  readonly total: number
  readonly attempts: number
}

export interface Progress {
  readonly quizzes: Readonly<Record<string, QuizResult>>
  readonly readModules: Readonly<Record<string, true>>
}

const STORAGE_KEY = 'certified:progress:v1'
const EMPTY: Progress = { quizzes: {}, readModules: {} }

const listeners = new Set<() => void>()
let cache: Progress | null = null

function isProgress(value: unknown): value is Progress {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return typeof v.quizzes === 'object' && v.quizzes !== null && typeof v.readModules === 'object' && v.readModules !== null
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed: unknown = JSON.parse(raw)
    return isProgress(parsed) ? parsed : EMPTY
  } catch {
    return EMPTY
  }
}

function getSnapshot(): Progress {
  cache ??= load()
  return cache
}

function save(next: Progress): void {
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage can be unavailable (private mode, quota). Progress still works for this session.
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const progressKey = (certId: string, id: string): string => `${certId}/${id}`

export function recordQuizResult(certId: string, quizId: string, correct: number, total: number): void {
  const current = getSnapshot()
  const key = progressKey(certId, quizId)
  const prev = current.quizzes[key]
  const result: QuizResult = {
    best: Math.max(prev?.best ?? 0, correct),
    total,
    attempts: (prev?.attempts ?? 0) + 1,
  }
  save({ ...current, quizzes: { ...current.quizzes, [key]: result } })
}

export function setModuleRead(certId: string, moduleId: string, read: boolean): void {
  const current = getSnapshot()
  const key = progressKey(certId, moduleId)
  const readModules = read
    ? { ...current.readModules, [key]: true as const }
    : Object.fromEntries(Object.entries(current.readModules).filter(([k]) => k !== key))
  save({ ...current, readModules })
}

export function resetProgress(): void {
  save(EMPTY)
}

/** Test helper: forget the in-memory cache so the next read hits storage. */
export function __resetProgressCache(): void {
  cache = null
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)
}
