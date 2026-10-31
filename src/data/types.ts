/**
 * Content model for a certification track.
 * To add a new track: create a file in ./certifications, export a `Certification`,
 * and add it to the list in ./catalog.ts. The data tests validate it automatically.
 */

export interface Source {
  readonly title: string
  readonly publisher: string
  readonly url: string
}

export interface QuizQuestion {
  readonly id: string
  readonly question: string
  readonly options: readonly string[]
  /** Index into `options` of the correct answer. */
  readonly answerIndex: number
  readonly explanation: string
}

export interface ContentSection {
  readonly heading: string
  readonly paragraphs?: readonly string[]
  readonly bullets?: readonly string[]
}

export interface KeyTerm {
  readonly term: string
  readonly definition: string
}

export interface StudyModule {
  readonly id: string
  readonly title: string
  /** Short bullet summary shown at the top of the module. */
  readonly tldr: readonly string[]
  readonly sections: readonly ContentSection[]
  readonly keyTerms: readonly KeyTerm[]
  readonly quiz: readonly QuizQuestion[]
}

export interface ExamFacts {
  readonly questions: number
  readonly durationMinutes: number
  readonly passMarkPercent: number
  readonly format: string
}

export type Accent = 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet'

export interface Certification {
  readonly id: string
  readonly title: string
  readonly provider: string
  readonly level: string
  readonly emoji: string
  readonly accent: Accent
  readonly description: string
  readonly tldr: readonly string[]
  readonly exam: ExamFacts
  readonly modules: readonly StudyModule[]
  readonly sources: readonly Source[]
  /** ISO date (YYYY-MM-DD) of the last content review against the sources. */
  readonly lastReviewed: string
}
