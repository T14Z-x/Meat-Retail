import styles from '../../styles/accordion.module.css';

const faqs = [
  { q: 'How does delivery work?', a: 'We ship chilled with cold-chain logistics to maintain freshness.' },
  { q: 'What payment methods are accepted?', a: 'Cards, mobile wallets, and cash on delivery in select areas.' },
  { q: 'What about product quality?', a: 'We source from trusted partners and guarantee freshness.' },
];

export default function FAQAccordion() {
  return (
    <div className={styles.accordion}>
      {faqs.map((item, idx) => (
        <details key={idx} className={styles.item}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

