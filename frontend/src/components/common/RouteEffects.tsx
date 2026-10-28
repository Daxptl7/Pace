import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { titleCase } from '@/utils/format'

export function RouteEffects() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title =
      pathname === '/'
        ? 'PACE — Find your own pace'
        : `${titleCase(pathname.split('/').filter(Boolean).at(-1) || '')} — PACE`
    // Wait for the lazy route and exiting native dialogs before moving focus.
    const timer = window.setTimeout(() => {
      if (!document.querySelector('dialog[open]'))
        document.getElementById('main-content')?.focus({ preventScroll: true })
    }, 250)
    return () => window.clearTimeout(timer)
  }, [pathname, search])
  return null
}
