import { Link } from 'react-router-dom'
import type { Product } from '@/types'
import { formatPrice } from '@/utils/format'

// Presentation only: catalog, size selection and cart actions are later phases.
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`}>
        <div className="product-card-image">
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            width="600"
            height="600"
          />
        </div>
        <div className="product-card-copy">
          {product.badge && <p className="product-badge">{product.badge}</p>}
          <h3>{product.name}</h3>
          <p className="muted">{product.category}</p>
          {product.colors !== undefined && (
            <p className="muted">
              {product.colors} {product.colors === 1 ? 'colour' : 'colours'}
            </p>
          )}
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  )
}
