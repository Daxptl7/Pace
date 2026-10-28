import type { NavigationCategory, NavigationGroup } from '@/types'

const essentials: NavigationGroup = {
  title: 'The essentials',
  links: [
    { label: 'Shoes', to: '/shoes' },
    { label: 'Clothing', to: '/clothing' },
    { label: 'Accessories', to: '/accessories' },
  ],
}
const sports: NavigationGroup = {
  title: 'Shop by sport',
  links: ['Running', 'Basketball', 'Football', 'Training'].map((label) => ({
    label,
    to: `/sports/${label.toLowerCase()}`,
  })),
}
const featured: NavigationGroup = {
  title: 'In the spotlight',
  links: [
    { label: 'New Arrivals', to: '/new-arrivals' },
    { label: 'Bestsellers', to: '/category/bestsellers' },
    { label: 'Trending', to: '/category/trending' },
    { label: 'Collections', to: '/category/collections' },
  ],
}

export const navigation: NavigationCategory[] = [
  {
    label: 'New & Featured',
    to: '/new-arrivals',
    groups: [
      featured,
      {
        title: 'Find your movement',
        links: [
          { label: 'Shop by Sport', to: '/category/sport' },
          ...sports.links,
        ],
      },
      {
        title: 'Everyday icons',
        links: [
          { label: 'Lifestyle', to: '/category/lifestyle' },
          ...essentials.links,
        ],
      },
    ],
  },
  {
    label: 'Men',
    to: '/men',
    groups: [
      featured,
      essentials,
      sports,
      {
        title: 'Off the clock',
        links: [
          { label: 'Lifestyle', to: '/category/mens-lifestyle' },
          { label: 'Everyday essentials', to: '/category/mens-essentials' },
        ],
      },
    ],
  },
  {
    label: 'Women',
    to: '/women',
    groups: [
      featured,
      essentials,
      {
        ...sports,
        links: sports.links.filter((link) =>
          ['Running', 'Training'].includes(link.label),
        ),
      },
      {
        title: 'Made for every day',
        links: [
          { label: 'Lifestyle', to: '/category/womens-lifestyle' },
          { label: 'Matching sets', to: '/category/womens-sets' },
        ],
      },
    ],
  },
  {
    label: 'Kids',
    to: '/kids',
    groups: [
      {
        title: 'Made for play',
        links: [
          { label: 'Boys', to: '/category/boys' },
          { label: 'Girls', to: '/category/girls' },
          { label: 'All Kids', to: '/kids' },
        ],
      },
      essentials,
      featured,
    ],
  },
  {
    label: 'Jordan',
    to: '/jordan',
    groups: [
      {
        title: 'Explore Jordan',
        links: [
          { label: 'All Jordan', to: '/jordan' },
          { label: 'Shoes', to: '/category/jordan-shoes' },
          { label: 'Clothing', to: '/category/jordan-clothing' },
          { label: 'Basketball', to: '/sports/basketball' },
        ],
      },
      featured,
    ],
  },
]

export const footerGroups = [
  {
    title: 'Resources',
    links: [
      { label: 'Gift Cards', to: '/help/gift-cards' },
      { label: 'Find a Store', to: '/help/stores' },
      { label: 'Help', to: '/help' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Order Status', to: '/help/order-status' },
      { label: 'Delivery', to: '/help/delivery' },
      { label: 'Returns', to: '/help/returns' },
      { label: 'Contact Us', to: '/help/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/info/about' },
      { label: 'Careers', to: '/info/careers' },
      { label: 'Sustainability', to: '/info/sustainability' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/info/privacy' },
      { label: 'Terms of Use', to: '/info/terms' },
      { label: 'Accessibility', to: '/info/accessibility' },
    ],
  },
]
