import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { UtilityHeader } from './UtilityHeader'
import { Navbar } from './Navbar'
import { PromotionalBanner } from './PromotionalBanner'
import { Footer } from './Footer'
import { RouteLoading } from '@/components/common/RouteLoading'
import { RouteEffects } from '@/components/common/RouteEffects'

export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <UtilityHeader />
      <Navbar />
      <PromotionalBanner />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<RouteLoading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <RouteEffects />
    </>
  )
}
