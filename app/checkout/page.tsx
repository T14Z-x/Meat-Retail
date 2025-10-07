"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { appendOrder, StoredOrder, StoredOrderItem } from '../../lib/ordersStorage';
import styles from '../../styles/checkout.module.css';
import formStyles from '../../styles/forms.module.css';

type PaymentMethod = {
  id: string;
  title: string;
  lead: string;
  badges: string[];
  details: string;
};

type FieldSpec = {
  id: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'tel' | 'email' | 'number';
  required?: boolean;
  hint?: string;
  inputMode?: 'numeric' | 'tel' | 'decimal';
  autoComplete?: string;
  options?: Array<{ value: string; label: string }>;
};

type PaymentFormState = Record<PaymentMethod['id'], Record<string, string>>;

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cod',
    title: 'Cash on Delivery (COD)',
    lead: 'Settle the invoice in cash when your order arrives at your outlet.',
    badges: ['Dhaka & Chattogram'],
    details: 'Our riders provide sealed invoices and collect cash upon delivery. Ideal for teams that reconcile payments at the point of receipt.',
  },
  {
    id: 'bkash',
    title: 'bKash Merchant Payment',
    lead: 'Pay instantly using your bKash wallet through our merchant gateway.',
    badges: ['Instant confirmation', 'No extra fee'],
    details: 'You will be redirected to the bKash checkout window to authorise the payment securely. Confirmation is shared immediately with our logistics desk.',
  },
  {
    id: 'nagad',
    title: 'Nagad & Rocket wallets',
    lead: 'Mobile wallet checkout via SSLCommerz with Nagad or Dutch-Bangla Rocket.',
    badges: ['SSLCommerz secure'],
    details: 'Select the mobile wallet of your choice on the gateway page. A payment receipt is emailed as soon as the transaction completes.',
  },
  {
    id: 'card',
    title: 'Visa / Mastercard / Amex',
    lead: 'Corporate and international cards supported via SSLCommerz & ShurjoPay.',
    badges: ['3D Secure'],
    details: 'Perfect for finance teams that prefer reconcilable online transactions. Supports both local and international cards with 3D Secure verification.',
  },
  {
    id: 'bank-transfer',
    title: 'Bank transfer (BEFTN or RTGS)',
    lead: 'Settle via bank transfer to Shukria Meat accounts at BRAC Bank or City Bank.',
    badges: ['Proforma invoice'],
    details: 'We issue a proforma invoice and dispatch once the transfer is received. Share the transfer slip with accounts@shukriameat.com for faster release.',
  },
];

const DEFAULT_PAYMENT_METHOD_ID = PAYMENT_METHODS[0]?.id ?? 'cod';

