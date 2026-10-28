import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, UserRound, CircleHelp } from 'lucide-react'
import { navigation } from '@/data/navigation'
import { Drawer } from '@/components/ui/Drawer'
import { ButtonLink } from '@/components/ui/Button'
import { useNavigationStore } from '@/store/navigation'

export function MobileNavigation() {
  const open = useNavigationStore((state) => state.mobileOpen)
  const close = useNavigationStore((state) => state.closeAll)
  return (
    <Drawer open={open} onClose={close} title="Explore PACE">
      <nav aria-label="Mobile navigation" className="mobile-navigation">
        {navigation.map((category) => (
          <details key={category.label}>
            <summary>
              {category.label}
              <ChevronDown size={20} />
            </summary>
            <div className="mobile-category">
              <Link
                className="mobile-view-all"
                to={category.to}
                onClick={close}
              >
                Explore {category.label}
                <ArrowUpRight size={18} />
              </Link>
              {category.groups.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  {group.links.map((link) => (
                    <Link key={link.to} to={link.to} onClick={close}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </details>
        ))}
      </nav>
      <div className="mobile-member">
        <p>Find your own pace.</p>
        <span>A little more movement. A little more you.</span>
        <div onClick={close}>
          <ButtonLink to="/auth">Join Us</ButtonLink>
          <ButtonLink to="/auth?mode=signin" variant="secondary">
            Sign In
          </ButtonLink>
        </div>
      </div>
      <div className="mobile-utility">
        <Link to="/account" onClick={close}>
          <UserRound size={20} />
          My Account
        </Link>
        <Link to="/help" onClick={close}>
          <CircleHelp size={20} />
          Get Help
        </Link>
      </div>
    </Drawer>
  )
}
