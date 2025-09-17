import Image from 'next/image';
import styles from '../../styles/cards.module.css';
import Button from '../ui/Button';

type Props = {
  name: string;
  blurb?: string;
  price: string;
  src?: string;
};

const placeholder = (label: string) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>` +
      `<rect width='100%' height='100%' fill='#eef2ff'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#4338ca' font-size='18' font-family='sans-serif'>${label}</text>` +
    `</svg>`
  );

export default function ProductCard({ name, blurb, price, src }: Props) {
  const img = src ?? placeholder(name);
  return (
    <article className={styles.card}>
      <div className={styles.ratio}>
        <Image src={img} alt={name} fill className={styles.imgFill} />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{name}</h3>
        {blurb ? <p className={styles.cardBlurb}>{blurb}</p> : null}
        <div className={styles.cardFooter}>
          <span className={styles.priceBadge}>{price}</span>
          <Button variant="secondary">Add to Cart</Button>
        </div>
      </div>
    </article>
  );
}