const PAYMENT_FIELDS: Record<PaymentMethod['id'], FieldSpec[]> = {
  cod: [
    {
      id: 'recipientName',
      label: 'Recipient contact',
      placeholder: 'Who will accept the delivery?',
      required: true,
      autoComplete: 'name',
    },
    {
      id: 'recipientPhone',
      label: 'Mobile number',
      placeholder: 'e.g. 01XXXXXXXXX',
      required: true,
      type: 'tel',
      inputMode: 'tel',
      autoComplete: 'tel',
      hint: 'Use an active Bangladeshi number so our rider can reach you.',
    },
    {
      id: 'deliveryNotes',
      label: 'Delivery notes',
      placeholder: 'Optional instructions for security or receiving team',
    },
  ],
  bkash: [
    {
      id: 'walletNumber',
      label: 'bKash wallet number',
      placeholder: '11 digit wallet number',
      required: true,
      type: 'tel',
      inputMode: 'tel',
      autoComplete: 'tel',
    },
    {
      id: 'transactionId',
      label: 'bKash transaction ID',
      placeholder: 'e.g. AB12CD34EF',
      required: true,
      hint: 'You will get this in the bKash confirmation SMS.',
    },
    {
      id: 'contactEmail',
      label: 'Accounts email',
      placeholder: 'finance@company.com',
      type: 'email',
      autoComplete: 'email',
      hint: 'We send a VAT invoice to this address once payment is verified.',
    },
  ],
  nagad: [
    {
      id: 'walletProvider',
      label: 'Wallet provider',
      required: true,
      options: [
        { value: 'nagad', label: 'Nagad' },
        { value: 'rocket', label: 'Rocket (DBBL)' },
      ],
    },
    {
      id: 'walletNumber',
      label: 'Wallet number',
      placeholder: 'e.g. 01XXXXXXXXX',
      required: true,
      type: 'tel',
      inputMode: 'tel',
    },
    {
      id: 'transactionReference',
      label: 'Gateway transaction reference',
      placeholder: 'Reference from SSLCommerz receipt',
      required: true,
    },
  ],
  card: [
    {
      id: 'cardHolder',
      label: 'Cardholder name',
      placeholder: 'Name on card',
      required: true,
      autoComplete: 'cc-name',
    },
    {
      id: 'cardLastDigits',
      label: 'Card number (last 4 digits)',
      placeholder: 'e.g. 1234',
      required: true,
      type: 'text',
      inputMode: 'numeric',
      hint: 'For security, we only record the last four digits.',
    },
    {
      id: 'cardExpiry',
      label: 'Expiry month & year',
      placeholder: 'MM/YY',
      required: true,
      autoComplete: 'cc-exp',
    },
    {
      id: 'financeContact',
      label: 'Finance contact email',
      placeholder: 'accounts@company.com',
      type: 'email',
      autoComplete: 'email',
      required: true,
    },
  ],
  'bank-transfer': [
    {
      id: 'bank',
      label: 'Preferred bank',
      required: true,
      options: [
        { value: 'brac', label: 'BRAC Bank Limited' },
        { value: 'city', label: 'The City Bank Limited' },
        { value: 'ebl', label: 'Eastern Bank Limited' },
      ],
    },
    {
      id: 'transferReference',
      label: 'Transfer reference / UTR',
      placeholder: 'e.g. BRAC2025-000123',
      required: true,
    },
    {
      id: 'remittanceDate',
      label: 'Transfer date',
      placeholder: 'DD/MM/YYYY',
      required: true,
    },
    {
      id: 'accountsContact',
      label: 'Accounts team contact',
      placeholder: 'Name or email for payment confirmation',
    },
  ],
};

const createInitialFormState = (): PaymentFormState =>
  PAYMENT_METHODS.reduce<PaymentFormState>((acc, method) => {
    acc[method.id] = (PAYMENT_FIELDS[method.id] ?? []).reduce<Record<string, string>>((fields, field) => {
      fields[field.id] = '';
      return fields;
    }, {} as Record<string, string>);
    return acc;
  }, {} as PaymentFormState);

