import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import styles from '../../styles/accordion.module.css';

export default function FAQPage() {
  return (
    <Container>
      <SectionHeading title="Frequently Asked Questions" subtitle="Helpful answers about orders, delivery, and quality" />

      <section aria-labelledby="delivery-heading" className={styles.accordion}>
        <h3 id="delivery-heading">Delivery & Shipping</h3>
        <details className={styles.item}>
          <summary>How long does delivery take?</summary>
          <p>Standard local delivery typically arrives within 24–48 hours on business days. Delivery windows may vary during peak seasons or public holidays.</p>
        </details>
        <details className={styles.item}>
          <summary>How is the cold-chain maintained?</summary>
          <p>Orders are packed in insulated materials and transported in temperature-controlled vehicles to ensure products remain chilled from our facility to your doorstep.</p>
        </details>
        <details className={styles.item}>
          <summary>What areas do you deliver to?</summary>
          <p>We currently serve major city zones. If your address is outside our coverage, you can still place an order for pickup at one of our outlets.</p>
        </details>
      </section>

      <section aria-labelledby="orders-heading" className={styles.accordion}>
        <h3 id="orders-heading">Orders & Payment</h3>
        <details className={styles.item}>
          <summary>What payment methods are accepted?</summary>
          <p>We accept major debit/credit cards and select mobile wallets. Cash on Delivery (COD) is available in supported areas.</p>
        </details>
        <details className={styles.item}>
          <summary>Can I modify or cancel my order?</summary>
          <p>Orders can be edited or canceled before they are dispatched. Contact support with your order ID as soon as possible for assistance.</p>
        </details>
        <details className={styles.item}>
          <summary>Will I receive an invoice?</summary>
          <p>Your digital invoice is emailed after checkout. You can also request a copy by contacting support with your order details.</p>
        </details>
      </section>

      <section aria-labelledby="quality-heading" className={styles.accordion}>
        <h3 id="quality-heading">Product Quality & Handling</h3>
        <details className={styles.item}>
          <summary>Are your products fresh or frozen?</summary>
          <p>We primarily offer fresh, chilled products. Some items may be frozen for optimal quality; product pages specify handling and storage recommendations.</p>
        </details>
        <details className={styles.item}>
          <summary>How should I store my order after delivery?</summary>
          <p>Refrigerate chilled items immediately (0–4°C) and freeze items intended for later use. Always follow safe handling guidelines for raw meat and seafood.</p>
        </details>
        <details className={styles.item}>
          <summary>What if an item arrives damaged or warm?</summary>
          <p>Contact support within 12 hours with photos of the packaging and product. We will investigate and arrange a replacement or refund where applicable.</p>
        </details>
      </section>

      <section aria-labelledby="returns-heading" className={styles.accordion}>
        <h3 id="returns-heading">Returns & Support</h3>
        <details className={styles.item}>
          <summary>Do you offer returns or exchanges?</summary>
          <p>Perishable goods are not typically returnable, but we stand behind product quality. If something is wrong, reach out and we’ll make it right.</p>
        </details>
        <details className={styles.item}>
          <summary>How can I contact customer support?</summary>
          <p>Email support@example.com or call +1 000 000 0000. Our team is available 9am–7pm, 7 days a week.</p>
        </details>
      </section>
    </Container>
  );
}
