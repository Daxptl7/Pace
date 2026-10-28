import { Link } from 'react-router-dom'

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="PACE home"
      className={`brand ${inverted ? 'brand--inverted' : ''}`}
    >
      <svg viewBox="0 0 36 32" width="36" height="32" aria-hidden="true">
        <path
          d="M1 29 17 2h17L18 29H1Zm16-8h-3l7-11h3l-7 11Z"
          fill="currentColor"
        />
      </svg>
      <span>
        PACE
        <span className="brand-dot" aria-hidden="true">
          ™
        </span>
      </span>
    </Link>
  )
}
