import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IconButton } from '@/components/ui/IconButton'

interface Announcement {
  text: string
  linkLabel: string
  to: string
}
const defaultAnnouncements: Announcement[] = [
  {
    text: 'A new space for your next move.',
    linkLabel: 'Get to know PACE',
    to: '/info/about',
  },
]

// Optional manual carousel: no auto-advancing content or motion to interrupt reading.
export function PromotionalBanner({
  announcements = defaultAnnouncements,
}: {
  announcements?: Announcement[]
}) {
  const [index, setIndex] = useState(0)
  const announcement = announcements[index % announcements.length]
  if (!announcement) return null
  return (
    <aside className="announcement" aria-label="Store announcement">
      {announcements.length > 1 && (
        <IconButton
          label="Previous announcement"
          onClick={() =>
            setIndex((index + announcements.length - 1) % announcements.length)
          }
        >
          <ChevronLeft size={18} />
        </IconButton>
      )}
      <p aria-live="polite">
        <span>{announcement.text}</span>
        <Link to={announcement.to}>{announcement.linkLabel}</Link>
      </p>
      {announcements.length > 1 && (
        <IconButton
          label="Next announcement"
          onClick={() => setIndex((index + 1) % announcements.length)}
        >
          <ChevronRight size={18} />
        </IconButton>
      )}
    </aside>
  )
}
