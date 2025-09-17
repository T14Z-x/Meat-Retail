import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import styles from '../../styles/about.module.css';

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero} aria-label="About us">
        <div className={styles.heroInner}>
          <h1>About Us</h1>
          <p className={styles.lead}>
            We’re dedicated to delivering high‑quality meats and convenient ready options with consistent, reliable service.
            Our approach centers on careful sourcing, cold‑chain integrity, and a customer‑first experience.
          </p>
          <ul className={styles.badges}>
            <li className={styles.badge}>Halal Practices</li>
            <li className={styles.badge}>Cold‑Chain Logistics</li>
            <li className={styles.badge}>Secure Payments</li>
            <li className={styles.badge}>Satisfaction Promise</li>
          </ul>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.twoCol}>
          <div>
            <SectionHeading title="What We Do" subtitle="Quality, consistency, and care" />
            <p>
              From classic cuts to convenient heat‑and‑eat selections, we curate products for everyday cooking and special
              occasions. Our team focuses on sourcing, handling, and packaging to keep products fresh from our facility to
              your kitchen.
            </p>
            <p>
              We continuously refine our standards, working with trusted partners and improving logistics to give you a
              dependable experience across digital and in‑store touchpoints.
            </p>
          </div>
          <div>
            <div className={styles.stats}>
              <div className={styles.stat}><strong>24–48h</strong><span>Typical local delivery</span></div>
              <div className={styles.stat}><strong>0–4°C</strong><span>Chilled handling target</span></div>
              <div className={styles.stat}><strong>100%</strong><span>Order receipt emailed</span></div>
              <div className={styles.stat}><strong>7 days</strong><span>Support availability</span></div>
            </div>
          </div>
        </div>

        <SectionHeading title="Our Values" subtitle="How we operate, every day" />
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <div className={styles.icon}>✓</div>
            <h3>Product Integrity</h3>
            <p>We prioritize careful sourcing and handling to deliver consistent quality you can trust.</p>
          </article>
          <article className={styles.card}>
            <div className={styles.icon}>⛁</div>
            <h3>Reliable Logistics</h3>
            <p>Cold‑chain processes help maintain freshness through packing, transit, and delivery.</p>
          </article>
          <article className={styles.card}>
            <div className={styles.icon}>⚑</div>
            <h3>Customer Care</h3>
            <p>Helpful support and a clear approach to resolving issues when things go wrong.</p>
          </article>
          <article className={styles.card}>
            <div className={styles.icon}>♺</div>
            <h3>Continuous Improvement</h3>
            <p>We review feedback and iterate on operations, products, and packaging.</p>
          </article>
        </div>

        <SectionHeading title="Our Process" subtitle="From order to doorstep" />
        <div className={styles.process}>
          <article className={styles.step}>
            <h4>1. Careful Selection</h4>
            <p>Products are chosen and prepared to meet our freshness and quality benchmarks.</p>
          </article>
          <article className={styles.step}>
            <h4>2. Chilled Packing</h4>
            <p>Items are sealed and insulated to maintain ideal temperatures in transit.</p>
          </article>
          <article className={styles.step}>
            <h4>3. Tracked Delivery</h4>
            <p>Orders travel via temperature‑aware logistics with delivery updates to your inbox.</p>
          </article>
        </div>

        <div className={styles.cta}>
          <Button href="/categories" variant="primary">Explore Categories</Button>
          <Button href="/contact-us" variant="secondary">Contact Support</Button>
        </div>
      </div>
    </>
  );
}
