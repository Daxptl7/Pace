import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'

const PlaceholderPage = lazy(() => import('@/pages/PlaceholderPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const placeholderRoutes = [
  'men',
  'women',
  'kids',
  'jordan',
  'new-arrivals',
  'shoes',
  'clothing',
  'accessories',
  'sports/:sport',
  'category/:slug',
  'product/:slug',
  'search',
  'wishlist',
  'cart',
  'auth',
  'account',
  'checkout',
  'help',
  'help/:topic',
  'info/:topic',
]

export function AppRouter() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<PlaceholderPage />} />
        {placeholderRoutes.map((path) => (
          <Route key={path} path={path} element={<PlaceholderPage />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
