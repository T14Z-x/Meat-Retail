export type Product = {
  slug: string;
  name: string;
  blurb?: string;
  description: string;
  additional: Array<{ label: string; value: string }>;
  price: string;
  priceValue: number;
  category: string;
  tags: string[];
  badges?: string[];
  src: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const make = (
  p: Omit<Product, 'slug' | 'description' | 'additional' | 'priceValue' | 'tags'> & {
    description?: string;
    additional?: Product['additional'];
    tags?: string[];
  }
): Product => ({
  slug: slugify(p.name),
  name: p.name,
  blurb: p.blurb,
  price: p.price,
  priceValue: Number.parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0,
  category: p.category,
  tags: p.tags ?? [],
  badges: p.badges,
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
  make({
    name: 'Ribeye Steak',
    category: 'Beef',
    blurb: 'Premium marbled cut',
    price: '$24.99',
    src: '/products/ribeye-steak.jpg',
    tags: ['steak', 'premium', 'fresh'],
    badges: ['Chef favourite'],
    additional: [
      { label: 'Cut', value: 'Ribeye, boneless' },
      { label: 'Pack size', value: 'Approx. 450g' },
      { label: 'Storage', value: 'Keep refrigerated (0–4°C). Freeze if storing > 2 days.' },
    ],
  }),
  make({
    name: 'Tenderloin Steak',
    category: 'Beef',
    blurb: 'Lean and tender',
    price: '$29.99',
    src: '/products/tenderloin-steak.jpg',
    tags: ['steak', 'lean', 'premium'],
    badges: ['Limited'],
    additional: [
      { label: 'Cut', value: 'Tenderloin, centre-cut' },
      { label: 'Pack size', value: 'Approx. 400g' },
      { label: 'Storage', value: 'Keep refrigerated (0–4°C). Best cooked within 48 hours.' },
    ],
  }),
  make({
    name: 'Chicken Breast',
    category: 'Poultry',
    blurb: 'Boneless, skinless',
    price: '$9.99',
    src: '/products/chicken-breast.jpg',
    tags: ['lean', 'high-protein', 'staple'],
    additional: [
      { label: 'Cut', value: 'Skinless breast fillet' },
      { label: 'Pack size', value: 'Approx. 600g' },
      { label: 'Storage', value: 'Refrigerate immediately (0–4°C).' },
    ],
  }),
  make({
    name: 'Prawn',
    category: 'Seafood',
    blurb: 'Fresh and juicy',
    price: '$14.99',
    src: '/products/prawn.jpg',
    tags: ['seafood', 'shellfish', 'fresh'],
    additional: [
      { label: 'Variant', value: 'Black tiger, deveined' },
      { label: 'Pack size', value: 'Approx. 500g' },
      { label: 'Storage', value: 'Keep over crushed ice; freeze if storing beyond 24 hours.' },
    ],
  }),
  make({
    name: 'Mutton Curry Cut',
    category: 'Mutton',
    blurb: 'Curry-ready pieces',
    price: '$17.99',
    src: '/products/mutton-curry-cut.jpg',
    tags: ['slow-cook', 'bone-in', 'halal'],
    additional: [
      { label: 'Cut', value: 'Bone-in assorted pieces' },
      { label: 'Pack size', value: 'Approx. 750g' },
      { label: 'Storage', value: 'Chill immediately; suitable for freezing.' },
    ],
  }),
  make({
    name: 'Smoked Sausage',
    category: 'Gourmet & Deli',
    blurb: 'Rich smoky flavour',
    price: '$11.99',
    src: '/products/smoked-sausage.jpg',
    tags: ['ready-to-cook', 'deli', 'smoked'],
    additional: [
      { label: 'Preparation', value: 'Fully cooked, heat & serve' },
      { label: 'Pack size', value: '4 links (approx. 360g)' },
      { label: 'Storage', value: 'Keep refrigerated; consume within 5 days of opening.' },
    ],
  }),
  make({
    name: 'Salmon Fillet',
    category: 'Seafood',
    blurb: 'Skin-on fillet',
    price: '$19.99',
    src: '/products/salmon-fillet.jpg',
    tags: ['omega-3', 'premium', 'seafood'],
    additional: [
      { label: 'Cut', value: 'Atlantic salmon, skin-on' },
      { label: 'Pack size', value: 'Approx. 400g' },
      { label: 'Storage', value: 'Keep chilled (0–2°C); ideal for grilling and baking.' },
    ],
  }),
  make({
    name: 'Beef Meatballs',
    category: 'Ready to Cook',
    blurb: 'Ready to cook',
    price: '$12.49',
    src: '/products/beef-meatballs.jpg',
    tags: ['ready-to-cook', 'family-favourites', 'beef'],
    additional: [
      { label: 'Preparation', value: 'Seasoned, partially cooked' },
      { label: 'Pack size', value: '12 pieces (approx. 500g)' },
      { label: 'Storage', value: 'Keep frozen; thaw in refrigerator before cooking.' },
    ],
  }),
];

export const findProduct = (slug: string) => allProducts.find((p) => p.slug === slug);
export const getSuggestions = (slug: string, count = 3) =>
  allProducts.filter((p) => p.slug !== slug).slice(0, count);
