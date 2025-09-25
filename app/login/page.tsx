"use client";

import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Container from '../../components/ui/Container';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import formStyles from '../../styles/forms.module.css';
import { findUser } from '../../lib/authStorage';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') ?? '';
  const signupSuccess = searchParams.get('signup') === 'success';
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(
    signupSuccess ? 'Signup successful. Please sign in with your new credentials.' : null
  );
  const [submitting, setSubmitting] = useState(false);

  const { signIn } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = (data.get('email') as string | null)?.trim() ?? '';
    const password = (data.get('password') as string | null) ?? '';

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setSubmitting(true);
    const user = findUser(email);
    if (!user) {
      setError('No saved account found for that email. Please sign up first.');
      setSubmitting(false);
      return;
    }
    if (user.password !== password) {
      setError('Password does not match our records.');
      setSubmitting(false);
      return;
    }

    try {
      const emailLocalPart = user.email.split('@')[0] || user.email;
      const preferredName =
        user.contactName?.trim() ||
        user.businessName?.trim() ||
        emailLocalPart ||
        user.email;
      await signIn(user.email, { name: preferredName });
      setSuccess('Signed in successfully. Redirecting...');
      router.push('/');
    } catch (err) {
      console.error('Sign-in failed', err);
      setError('Something went wrong while signing you in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <SectionHeading
        title="Welcome back"
        subtitle="Sign in to manage your wholesale orders and deliveries."
      />
      <form
        className={[formStyles.form, formStyles.formNarrow].join(' ')}
        method="post"
        action="#"
        autoComplete="on"
        onSubmit={handleSubmit}
      >
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
        <fieldset className={formStyles.fieldset}>
          <legend className={formStyles.legend}>Account access</legend>
          <div className={formStyles.field}>
            <label htmlFor="email" className={formStyles.label}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={formStyles.input}
              placeholder="name@company.com"
              autoComplete="email"
              defaultValue={initialEmail}
            />
          </div>
          <div className={formStyles.field}>
            <div className={formStyles.formHelper}>
              <label htmlFor="password" className={formStyles.label}>
                Password
              </label>
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className={formStyles.input}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.option}>
              <input type="checkbox" name="remember" value="yes" />
              <span>Keep me signed in on this device</span>
            </label>
          </div>
          <div className={formStyles.actions}>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign in'}
            </Button>
            <span className={formStyles.hint}>Need an account? <Link href="/signup">Become a customer</Link>.</span>
          </div>
        </fieldset>
      </form>
    </Container>
  );
}
