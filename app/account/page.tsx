"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { findUser, saveUser, StoredUser } from '../../lib/authStorage';
import { getOrdersForUser, ORDERS_STORAGE_KEY, StoredOrder } from '../../lib/ordersStorage';
import styles from '../../styles/account.module.css';

const tabs = [
  { id: 'account', label: 'Account Information' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'orders', label: 'Orders' },
] as const;

type TabId = (typeof tabs)[number]['id'];

type YesNo = 'yes' | 'no';

const divisionOptions = [
  'Dhaka',
  'Chattogram',
  'Khulna',
  'Rajshahi',
  'Rangpur',
  'Sylhet',
  'Barishal',
  'Mymensingh',
] as const;

const deliveryWindowOptions = [
  'Early Morning (6am – 9am)',
  'Late Morning (9am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Evening (4pm – 8pm)',
] as const;

const yesNoOptions = [
  { value: 'yes' as YesNo, label: 'Yes' },
  { value: 'no' as YesNo, label: 'No' },
];

export default function AccountPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('account');
  const [profile, setProfile] = useState<StoredUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!user?.email) {
      setProfile(null);
      setLoadingProfile(false);
      return;
    }
    setLoadingProfile(true);
    const stored = findUser(user.email);
    setProfile(stored ?? null);
    setLoadingProfile(false);
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (!user?.email) {
      setOrders([]);
      setLoadingOrders(false);
      return;
    }

    const syncOrders = () => {
      setOrders(getOrdersForUser(user.email));
      setLoadingOrders(false);
    };

    setLoadingOrders(true);
    syncOrders();

    if (typeof window === 'undefined') return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== ORDERS_STORAGE_KEY) return;
      syncOrders();
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [hydrated, user?.email]);

  const tabContent = useMemo(() => {
    if (!profile) {
      return (
        <div className={styles.panelCard}>
          <p className={styles.emptyCopy}>
            We couldn&apos;t load your account details. Please try signing out and signing back in.
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'account':
        return <AccountInfo profile={profile} onProfileChange={(next) => setProfile(next)} />;
      case 'addresses':
        return <AddressInfo profile={profile} onProfileChange={(next) => setProfile(next)} />;
      case 'orders':
        return <OrdersPanel orders={orders} loading={loadingOrders} />;
      default:
        return null;
    }
  }, [activeTab, profile, orders, loadingOrders]);

  if (!hydrated) {
    return null;
  }

  if (!user) {
    return (
      <Container>
        <div className={styles.page}>
          <SectionHeading title="Your account" subtitle="Sign in to view your saved business details." />
          <div className={styles.panelCard}>
            <p className={styles.emptyCopy}>
              You need to be logged in to view this page. <Link href="/login">Go to login</Link>.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.page}>
        <SectionHeading
          title={`Welcome back, ${user.name ?? 'there'}`}
          subtitle="Review the business details you shared during signup."
        />

        <div className={styles.tabList} role="tablist" aria-label="Account sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              className={activeTab === tab.id ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
          className={styles.panel}
        >
          {loadingProfile ? <LoadingPanel /> : tabContent}
        </div>
      </div>
    </Container>
  );
}

type ProfileProps = {
  profile: StoredUser;
  className?: string;
  onProfileChange?: (next: StoredUser) => void;
};

type DeliveryFormState = {
  deliveryAddress: string;
  area: string;
  division: string;
  district: string;
  postalCode: string;
  deliveryWindow: string;
  coldStorage: string;
  hasHalal: YesNo;
};

type ShippingFormState = {
  shippingAddress: string;
  shippingArea: string;
  shippingDivision: string;
  shippingDistrict: string;
  shippingPostalCode: string;
  shippingDeliveryWindow: string;
  shippingColdStorage: string;
  shippingHasHalal: YesNo;
};

type OrdersPanelProps = {
  orders: StoredOrder[];
  loading: boolean;
};

