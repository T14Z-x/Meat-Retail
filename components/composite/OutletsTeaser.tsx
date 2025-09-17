import Button from '../ui/Button';
import styles from '../../styles/grids.module.css';

const outlets = [
  { name: 'Downtown Store', address: '101 Main St', hours: '10am – 8pm' },
  { name: 'Uptown Store', address: '202 High St', hours: '9am – 9pm' },
  { name: 'Riverside Store', address: '303 River Rd', hours: '10am – 7pm' },
];

export default function OutletsTeaser() {
  return (
    <div>
      <div className={styles.outletSearch}>
        <label htmlFor="store-search" className="sr-only">Find a store</label>
        <input id="store-search" type="search" placeholder="Find a store (placeholder)" />
        <Button variant="secondary">Search</Button>
      </div>
      <ul className={styles.outletList}>
        {outlets.map((o) => (
          <li key={o.name}>
            <h4>{o.name}</h4>
            <p>{o.address}</p>
            <p>{o.hours}</p>
          </li>
        ))}
      </ul>
      <Button href="/our-outlets" variant="primary">View All Outlets</Button>
    </div>
  );
}

