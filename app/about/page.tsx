import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import styles from '../../styles/about.module.css';

const timeline = [
  {
    year: '2010',
    title: 'Founding & First Facility',
    copy:
      'We opened our first temperature-controlled processing facility in Dhaka with a promise of transparent sourcing and halal-certified practices.',
  },
  {
    year: '2014',
    title: 'Fleet & Distribution Expansion',
    copy:
      'Our dedicated cold-chain fleet launched, giving restaurants and modern trade partners predictable delivery windows.',
  },
  {
    year: '2018',
    title: 'Ready-to-Cook Innovation',
    copy:
      'We introduced heat-and-eat lines crafted by culinary experts, making premium proteins easier for busy households.',
  },
  {
    year: '2023',
    title: 'Digital Wholesale Platform',
    copy:
      'Today, retailers, chefs, and home cooks manage standing orders, payments, and support directly from our omnichannel platform.',
  },
];

const leadership = [
  {
    name: 'Rohsin Al Razi',
    role: 'Chief Executive Officer',
    copy: 'Guides long-term strategy, partner relations, and our commitment to sustainable growth.',
  },
  {
    name: 'Mohammad Parvez Mossarof',
    role: 'Head of Operations',
    copy: 'Oversees procurement, production floors, and quality assurance across every touchpoint.',
  },
  {
    name: 'Gazi Asif Imtiaz',
    role: 'Director of Cold Chain',
    copy: 'Leads logistics innovation, route optimization, and compliance for temperature-controlled delivery.',
  },
  {
    name: 'Tawhidul Islam',
    role: 'Customer Experience Lead',
    copy: 'Ensures every client interaction — digital or in-person — feels personal, prompt, and reliable.',
  },
];

const sustainability = [
  'We partner with responsibly managed farms and fisheries who share our values on animal welfare and traceability.',
  'Processing floors run on smart chillers calibrated to reduce energy consumption while safeguarding food safety.',
  'We invest in recyclable packaging and reusable crates that help our retail partners reduce single-use materials.',
  'Routine audits, vendor scorecards, and HACCP-aligned processes maintain a culture of accountability.',
];

const testimonials = [
  {
    quote:
      '“Our outlets rely on their chilled supply every week. The consistency and communication make planning effortless.”',
    author: 'Rafiq Islam, Operations Manager — City Grocers',
  },
  {
    quote:
      '“From discovery to delivery, the experience feels premium. Customers notice the difference in freshness.”',
    author: 'Chef Sharmeen Akter, Maison Bistro',
  },
];

