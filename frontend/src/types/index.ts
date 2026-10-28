export interface Product {
  id: string
  slug: string
  name: string
  category: string
  price: number
  image: string
  imageAlt: string
  colors?: number
  badge?: string
}

export interface CartItem {
  productId: string
  size: string
  quantity: number
}

export interface NavigationLink {
  label: string
  to: string
}

export interface NavigationGroup {
  title: string
  links: NavigationLink[]
}

export interface NavigationCategory extends NavigationLink {
  groups: NavigationGroup[]
}
