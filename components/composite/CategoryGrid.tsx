"use client";
import { useEffect, useRef, useState } from 'react';
import CategoryCard from '../cards/CategoryCard';
import styles from '../../styles/carousel.module.css';

const categories = [
  { title: 'Beef' },
  { title: 'Mutton' },
  { title: 'Chicken' },
  { title: 'Seafood' },
  { title: 'Heat & Eat' },
  { title: 'Deli' },
];

export default function CategoryGrid() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const original = categories;
  const clonesBefore = original;
  const clonesAfter = original;
  const slides = [...clonesBefore, ...original, ...clonesAfter];
  const startIndex = clonesBefore.length; // index where originals begin

  const spanWidthRef = useRef<number>(0);

  const updateTransforms = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const vpCenter = vp.scrollLeft + vp.clientWidth / 2;
    slideRefs.current.forEach((el) => {
      if (!el) return;
      const rectLeft = el.offsetLeft;
      const rectWidth = el.clientWidth;
      const center = rectLeft + rectWidth / 2;
      const delta = center - vpCenter;
      const n = delta / vp.clientWidth; // normalized distance by viewport width
      const angle = Math.max(-40, Math.min(40, -n * 50));
      const depth = -Math.min(80, Math.abs(n) * 120);
      const scale = 1 - Math.min(0.2, Math.abs(n) * 0.25);
      const inner = el.firstElementChild as HTMLElement | null; // .tilt
      if (inner) {
        inner.style.transform = `translateZ(${depth}px) rotateY(${angle}deg) scale(${scale})`;
      }
    });
  };

  const ensureLoop = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const firstOriginal = slideRefs.current[startIndex];
    const afterOriginal = slideRefs.current[startIndex + original.length];
    if (!firstOriginal || !afterOriginal) return;

    const start = firstOriginal.offsetLeft;
    const span = afterOriginal.offsetLeft - start;
    spanWidthRef.current = span;

    if (vp.scrollLeft < start - 1) {
      vp.scrollLeft += span; // jump forward by one span
    } else if (vp.scrollLeft >= start + span) {
      vp.scrollLeft -= span; // jump back by one span
    }
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    // Set initial position to the first original slide
    const firstOriginal = slideRefs.current[startIndex];
    if (firstOriginal) {
      vp.scrollLeft = firstOriginal.offsetLeft;
    }

    const onScroll = () => {
      ensureLoop();
      updateTransforms();
    };
    updateTransforms();
    vp.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      vp.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollByAmount = (dir: -1 | 1) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const amount = Math.max(240, Math.floor(vp.clientWidth * 0.8));
    vp.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className={styles.carousel} aria-label="Featured categories carousel">
      <button
        type="button"
        className={[styles.navBtn, styles.prev].join(' ')}
        aria-label="Previous categories"
        onClick={() => scrollByAmount(-1)}
      >
        ‹
      </button>

      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
      >
        <div className={styles.track}>
          {slides.map((c, i) => (
            <div
              className={styles.slide}
              key={`${c.title}-${i}`}
              ref={(el) => (slideRefs.current[i] = el)}
            >
              <div className={styles.tilt}>
                <CategoryCard title={c.title} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={[styles.navBtn, styles.next].join(' ')}
        aria-label="Next categories"
        onClick={() => scrollByAmount(1)}
      >
        ›
      </button>
    </div>
  );
}
