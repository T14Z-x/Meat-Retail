import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import styles from '../../styles/contact.module.css';
import formStyles from '../../styles/forms.module.css';

const heroHighlights = [
  {
    value: '92%',
    label: 'first-response resolution',
    copy: 'Handled by specialists who know the supply chain end-to-end.',
  },
  {
    value: '24/7',
    label: 'order monitoring',
    copy: 'After-hours teams watch cold-chain telemetry so deliveries stay on track.',
  },
  {
    value: '<10 min',
    label: 'live chat wait time',
    copy: 'Reach us on WhatsApp for the fastest status updates and product advice.',
  },
];

const contactChannels = [
  {
    icon: '☎',
    title: 'Concierge hotline',
    copy: 'Perfect for urgent delivery tracking, order edits, or bespoke prep requests. Rings the on-call operations lead.',
    action: { label: 'Call 09613-777444', href: 'tel:09613777444' },
    helper: 'Available daily 9am – 10pm',
  },
  {
    icon: '💬',
    title: 'WhatsApp retail desk',
    copy: 'Share shopping lists, confirm outlet stock, or upload photos for product guidance. Ideal for rapid replies.',
    action: { label: 'Chat instantly', href: 'https://wa.me/8801711000000' },
    helper: 'Median response under 10 minutes',
  },
  {
    icon: '✉',
    title: 'Email care team',
    copy: 'Best for documentation, invoices, or partnership inquiries. Every request is assigned a specialist owner.',
    action: { label: 'support@shukriameat.com', href: 'mailto:support@shukriameat.com' },
    helper: 'Replies within one business day',
  },
];

const commitments = [
  'Dedicated wholesale desk for hotels, cafés, and institutional buyers.',
  'Cold-chain telemetry and delivery logs shared on request for every order.',
  'Escalation matrix that routes VIP or time-sensitive tickets within 10 minutes.',
  'Feedback loop with butchers and logistics to resolve root causes quickly.',
];

const officeLocations = [
  {
    name: 'Dhaka headquarters',
    address: 'House 12, Road 8, Banani, Dhaka 1213',
    hours: 'Sun – Thu, 9am – 7pm',
  },
  {
    name: 'Chattogram logistics hub',
    address: 'Plot 4, Agrabad Commercial Area, Chattogram',
    hours: 'Sat – Thu, 9am – 6pm',
  },
  {
    name: 'Sylhet partner office',
    address: 'Level 3, 27 Zindabazar Road, Sylhet',
    hours: 'Sun – Thu, 10am – 6pm',
  },
];

export default function ContactUsPage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="contact-hero">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Customer success</p>
            <h1 id="contact-hero">Let’s coordinate your next chilled delivery.</h1>
            <p className={styles.lead}>
              Whether you need help tracking an order, planning wholesale onboarding, or getting product documentation, our
              concierge teams stay online to support every handoff of the cold chain.
            </p>
            <div className={styles.heroActions}>
              <Button href="https://wa.me/8801711000000" variant="secondary">
                Chat on WhatsApp
              </Button>
              <Button href="tel:09613777444">Call the hotline</Button>
            </div>
          </div>
          <div className={styles.heroHighlights}>
            {heroHighlights.map((item) => (
              <div key={item.label} className={styles.heroHighlight}>
                <span className={styles.heroHighlightValue}>{item.value}</span>
                <span className={styles.heroHighlightLabel}>{item.label}</span>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.page}>
        <div className={styles.wrapper}>
          <div className={styles.intro}>
            <SectionHeading
              title="Here when you need us"
              subtitle="Choose the channel that suits you best — we’ll align experts from butchery, logistics, finance, or partnerships to resolve things fast."
            />
            <p>
              Share order IDs, delivery slots, or prep requirements so we can tailor the right response the first time. Our
              service playbooks cover households, horeca, and modern trade.
            </p>
          </div>

          <div className={styles.contentGrid}>
            <div className={styles.infoColumn}>
              <div className={styles.channelGrid}>
                {contactChannels.map((channel) => (
                  <article key={channel.title} className={styles.channelCard}>
                    <header className={styles.channelHeader}>
                      <span className={styles.channelIcon} aria-hidden="true">
                        {channel.icon}
                      </span>
                      <div>
                        <h3>{channel.title}</h3>
                        <p className={styles.channelCopy}>{channel.copy}</p>
                      </div>
                    </header>
                    <div>
                      <Button href={channel.action.href} variant="secondary">
                        {channel.action.label}
                      </Button>
                    </div>
                    <div className={styles.channelFooter}>{channel.helper}</div>
                  </article>
                ))}
              </div>

              <div className={styles.commitments}>
                <h3>Service commitments</h3>
                <ul>
                  {commitments.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.offices}>
                <h3>Visit our offices</h3>
                <div className={styles.officeList}>
                  {officeLocations.map((office) => (
                    <div key={office.name} className={styles.officeItem}>
                      <strong>{office.name}</strong>
                      <span>{office.address}</span>
                      <span>{office.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className={styles.formColumn}>
              <div className={styles.formPanel}>
                <div className={styles.statusBanner}>Average reply time: within one business day</div>
                <h3>Send us a message</h3>
                <p>
                  Provide as much context as you can — order IDs, preferred delivery windows, or documentation requests help us
                  route your message to the right team immediately.
                </p>
                <form className={[formStyles.form, styles.form].join(' ')} action="#" method="post">
                  <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
                    <div className={formStyles.field}>
                      <label className={formStyles.label} htmlFor="name">
                        Full name
                      </label>
                      <input
                        className={formStyles.input}
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className={formStyles.field}>
                      <label className={formStyles.label} htmlFor="email">
                        Email
                      </label>
                      <input
                        className={formStyles.input}
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
                    <div className={formStyles.field}>
                      <label className={formStyles.label} htmlFor="phone">
                        Phone (optional)
                      </label>
                      <input
                        className={formStyles.input}
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>
                    <div className={formStyles.field}>
                      <label className={formStyles.label} htmlFor="topic">
                        Topic
                      </label>
                      <select
                        className={formStyles.select}
                        id="topic"
                        name="topic"
                        defaultValue="Order inquiry"
                        aria-describedby="topic-hint"
                      >
                        <option>Order inquiry</option>
                        <option>Product advisory</option>
                        <option>Delivery & shipping</option>
                        <option>Returns & refunds</option>
                        <option>Wholesale onboarding</option>
                        <option>Other</option>
                      </select>
                      <p id="topic-hint" className={formStyles.hint}>
                        Choose the closest match so we can route your message.
                      </p>
                    </div>
                  </div>

                  <div className={formStyles.row}>
                    <div className={formStyles.field}>
                      <label className={formStyles.label} htmlFor="subject">
                        Subject
                      </label>
                      <input
                        className={formStyles.input}
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="Short summary"
                      />
                    </div>
                  </div>

                  <div className={formStyles.row}>
                    <div className={formStyles.field}>
                      <label className={formStyles.label} htmlFor="message">
                        Message
                      </label>
                      <textarea
                        className={formStyles.textarea}
                        id="message"
                        name="message"
                        required
                        placeholder="How can we help? Provide order IDs, delivery windows, or prep requests."
                      ></textarea>
                    </div>
                  </div>

                  <div className={formStyles.actions}>
                    <Button type="submit" variant="primary">
                      Send message
                    </Button>
                    <span className={formStyles.hint}>We typically respond within one business day.</span>
                  </div>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