function AccountInfo({ profile, onProfileChange }: ProfileProps) {
  const businessFields = [
    { label: 'Business name', value: profile.businessName },
    { label: 'Business type', value: profile.businessType },
    { label: 'Trade license', value: profile.tradeLicense },
    { label: 'Years operating', value: profile.yearsOperating },
    { label: 'Website or social', value: profile.onlinePresence },
  ];

  const contactFields = [
    { label: 'Primary contact', value: profile.contactName },
    { label: 'Role / designation', value: profile.contactRole },
    { label: 'Mobile number', value: profile.contactPhone },
    { label: 'Secondary / WhatsApp', value: profile.contactWhatsapp },
    { label: 'Business email', value: profile.contactEmail },
    { label: 'Preferred contact time', value: profile.contactTime },
  ];

  return (
    <div className={styles.panelStack}>
      <div className={styles.panelCard}>
        <h3 className={styles.panelTitle}>Business profile</h3>
        <FieldGrid fields={businessFields} />
      </div>
      <div className={styles.panelCard}>
        <h3 className={styles.panelTitle}>Primary contact</h3>
        <FieldGrid fields={contactFields} />
      </div>
      <ChangePasswordCard profile={profile} onProfileChange={onProfileChange} />
    </div>
  );
}

function AddressInfo({ profile, className, onProfileChange }: ProfileProps) {
  const containerClass = [styles.panelStack, className].filter(Boolean).join(' ');

  const initialDeliveryState = (): DeliveryFormState => ({
    deliveryAddress: profile.deliveryAddress ?? '',
    area: profile.area ?? '',
    division: profile.division ?? '',
    district: profile.district ?? '',
    postalCode: profile.postalCode ?? '',
    deliveryWindow: profile.deliveryWindow ?? '',
    coldStorage: profile.coldStorage ?? '',
    hasHalal: profile.hasHalal ? 'yes' : 'no',
  });

  const initialShippingState = (): ShippingFormState => ({
    shippingAddress: profile.shippingAddress ?? profile.deliveryAddress ?? '',
    shippingArea: profile.shippingArea ?? profile.area ?? '',
    shippingDivision: profile.shippingDivision ?? profile.division ?? '',
    shippingDistrict: profile.shippingDistrict ?? profile.district ?? '',
    shippingPostalCode: profile.shippingPostalCode ?? profile.postalCode ?? '',
    shippingDeliveryWindow: profile.shippingDeliveryWindow ?? profile.deliveryWindow ?? '',
    shippingColdStorage: profile.shippingColdStorage ?? profile.coldStorage ?? '',
    shippingHasHalal:
      typeof profile.shippingHasHalal === 'boolean'
        ? profile.shippingHasHalal
          ? 'yes'
          : 'no'
        : profile.hasHalal
        ? 'yes'
        : 'no',
  });

  const [deliveryEditing, setDeliveryEditing] = useState(false);
  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormState>(initialDeliveryState);
  const [deliverySubmitting, setDeliverySubmitting] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [deliveryMessage, setDeliveryMessage] = useState('');

  const [shippingEditing, setShippingEditing] = useState(false);
  const [shippingForm, setShippingForm] = useState<ShippingFormState>(initialShippingState);
  const [shippingSubmitting, setShippingSubmitting] = useState(false);
  const [shippingStatus, setShippingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [shippingMessage, setShippingMessage] = useState('');

  useEffect(() => {
    setDeliveryForm(initialDeliveryState());
    setShippingForm(initialShippingState());
  }, [profile]);

  const addressFields = useMemo(
    () => [
      { label: 'Street address', value: profile.deliveryAddress },
      { label: 'Area / Thana', value: profile.area },
      { label: 'Division', value: profile.division },
      { label: 'District', value: profile.district },
      { label: 'Postal code', value: profile.postalCode },
      { label: 'Preferred delivery window', value: profile.deliveryWindow },
      { label: 'Cold storage available', value: profile.coldStorage },
      {
        label: 'Halal documents requested',
        value:
          typeof profile.hasHalal === 'boolean'
            ? profile.hasHalal
              ? 'Yes'
              : 'No'
            : undefined,
      },
    ],
    [profile]
  );

  const shippingFields = useMemo(() => {
    const withFallback = (value?: string | null, fallback?: string | null) => {
      const trimmed = value?.trim();
      if (trimmed) return trimmed;
      const fallbackTrimmed = fallback?.trim();
      if (fallbackTrimmed) return fallbackTrimmed;
      return 'Same as delivery';
    };

    const shippingHalalLabel =
      typeof profile.shippingHasHalal === 'boolean'
        ? profile.shippingHasHalal
          ? 'Yes'
          : 'No'
        : typeof profile.hasHalal === 'boolean'
        ? profile.hasHalal
          ? 'Yes'
          : 'No'
        : 'Same as delivery';

    return [
      { label: 'Street address', value: withFallback(profile.shippingAddress, profile.deliveryAddress) },
      { label: 'Area / Thana', value: withFallback(profile.shippingArea, profile.area) },
      { label: 'Division', value: withFallback(profile.shippingDivision, profile.division) },
      { label: 'District', value: withFallback(profile.shippingDistrict, profile.district) },
      { label: 'Postal code', value: withFallback(profile.shippingPostalCode, profile.postalCode) },
      {
        label: 'Preferred delivery window',
        value: withFallback(profile.shippingDeliveryWindow, profile.deliveryWindow),
      },
      { label: 'Cold storage available', value: withFallback(profile.shippingColdStorage, profile.coldStorage) },
      { label: 'Halal documents requested', value: shippingHalalLabel },
    ];
  }, [profile]);

  const toOptional = (value: string) => {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
  };

  const handleDeliveryToggle = () => {
    if (deliveryEditing) {
      setDeliveryEditing(false);
      setDeliveryForm(initialDeliveryState());
      setDeliveryStatus('idle');
      setDeliveryMessage('');
      return;
    }
    setDeliveryEditing(true);
    setDeliveryStatus('idle');
    setDeliveryMessage('');
  };

  const handleShippingToggle = () => {
    if (shippingEditing) {
      setShippingEditing(false);
      setShippingForm(initialShippingState());
      setShippingStatus('idle');
      setShippingMessage('');
      return;
    }
    setShippingEditing(true);
    setShippingStatus('idle');
    setShippingMessage('');
  };

  const handleDeliveryChange = (field: keyof DeliveryFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = event.target;
      setDeliveryForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleShippingChange = (field: keyof ShippingFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = event.target;
      setShippingForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleDeliverySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deliverySubmitting) return;

    setDeliveryStatus('idle');
    setDeliveryMessage('');
    setDeliverySubmitting(true);

    const updatedProfile: StoredUser = {
      ...profile,
      deliveryAddress: toOptional(deliveryForm.deliveryAddress),
      area: toOptional(deliveryForm.area),
      division: toOptional(deliveryForm.division),
      district: toOptional(deliveryForm.district),
      postalCode: toOptional(deliveryForm.postalCode),
      deliveryWindow: toOptional(deliveryForm.deliveryWindow),
      coldStorage: toOptional(deliveryForm.coldStorage),
      hasHalal: deliveryForm.hasHalal === 'yes',
    };

    try {
      saveUser(updatedProfile);
      onProfileChange?.(updatedProfile);
      setDeliveryStatus('success');
      setDeliveryMessage('Delivery address updated.');
      setDeliveryEditing(false);
    } catch (error) {
      console.error('Failed to update delivery address', error);
      setDeliveryStatus('error');
      setDeliveryMessage('Unable to update delivery address. Please try again.');
    } finally {
      setDeliverySubmitting(false);
    }
  };

  const handleShippingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (shippingSubmitting) return;

    setShippingStatus('idle');
    setShippingMessage('');
    setShippingSubmitting(true);

    const updatedProfile: StoredUser = {
      ...profile,
      shippingAddress: toOptional(shippingForm.shippingAddress),
      shippingArea: toOptional(shippingForm.shippingArea),
      shippingDivision: toOptional(shippingForm.shippingDivision),
      shippingDistrict: toOptional(shippingForm.shippingDistrict),
      shippingPostalCode: toOptional(shippingForm.shippingPostalCode),
      shippingDeliveryWindow: toOptional(shippingForm.shippingDeliveryWindow),
      shippingColdStorage: toOptional(shippingForm.shippingColdStorage),
      shippingHasHalal: shippingForm.shippingHasHalal === 'yes',
    };

    try {
      saveUser(updatedProfile);
      onProfileChange?.(updatedProfile);
      setShippingStatus('success');
      setShippingMessage('Shipping address updated.');
      setShippingEditing(false);
    } catch (error) {
      console.error('Failed to update shipping address', error);
      setShippingStatus('error');
      setShippingMessage('Unable to update shipping address. Please try again.');
    } finally {
      setShippingSubmitting(false);
    }
  };

  return (
    <div className={containerClass}>
      <div className={styles.panelCard}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Delivery address</h3>
          <Button type="button" variant="secondary" onClick={handleDeliveryToggle}>
            {deliveryEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
        {deliveryMessage ? (
          <p
            className={[
              styles.panelMessage,
              deliveryStatus === 'success' ? styles.panelMessageSuccess : '',
              deliveryStatus === 'error' ? styles.panelMessageError : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role={deliveryStatus === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {deliveryMessage}
          </p>
        ) : null}
        {deliveryEditing ? (
          <form className={styles.formStack} onSubmit={handleDeliverySubmit}>
            <div className={styles.formRow}>
              <label htmlFor="delivery-address" className={styles.formLabel}>
                Street address
              </label>
              <input
                id="delivery-address"
                name="deliveryAddress"
                className={styles.formInput}
                type="text"
                autoComplete="street-address"
                value={deliveryForm.deliveryAddress}
                onChange={handleDeliveryChange('deliveryAddress')}
                placeholder="Street and building details"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="delivery-area" className={styles.formLabel}>
                Area / Thana
              </label>
              <input
                id="delivery-area"
                name="area"
                className={styles.formInput}
                type="text"
                autoComplete="address-level3"
                value={deliveryForm.area}
                onChange={handleDeliveryChange('area')}
                placeholder="e.g. Banani"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="delivery-division" className={styles.formLabel}>
                Division
              </label>
              <select
                id="delivery-division"
                name="division"
                className={styles.formInput}
                value={deliveryForm.division}
                onChange={handleDeliveryChange('division')}
              >
                <option value="">Select division</option>
                {divisionOptions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formRow}>
              <label htmlFor="delivery-district" className={styles.formLabel}>
                District
              </label>
              <input
                id="delivery-district"
                name="district"
                className={styles.formInput}
                type="text"
                autoComplete="address-level2"
                value={deliveryForm.district}
                onChange={handleDeliveryChange('district')}
                placeholder="e.g. Dhaka"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="delivery-postal" className={styles.formLabel}>
                Postal code
              </label>
              <input
                id="delivery-postal"
                name="postalCode"
                className={styles.formInput}
                type="text"
                autoComplete="postal-code"
                value={deliveryForm.postalCode}
                onChange={handleDeliveryChange('postalCode')}
                placeholder="e.g. 1213"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="delivery-window" className={styles.formLabel}>
                Preferred delivery window
              </label>
              <select
                id="delivery-window"
                name="deliveryWindow"
                className={styles.formInput}
                value={deliveryForm.deliveryWindow}
                onChange={handleDeliveryChange('deliveryWindow')}
              >
                <option value="">Select window</option>
                {deliveryWindowOptions.map((window) => (
                  <option key={window} value={window}>
                    {window}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formRow}>
              <label htmlFor="delivery-cold-storage" className={styles.formLabel}>
                Cold storage available
              </label>
              <input
                id="delivery-cold-storage"
                name="coldStorage"
                className={styles.formInput}
                type="text"
                value={deliveryForm.coldStorage}
                onChange={handleDeliveryChange('coldStorage')}
                placeholder="e.g. Walk-in chiller"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="delivery-halal" className={styles.formLabel}>
                Halal documents requested
              </label>
              <select
                id="delivery-halal"
                name="hasHalal"
                className={styles.formInput}
                value={deliveryForm.hasHalal}
                onChange={handleDeliveryChange('hasHalal')}
              >
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formActions}>
              <Button type="submit" variant="primary" disabled={deliverySubmitting}>
                {deliverySubmitting ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </form>
        ) : (
          <FieldGrid fields={addressFields} />
        )}
      </div>
      <div className={styles.panelCard}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>Shipping address</h3>
          <Button type="button" variant="secondary" onClick={handleShippingToggle}>
            {shippingEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
        <p className={styles.panelNote}>
          Shipping defaults to your delivery address. Customise it if your receiving dock differs.
        </p>
        {shippingMessage ? (
          <p
            className={[
              styles.panelMessage,
              shippingStatus === 'success' ? styles.panelMessageSuccess : '',
              shippingStatus === 'error' ? styles.panelMessageError : '',
            ]
              .filter(Boolean)
              .join(' ')}
            role={shippingStatus === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            {shippingMessage}
          </p>
        ) : null}
        {shippingEditing ? (
          <form className={styles.formStack} onSubmit={handleShippingSubmit}>
            <div className={styles.formRow}>
              <label htmlFor="shipping-address" className={styles.formLabel}>
                Street address
              </label>
              <input
                id="shipping-address"
                name="shippingAddress"
                className={styles.formInput}
                type="text"
                autoComplete="shipping street-address"
                value={shippingForm.shippingAddress}
                onChange={handleShippingChange('shippingAddress')}
                placeholder="Street and building details"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="shipping-area" className={styles.formLabel}>
                Area / Thana
              </label>
              <input
                id="shipping-area"
                name="shippingArea"
                className={styles.formInput}
                type="text"
                autoComplete="shipping address-level3"
                value={shippingForm.shippingArea}
                onChange={handleShippingChange('shippingArea')}
                placeholder="e.g. Gulshan"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="shipping-division" className={styles.formLabel}>
                Division
              </label>
              <select
                id="shipping-division"
                name="shippingDivision"
                className={styles.formInput}
                value={shippingForm.shippingDivision}
                onChange={handleShippingChange('shippingDivision')}
              >
                <option value="">Select division</option>
                {divisionOptions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formRow}>
              <label htmlFor="shipping-district" className={styles.formLabel}>
                District
              </label>
              <input
                id="shipping-district"
                name="shippingDistrict"
                className={styles.formInput}
                type="text"
                autoComplete="shipping address-level2"
                value={shippingForm.shippingDistrict}
                onChange={handleShippingChange('shippingDistrict')}
                placeholder="e.g. Dhaka"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="shipping-postal" className={styles.formLabel}>
                Postal code
              </label>
              <input
                id="shipping-postal"
                name="shippingPostalCode"
                className={styles.formInput}
                type="text"
                autoComplete="shipping postal-code"
                value={shippingForm.shippingPostalCode}
                onChange={handleShippingChange('shippingPostalCode')}
                placeholder="e.g. 1212"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="shipping-window" className={styles.formLabel}>
                Preferred delivery window
              </label>
              <select
                id="shipping-window"
                name="shippingDeliveryWindow"
                className={styles.formInput}
                value={shippingForm.shippingDeliveryWindow}
                onChange={handleShippingChange('shippingDeliveryWindow')}
              >
                <option value="">Select window</option>
                {deliveryWindowOptions.map((window) => (
                  <option key={window} value={window}>
                    {window}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formRow}>
              <label htmlFor="shipping-cold-storage" className={styles.formLabel}>
                Cold storage available
              </label>
              <input
                id="shipping-cold-storage"
                name="shippingColdStorage"
                className={styles.formInput}
                type="text"
                value={shippingForm.shippingColdStorage}
                onChange={handleShippingChange('shippingColdStorage')}
                placeholder="e.g. Upright freezer"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="shipping-halal" className={styles.formLabel}>
                Halal documents requested
              </label>
              <select
                id="shipping-halal"
                name="shippingHasHalal"
                className={styles.formInput}
                value={shippingForm.shippingHasHalal}
                onChange={handleShippingChange('shippingHasHalal')}
              >
                {yesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formActions}>
              <Button type="submit" variant="primary" disabled={shippingSubmitting}>
                {shippingSubmitting ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </form>
        ) : (
          <FieldGrid fields={shippingFields} />
        )}
      </div>
    </div>
  );
}

type ChangePasswordProps = {
  profile: StoredUser;
  onProfileChange?: (next: StoredUser) => void;
};

function ChangePasswordCard({ profile, onProfileChange }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const resetAlerts = () => {
    setStatus('idle');
    setMessage('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    resetAlerts();
    setSubmitting(true);

    if (!currentPassword) {
      setStatus('error');
      setMessage('Please enter your current password.');
      setSubmitting(false);
      return;
    }

    if (profile.password && currentPassword !== profile.password) {
      setStatus('error');
      setMessage('Current password does not match our records.');
      setSubmitting(false);
      return;
    }

    if (newPassword.length < 8) {
      setStatus('error');
      setMessage('New password must be at least 8 characters long.');
      setSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('New passwords do not match.');
      setSubmitting(false);
      return;
    }

    const updatedProfile: StoredUser = {
      ...profile,
      password: newPassword,
    };

    try {
      saveUser(updatedProfile);
      onProfileChange?.(updatedProfile);
      setStatus('success');
      setMessage('Password updated securely for this demo account.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Failed to update password', error);
      setStatus('error');
      setMessage('We could not update your password. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={[styles.panelCard, styles.panelWide].join(' ')}>
      <h3 className={styles.panelTitle}>Change password</h3>
      <form className={styles.passwordForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <label htmlFor="current-password" className={styles.formLabel}>
            Current password
          </label>
          <input
            id="current-password"
            name="currentPassword"
            type="password"
            className={styles.formInput}
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            minLength={1}
            required
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="new-password" className={styles.formLabel}>
            New password
          </label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            className={styles.formInput}
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="confirm-password" className={styles.formLabel}>
            Confirm new password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            className={styles.formInput}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className={styles.formActions}>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'Updating…' : 'Update password'}
          </Button>
          {message ? (
            <p
              className={[
                styles.formMessage,
                status === 'success' ? styles.formMessageSuccess : '',
                status === 'error' ? styles.formMessageError : '',
              ]
                .filter(Boolean)
                .join(' ')}
              role={status === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {message}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

const orderStatusClassMap: Record<StoredOrder['status'], string> = {
  processing: styles.orderStatusProcessing!,
  'pending-fulfilment': styles.orderStatusPending!,
  completed: styles.orderStatusCompleted!,
};

const orderStatusLabelMap: Record<StoredOrder['status'], string> = {
  processing: 'Processing',
  'pending-fulfilment': 'Pending fulfilment',
  completed: 'Completed',
};

const formatOrderDate = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Unknown date';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  } catch (error) {
    return date.toLocaleString();
  }
};

function OrdersPanel({ orders, loading }: OrdersPanelProps) {
  if (loading) {
    return (
      <div className={styles.panelCard}>
        <h3 className={styles.panelTitle}>Recent orders</h3>
        <p className={styles.emptyCopy}>Loading your orders…</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className={styles.panelCard}>
        <h3 className={styles.panelTitle}>Recent orders</h3>
        <p className={styles.emptyCopy}>
          You haven&apos;t placed any orders yet. Once you do, they&apos;ll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.orderStack}>
      <div>
        <h3 className={styles.panelTitle}>Recent orders</h3>
        <p className={styles.panelNote}>Track the latest requests you confirmed through checkout.</p>
      </div>
      <div className={styles.orderList}>
        {orders.map((order) => {
          const statusClassName = orderStatusClassMap[order.status] ?? orderStatusClassMap.processing;
          const statusLabel = orderStatusLabelMap[order.status] ?? orderStatusLabelMap.processing;
          const paymentDetails = order.paymentDetails?.slice(0, 2) ?? [];

          return (
            <div key={order.id} className={[styles.panelCard, styles.orderCard].join(' ')}>
              <div className={styles.orderHeader}>
                <div>
                  <p className={styles.orderId}>Order {order.id}</p>
                  <p className={styles.orderMeta}>
                    {formatOrderDate(order.createdAt)} · {order.paymentMethod}
                  </p>
                </div>
                <div className={styles.orderSummary}>
                  <span className={styles.orderTotal}>{order.totalFormatted}</span>
                  <span className={[styles.orderStatus, statusClassName].join(' ')}>{statusLabel}</span>
                </div>
              </div>
              <div className={styles.orderItems}>
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.slug}`} className={styles.orderItem}>
                    <div className={styles.orderItemInfo}>
                      <p className={styles.orderItemName}>{item.name}</p>
                      <p className={styles.orderItemMeta}>
                        {item.quantity} × {item.price}
                      </p>
                    </div>
                    <span className={styles.orderItemSubtotal}>{item.subtotalFormatted}</span>
                  </div>
                ))}
              </div>
              {paymentDetails.length ? (
                <div className={styles.orderPayment}>
                  <span className={styles.orderPaymentTitle}>Payment details</span>
                  <ul className={styles.orderPaymentList}>
                    {paymentDetails.map((detail) => (
                      <li key={detail.label} className={styles.orderPaymentItem}>
                        <span className={styles.orderPaymentLabel}>{detail.label}</span>
                        <span className={styles.orderPaymentValue}>{detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LoadingPanel() {
  return (
    <div className={styles.panelCard}>
      <p className={styles.emptyCopy}>Loading your details…</p>
    </div>
  );
}

type FieldGridProps = {
  fields: Array<{ label: string; value?: string | null }>;
};

function FieldGrid({ fields }: FieldGridProps) {
  return (
    <dl className={styles.fieldGrid}>
      {fields.map(({ label, value }) => (
        <div key={label} className={styles.fieldRow}>
          <dt className={styles.fieldLabel}>{label}</dt>
          <dd className={styles.fieldValue}>{value && value.trim() ? value : '—'}</dd>
        </div>
      ))}
    </dl>
  );
}
