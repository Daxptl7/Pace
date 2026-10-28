import { ArrowUpRight, Globe2, Camera, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Brand } from '@/components/common/Brand'
import { Container } from '@/components/ui/Container'
import { Dropdown } from '@/components/ui/Dropdown'
import { footerGroups } from '@/data/navigation'

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-top">
          <div className="footer-brand">
            <Brand inverted />
            <p>Find your own pace.</p>
            <span>For every body. Every day. Every move.</span>
          </div>
          <Link className="footer-explore" to="/new-arrivals">
            Keep moving
            <ArrowUpRight size={22} />
          </Link>
        </div>
        <div className="footer-main">
          {footerGroups.map((group) => (
            <div className="footer-group" key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer-connect">
            <h2>Follow the movement</h2>
            <div className="social-links">
              <Link
                to="/info/instagram"
                aria-label="PACE Instagram information"
              >
                <Camera size={20} />
              </Link>
              <Link to="/info/youtube" aria-label="PACE YouTube information">
                <Play size={20} />
              </Link>
            </div>
            <Dropdown label="India · English">
              <Link to="/help/region">
                <Globe2 size={16} />
                Region information
              </Link>
            </Dropdown>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PACE. An independent concept.</p>
          <p>Unofficial educational project. Not affiliated with Nike.</p>
          <Link to="/info/accessibility">
            Everyone is welcome <ArrowUpRight size={13} />
          </Link>
        </div>
      </Container>
    </footer>
  )
}
