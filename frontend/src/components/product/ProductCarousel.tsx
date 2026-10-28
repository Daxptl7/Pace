import { useId, useRef, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import type { Product } from '@/types'
import { IconButton } from '@/components/ui/IconButton'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductCard } from './ProductCard'

export function ProductCarousel({
  title,
  products,
}: {
  title: string
  products: Product[]
}) {
  const ref = useRef<HTMLUListElement>(null)
  const id = useId()
  const reducedMotion = useReducedMotion()
  const [edges, setEdges] = useState({ start: true, end: false })
  useEffect(() => {
    const list = ref.current
    if (!list) return
    const update = () =>
      setEdges({
        start: list.scrollLeft <= 1,
        end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 1,
      })
    const observer = new ResizeObserver(update)
    observer.observe(list)
    list.addEventListener('scroll', update, { passive: true })
    update()
    return () => {
      observer.disconnect()
      list.removeEventListener('scroll', update)
    }
  }, [products.length])
  function scroll(direction: number) {
    if (ref.current)
      ref.current.scrollBy({
        left: direction * ref.current.clientWidth * 0.8,
        behavior: reducedMotion ? 'instant' : 'smooth',
      })
  }
  return (
    <section className="product-carousel" aria-label={title}>
      <SectionHeading
        title={title}
        action={
          <div className="carousel-controls">
            <IconButton
              label={`Previous ${title}`}
              aria-controls={id}
              disabled={edges.start}
              onClick={() => scroll(-1)}
            >
              <ArrowLeft />
            </IconButton>
            <IconButton
              label={`Next ${title}`}
              aria-controls={id}
              disabled={edges.end}
              onClick={() => scroll(1)}
            >
              <ArrowRight />
            </IconButton>
          </div>
        }
      />
      <ul
        id={id}
        ref={ref}
        className="product-track"
        tabIndex={0}
        aria-label={`${title} products`}
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  )
}