const heroHighlights = [
  {
    value: '25+',
    label: 'Cities served',
    copy: 'Dedicated routes sustain chilled deliveries across Dhaka, Chattogram, Sylhet, and beyond.',
  },
  {
    value: '350+',
    label: 'Hospitality partners',
    copy: 'Hotels, cafés, and dark kitchens rely on Shukria Meat for menu-ready proteins.',
  },
  {
    value: '15K',
    label: 'Households onboard',
    copy: 'Weekly subscribers enjoy farm-to-door freshness with curated bundles and support.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero} aria-label="About us">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>Inside Shukria Meat</p>
            <h1>Setting the benchmark for quality proteins in Bangladesh.</h1>
            <p className={styles.lead}>
              Shukria Meat unites award‑winning butchers, food scientists, logistics specialists, and service teams under one
              mission: deliver responsibly sourced meat and ready solutions with precision, warmth, and complete trust.
            </p>
            <div className={styles.heroActions}>
              <Button href="/products" variant="primary">Browse our catalogue</Button>
              <Button href="/contact-us" variant="secondary">Talk to our team</Button>
            </div>
            <ul className={styles.badges}>
              <li className={styles.badge}>Halal Certification</li>
              <li className={styles.badge}>24/7 Cold Chain</li>
              <li className={styles.badge}>Digital Order Tracking</li>
              <li className={styles.badge}>Chef Partnerships</li>
            </ul>
            <div className={styles.trustBar}>
              <span>Trusted by</span>
              <ul>
                <li>Leading Hotels</li>
                <li>Modern Trade Chains</li>
                <li>Cloud Kitchens</li>
                <li>Premium Households</li>
              </ul>
            </div>
          </div>
          <div className={styles.heroAside}>
            <article className={styles.missionCard}>
              <h3>Purpose-built for chefs & families</h3>
              <p>
                Our culinary lab works alongside procurement and cold-chain operations to curate cuts, marinades, and ready
                solutions that retain peak flavour — no matter the distance travelled.
              </p>
              <ul>
                <li>ISO 22000 & HACCP-aligned processing floors</li>
                <li>Traceable batches with digital temperature logs</li>
                <li>Dedicated concierge for enterprise partners</li>
              </ul>
            </article>
            <div className={styles.heroStatsPanel}>
              {heroHighlights.map((item) => (
                <div key={item.label} className={styles.heroHighlight}>
                  <span className={styles.heroHighlightValue}>{item.value}</span>
                  <span className={styles.heroHighlightLabel}>{item.label}</span>
                  <p>{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.twoCol}>
            <div>
              <SectionHeading title="Our craft" subtitle="Why Shukria Meat exists" />
              <div className={styles.richCopy}>
                <p>
                  We believe extraordinary food moments start with extraordinary ingredients. That is why we build short,
                  transparent supply chains, nurture farmers and fisheries with shared values, and invest in people who
                  genuinely care. From live sourcing to the last mile, every handoff is documented and temperature‑checked.
                </p>
                <p>
                  And because our customers range from households to Michelin‑experienced chefs, we balance traditional
                  techniques with modern technology. The result? Proteins that taste better, keep longer, and reach you
                  exactly when promised.
                </p>
              </div>
            </div>
            <div>
              <div className={styles.stats}>
                <div className={styles.stat}><strong>125+</strong><span>Team members across procurement, R&D, and CX</span></div>
                <div className={styles.stat}><strong>18</strong><span>Refrigerated vehicles in dedicated fleet</span></div>
                <div className={styles.stat}><strong>12K</strong><span>Orders fulfilled each month</span></div>
                <div className={styles.stat}><strong>96%</strong><span>On-time delivery success rate</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Our story" subtitle="Milestones that shaped today" />
          <ol className={styles.timeline}>
            {timeline.map((item) => (
              <li key={item.year} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineBody}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <SectionHeading title="What guides us" subtitle="Shared values across our teams" />
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <div className={styles.icon}>✓</div>
              <h3>Uncompromising quality</h3>
              <p>Every cut, blend, and ready meal is benchmarked against sensory, safety, and shelf-life standards.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>⚙</div>
              <h3>Operational precision</h3>
              <p>From HACCP documentation to IoT temperature logs, we rely on rigorous data to predictably delight.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>🤝</div>
              <h3>Partnership mindset</h3>
              <p>We co-create menus, train in-store teams, and share insights that help our clients grow with us.</p>
            </article>
            <article className={styles.card}>
              <div className={styles.icon}>♺</div>
              <h3>Responsible growth</h3>
              <p>Continuous improvement keeps us accountable to our communities and the environment we operate in.</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Leadership" subtitle="People steering the vision" />
          <div className={styles.leadershipGrid}>
            {leadership.map((leader) => (
              <article key={leader.name} className={styles.leaderCard}>
                <div className={styles.leaderAvatar} aria-hidden="true">{leader.name[0]}</div>
                <div>
                  <h3>{leader.name}</h3>
                  <p className={styles.leaderRole}>{leader.role}</p>
                  <p className={styles.leaderCopy}>{leader.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Facilities & Flow" subtitle="A seamless journey from farm to fork" />
          <div className={styles.processGrid}>
            <article className={styles.processCard}>
              <h4>Source</h4>
              <p>Dedicated sourcing teams validate farm credentials, welfare protocols, and feed composition.</p>
            </article>
            <article className={styles.processCard}>
              <h4>Process</h4>
              <p>Modern processing floors combine artisan butchery with premium equipment for consistent cuts.</p>
            </article>
            <article className={styles.processCard}>
              <h4>Preserve</h4>
              <p>Rapid chilling, vacuum sealing, and modified atmosphere packaging extend peak quality.</p>
            </article>
            <article className={styles.processCard}>
              <h4>Deliver</h4>
              <p>Temperature telemetry and live routing keep every delivery slot precise, even at scale.</p>
            </article>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Sustainability in action" subtitle="Progress we report on" />
          <ul className={styles.sustainList}>
            {sustainability.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Voices from our partners" subtitle="What clients and collaborators say" />
          <div className={styles.testimonialGrid}>
            {testimonials.map((item) => (
              <figure key={item.author} className={styles.quoteCard}>
                <blockquote>{item.quote}</blockquote>
                <figcaption>{item.author}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.finalCta}>
            <SectionHeading title="Let’s design your next menu" subtitle="Our specialists can help plan pricing, prep, and logistics." />
            <div className={styles.finalActions}>
              <Button href="/signup" variant="primary">Become a customer</Button>
              <Button href="/contact-us" variant="secondary">Schedule a tasting</Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
