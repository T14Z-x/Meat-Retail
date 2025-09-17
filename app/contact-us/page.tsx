import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import styles from '../../styles/forms.module.css';

export default function ContactUsPage() {
  return (
    <Container>
      <SectionHeading title="Contact Us" subtitle="We’d love to hear from you" />
      <form className={styles.form} action="#" method="post">
        <div className={`${styles.row} ${styles.twoCol}`}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Full name</label>
            <input className={styles.input} id="name" name="name" type="text" required placeholder="Jane Doe" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input className={styles.input} id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
        </div>

        <div className={`${styles.row} ${styles.twoCol}`}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">Phone (optional)</label>
            <input className={styles.input} id="phone" name="phone" type="tel" placeholder="+1 000 000 0000" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="topic">Topic</label>
            <select className={styles.select} id="topic" name="topic" defaultValue="Order Inquiry" aria-describedby="topic-hint">
              <option>Order Inquiry</option>
              <option>Product Question</option>
              <option>Delivery & Shipping</option>
              <option>Returns & Refunds</option>
              <option>Other</option>
            </select>
            <p id="topic-hint" className={styles.hint}>Choose the closest match so we can route your message.</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="subject">Subject</label>
            <input className={styles.input} id="subject" name="subject" type="text" required placeholder="Short summary" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="message">Message</label>
            <textarea className={styles.textarea} id="message" name="message" required placeholder="How can we help? Provide any order IDs or details."></textarea>
          </div>
        </div>

        <div className={styles.actions}>
          <Button type="submit" variant="primary">Send Message</Button>
          <span className={styles.hint}>We typically respond within one business day.</span>
        </div>
      </form>
    </Container>
  );
}

