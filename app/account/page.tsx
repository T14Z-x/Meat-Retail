"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import { useAuth } from '../../contexts/AuthContext';
import { findUser, StoredUser } from '../../lib/authStorage';
import styles from '../../styles/account.module.css';

const tabs = [
  { id: 'account', label: 'Account Information' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'orders', label: 'Orders' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function AccountPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('account');
  const [profile, setProfile] = useState<StoredUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

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
        return <AccountInfo profile={profile} />;
      case 'addresses':
        return <AddressInfo profile={profile} />;
      case 'orders':
        return <OrdersPanel />;
      default:
        return null;
    }
  }, [activeTab, profile]);

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
};

function AccountInfo({ profile }: ProfileProps) {
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
    </div>
  );
}

function AddressInfo({ profile }: ProfileProps) {
  const addressFields = [
    { label: 'Street address', value: profile.deliveryAddress },
    { label: 'Area / Thana', value: profile.area },
    { label: 'Division', value: profile.division },
    { label: 'District', value: profile.district },
    { label: 'Postal code', value: profile.postalCode },
    { label: 'Preferred delivery window', value: profile.deliveryWindow },
    { label: 'Cold storage available', value: profile.coldStorage },
    { label: 'Halal documents requested', value: profile.hasHalal ? 'Yes' : 'No' },
  ];

  return (
    <div className={styles.panelCard}>
      <h3 className={styles.panelTitle}>Delivery address</h3>
      <FieldGrid fields={addressFields} />
    </div>
  );
}

function OrdersPanel() {
  return (
    <div className={styles.panelCard}>
      <h3 className={styles.panelTitle}>Recent orders</h3>
      <p className={styles.emptyCopy}>You haven&apos;t placed any orders yet. Once you do, they&apos;ll appear here.</p>
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
