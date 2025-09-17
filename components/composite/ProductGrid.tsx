import styles from '../../styles/grids.module.css';
import ProductCard from '../cards/ProductCard';

const products = Array.from({ length: 8 }).map((_, i) => ({
  name: `Sample Product ${i + 1}`,
  blurb: 'Tasty and convenient. Placeholder description.',
  price: `$${(10 + i).toFixed(2)}`,
}));

export default function ProductGrid() {
  return (
    <div className={styles.gridFour}>
      {products.map((p) => (
        <ProductCard key={p.name} name={p.name} blurb={p.blurb} price={p.price} />
      ))}
    </div>
  );
}

