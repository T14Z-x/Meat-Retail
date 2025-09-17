import { PropsWithChildren } from 'react';
import styles from '../../styles/grids.module.css';

type Props = PropsWithChildren<{ className?: string }>;

export default function Container({ children, className }: Props) {
  return <div className={[styles.container, className].filter(Boolean).join(' ')}>{children}</div>;
}

