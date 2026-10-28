import { ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Container } from '@/components/ui/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import { titleCase } from '@/utils/format'
import { Link } from 'react-router-dom'

const titles: Record<string, string> = {
  men: 'Men',
  women: 'Women',
  kids: 'Kids',
  jordan: 'Jordan',
  'new-arrivals': 'New & Featured',
  shoes: 'Shoes',
  clothing: 'Clothing',
  accessories: 'Accessories',
  wishlist: 'Your wishlist',
  cart: 'Your bag',
  auth: 'Your pace. Your space.',
  account: 'Your account',
  checkout: 'Checkout',
  help: 'How can we help?',
}

export default function PlaceholderPage() {
  const { pathname } = useLocation()
  const params = useParams()
  const [searchParams] = useSearchParams()
  const segment = pathname.split('/').filter(Boolean)[0] || ''
  const isRoot = pathname === '/'
  const query = searchParams.get('q')
  const dynamic = params.slug || params.sport || params.topic
  const title = isRoot
    ? 'Good things\nare in motion.'
    : segment === 'search'
      ? query
        ? `Search for “${query}”`
        : 'Find your next move.'
      : dynamic
        ? titleCase(dynamic)
        : titles[segment] || 'Coming soon'
  const isUtility = [
    'wishlist',
    'cart',
    'auth',
    'account',
    'checkout',
    'help',
    'info',
    'search',
  ].includes(segment)
  let description =
    'A new space for sport, style and everything in between. Our collections are coming soon. In the meantime, find your way around.'
  if (!isRoot)
    description = isUtility
      ? 'This space is taking shape. We’re getting the details right — check back for the full experience.'
      : `A little more ${segment === 'sports' ? 'movement' : 'possibility'}. A lot to look forward to. The ${title.toLowerCase()} collection is on its way.`
  if (segment === 'search' && query)
    description =
      'Your search is ready. Results will be available when our product collections launch.'
  if (segment === 'wishlist')
    description =
      'A space for the things you love. Your wishlist will be ready when our collections arrive.'
  if (segment === 'cart')
    description =
      'Your bag is empty. Something worth making room for is on its way.'
  if (segment === 'jordan')
    description =
      'This collection is a placeholder in an independent educational project. PACE is not affiliated with Nike or Jordan Brand.'
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Container className="placeholder-page">
        <Breadcrumb
          items={
            isRoot
              ? [{ label: 'Home' }]
              : [
                  { label: 'Home', to: '/' },
                  ...(dynamic
                    ? [
                        {
                          label: titleCase(segment),
                          to:
                            segment === 'sports' ||
                            segment === 'category' ||
                            segment === 'product'
                              ? '/new-arrivals'
                              : `/${segment}`,
                        },
                      ]
                    : []),
                  { label: segment === 'search' ? 'Search' : title },
                ]
          }
        />
        <section className="placeholder-content" aria-labelledby="page-title">
          <div className="placeholder-copy">
            <div className="status-label">
              <span />
              {isRoot
                ? 'A new chapter of movement'
                : 'A little more to look forward to'}
            </div>
            <h1 id="page-title">{title}</h1>
            <p className="placeholder-description">{description}</p>
            <div className="placeholder-actions">
              <ButtonLink to={isRoot ? '/new-arrivals' : '/'}>
                {isRoot ? 'Explore what’s next' : 'Back to the start'}
                <ArrowRight size={18} />
              </ButtonLink>
              <Link className="inline-link" to="/help">
                Need a hand?
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <p className="coming-soon">
              <span />
              Store preview · Collections coming soon
            </p>
          </div>
          <div
            className="movement-art"
            role="img"
            aria-label="Original abstract running track illustration with the words find your own pace"
          >
            <div className="art-topline">
              <span>PACE MOVEMENT CLUB</span>
              <MoveUpRight size={20} />
            </div>
            <div className="track-lines">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="art-caption">
              FIND YOUR
              <br />
              OWN PACE<span>01 — ALWAYS IN MOTION</span>
            </div>
            <span className="art-coordinate">MOVEMENT IS FOR EVERYONE</span>
          </div>
        </section>
        <div className="placeholder-bottom">
          <p>One pace doesn’t fit all.</p>
          <div>
            <Link to="/men">
              Men
              <ArrowUpRight size={15} />
            </Link>
            <Link to="/women">
              Women
              <ArrowUpRight size={15} />
            </Link>
            <Link to="/kids">
              Kids
              <ArrowUpRight size={15} />
            </Link>
            <Link to="/sports/running">
              Running
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </Container>
    </motion.div>
  )
}
