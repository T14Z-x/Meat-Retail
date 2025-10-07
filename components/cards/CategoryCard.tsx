import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
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
  const cardRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      prefersReducedMotion.current = mq.matches;
    };
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty('--spark-x', '50%');
    node.style.setProperty('--spark-y', '50%');
    node.style.setProperty('--spark-opacity', '0');
  }, []);

  const updateSpark = (event: ReactPointerEvent<HTMLElement>) => {
    const node = cardRef.current;
    if (!node || prefersReducedMotion.current) return;
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty('--spark-x', `${Math.max(0, Math.min(100, x))}%`);
    node.style.setProperty('--spark-y', `${Math.max(0, Math.min(100, y))}%`);
  };

  const handlePointerEnter = () => {
    const node = cardRef.current;
    if (!node) return;
    if (prefersReducedMotion.current) return;
    node.style.setProperty('--spark-opacity', '1');
  };

  const handlePointerLeave = () => {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty('--spark-opacity', '0');
    node.style.setProperty('--spark-x', '50%');
    node.style.setProperty('--spark-y', '50%');
  };

  return (
    <article
      className={[styles.card, styles.categoryCard].join(' ')}
      ref={cardRef as any}
      onPointerMove={updateSpark}
      onPointerEnter={(event) => {
        updateSpark(event);
        handlePointerEnter();
      }}
      onPointerLeave={handlePointerLeave}
    >
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
