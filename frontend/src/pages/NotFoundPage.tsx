import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <Container className="not-found">
      <p className="eyebrow">404 · Off the beaten track</p>
      <h1>
        Let’s find
        <br />
        your way back.
      </h1>
      <p>This page has moved, or hasn’t made it to the starting line.</p>
      <ButtonLink to="/">
        Back to PACE
        <ArrowRight size={18} />
      </ButtonLink>
    </Container>
  )
}
