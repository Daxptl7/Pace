import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'

export function UtilityHeader() {
  return (
    <div className="utility-header">
      <Container>
        <span className="utility-note">
          Independent by design. Driven by movement.
        </span>
        <nav aria-label="Utility navigation">
          <Link to="/help">Help</Link>
          <span aria-hidden="true">|</span>
          <Link to="/auth">Join Us</Link>
          <span aria-hidden="true">|</span>
          <Link to="/auth?mode=signin">Sign In</Link>
        </nav>
      </Container>
    </div>
  )
}
