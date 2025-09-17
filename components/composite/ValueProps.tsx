import styles from '../../styles/grids.module.css';

const items = [
  { title: 'Freshness Guaranteed', desc: 'Carefully handled from source to doorstep.' },
  { title: 'Cold-Chain Delivery', desc: 'Delivered chilled to preserve quality.' },
  { title: 'Secure Payments', desc: 'Your information is protected.' },
  { title: 'Easy Returns', desc: 'Simple return policy on eligible orders.' },
];

export default function ValueProps() {
  return (
    <div className={styles.gridFourTight}>
      {items.map((i) => (
        <div key={i.title} className={styles.valueProp}>
          <div className={styles.icon} aria-hidden="true">✓</div>
          <div>
            <h3>{i.title}</h3>
            <p>{i.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

