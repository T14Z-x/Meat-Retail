"use client";

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import formStyles from '../../styles/forms.module.css';
import { saveUser } from '../../lib/authStorage';

const businessTypes = [
  'Butcher & Meat Shop',
  'Supermarket or Department Store',
  'Hotel or Resort',
  'Restaurant or Café',
  'Online Grocery / eCommerce',
  'Catering Service',
  'Institution (Hospital, Mess, Canteen)',
  'Franchise / Chain Outlet',
];

const productCategories = [
  { value: 'chilled-beef', label: 'Chilled Beef & Veal' },
  { value: 'mutton', label: 'Mutton & Lamb' },
  { value: 'poultry', label: 'Broiler & Free-Range Chicken' },
  { value: 'duck-goose', label: 'Duck / Goose' },
  { value: 'processed', label: 'Processed & Ready-to-Cook Items' },
  { value: 'organs', label: 'Offal / Organ Meat' },
  { value: 'seafood', label: 'Fish & Seafood (Frozen)' },
  { value: 'frozen-snacks', label: 'Frozen Snacks & Value Added' },
];

const deliveryWindows = [
  'Early Morning (6am – 9am)',
  'Late Morning (9am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Evening (4pm – 8pm)',
];

const contactTimes = [
  'Anytime',
  'Business Hours (10am – 6pm)',
  'Evening (6pm – 9pm)',
  'Friday Only',
];

const yesNoOptions = ['Yes', 'No'] as const;
const creditOptions = ['Yes', 'No', 'Maybe Later'];

const divisions = [
  'Dhaka',
  'Chattogram',
  'Khulna',
  'Rajshahi',
  'Rangpur',
  'Sylhet',
  'Barishal',
  'Mymensingh',
];

const paymentPreferences = [
  'Cash on Delivery',
  'Bank Transfer',
  'Mobile Wallet (bKash, Nagad, Rocket)',
  'Corporate Credit Terms',
];

const phonePattern = '^(?:\\+?88)?01[3-9]\\d{8}$';
const PASSWORD_MIN_LENGTH = 8;

