"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../../styles/header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}>
      <div className={styles.inner}>
        <div className={styles.leftGroup}>
          <button
            className={styles.menuBtn}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span className={styles.burger} aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <Link href="/" className={styles.brand} aria-label="Home">
            <Image src="/brand/logo.svg" alt="Brand" width={120} height={32} />
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/">HOME</Link>
          <Link href="/categories">CATEGORY</Link>
          <Link href="/heat-eat">HEAT &amp; EAT</Link>
          <Link href="/our-outlets">OUTLETS</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">ABOUT US</Link>
        </nav>
        <div className={styles.utils}>
          <label className="sr-only" htmlFor="site-search">Search</label>
          <input id="site-search" className={styles.search} placeholder="Search products" />
          <Link href="/signup" className={styles.ctaPrimary}>Become a customer</Link>
          <Link href="/login" className={styles.ctaSecondary}>Login</Link>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className={[styles.mobileNav, open ? styles.open : ''].join(' ')}
        aria-label="Mobile"
      >
        <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
        <Link href="/categories" onClick={() => setOpen(false)}>CATEGORY</Link>
        <Link href="/heat-eat" onClick={() => setOpen(false)}>HEAT &amp; EAT</Link>
        <Link href="/our-outlets" onClick={() => setOpen(false)}>OUTLETS</Link>
        <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
        <Link href="/about" onClick={() => setOpen(false)}>ABOUT US</Link>
        <Link href="/contact-us" onClick={() => setOpen(false)}>CONTACT US</Link>
      </nav>
    </header>
  );
}