const createOrderId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `BM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  }
  return `BM-${Date.now().toString(36).toUpperCase()}`;
};

const formatUsd = (amount: number) => `$${amount.toFixed(2)}`;

const parsePriceValue = (price: string): number => {
  if (!price) return 0;
  const numeric = Number.parseFloat(price.replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
};

const GATEWAY_GROUPS = [
  {
    title: 'Mobile wallets',
    items: ['bKash Merchant', 'Nagad Gateway', 'Rocket (DBBL)'],
  },
  {
    title: 'Online gateways',
    items: ['SSLCommerz', 'ShurjoPay', 'PortWallet'],
  },
  {
    title: 'Banking partners',
    items: ['BRAC Bank Limited', 'The City Bank Limited', 'Eastern Bank Limited'],
  },
];

const EXCHANGE_RATE_BDT = 110;
const DELIVERY_FEE_BDT = 250;

const formatBdt = (amount: number) =>
  `BDT ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod['id']>(DEFAULT_PAYMENT_METHOD_ID);
  const [formState, setFormState] = useState<PaymentFormState>(() => createInitialFormState());
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastOrder, setLastOrder] = useState<StoredOrder | null>(null);
  const [lastOrderMessage, setLastOrderMessage] = useState<string | null>(null);
  const hasItems = items.length > 0;
  const submitTimerRef = useRef<number | null>(null);

  const { subtotalBdt, deliveryFeeBdt, totalBdt } = useMemo(() => {
    if (!hasItems) {
      return { subtotalBdt: 0, deliveryFeeBdt: 0, totalBdt: 0 };
    }
    const subtotal = totalPrice * EXCHANGE_RATE_BDT;
    const delivery = DELIVERY_FEE_BDT;
    return {
      subtotalBdt: subtotal,
      deliveryFeeBdt: delivery,
      totalBdt: subtotal + delivery,
    };
  }, [hasItems, totalPrice]);

  const handleFieldChange = (methodId: PaymentMethod['id'], fieldId: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [methodId]: {
        ...prev[methodId],
        [fieldId]: value,
      },
    }));
    setStatus(null);
  };

  useEffect(() => {
    if (items.length > 0) {
      setLastOrder(null);
      setLastOrderMessage(null);
    }
  }, [items.length]);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        window.clearTimeout(submitTimerRef.current);
        submitTimerRef.current = null;
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setStatus(null);

    if (!hasItems) {
      setStatus({ type: 'error', message: 'Add products to your cart before confirming checkout.' });
      return;
    }

    const methodFields = PAYMENT_FIELDS[selectedMethod] ?? [];
    const requiredFields = methodFields.filter((field) => field.required);
    const methodValues = formState[selectedMethod] ?? {};
    const missing = requiredFields.filter((field) => !methodValues[field.id]?.trim());

    if (missing.length > 0) {
      const labels = missing.map((field) => field.label);
      const missingList =
        labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} and ${labels.slice(-1)}`;
      setStatus({ type: 'error', message: `Please provide ${missingList}.` });
      return;
    }

    if (!user?.email) {
      setStatus({
        type: 'error',
        message: 'Please sign in before confirming checkout so we can save your order history.',
      });
      return;
    }

    setIsSubmitting(true);
    setLastOrder(null);
    setLastOrderMessage(null);

    const methodTitle = PAYMENT_METHODS.find((method) => method.id === selectedMethod)?.title ?? 'the selected method';
    const paymentDetails = methodFields
      .map((field) => ({ label: field.label, value: (methodValues[field.id] ?? '').trim() }))
      .filter((entry) => entry.value.length > 0);

    const orderItems: StoredOrderItem[] = items.map((item) => {
      const unit = parsePriceValue(item.price);
      const subtotal = unit * item.quantity;
      return {
        slug: item.slug,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal,
        subtotalFormatted: formatUsd(subtotal),
      };
    });

    const merchandiseTotal = orderItems.reduce((sum, line) => sum + line.subtotal, 0);
    const orderId = createOrderId();
    const orderRecord: StoredOrder = {
      id: orderId,
      email: user.email,
      createdAt: new Date().toISOString(),
      status: 'processing',
      total: merchandiseTotal,
      totalFormatted: formatUsd(merchandiseTotal),
      paymentMethod: methodTitle,
      paymentMethodId: selectedMethod,
      paymentDetails,
      items: orderItems,
    };

    if (submitTimerRef.current) {
      window.clearTimeout(submitTimerRef.current);
      submitTimerRef.current = null;
    }

    submitTimerRef.current = window.setTimeout(() => {
      try {
        appendOrder(orderRecord);
        clearCart();
        setFormState(createInitialFormState());
        const confirmationCopy = `Order ${orderId} confirmed. You can review it anytime under Account → Orders.`;
        setLastOrder(orderRecord);
        setLastOrderMessage(confirmationCopy);
      } catch (error) {
        console.error('Failed to append order', error);
        setStatus({
          type: 'error',
          message: 'We could not finalise your order locally. Please try again.',
        });
      } finally {
        setIsSubmitting(false);
        submitTimerRef.current = null;
      }
    }, 1100);
  };

  const renderField = (methodId: PaymentMethod['id'], field: FieldSpec) => {
    const fieldId = `${methodId}-${field.id}`;
    const value = formState[methodId]?.[field.id] ?? '';
    return (
      <div key={field.id} className={formStyles.field}>
        <label htmlFor={fieldId} className={formStyles.label}>
          {field.label}
          {field.required ? (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        {field.options ? (
          <select
            id={fieldId}
            name={fieldId}
            value={value}
            onChange={(event) => handleFieldChange(methodId, field.id, event.target.value)}
            className={formStyles.select}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={fieldId}
            name={fieldId}
            type={field.type ?? 'text'}
            value={value}
            placeholder={field.placeholder}
            onChange={(event) => handleFieldChange(methodId, field.id, event.target.value)}
            className={formStyles.input}
            required={field.required}
            inputMode={field.inputMode}
            autoComplete={field.autoComplete}
          />
        )}
        {field.hint ? <p className={formStyles.hint}>{field.hint}</p> : null}
      </div>
    );
  };

  return (
    <Container>
      <div className={styles.page}>
        <SectionHeading
          title="Checkout"
          subtitle="Review your wholesale order, confirm delivery preferences and choose how you would like to pay."
        />

        {!hasItems ? (
          lastOrder ? (
            <div className={[styles.card, styles.cardSuccess].join(' ')} role="status">
              <div className={styles.cardSuccessHeader}>
                <div>
                  <h3 className={styles.cardTitle}>Order confirmed</h3>
                  <p className={styles.copy}>{lastOrderMessage ?? 'We have captured your order and will reconfirm shortly.'}</p>
                </div>
                <span className={styles.cardSuccessBadge}>{lastOrder.id}</span>
              </div>
              <div className={styles.cardSuccessMeta}>
                <div>
                  <span className={styles.cardSuccessLabel}>Total</span>
                  <p className={styles.cardSuccessValue}>{lastOrder.totalFormatted}</p>
                </div>
                <div>
                  <span className={styles.cardSuccessLabel}>Payment</span>
                  <p className={styles.cardSuccessValue}>{lastOrder.paymentMethod}</p>
                </div>
                <div>
                  <span className={styles.cardSuccessLabel}>Items</span>
                  <p className={styles.cardSuccessValue}>{lastOrder.items.length}</p>
                </div>
              </div>
              <div className={styles.cardSuccessActions}>
                <Button href="/account" variant="primary">
                  View orders
                </Button>
                <Button href="/products" variant="secondary">
                  Continue shopping
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.card} role="status">
              <h3 className={styles.cardTitle}>Your cart is empty</h3>
              <p className={styles.copy}>
                Add products to your cart to start a checkout. Browse our full range in the{' '}
                <Link href="/products">product catalogue</Link> or explore seasonal offers on the{' '}
                <Link href="/categories">category pages</Link>.
              </p>
            </div>
          )
        ) : (
          <div className={styles.layout}>
            <div className={styles.primary}>
              {isSubmitting ? (
                <div className={[styles.card, styles.cardProgress].join(' ')} role="status" aria-live="polite">
                  <div className={styles.progressAnimation} aria-hidden="true">
                    <div className={styles.progressRoad}>
                      <span className={styles.progressVehicle} />
                    </div>
                  </div>
                  <div className={styles.progressCopy}>
                    <h3 className={styles.cardTitle}>Notifying logistics</h3>
                    <p className={styles.copy}>
                      Sit tight—your order is already on the move. Our cold-chain team is lining up a chilled dispatch window for you.
                    </p>
                  </div>
                </div>
              ) : null}
              <form className={[styles.card, styles.paymentForm].join(' ')} onSubmit={handleSubmit} noValidate>
                <header className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>Payment preferences</h3>
                    <p className={styles.copy}>
                      We support the most widely used payment rails in Bangladesh. Select how you would like to confirm this order.
                    </p>
                  </div>
                  <span className={styles.cardBadge}>Secure checkout</span>
                </header>
                {status ? (
                  <div
                    className={[
                      formStyles.formMessage,
                      status.type === 'error' ? formStyles.formMessageError : formStyles.formMessageSuccess,
                    ].join(' ')}
                    role={status.type === 'error' ? 'alert' : 'status'}
                  >
                    {status.message}
                  </div>
                ) : null}
                <div className={styles.paymentList}>
                  {PAYMENT_METHODS.map((method) => {
                    const methodId = method.id as PaymentMethod['id'];
                    const isActive = selectedMethod === methodId;
                    return (
                      <div
                        key={method.id}
                        className={[
                          styles.paymentOption,
                          isActive ? styles.paymentOptionActive : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <label htmlFor={`payment-${method.id}`} className={styles.paymentChoice}>
                          <input
                            id={`payment-${method.id}`}
                            type="radio"
                            name="payment-method"
                            value={method.id}
                            checked={isActive}
                            onChange={() => {
                              setSelectedMethod(methodId);
                              setStatus(null);
                            }}
                          />
                          <div className={styles.paymentCopy}>
                            <div className={styles.paymentHeading}>
                              <span className={styles.paymentTitle}>{method.title}</span>
                              <div className={styles.badgeRow}>
                                {method.badges.map((badge) => (
                                  <span key={badge} className={styles.badge}>
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className={styles.paymentLead}>{method.lead}</p>
                            <p className={styles.paymentDetails}>{method.details}</p>
                          </div>
                        </label>
                        {isActive ? (
                          <div className={styles.methodForm}>
                            {(PAYMENT_FIELDS[methodId] ?? []).map((field) => renderField(methodId, field))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.confirmNote}>
                  <strong>Need an invoice with VAT?</strong> Let our support team know during the confirmation call and we will email a VAT-signed copy within one business day.
                </div>
                <div className={styles.actions}>
                  <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                    {isSubmitting ? 'Notifying logistics…' : 'Confirm order & notify logistics'}
                  </Button>
                  <span className={styles.helperText}>We call within 10 minutes to verify delivery window and payment.</span>
                </div>
              </form>

              <section className={styles.card}>
                <h3 className={styles.cardTitle}>Delivery &amp; support</h3>
                <ul className={styles.benefits}>
                  <li>Cold-chain delivery across Dhaka and Chattogram within 24 hours.</li>
                  <li>Dedicated wholesale hotline: <a href="tel:+8809612344321">+880 9612-344-321</a>.</li>
                  <li>Service hours: 7:00 AM – 10:00 PM, 7 days a week including public holidays.</li>
                </ul>
              </section>
            </div>

            <aside className={styles.sidebar}>
              <section className={styles.card}>
                <h3 className={styles.cardTitle}>Order summary</h3>
                <ul className={styles.orderList}>
                  {items.map((item) => {
                    const unitPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                    const totalForItem = unitPrice * item.quantity * EXCHANGE_RATE_BDT;
                    return (
                      <li key={item.slug} className={styles.orderItem}>
                        <div>
                          <span className={styles.orderItemName}>{item.name}</span>
                          <span className={styles.orderItemMeta}>
                            {item.quantity} × {item.price}
                          </span>
                        </div>
                        <span className={styles.orderItemTotal}>{formatBdt(totalForItem)}</span>
                      </li>
                    );
                  })}
                </ul>
                <dl className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <dt>Subtotal</dt>
                    <dd>{formatBdt(subtotalBdt)}</dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt>Chilled delivery</dt>
                    <dd>{formatBdt(deliveryFeeBdt)}</dd>
                  </div>
                  <div className={[styles.summaryRow, styles.summaryTotal].join(' ')}>
                    <dt>Total due</dt>
                    <dd>{formatBdt(totalBdt)}</dd>
                  </div>
                </dl>
                <p className={styles.currencyNote}>
                  Conversion shown at Shukria Meat wholesale rate of BDT {EXCHANGE_RATE_BDT} per USD. Final invoice lists figures in Bangladeshi Taka.
                </p>
              </section>

              <section className={styles.card}>
                <h3 className={styles.cardTitle}>Available gateways</h3>
                <div className={styles.gatewayGroups}>
                  {GATEWAY_GROUPS.map((group) => (
                    <div key={group.title} className={styles.gatewayGroup}>
                      <h4>{group.title}</h4>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        )}
      </div>
    </Container>
  );
}
