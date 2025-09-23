import Image from 'next/image';
import styles from '../../styles/cards.module.css';

type Props = {
  title: string;
  src?: string; // optional placeholder; data URI used by default
};

const placeholder = (label: string) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>` +
      `<rect width='100%' height='100%' fill='#f1f5f9'/>` +
      `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#475569' font-size='20' font-family='sans-serif'>${label}</text>` +
    `</svg>`
  );

export default function CategoryCard({ title, src }: Props) {
  const img = src ?? placeholder(title);
  return (
    <article className={[styles.card, styles.categoryCard].join(' ')}>
      <div className={styles.ratio}>
        <Image
          src={img}
          alt={title}
          fill
          className={styles.imgFill}
          sizes="(min-width: 1024px) 25vw, 60vw"
          unoptimized
        />
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
    </article>
  );
}
