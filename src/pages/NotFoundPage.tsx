import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'

export function NotFoundPage() {
  return (
    <Layout title="Not found" back={{ to: '/', label: 'catalog' }}>
      <div className="py-16 text-center">
        <p className="text-5xl" aria-hidden="true">🤷</p>
        <h2 className="mt-4 text-xl font-semibold">We couldn&apos;t find that page</h2>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white hover:bg-indigo-400">
          Go to the catalog
        </Link>
      </div>
    </Layout>
  )
}
