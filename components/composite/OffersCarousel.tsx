"use client";
import { useEffect, useRef, useState } from 'react';
import OfferCard from '../cards/OfferCard';
import styles from '../../styles/carousel.module.css';

const offers = [
  { title: 'Weekend Saver', blurb: 'Up to 15% off select cuts', accent: 'orange' as const },
  { title: 'Heat & Eat Bundle', blurb: 'Buy 2 get 1 free', accent: 'blue' as const },
  { title: 'Seafood Special', blurb: 'Fresh catch picks at great prices', accent: 'green' as const },
  { title: 'Deli Deals', blurb: 'Snacks and cold cuts combo', accent: 'slate' as const },
];

export default function OffersCarousel() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const original = offers;
  const slides = [...original, ...original, ...original]; // clones for loop
  const startIndex = original.length;

  const indexRef = useRef<number>(startIndex);

  const updateTransforms = () => {
    const vp = viewportRef.current;
    if (!vp) return;
    const vpCenter = vp.scrollLeft + vp.clientWidth / 2;
    let closestIdx = -1;
    let closestDist = Infinity;
    slideRefs.current.forEach((el, idx) => {
      if (!el) return;
      const center = el.offsetLeft + el.clientWidth / 2;
      const n = (center - vpCenter) / vp.clientWidth;
      const maxAngle = 20;
      const angle = Math.max(-maxAngle, Math.min(maxAngle, -n * 50));
      const depth = -Math.min(50, Math.abs(n) * 90);
      const scale = 1 - Math.min(0.14, Math.abs(n) * 0.2);
      const inner = el.firstElementChild as HTMLElement | null;
      if (inner) {
        inner.style.transform = `translateZ(${depth}px) rotateY(${angle}deg) scale(${scale})`;
        const dist = Math.abs(n);
        if (dist < closestDist) { closestDist = dist; closestIdx = idx; }
      }
    });
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
    if (vp.scrollLeft < start - 1) {
      vp.scrollLeft += span;
      indexRef.current += original.length;
    } else if (vp.scrollLeft >= start + span) {
      vp.scrollLeft -= span;
      indexRef.current -= original.length;
    }
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const firstOriginal = slideRefs.current[startIndex];
    if (firstOriginal) {
      vp.scrollLeft = firstOriginal.offsetLeft;
      indexRef.current = startIndex;
    }
    const onScroll = () => { ensureLoop(); updateTransforms(); };
    updateTransforms();
    vp.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { vp.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

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
    const interval = 3000; // slower cadence for offers
    const goNext = () => {
      if (paused || reduce) return schedule();
      const next = indexRef.current + 1;
      const el = slideRefs.current[next];
      if (el) {
        vp.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
        indexRef.current = next;
        ensureLoop();
        updateTransforms();
      }
      schedule();
    };
    const schedule = () => { clearTimeout(timer); timer = setTimeout(goNext, interval); };
    schedule();
    return () => { clearTimeout(timer); io.disconnect(); };
  }, [paused, reduce, inView]);

  const scrollByAmount = (dir: -1 | 1) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const amount = Math.max(240, Math.floor(vp.clientWidth * 0.5)); // 50% for two-up
    vp.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div
      className={[styles.carousel, styles.twoUp].join(' ')}
      aria-label="Offers carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <button type="button" className={[styles.navBtn, styles.prev].join(' ')} aria-label="Previous" onClick={() => scrollByAmount(-1)}>‹</button>
      <div ref={viewportRef} className={styles.viewport} role="region" aria-roledescription="carousel" tabIndex={0}>
        <div className={styles.track}>
          {slides.map((o, i) => (
            <div className={styles.slide} key={`${o.title}-${i}`} ref={(el) => (slideRefs.current[i] = el)}>
              <div className={styles.tilt}>
                <OfferCard title={o.title} blurb={o.blurb} accent={o.accent} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className={[styles.navBtn, styles.next].join(' ')} aria-label="Next" onClick={() => scrollByAmount(1)}>›</button>
      <div className={styles.dots} aria-label="Slide indicators">
        {original.map((_, i) => {
          const current = ((indexRef.current - startIndex) % original.length + original.length) % original.length;
          const isCurrent = current === i;
          return (
            <button
              key={i}
              className={styles.dot}
              aria-current={isCurrent}
              aria-label={`Go to offer ${i + 1}`}
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
