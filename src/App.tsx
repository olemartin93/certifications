import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CatalogPage } from './pages/CatalogPage'
import { CertificationPage } from './pages/CertificationPage'
import { ModulePage } from './pages/ModulePage'
import { QuizPage } from './pages/QuizPage'
import { NotFoundPage } from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/:certId" element={<CertificationPage />} />
        <Route path="/:certId/modules/:moduleId" element={<ModulePage />} />
        <Route path="/:certId/quiz/:quizId" element={<QuizPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
