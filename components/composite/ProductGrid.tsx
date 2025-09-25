import styles from '../../styles/grids.module.css';
import ProductCard from '../cards/ProductCard';
import { allProducts, Product } from '../../lib/products';

type Props = {
  products?: Product[];
  limit?: number;
};

export default function ProductGrid({ products, limit }: Props) {
  const source = products ?? allProducts;
  const items = typeof limit === 'number' ? source.slice(0, limit) : source;

  return (
    <div className={styles.gridFour}>
      {items.map((p) => (
        <ProductCard key={p.slug} slug={p.slug} name={p.name} blurb={p.blurb} price={p.price} src={p.src} />
      ))}
    </div>
  );
}
