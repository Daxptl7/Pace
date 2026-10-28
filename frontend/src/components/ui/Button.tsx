import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'text'
const classes = (variant: Variant, extra = '') =>
  `button button--${variant} ${extra}`

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={classes(variant, className)} {...props} />
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className,
}: {
  to: string
  children: ReactNode
  variant?: Variant
  className?: string
}) {
  return (
    <Link to={to} className={classes(variant, className)}>
      {children}
    </Link>
  )
}
