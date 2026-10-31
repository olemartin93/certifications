import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useOnlineStatus } from '../lib/useOnlineStatus'

interface LayoutProps {
  readonly title: string
  readonly back?: { readonly to: string; readonly label: string }
  readonly children: ReactNode
}

export function Layout({ title, back, children }: LayoutProps) {
  const online = useOnlineStatus()
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/85 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          {back ? (
            <Link
              to={back.to}
              aria-label={`Back to ${back.label}`}
              className="-ml-2 rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <span aria-hidden="true">←</span>
            </Link>
          ) : null}
          <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>
          {!online ? (
            <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-300" role="status">
              Offline
            </span>
          ) : null}
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 pt-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">{children}</main>
    </div>
  )
}
