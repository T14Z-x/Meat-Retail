import Link from 'next/link';
import styles from '../../styles/footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/our-outlets">Our Outlets</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <address>
              123 Example Street<br />
              City, Country<br />
              <a href="tel:+10000000000">+1 000 000 0000</a><br />
              <a href="mailto:hello@example.com">hello@example.com</a>
            </address>
          </div>
          <div>
            <h3>Follow</h3>
            <ul className={styles.socials}>
              <li><a href="#" aria-label="Facebook">Facebook</a></li>
              <li><a href="#" aria-label="Instagram">Instagram</a></li>
              <li><a href="#" aria-label="X">X</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.legal}>
          <small>© {year} Example Retail. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
