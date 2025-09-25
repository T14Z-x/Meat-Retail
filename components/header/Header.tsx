"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../../styles/header.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const displayName = (() => {
    if (!user) return 'User';
    const named = user.name?.trim();
    if (named) return named;
    if (user.email) {
      const [local] = user.email.split('@');
      if (local) return local;
    }
    return 'User';
  })();
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

  const handleLogout = async () => {
    await signOut();
    setOpen(false);
  };

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
            <Image
              src="/logo/Shukria%20Meat%20logo-01.png"
              alt="Shukria Meat"
              width={448}
              height={112}
              className={styles.brandLogo}
              priority
            />
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/" className={isActive("/") ? styles.active : undefined} aria-current={isActive("/") ? 'page' : undefined}>HOME</Link>
          <Link href="/categories" className={isActive("/categories") ? styles.active : undefined} aria-current={isActive("/categories") ? 'page' : undefined}>CATEGORY</Link>
          <Link href="/products" className={isActive("/products") ? styles.active : undefined} aria-current={isActive("/products") ? 'page' : undefined}>PRODUCTS</Link>
          <Link href="/our-outlets" className={isActive("/our-outlets") ? styles.active : undefined} aria-current={isActive("/our-outlets") ? 'page' : undefined}>OUTLETS</Link>
          <Link href="/faq" className={isActive("/faq") ? styles.active : undefined} aria-current={isActive("/faq") ? 'page' : undefined}>FAQ</Link>
          <Link href="/about" className={isActive("/about") ? styles.active : undefined} aria-current={isActive("/about") ? 'page' : undefined}>ABOUT US</Link>
        </nav>
        <div className={styles.utils}>
          <label className="sr-only" htmlFor="site-search">Search</label>
          <input id="site-search" className={styles.search} placeholder="Search products" />
          <CartMenu />
          {user ? (
            <>
              <Link
                href="/account"
                className={[styles.ctaPrimary, styles.userChip].join(' ')}
                title={user.email}
              >
                {displayName}
              </Link>
              <button type="button" className={styles.ctaSecondary} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/signup" className={styles.ctaPrimary}>Become a customer</Link>
              <Link href="/login" className={styles.ctaSecondary}>Login</Link>
            </>
          )}
        </div>
      </div>
      <nav
        id="mobile-nav"
        className={[styles.mobileNav, open ? styles.open : ''].join(' ')}
        aria-label="Mobile"
      >
        <Link href="/" onClick={() => setOpen(false)} className={isActive("/") ? styles.active : undefined}>HOME</Link>
        <Link href="/categories" onClick={() => setOpen(false)} className={isActive("/categories") ? styles.active : undefined}>CATEGORY</Link>
        <Link href="/products" onClick={() => setOpen(false)} className={isActive("/products") ? styles.active : undefined}>PRODUCTS</Link>
        <Link href="/our-outlets" onClick={() => setOpen(false)} className={isActive("/our-outlets") ? styles.active : undefined}>OUTLETS</Link>
        <Link href="/faq" onClick={() => setOpen(false)} className={isActive("/faq") ? styles.active : undefined}>FAQ</Link>
        <Link href="/about" onClick={() => setOpen(false)} className={isActive("/about") ? styles.active : undefined}>ABOUT US</Link>
        <Link href="/contact-us" onClick={() => setOpen(false)}>CONTACT US</Link>
      </nav>
    </header>
  );
}

function CartMenu() {
  const { items, totalQuantity, formattedTotal, removeItem, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [renderDrawer, setRenderDrawer] = useState(false);

  const hasItems = items.length > 0;

  const openDrawer = () => {
    if (renderDrawer) {
      setIsOpen(true);
      return;
    }
    setRenderDrawer(true);
    requestAnimationFrame(() => setIsOpen(true));
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!renderDrawer) return;
    if (isOpen) return;
    const timer = window.setTimeout(() => setRenderDrawer(false), 260);
    return () => window.clearTimeout(timer);
  }, [isOpen, renderDrawer]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  useEffect(() => {
    if (items.length === 0) {
      setIsOpen(false);
    }
  }, [items.length]);

  const handleRemove = (slug: string) => {
    removeItem(slug);
  };

  return (
    <div className={styles.cartWrapper}>
      <button
        type="button"
        className={styles.cartBtn}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => {
          if (renderDrawer && isOpen) {
            closeDrawer();
          } else {
            openDrawer();
          }
        }}
      >
        <span className={styles.cartIcon} aria-hidden="true">🛒</span>
        {totalQuantity > 0 ? (
          <span className={styles.cartCount} aria-hidden="true">{totalQuantity}</span>
        ) : null}
        <span className="sr-only">Cart ({totalQuantity} items)</span>
      </button>
      {renderDrawer ? (
        <div
          className={[styles.cartOverlay, isOpen ? styles.cartOverlayVisible : ''].join(' ')}
          role="presentation"
          onClick={closeDrawer}
        >
          <div
            className={[styles.cartDrawer, isOpen ? styles.cartDrawerOpen : ''].join(' ')}
            role="dialog"
            aria-label="Shopping cart"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.cartPanel}>
              <div className={styles.cartHeader}>
                <h3>Cart</h3>
                <div className={styles.cartHeaderActions}>
                  {hasItems ? (
                    <button type="button" className={styles.cartClear} onClick={clearCart}>
                      Clear all
                    </button>
                  ) : null}
                  <button type="button" className={styles.cartClose} onClick={closeDrawer} aria-label="Close cart">
                    ×
                  </button>
                </div>
              </div>
              <div className={styles.cartBody}>
                {hasItems ? (
                  <ul className={styles.cartList}>
                    {items.map((item) => (
                      <li key={item.slug} className={styles.cartItem}>
                        <div className={styles.cartItemCopy}>
                          <span className={styles.cartItemName}>{item.name}</span>
                          <span className={styles.cartItemMeta}>
                            {item.quantity} × {item.price}
                          </span>
                        </div>
                        <button
                          type="button"
                          className={styles.cartRemove}
                          onClick={() => handleRemove(item.slug)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.cartEmpty}>Your cart is empty.</p>
                )}
              </div>
              <div className={styles.cartFooter}>
                <div>
                  <span>Total</span>
                  <strong>{formattedTotal}</strong>
                </div>
                <button type="button" className={styles.cartCheckout} disabled={!hasItems}>
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
