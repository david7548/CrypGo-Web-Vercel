'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen flex-col text-center p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <Link href="/" className="text-indigo-600 hover:underline">
        ← Go back home
      </Link>
    </div>
  )
}
