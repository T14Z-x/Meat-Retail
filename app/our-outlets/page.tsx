import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import BlurText from '../../components/ui/BlurText';
import TypewriterText from '../../components/ui/TypewriterText';
import OutletsTeaser from '../../components/composite/OutletsTeaser';
import styles from '../../styles/outlets.module.css';

const heroHighlights = [
  {
    value: '18',
    label: 'Boutique outlets',
    copy: 'From flagship experience centers to neighborhood express counters across Bangladesh.',
  },
  {
    value: '45 min',
    label: 'Average delivery radius',
    copy: 'Ready-to-cook orders leave our stores in temperature-controlled vehicles within an hour.',
  },
  {
    value: '4.8/5',
    label: 'Guest satisfaction',
    copy: 'Feedback surveys from 2023–24 emphasise service, cleanliness, and assortment.',
  },
];

const storeMoments = [
  {
    title: 'Chilled theatre counters',
    copy: 'Watch master butchers portion, trim, and seal orders with halal certification visible at every station.',
  },
  {
    title: 'Experience tastings',
    copy: 'Join our weekend demos, sample marinades, and discover seasonal pairings curated by culinary specialists.',
  },
  {
    title: 'Omnichannel convenience',
    copy: 'Reserve cuts online for express pickup or schedule same-day chilled delivery straight from the outlet.',
  },
];

const experiencePillars = [
  {
    icon: '🥩',
    title: 'Chef-trimmed butchery',
    copy: 'Request bespoke cuts, grind profiles, and ageing preferences for service-ready proteins.',
  },
  {
    icon: '🧊',
    title: 'Cold-chain integrity',
    copy: 'Display-to-door journeys maintain 0–4°C with real-time telemetry on every handoff.',
  },
  {
    icon: '🍳',
    title: 'Ready-meal studio',
    copy: 'Heat-and-eat selections are seared, sealed, and labelled on-site for effortless home service.',
  },
  {
    icon: '🤝',
    title: 'Partner services',
    copy: 'Dedicated desks support hotels, cafés, and caterers with credit terms and menu planning.',
  },
];

const serviceZones = [
  { title: 'Dhaka Metro', areas: ['Banani', 'Gulshan', 'Bashundhara', 'Dhanmondi', 'Mirpur'] },
  { title: 'Chattogram', areas: ['Agrabad', 'Nasirabad', 'GEC Circle', 'Halishahar'] },
  { title: 'Sylhet & North', areas: ['Zindabazar', 'Uposhohor', 'Moulvibazar', 'Habiganj'] },
  { title: 'Emerging hubs', areas: ['Cumilla', 'Mymensingh (coming soon)', 'Bogura (coming soon)', 'Barishal (scouting)'] },
];

const serviceAssurances = [
  {
    title: 'Temperature-controlled displays',
    copy: 'Multi-zone chillers and misting keep premium poultry, beef, and seafood at ideal holding temperatures.',
  },
  {
    title: 'Digital batch traceability',
    copy: 'Every pack includes QR-backed provenance, slaughter dates, and recommended use-by timelines.',
  },
  {
    title: 'Sanitised guest journey',
    copy: 'Touchpoints, knives, and scales are sanitised hourly to exceed ISO 22000 and HACCP expectations.',
  },
  {
    title: 'Same-day replenishment',
    copy: 'Central processing tops up outlets twice daily, so shelves stay fresh without overstocking.',
  },
];

const supportChannels: Array<{
  title: string;
  copy: string;
  icon: string;
  action?: { label: string; href: string; variant: 'primary' | 'secondary' | 'tertiary' };
  helper?: string;
}> = [
  {
    title: 'Concierge hotline',
    copy: 'Call our in-store specialists for reservations, custom prep requests, or wholesale support.',
    icon: '☎',
    action: { label: 'Call 09613-777444', href: 'tel:09613777444', variant: 'secondary' },
    helper: 'Available 9am – 10pm, 7 days a week',
  },
  {
    title: 'Retail WhatsApp',
    copy: 'Share shopping lists, receive availability updates, and confirm pick-up slots in minutes.',
    icon: '💬',
    action: { label: 'Message us', href: 'https://wa.me/8801711000000', variant: 'secondary' },
    helper: 'Typical response under 10 minutes',
  },
  {
    title: 'Corporate desk',
    copy: 'Chefs and procurement teams can schedule tastings, seasonal planning, and credit consultations.',
    icon: '🗓',
    action: { label: 'Book a session', href: '/contact-us', variant: 'secondary' },
    helper: 'Dedicated managers for hospitality partners',
  },
];

const faqs = [
  {
    question: 'Do I need an appointment before visiting a flagship outlet?',
    answer:
      'Walk-ins are welcome. For premium tasting rooms or large wholesale orders we recommend a prior slot so the team can prepare.',
  },
  {
    question: 'Can outlets arrange chilled delivery after I shop in person?',
    answer:
      'Yes. All outlets dispatch within a 45-minute radius via insulated vehicles. Provide your delivery window at checkout and we do the rest.',
  },
  {
    question: 'Which payment methods do you accept in store?',
    answer:
      'We accept cash, major cards, mobile wallets, and can arrange monthly invoicing for approved business accounts.',
  },
];