export default function SignupPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const accountEmail = (data.get('accountEmail') as string | null)?.trim() ?? '';
    const password = (data.get('accountPassword') as string | null) ?? '';
    const confirm = (data.get('accountPasswordConfirm') as string | null) ?? '';

    if (!accountEmail) {
      setError('Please enter an account email so you can log in later.');
      return;
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`);
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match. Please re-enter them.');
      return;
    }

    setSubmitting(true);
    try {
      const businessName = (data.get('businessName') as string | null)?.trim() || undefined;
      saveUser({ email: accountEmail, password, businessName, createdAt: new Date().toISOString() });
      setSuccess('Account created. Redirecting to login...');
      setSubmitting(false);
      router.push(`/login?signup=success&email=${encodeURIComponent(accountEmail)}`);
      return;
    } catch (err) {
      console.error('Failed to save signup details', err);
      setError('Something went wrong while saving your details. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <SectionHeading
        title="Become a Customer"
        subtitle="Share your business details and our wholesale team will get you onboarded within one business day."
      />
      <form className={formStyles.form} method="post" action="#" autoComplete="on" onSubmit={handleSubmit}>
        {error ? (
          <div className={[formStyles.formMessage, formStyles.formMessageError].join(' ')} role="alert">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className={[formStyles.formMessage, formStyles.formMessageSuccess].join(' ')} role="status">
            {success}
          </div>
        ) : null}
        <p className={formStyles.formIntro}>
          Let us know how we can support your meat sourcing. Fields marked with <span aria-hidden="true">*</span>{' '}
          are required.
        </p>

        <fieldset className={formStyles.fieldset}>
          <legend className={formStyles.legend}>Account credentials</legend>
          <div className={formStyles.row}>
            <div className={formStyles.field}>
              <label htmlFor="account-email" className={formStyles.label}>
                Account email <span aria-hidden="true">*</span>
              </label>
              <input
                id="account-email"
                name="accountEmail"
                type="email"
                required
                className={formStyles.input}
                placeholder="you@business.com"
                autoComplete="username"
              />
              <p className={formStyles.hint}>Use the email you want for sign in.</p>
            </div>
          </div>
          <div className={formStyles.field}>
            <label htmlFor="account-password" className={formStyles.label}>
              Create password <span aria-hidden="true">*</span>
            </label>
            <input
              id="account-password"
              name="accountPassword"
              type="password"
              required
              className={formStyles.input}
              placeholder="Choose a secure password"
              autoComplete="new-password"
              minLength={PASSWORD_MIN_LENGTH}
            />
          </div>
          <div className={formStyles.field}>
            <label htmlFor="account-password-confirm" className={formStyles.label}>
              Confirm password <span aria-hidden="true">*</span>
            </label>
            <input
              id="account-password-confirm"
              name="accountPasswordConfirm"
              type="password"
              required
              className={formStyles.input}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              minLength={PASSWORD_MIN_LENGTH}
            />
            <p className={formStyles.hint}>Minimum {PASSWORD_MIN_LENGTH} characters. Avoid using shared passwords.</p>
          </div>
        </fieldset>

        <fieldset className={formStyles.fieldset}>
          <legend className={formStyles.legend}>Business Essentials</legend>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="business-name" className={formStyles.label}>
                Business / Outlet Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="business-name"
                name="businessName"
                type="text"
                required
                className={formStyles.input}
                placeholder="e.g. Shukria Meat Dhanmondi"
                autoComplete="organization"
              />
            </div>
            <div className={formStyles.field}>
              <label htmlFor="business-type" className={formStyles.label}>
                Business Type <span aria-hidden="true">*</span>
              </label>
              <select id="business-type" name="businessType" required className={formStyles.select} defaultValue="">
                <option value="" disabled>
                  Select a business model
                </option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={formStyles.field}>
            <label htmlFor="trade-license" className={formStyles.label}>
              Trade License Number <span aria-hidden="true">*</span>
            </label>
            <input
              id="trade-license"
              name="tradeLicense"
              type="text"
              required
              className={formStyles.input}
              placeholder="e.g. TRAD/2024/12345"
              aria-describedby="trade-license-hint"
            />
            <p id="trade-license-hint" className={formStyles.hint}>
              Attach a copy when our team contacts you for verification.
            </p>
          </div>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="years-operating" className={formStyles.label}>
                Years in Operation
              </label>
              <select id="years-operating" name="yearsOperating" className={formStyles.select} defaultValue="">
                <option value="" disabled>
                  Select years in business
                </option>
                <option value="0-1">Under 1 year</option>
                <option value="1-3">1 – 3 years</option>
                <option value="3-5">3 – 5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
            <div className={formStyles.field}>
              <label htmlFor="online-link" className={formStyles.label}>Website or Facebook Page</label>
              <input
                id="online-link"
                name="onlinePresence"
                type="url"
                className={formStyles.input}
                placeholder="https://www.facebook.com/yourpage"
                autoComplete="url"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={formStyles.fieldset}>
          <legend className={formStyles.legend}>Primary Contact</legend>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="contact-name" className={formStyles.label}>
                Full Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                name="contactName"
                type="text"
                required
                className={formStyles.input}
                placeholder="e.g. Mahmudul Hasan"
                autoComplete="name"
              />
            </div>
            <div className={formStyles.field}>
              <label htmlFor="contact-role" className={formStyles.label}>Role / Designation</label>
              <input
                id="contact-role"
                name="contactRole"
                type="text"
                className={formStyles.input}
                placeholder="e.g. Procurement Manager"
                autoComplete="organization-title"
              />
            </div>
          </div>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="contact-phone" className={formStyles.label}>
                Mobile Number <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-phone"
                name="contactPhone"
                type="tel"
                required
                className={formStyles.input}
                placeholder="e.g. 017XXXXXXXX"
                pattern={phonePattern}
                title="Enter an 11 digit Bangladeshi mobile number with optional +88 prefix"
                autoComplete="tel"
              />
            </div>
            <div className={formStyles.field}>
              <label htmlFor="contact-whatsapp" className={formStyles.label}>Secondary / WhatsApp</label>
              <input
                id="contact-whatsapp"
                name="contactWhatsapp"
                type="tel"
                className={formStyles.input}
                placeholder="Alternate phone number"
                pattern={phonePattern}
                title="Enter an 11 digit Bangladeshi mobile number with optional +88 prefix"
                autoComplete="tel"
              />
            </div>
          </div>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="contact-email" className={formStyles.label}>
                Business Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                name="contactEmail"
                type="email"
                required
                className={formStyles.input}
                placeholder="name@company.com"
                autoComplete="email"
              />
            </div>
            <div className={formStyles.field}>
              <label htmlFor="contact-time" className={formStyles.label}>Preferred Contact Time</label>
              <select id="contact-time" name="contactTime" className={formStyles.select} defaultValue="">
                <option value="" disabled>
                  Choose a time window
                </option>
                {contactTimes.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className={formStyles.fieldset}>
          <legend className={formStyles.legend}>Delivery & Address Details</legend>
          <div className={formStyles.field}>
            <label htmlFor="delivery-address" className={formStyles.label}>
              Street Address <span aria-hidden="true">*</span>
            </label>
            <input
              id="delivery-address"
              name="deliveryAddress"
              type="text"
              required
              className={formStyles.input}
              placeholder="House 12, Road 5, Dhanmondi"
              autoComplete="street-address"
            />
          </div>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="area" className={formStyles.label}>
                Area / Thana <span aria-hidden="true">*</span>
              </label>
              <input
                id="area"
                name="area"
                type="text"
                required
                className={formStyles.input}
                placeholder="e.g. Dhanmondi"
              />
            </div>
            <div className={formStyles.field}>
              <label htmlFor="division" className={formStyles.label}>
                Division <span aria-hidden="true">*</span>
              </label>
              <select id="division" name="division" required className={formStyles.select} defaultValue="">
                <option value="" disabled>
                  Select division
                </option>
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="district" className={formStyles.label}>
                District <span aria-hidden="true">*</span>
              </label>
              <input
                id="district"
                name="district"
                type="text"
                required
                className={formStyles.input}
                placeholder="e.g. Dhaka"
              />
            </div>
            <div className={formStyles.field}>
              <label htmlFor="postal-code" className={formStyles.label}>Postal Code</label>
              <input
                id="postal-code"
                name="postalCode"
                type="text"
                className={formStyles.input}
                inputMode="numeric"
                placeholder="e.g. 1209"
                autoComplete="postal-code"
              />
            </div>
          </div>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="delivery-window" className={formStyles.label}>Preferred Delivery Window</label>
              <select id="delivery-window" name="deliveryWindow" className={formStyles.select} defaultValue="">
                <option value="" disabled>
                  Select a window
                </option>
                {deliveryWindows.map((window) => (
                  <option key={window} value={window}>
                    {window}
                  </option>
                ))}
              </select>
            </div>
            <div className={formStyles.field}>
              <span className={formStyles.label}>Cold Storage Available?</span>
              <div className={formStyles.optionInline}>
                {yesNoOptions.map((value) => {
                  const id = `storage-${value.toLowerCase()}`;
                  return (
                    <div key={value} className={formStyles.option}>
                      <input id={id} type="radio" name="coldStorage" value={value} />
                      <label htmlFor={id}>{value}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className={formStyles.fieldset}>
          <legend className={formStyles.legend}>Supply Requirements</legend>
          <div className={formStyles.field}>
            <label htmlFor="weekly-volume" className={formStyles.label}>
              Average Weekly Requirement <span aria-hidden="true">*</span>
            </label>
            <select id="weekly-volume" name="weeklyVolume" required className={formStyles.select} defaultValue="">
              <option value="" disabled>
                Select volume range (kg)
              </option>
              <option value="0-50">Up to 50 kg</option>
              <option value="50-150">50 – 150 kg</option>
              <option value="150-300">150 – 300 kg</option>
              <option value="300-500">300 – 500 kg</option>
              <option value="500+">500 kg +</option>
            </select>
          </div>
          <div className={formStyles.field}>
            <span className={formStyles.label}>Products of Interest <span aria-hidden="true">*</span></span>
            <div className={formStyles.optionGroup}>
              {productCategories.map((category, index) => {
                const id = `product-${category.value}`;
                return (
                  <div key={category.value} className={formStyles.option}>
                    <input
                      id={id}
                      type="checkbox"
                      name="productCategories"
                      value={category.value}
                      required={index === 0}
                    />
                    <label htmlFor={id}>{category.label}</label>
                  </div>
                );
              })}
            </div>
            <p className={formStyles.hint}>Select all that apply so we can share the right price list.</p>
          </div>
          <div className={[formStyles.row, formStyles.twoCol].join(' ')}>
            <div className={formStyles.field}>
              <label htmlFor="payment-pref" className={formStyles.label}>Preferred Payment Method</label>
              <select id="payment-pref" name="paymentPreference" className={formStyles.select} defaultValue="">
                <option value="" disabled>
                  Select payment preference
                </option>
                {paymentPreferences.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className={formStyles.field}>
              <span className={formStyles.label}>Credit Facility Needed?</span>
              <div className={formStyles.optionInline}>
                {creditOptions.map((value) => {
                  const id = `credit-${value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                  return (
                    <div key={value} className={formStyles.option}>
                      <input id={id} type="radio" name="creditFacility" value={value} />
                      <label htmlFor={id}>{value}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={formStyles.field}>
            <label htmlFor="notes" className={formStyles.label}>Additional Notes</label>
            <textarea
              id="notes"
              name="notes"
              className={formStyles.textarea}
              placeholder="Let us know about custom cuts, packaging, or compliance requirements."
            ></textarea>
          </div>
        </fieldset>

        <fieldset className={formStyles.fieldset}>
          <legend className={formStyles.legend}>Compliance & Consent</legend>
          <div className={formStyles.optionGroup}>
            <div className={formStyles.option}>
              <input id="has-halal" type="checkbox" name="hasHalal" value="yes" />
              <label htmlFor="has-halal">
                We are interested in Halal certification documents and cold-chain SOPs.
              </label>
            </div>
            <div className={formStyles.option}>
              <input id="accept-terms" type="checkbox" name="acceptTerms" value="yes" required />
              <label htmlFor="accept-terms">
                I confirm the information provided is accurate and agree to Shukria Meat&apos;s vendor onboarding terms.
              </label>
            </div>
          </div>
          <p className={formStyles.hint}>
            Our team will reach out within one working day with pricing, contracts, and logistics handover checklist.
          </p>
        </fieldset>

        <div className={formStyles.actions}>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit application'}
          </Button>
          <span className={formStyles.hint}>You will receive an acknowledgement email instantly.</span>
        </div>
      </form>
    </Container>
  );
}
