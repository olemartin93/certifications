import type { Certification, StudyModule } from './types'
import { prince2Foundation } from './certifications/prince2-foundation'
import { prince2Agile } from './certifications/prince2-agile'

/** All certification tracks shown in the catalog. Add new tracks here. */
export const catalog: readonly Certification[] = [prince2Foundation, prince2Agile]

export function getCertification(id: string | undefined): Certification | undefined {
  return catalog.find((c) => c.id === id)
}

export function getModule(cert: Certification, moduleId: string | undefined): StudyModule | undefined {
  return cert.modules.find((m) => m.id === moduleId)
}
