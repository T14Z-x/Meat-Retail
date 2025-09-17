"use client";
import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes, PropsWithChildren } from 'react';
import styles from '../../styles/buttons.module.css';

type BaseProps = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'tertiary';
  href?: string;
  className?: string;
}>;

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button(props: ButtonProps | AnchorProps) {
  const { variant = 'primary', href, className, children, ...rest } = props as any;
  const cls = [styles.button, styles[variant], className].filter(Boolean).join(' ');
  if (href) {
    return (
      <Link href={href} className={cls} {...(rest as AnchorProps)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as ButtonProps)}>
      {children}
    </button>
  );
}

