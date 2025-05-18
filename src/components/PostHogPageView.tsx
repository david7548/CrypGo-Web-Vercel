'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

export default function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams.toString()}`
    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams])

  useEffect(() => {
    const handleBeforeUnload = () => {
      posthog.capture('$pageleave')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return null
}
