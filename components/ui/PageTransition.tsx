"use client";

import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../../styles/page-transition.module.css';

type TransitionStage = 'idle' | 'exiting' | 'entering';

const OUT_DURATION = 280;
const IN_DURATION = 380;

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [displayedPath, setDisplayedPath] = useState(pathname);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [stage, setStage] = useState<TransitionStage>('idle');
  const pendingChildren = useRef(children);

  useEffect(() => {
    pendingChildren.current = children;
  }, [children]);

  useEffect(() => {
    if (pathname === displayedPath) {
      setDisplayedChildren(children);
      return;
    }

    let outTimer: number | null = null;
    let inTimer: number | null = null;

    setStage('exiting');

    outTimer = window.setTimeout(() => {
      setDisplayedChildren(pendingChildren.current);
      setDisplayedPath(pathname);
      setStage('entering');
    }, OUT_DURATION);

    inTimer = window.setTimeout(() => {
      setStage('idle');
    }, OUT_DURATION + IN_DURATION);

    return () => {
      if (outTimer) window.clearTimeout(outTimer);
      if (inTimer) window.clearTimeout(inTimer);
    };
  }, [pathname, displayedPath, children]);

  useEffect(() => {
    if (stage === 'idle' && displayedPath === pathname) {
      setDisplayedChildren(children);
    }
  }, [children, pathname, stage, displayedPath]);

  const className = [
    styles.transition,
    stage === 'exiting' ? styles.exiting : '',
    stage === 'entering' ? styles.entering : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} data-transition-stage={stage}>
      <div key={displayedPath} className={styles.inner}>
        {displayedChildren}
      </div>
    </div>
  );
}
