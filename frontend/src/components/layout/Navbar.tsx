import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import { Brand } from '@/components/common/Brand'
import { Container } from '@/components/ui/Container'
import { IconButton } from '@/components/ui/IconButton'
import { SearchInput } from '@/components/ui/SearchInput'
import { Modal } from '@/components/ui/Modal'
import { MegaMenu } from '@/components/navigation/MegaMenu'
import { MobileNavigation } from '@/components/navigation/MobileNavigation'
import { navigation } from '@/data/navigation'
import { useNavigationStore } from '@/store/navigation'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function Navbar() {
  const { activeMenu, setActiveMenu, setMobileOpen, closeAll } =
    useNavigationStore()
  const [searchOpen, setSearchOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = useReducedMotion()
  const location = useLocation()
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )
  const wishlistCount = useWishlistStore((state) => state.productIds.length)
  const activeCategory = navigation.find(
    (category) => category.label === activeMenu,
  )
  useEffect(() => {
    closeAll()
  }, [location.key, closeAll])
  useEffect(() => {
    closeAll()
  }, [desktop, closeAll])
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape' && activeMenu) {
        closeAll()
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [activeMenu, closeAll])
  return (
    <>
      <header
        ref={headerRef}
        className="main-header"
        onMouseLeave={() => setActiveMenu(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null))
            setActiveMenu(null)
        }}
      >
        <Container className="navbar">
          <Brand />
          <nav className="desktop-navigation" aria-label="Main navigation">
            {navigation.map((category, index) => (
              <div
                className={`nav-category ${activeMenu === category.label ? 'is-open' : ''}`}
                key={category.label}
                onMouseEnter={() => setActiveMenu(category.label)}
              >
                <NavLink to={category.to} onClick={closeAll}>
                  {category.label}
                </NavLink>
                <button
                  type="button"
                  className="sr-only focus-visible-toggle"
                  aria-label={`Explore ${category.label} menu`}
                  aria-expanded={activeMenu === category.label}
                  aria-controls={`mega-menu-${index}`}
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget
                    setActiveMenu(
                      activeMenu === category.label ? null : category.label,
                    )
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      triggerRef.current = event.currentTarget
                      setActiveMenu(category.label)
                      requestAnimationFrame(() =>
                        document
                          .getElementById(`mega-menu-${index}`)
                          ?.querySelector('a')
                          ?.focus(),
                      )
                    }
                  }}
                >
                  Open menu
                </button>
              </div>
            ))}
          </nav>
          <div className="navbar-actions">
            <div className="desktop-search" onFocus={() => setActiveMenu(null)}>
              <SearchInput />
            </div>
            <IconButton
              label="Open search"
              className="compact-search"
              onClick={() => {
                closeAll()
                setSearchOpen(true)
              }}
            >
              <Search size={23} />
            </IconButton>
            <Link
              className="icon-button wishlist-link"
              to="/wishlist"
              aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ''}`}
              onMouseEnter={() => setActiveMenu(null)}
            >
              <Heart size={23} />
              {wishlistCount > 0 && (
                <span className="count-badge">{wishlistCount}</span>
              )}
            </Link>
            <Link
              className="icon-button"
              to="/cart"
              aria-label={`Shopping bag${cartCount ? `, ${cartCount} items` : ''}`}
              onMouseEnter={() => setActiveMenu(null)}
            >
              <ShoppingBag size={23} />
              {cartCount > 0 && (
                <span className="count-badge">{cartCount}</span>
              )}
            </Link>
            <IconButton
              label="Open navigation menu"
              className="hamburger"
              aria-haspopup="dialog"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={25} />
            </IconButton>
          </div>
        </Container>
        <AnimatePresence>
          {desktop && activeCategory && (
            <MegaMenu
              key={activeCategory.label}
              category={activeCategory}
              id={`mega-menu-${navigation.indexOf(activeCategory)}`}
              onNavigate={closeAll}
            />
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {desktop && activeCategory && (
          <motion.div
            className="menu-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.16 }}
            onClick={closeAll}
          />
        )}
      </AnimatePresence>
      <MobileNavigation />
      <Modal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Find your next move"
      >
        <SearchInput autoFocus onSearch={() => setSearchOpen(false)} />
        <p className="search-hint">
          Search by product, sport or a little inspiration.
        </p>
      </Modal>
    </>
  )
}
