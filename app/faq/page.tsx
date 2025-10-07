import Button from '../../components/ui/Button';
import SectionHeading from '../../components/ui/SectionHeading';
import BlurText from '../../components/ui/BlurText';
import TypewriterText from '../../components/ui/TypewriterText';
import styles from '../../styles/faq.module.css';

const faqSections = [
  {
    id: 'delivery',
    title: 'Delivery & shipping',
    blurb: 'Everything you need to know about receiving your chilled order without breaking the chain.',
    faqs: [
      {
        question: 'How long does delivery take?',
        answer:
          'Standard local delivery typically arrives within 24–48 hours on business days. Delivery windows are confirmed once your order is packed and may shift slightly during peak seasons or public holidays.',
      },
      {
        question: 'How is the cold-chain maintained?',
        answer:
          'Orders leave our 0–4°C staging rooms in insulated totes, then travel in temperature-controlled vehicles. Drivers capture a temperature reading at pickup and drop-off so you can review the journey inside your order history.',
      },
      {
        question: 'What areas do you deliver to?',
        answer:
          'We currently serve major city zones and select suburban clusters. If you fall outside our coverage, you can place an order for pickup at one of our flagship outlets or request a concierge transfer (subject to slot availability).',
      },
    ],
  },
  {
    id: 'orders',
    title: 'Ordering & payment',
    blurb: 'Guidelines for placing, editing, and paying for orders — whether you are a household or a business buyer.',
    faqs: [
      {
        question: 'What payment methods are accepted?',
        answer:
          'We accept major debit/credit cards, mobile wallets, and bank transfers. Cash on delivery is available in supported areas, and business accounts can request monthly invoicing subject to credit approval.',
      },
      {
        question: 'Can I modify or cancel my order?',
        answer:
          'Orders can be edited or cancelled until they move into dispatch. Drop us a message with your order ID as soon as possible — the fastest way is via live chat or hotline so we can intercept the order before it leaves the chiller.',
      },
      {
        question: 'Will I receive an invoice?',
        answer:
          'A digital invoice is emailed right after checkout. You can also download past invoices from the account portal or have our finance desk resend consolidated statements whenever you need them.',
      },
    ],
  },
  {
    id: 'quality',
    title: 'Product care & quality',
    blurb: 'Storage, freshness, and the safeguards we use to keep premium proteins pristine.',
    faqs: [
      {
        question: 'Are your products fresh or frozen?',
        answer:
          'Most catalogue items are delivered fresh and chilled. Select specialty cuts ship frozen to preserve quality; those items are clearly marked online along with thawing instructions and best-before guidance.',
      },
      {
        question: 'How should I store my order after delivery?',
        answer:
          'Move chilled items directly into refrigeration between 0–4°C. Anything you plan to cook later than 48 hours should be frozen immediately. Always keep raw proteins on the lowest shelf and sealed to prevent cross-contamination.',
      },
      {
        question: 'What if an item arrives damaged or warm?',
        answer:
          'Notify support within 12 hours and include photos of the product and packaging. We will audit the delivery log, arrange a replacement or refund, and investigate the route to prevent repeats.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Returns & concierge support',
    blurb: 'Whenever something goes off-script, our specialists are ready to help — online or in person.',
    faqs: [
      {
        question: 'Do you offer returns or exchanges?',
        answer:
          'Perishable goods are not typically returnable, but we guarantee quality. If something is wrong, contact us and we will credit, replace, or schedule a pickup depending on the situation.',
      },
      {
        question: 'How can I reach customer support quickly?',
        answer:
          'For urgent matters, call 09613-777444 or start a WhatsApp conversation. The support inbox is monitored around the clock, but live channels resolve most cases under 10 minutes.',
      },
    ],
  },
];

const assurances = [
  {
    title: 'Certified cold-chain',
    copy: 'ISO 22000 & HACCP protocols govern our processing, packaging, and transport so every product arrives factory-fresh.',
  },
  {
    title: 'Traceable sourcing',
    copy: 'Each pack includes batch provenance, slaughter dates, and nutrition markers you can verify from your account dashboard.',
  },
  {
    title: 'Responsive partners',
    copy: 'Dedicated account managers support restaurants, hotels, and modern retailers with demand planning and menu engineering.',
  },
  {
    title: 'Sustainable promise',
    copy: 'We consolidate deliveries, optimise routes, and use recyclable packaging to lower the footprint of every chilled journey.',
  },
];

const supportChannels = [
  {
    title: 'Concierge hotline',
    copy: 'Ideal for urgent delivery tracking, order edits, or bespoke prep requests. Routes you to a senior support executive immediately.',
    icon: '☎',
    action: { label: 'Call 09613-777444', href: 'tel:09613777444' },
    helper: 'Available 9am – 10pm, including weekends',
  },
  {
    title: 'WhatsApp retail desk',
    copy: 'Share a grocery list, confirm outlet stock, or upload photos for product advice. Expect a response in under 10 minutes.',
    icon: '💬',
    action: { label: 'Message us', href: 'https://wa.me/8801711000000' },
    helper: 'Live chat support 7 days a week',
  },
  {
    title: 'Email care team',
    copy: 'For documentation, invoices, or partnership enquiries, drop us an email and receive a detailed follow-up within one business day.',
    icon: '✉',
    action: { label: 'support@shukriameat.com', href: 'mailto:support@shukriameat.com' },
    helper: 'Priority escalation for subscribed partners',
  },
];

const timeline = [
  {
    title: 'Place your order',
    copy: 'Browse the range, confirm your preferred delivery window, and add any prep notes for our butchers.',
  },
  {
    title: 'Chilled preparation',
    copy: 'Products are portioned, vacuum-sealed, and labelled with QR-backed traceability inside 0–4°C clean rooms.',
  },
  {
    title: 'Temperature logged dispatch',
    copy: 'Your insulated tote is sealed, tagged, and the courier snaps a temperature reading before loading into the van.',
  },
  {
    title: 'Hand-off & follow-up',
    copy: 'The driver confirms your OTP, hands over the chilled tote, and our system emails handling tips plus care reminders.',
  },
];

export default function FAQPage() {
  return (
    <section className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <BlurText
              as="p"
              className={styles.kicker}
              text="Support knowledge base"
              animateBy="letters"
              direction="top"
              delay={60}
              stepDuration={0.24}
            />
            <BlurText
              as="h1"
              className={styles.heroTitle}
              text="Answers tailored to your journey"
              animateBy="words"
              direction="bottom"
              delay={120}
              stepDuration={0.34}
            />
            <TypewriterText
              as="p"
              className={styles.heroSubhead}
              text="From delivery slots to provenance, explore the details that matter most to households and hospitality partners alike."
              speed={26}
              startDelay={220}
            />
            <TypewriterText
              as="p"
              className={styles.heroNote}
              text="Need something specific? Reach out via hotline or WhatsApp and we will create a playbook for your team."
              speed={26}
              startDelay={4600}
            />
          </div>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.faqGrid}>
            {faqSections.map((group) => (
              <article key={group.id} className={styles.faqGroup} aria-labelledby={`${group.id}-heading`}>
                <header>
                  <h3 id={`${group.id}-heading`}>{group.title}</h3>
                  <p>{group.blurb}</p>
                </header>
                <div className={styles.accordion}>
                  {group.faqs.map((faq) => (
                    <details key={faq.question} className={styles.item}>
                      <summary>
                        <span>{faq.question}</span>
                        <span className={styles.toggleIcon} aria-hidden="true"></span>
                      </summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.sectionHead}>
            <SectionHeading
              title="The promises behind every order"
              subtitle="These operating principles shape how we source, portion, pack, and deliver Shukria Meat products."
            />
          </div>
          <section className={styles.assuranceGrid} aria-label="Service assurances">
            {assurances.map((item) => (
              <article key={item.title} className={styles.assuranceCard}>
                <strong>{item.title}</strong>
                <p>{item.copy}</p>
              </article>
            ))}
          </section>

          <div className={styles.timeline}>
            <div className={styles.sectionHead}>
              <SectionHeading
                title="From order to doorstep"
                subtitle="Understand the journey your chilled selections take so you can plan menus and storage with confidence."
              />
            </div>
            <div className={styles.timelineList}>
              {timeline.map((step, index) => (
                <div key={step.title} className={styles.timelineItem}>
                  <span className={styles.timelineBadge}>{index + 1}</span>
                  <strong>{step.title}</strong>
                  <p>{step.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sectionHead}>
            <SectionHeading
              title="Speak with a specialist"
              subtitle="Our concierge desks stay online so you can request documentation, adjust deliveries, or plan seasonal menus."
            />
          </div>
          <section className={styles.supportGrid} aria-label="Support channels">
            {supportChannels.map((channel) => (
              <article key={channel.title} className={styles.supportCard}>
                <header>
                  <span className={styles.supportIcon} aria-hidden="true">
                    {channel.icon}
                  </span>
                  <div>
                    <h4>{channel.title}</h4>
                    <p>{channel.copy}</p>
                  </div>
                </header>
                <div>
                  <Button href={channel.action.href} variant="secondary">
                    {channel.action.label}
                  </Button>
                  <p className={styles.supportHelper}>{channel.helper}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
    </section>
  );
}
