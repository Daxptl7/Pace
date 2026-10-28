import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './Providers'
import { AppRouter } from './router'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import '@/styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Providers>
        <AppRouter />
      </Providers>
    </ErrorBoundary>
  </StrictMode>,
)
