"use client";

import { useMemo, useState } from 'react';
import CategoryCard from '../cards/CategoryCard';
import { categories, Category } from '../../lib/categories';
import styles from '../../styles/category-menu.module.css';

const PAGE_SIZE = 4;

export default function CategoryMenu() {
  const pages = useMemo(() => {
    const chunks: Category[][] = [];
    for (let i = 0; i < categories.length; i += PAGE_SIZE) {
      chunks.push(categories.slice(i, i + PAGE_SIZE));
    }
    return chunks;
  }, []);

  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = pages.length || 1;
  const safeIndex = Math.min(pageIndex, totalPages - 1);
  const visible = pages[safeIndex] ?? categories;
  const padded: (Category | null)[] = [...visible];
  while (padded.length < PAGE_SIZE) {
    padded.push(null);
  }

  const goTo = (next: number) => {
    const bounded = Math.max(0, Math.min(totalPages - 1, next));
    setPageIndex(bounded);
  };

  const pageLabel = `Page ${safeIndex + 1} of ${totalPages}`;

  return (
    <section className={styles.menu} aria-label="Category menu">
      <div className={styles.grid}>
        {padded.map((category, idx) => (
          category ? (
            <CategoryCard key={category.title} title={category.title} src={category.src} />
          ) : (
            <div key={`placeholder-${idx}`} className={styles.placeholder} aria-hidden="true" />
          )
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pager}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => goTo(safeIndex - 1)}
            disabled={safeIndex === 0}
          >
            Previous
          </button>
          <span className={styles.pageIndicator} aria-live="polite" aria-atomic="true">
            {pageLabel}
          </span>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => goTo(safeIndex + 1)}
            disabled={safeIndex >= totalPages - 1}
          >
            Next
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pageDots} role="group" aria-label="Select category page">
          {pages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-pressed={safeIndex === idx}
              className={[styles.dot, safeIndex === idx ? styles.dotActive : ''].filter(Boolean).join(' ')}
              onClick={() => goTo(idx)}
            >
              <span className="sr-only">Go to page {idx + 1}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
