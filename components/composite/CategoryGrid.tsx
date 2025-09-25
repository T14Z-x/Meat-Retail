"use client";
import { useEffect, useRef, useState } from 'react';
import CategoryCard from '../cards/CategoryCard';
import styles from '../../styles/carousel.module.css';
import { categories, Category } from '../../lib/categories';

export default function CategoryGrid() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const original: Category[] = categories;
  const clonesBefore: Category[] = original;
  const clonesAfter: Category[] = original;
  const slides: Category[] = [...clonesBefore, ...original, ...clonesAfter];
  const startIndex = clonesBefore.length; // index where originals begin

  const spanWidthRef = useRef<number>(0);
  const indexRef = useRef<number>(startIndex);

  const updateTransforms = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const vpCenter = vp.scrollLeft + vp.clientWidth / 2;
    let closestIdx = -1;
    let closestDist = Infinity;
    slideRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rectLeft = el.offsetLeft;
      const rectWidth = el.clientWidth;
      const center = rectLeft + rectWidth / 2;
      const delta = center - vpCenter;
      const n = delta / vp.clientWidth; // normalized distance by viewport width
      const maxAngle = 30; // fine-tuned rotation intensity
      const angle = Math.max(-maxAngle, Math.min(maxAngle, -n * 60));
      const depth = -Math.min(60, Math.abs(n) * 100);
      const scale = 1 - Math.min(0.18, Math.abs(n) * 0.22);
      const inner = el.firstElementChild as HTMLElement | null; // .tilt
      if (inner) {
        inner.style.transform = `translateZ(${depth}px) rotateY(${angle}deg) scale(${scale})`;
        const dist = Math.abs(n);
        if (dist < closestDist) { closestDist = dist; closestIdx = idx; }
      }
    });
    // mark active
    slideRefs.current.forEach((el, idx) => {
      const inner = el?.firstElementChild as HTMLElement | null;
      if (inner) inner.dataset.active = idx === closestIdx ? 'true' : 'false';
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
      indexRef.current += original.length;
    } else if (vp.scrollLeft >= start + span) {
      vp.scrollLeft -= span; // jump back by one span
      indexRef.current -= original.length;
    }
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    // Set initial position to the first original slide
    const firstOriginal = slideRefs.current[startIndex];
    if (firstOriginal) {
      vp.scrollLeft = firstOriginal.offsetLeft;
      indexRef.current = startIndex;
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

  // Auto-play: continuously scroll to the right; pause on hover/touch/focus
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const io = new IntersectionObserver((entries) => {
      setInView(entries[0]?.isIntersecting ?? true);
    }, { threshold: 0.1 });
    io.observe(vp);
    let timer: any;
    const interval = 2500; // ms per slide
    const goNext = () => {
      if (paused || reduce || !inView) return schedule();

      const getNextSlide = () => {
        const tentative = indexRef.current + 1;
        const el = slideRefs.current[tentative];
        if (el) return { index: tentative, element: el };

        // If we've fallen outside the cloned window, snap back inside it
        ensureLoop();
        const fallbackIndex = indexRef.current + 1;
        const fallbackEl = slideRefs.current[fallbackIndex];
        if (fallbackEl) return { index: fallbackIndex, element: fallbackEl };

        const wrappedIndex = startIndex;
        const wrappedEl = slideRefs.current[wrappedIndex];
        if (wrappedEl) return { index: wrappedIndex, element: wrappedEl };

        return null;
      };

      const next = getNextSlide();
      if (next) {
        vp.scrollTo({ left: next.element.offsetLeft, behavior: 'smooth' });
        indexRef.current = next.index;
        ensureLoop();
        updateTransforms();
      }

      schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(goNext, interval);
    };
    schedule();
    return () => { clearTimeout(timer); io.disconnect(); };
  }, [paused, reduce, inView]);

  return (
    <div
      className={styles.carousel}
      aria-label="Featured categories carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
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
                <CategoryCard title={c.title} src={c.src} />
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
      {/* Dots */}
      <div className={styles.dots} aria-label="Slide indicators">
        {original.map((_, i) => {
          const current = ((indexRef.current - startIndex) % original.length + original.length) % original.length;
          const isCurrent = current === i;
          return (
            <button
              key={i}
              className={styles.dot}
              aria-current={isCurrent}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                const vp = viewportRef.current;
                const el = slideRefs.current[startIndex + i];
                if (vp && el) {
                  vp.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
                  indexRef.current = startIndex + i;
                  updateTransforms();
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