export default function OurOutletsPage() {
  return (
    <>
      <section className={styles.hero} aria-label="Shukria Meat outlets">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <BlurText
              as="p"
              className={styles.kicker}
              text="Retail network"
              animateBy="letters"
              direction="top"
              delay={60}
              stepDuration={0.22}
            />
            <BlurText
              as="h1"
              className={styles.heroTitle}
              text="Step into spaces built for freshness, storytelling, and service."
              animateBy="words"
              direction="bottom"
              delay={120}
              stepDuration={0.35}
            />
            <TypewriterText
              as="p"
              className={styles.lead}
              text="Shukria Meat outlets combine glass-front butchery, ready-meal ateliers, and concierge desks so every visit feels curated. Experience the same cold-chain precision we promise online, now within welcoming neighbourhood hubs."
              speed={28}
              startDelay={220}
            />
            <div className={styles.heroActions}>
              <Button href="/contact-us">Book an in-store tasting</Button>
              <Button href="/products" variant="secondary">Browse ready-to-cook range</Button>
            </div>
            <div className={styles.badgeRow}>
              <span>In-store highlights</span>
              <ul>
                <li>Halal-certified preparation</li>
                <li>Live tasting counters</li>
                <li>Temperature-logged pickups</li>
              </ul>
            </div>
          </div>
          <div className={styles.heroAside}>
            <article className={styles.heroCard}>
              <h3>One visit, multiple services</h3>
              <p>
                Meet culinary experts, set up recurring deliveries, or customise a butcher’s block — all within a single stop
                designed for busy households and professional kitchens alike.
              </p>
              <ul>
                <li>Dedicated butchers for bespoke cuts</li>
                <li>Chef-led marinade and pairing advice</li>
                <li>Corporate concierge with credit onboarding</li>
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
              <SectionHeading title="Our footprint" subtitle="Boutique spaces with back-of-house muscle" />
              <div className={styles.richCopy}>
                <p>
                  Each outlet mirrors our central processing standards — from humidity-controlled meat lockers to digital
                  temperature logs that sync with our platform in real time. Walk in and see sourcing, certifications, and shelf
                  lives displayed transparently.
                </p>
                <p>
                  Beyond retail, our teams host tastings, supplier showcases, and skills clinics that empower chefs, retailers,
                  and home cooks to master premium proteins with confidence.
                </p>
              </div>
            </div>
            <div className={styles.detailList}>
              {storeMoments.map((item) => (
                <article key={item.title} className={styles.detailCard}>
                  <h4>{item.title}</h4>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Inside the experience" subtitle="What guests love about our outlets" />
          <div className={styles.cardGrid}>
            {experiencePillars.map((item) => (
              <article key={item.title} className={styles.card}>
                <div className={styles.icon} aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.locatorShell}>
            <div className={styles.locatorIntro}>
              <SectionHeading title="Find your store" subtitle="Search outlets, plan pickups, or reserve a concierge" />
              <p>
                Explore our active locations, lock in a time-slot, and let our team prepare your order before you arrive. Online
                reservations sync instantly with in-store teams.
              </p>
            </div>
            <OutletsTeaser />
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Service zones" subtitle="Strategically placed to reach you faster" />
          <div className={styles.zoneGrid}>
            {serviceZones.map((zone) => (
              <article key={zone.title} className={styles.zoneCard}>
                <h3>{zone.title}</h3>
                <ul>
                  {zone.areas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Assurance at every step" subtitle="Safety, traceability, and comfort baked in" />
          <div className={styles.assuranceGrid}>
            {serviceAssurances.map((item) => (
              <article key={item.title} className={styles.assuranceCard}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="Talk to our team" subtitle="Support whenever you need it" />
          <div className={styles.supportGrid}>
            {supportChannels.map((channel) => (
              <article key={channel.title} className={styles.supportCard}>
                <div className={styles.supportIcon} aria-hidden="true">
                  {channel.icon}
                </div>
                <h3>{channel.title}</h3>
                <p>{channel.copy}</p>
                {channel.action ? (
                  <Button href={channel.action.href} variant={channel.action.variant}>
                    {channel.action.label}
                  </Button>
                ) : null}
                {channel.helper ? <span className={styles.supportHelper}>{channel.helper}</span> : null}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionHeading title="FAQs" subtitle="Quick answers before you visit" />
          <ul className={styles.faqList}>
            {faqs.map((item) => (
              <li key={item.question} className={styles.faqItem}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <div className={styles.finalCta}>
            <SectionHeading
              title="Plan your next visit"
              subtitle="Reserve a chef consultation or curate a family feast with our specialists."
            />
            <div className={styles.finalActions}>
              <Button href="/contact-us" variant="primary">
                Reserve a guided visit
              </Button>
              <Button href="/signup" variant="secondary">
                Open a shopper account
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
