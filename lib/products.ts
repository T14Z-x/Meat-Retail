export type Product = {
  slug: string;
  name: string;
  blurb?: string;
  description: string;
  additional: Array<{ label: string; value: string }>;
  price: string;
  src: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const make = (p: Omit<Product, 'slug' | 'description' | 'additional'> & { description?: string; additional?: Product['additional'] }): Product => ({
  slug: slugify(p.name),
  name: p.name,
  blurb: p.blurb,
  price: p.price,
  src: p.src,
  description:
    p.description ?? `${p.name} — premium quality, carefully selected and processed to ensure freshness and great taste. Perfect for everyday meals or special occasions.`,
  additional:
    p.additional ?? [
      { label: 'Cut', value: p.name.includes('Steak') ? 'Steak' : p.name.includes('Fillet') ? 'Fillet' : 'Assorted' },
      { label: 'Pack size', value: 'Approx. 500g' },
      { label: 'Storage', value: 'Keep refrigerated (0–4°C). Freeze if storing > 2 days.' },
    ],
});

export const allProducts: Product[] = [
  make({ name: 'Ribeye Steak', blurb: 'Premium marbled cut', price: '$24.99', src: '/products/ribeye-steak.jpg' }),
  make({ name: 'Tenderloin Steak', blurb: 'Lean and tender', price: '$29.99', src: '/products/tenderloin-steak.jpg' }),
  make({ name: 'Chicken Breast', blurb: 'Boneless, skinless', price: '$9.99', src: '/products/chicken-breast.jpg' }),
  make({ name: 'Prawn', blurb: 'Fresh and juicy', price: '$14.99', src: '/products/prawn.jpg' }),
  make({ name: 'Mutton Curry Cut', blurb: 'Curry-ready pieces', price: '$17.99', src: '/products/mutton-curry-cut.jpg' }),
  make({ name: 'Smoked Sausage', blurb: 'Rich smoky flavour', price: '$11.99', src: '/products/smoked-sausage.jpg' }),
  make({ name: 'Salmon Fillet', blurb: 'Skin-on fillet', price: '$19.99', src: '/products/salmon-fillet.jpg' }),
  make({ name: 'Beef Meatballs', blurb: 'Ready to cook', price: '$12.49', src: '/products/beef-meatballs.jpg' }),
];

export const findProduct = (slug: string) => allProducts.find((p) => p.slug === slug);
export const getSuggestions = (slug: string, count = 3) =>
  allProducts.filter((p) => p.slug !== slug).slice(0, count);

