import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { __resetProgressCache } from '../lib/progress'

afterEach(() => {
  cleanup()
  localStorage.clear()
  __resetProgressCache()
})
