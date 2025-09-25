import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/cards.module.css';
import Button from '../ui/Button';
import AddToCartButton from '../cart/AddToCartButton';

type Props = {
  slug?: string;
  name: string;
  blurb?: string;
  price: string;
  src?: string;
};

const placeholder = (label: string) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>` +
      `<rect width='100%' height='100%' fill='#E9FBF2'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#03A550' font-size='18' font-family='sans-serif'>${label}</text>` +
    `</svg>`
  );

export default function ProductCard({ slug, name, blurb, price, src }: Props) {
  const img = src ?? placeholder(name);
  const productId = slug ?? name;
  return (
    <article
      className={[styles.card, styles.productCard].join(' ')}
      data-product-root
      data-product-id={productId}
    >
      <Link href={slug ? `/products/${slug}` : '#'} className={styles.ratio} aria-label={`${name} details`}>
        <Image
          src={img}
          alt={name}
          fill
          className={styles.imgFill}
          sizes="(min-width: 1024px) 25vw, 60vw"
          unoptimized
          data-fly-image={productId}
        />
      </Link>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>
          {slug ? <Link href={`/products/${slug}`}>{name}</Link> : name}
        </h3>
        {blurb ? <p className={styles.cardBlurb}>{blurb}</p> : null}
        <div className={styles.cardFooter}>
          <span className={styles.priceBadge}>{price}</span>
          <div className={styles.cardActions}>
            <AddToCartButton
              product={{ slug: slug ?? name, name, price, src }}
              variant="secondary"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
