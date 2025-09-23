"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../../styles/header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = useMemo(() => {
    return (href: string) => (pathname === '/' ? href === '/' : pathname.startsWith(href));
  }, [pathname]);

  // Ensure hamburger closes on route change to keep header height consistent
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          <Link href="/" className={isActive("/") ? styles.active : undefined} aria-current={isActive("/") ? 'page' : undefined}>HOME</Link>
          <Link href="/categories" className={isActive("/categories") ? styles.active : undefined} aria-current={isActive("/categories") ? 'page' : undefined}>CATEGORY</Link>
          <Link href="/heat-eat" className={isActive("/heat-eat") ? styles.active : undefined} aria-current={isActive("/heat-eat") ? 'page' : undefined}>HEAT &amp; EAT</Link>
          <Link href="/our-outlets" className={isActive("/our-outlets") ? styles.active : undefined} aria-current={isActive("/our-outlets") ? 'page' : undefined}>OUTLETS</Link>
          <Link href="/faq" className={isActive("/faq") ? styles.active : undefined} aria-current={isActive("/faq") ? 'page' : undefined}>FAQ</Link>
          <Link href="/about" className={isActive("/about") ? styles.active : undefined} aria-current={isActive("/about") ? 'page' : undefined}>ABOUT US</Link>
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
        <Link href="/" onClick={() => setOpen(false)} className={isActive("/") ? styles.active : undefined}>HOME</Link>
        <Link href="/categories" onClick={() => setOpen(false)} className={isActive("/categories") ? styles.active : undefined}>CATEGORY</Link>
        <Link href="/heat-eat" onClick={() => setOpen(false)} className={isActive("/heat-eat") ? styles.active : undefined}>HEAT &amp; EAT</Link>
        <Link href="/our-outlets" onClick={() => setOpen(false)} className={isActive("/our-outlets") ? styles.active : undefined}>OUTLETS</Link>
        <Link href="/faq" onClick={() => setOpen(false)} className={isActive("/faq") ? styles.active : undefined}>FAQ</Link>
        <Link href="/about" onClick={() => setOpen(false)} className={isActive("/about") ? styles.active : undefined}>ABOUT US</Link>
        <Link href="/contact-us" onClick={() => setOpen(false)}>CONTACT US</Link>
      </nav>
    </header>
  );
}
