import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { NavigationCategory } from '@/types'
import { Container } from '@/components/ui/Container'

export function MegaMenu({
  category,
  id,
  onNavigate,
}: {
  category: NavigationCategory
  id: string
  onNavigate: () => void
}) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.div
      id={id}
      className="mega-menu"
      initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.16 }}
    >
      <Container className="mega-menu-grid">
        <div className="mega-menu-intro">
          <span className="eyebrow">Find your own pace</span>
          <Link to={category.to} onClick={onNavigate}>
            Explore {category.label}
            <ArrowUpRight size={24} />
          </Link>
          <p>
            For the everyday.
            <br />
            And the extraordinary.
          </p>
        </div>
        {category.groups.map((group) => (
          <div key={group.title} className="mega-menu-group">
            <h3>{group.title}</h3>
            <ul>
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={onNavigate}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </motion.div>
  )
}
