import { Container } from '@/components/ui/Container'
import { Skeleton } from '@/components/ui/Skeleton'

export function RouteLoading() {
  return (
    <Container className="route-loading">
      <p role="status" className="sr-only">
        Loading page
      </p>
      <Skeleton className="loading-breadcrumb" />
      <div>
        <Skeleton className="loading-copy" />
        <Skeleton className="loading-art" />
      </div>
    </Container>
  )
}
