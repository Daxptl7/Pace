import { useEffect, useRef, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

// A disclosure containing ordinary links/actions; deliberately not an ARIA menu.
export function Dropdown({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node))
        ref.current.open = false
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false
        ref.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [])
  return (
    <details ref={ref} className="dropdown">
      <summary>
        {label}
        <ChevronDown size={14} />
      </summary>
      <div
        className="dropdown-content"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a, button') && ref.current)
            ref.current.open = false
        }}
      >
        {children}
      </div>
    </details>
  )
}
