import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { QuizQuestion } from '../data/types'
import { Quiz } from './Quiz'

const questions: QuizQuestion[] = [
  { id: 'q1', question: 'What is 1 + 1?', options: ['1', '2', '3'], answerIndex: 1, explanation: 'One plus one is two.' },
  { id: 'q2', question: 'What colour is the sky?', options: ['Green', 'Blue', 'Red'], answerIndex: 1, explanation: 'On a clear day it is blue.' },
]

function setup() {
  const onFinish = vi.fn()
  const onRestart = vi.fn()
  render(<Quiz questions={questions} passMarkPercent={60} buttonClass="" barClass="" onFinish={onFinish} onRestart={onRestart} />)
  return { onFinish, onRestart, user: userEvent.setup() }
}

describe('Quiz', () => {
  it('shows feedback after answering and locks the options', async () => {
    const { user } = setup()
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '2' }))
    expect(screen.getByText('Correct!')).toBeInTheDocument()
    expect(screen.getByText('One plus one is two.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1' })).toBeDisabled()
  })

  it('scores a full run, reports the result and lists missed questions', async () => {
    const { user, onFinish, onRestart } = setup()
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: 'Next question' }))
    await user.click(screen.getByRole('button', { name: 'Green' }))
    expect(screen.getByText('Not quite.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'See results' }))

    expect(onFinish).toHaveBeenCalledWith(1, 2)
    expect(screen.getByRole('heading', { name: '1 / 2 correct' })).toBeInTheDocument()
    expect(screen.getByText(/Not quite yet/)).toBeInTheDocument()
    expect(screen.getByText('What colour is the sky?')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(onRestart).toHaveBeenCalled()
  })

  it('shows a pass when every answer is right', async () => {
    const { user, onFinish } = setup()
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: 'Next question' }))
    await user.click(screen.getByRole('button', { name: 'Blue' }))
    await user.click(screen.getByRole('button', { name: 'See results' }))
    expect(onFinish).toHaveBeenCalledWith(2, 2)
    expect(screen.getByText(/Passed!/)).toBeInTheDocument()
  })
})
