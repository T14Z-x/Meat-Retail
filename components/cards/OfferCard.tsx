import Button from '../ui/Button';
import styles from '../../styles/offers.module.css';

type Props = {
  title: string;
  blurb: string;
  cta?: string;
  href?: string;
  accent?: 'blue' | 'green' | 'orange' | 'slate';
};

export default function OfferCard({ title, blurb, cta = 'Shop Offer', href = '/categories', accent = 'blue' }: Props) {
  return (
    <article className={[styles.offerCard, styles[accent]].join(' ')}>
      <div className={styles.ratio}>
        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{blurb}</p>
          <Button href={href} variant="primary">{cta}</Button>
        </div>
      </div>
    </article>
  );
}

