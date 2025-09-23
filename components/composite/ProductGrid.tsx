import styles from '../../styles/grids.module.css';
import ProductCard from '../cards/ProductCard';
import { allProducts } from '../../lib/products';

export default function ProductGrid() {
  return (
    <div className={styles.gridFour}>
      {allProducts.map((p) => (
        <ProductCard key={p.slug} slug={p.slug} name={p.name} blurb={p.blurb} price={p.price} src={p.src} />
      ))}
    </div>
  );
}
