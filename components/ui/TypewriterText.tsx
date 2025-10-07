"use client";

import {
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from '../../styles/typewriter-text.module.css';

type TypewriterElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypewriterTextProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  text: string;
  as?: TypewriterElement;
  speed?: number; // ms per character
  startDelay?: number; // ms before typing starts
  cursor?: boolean;
  restartOnView?: boolean;
};

const DEFAULT_SPEED = 28;

export default function TypewriterText({
  text,
  as = 'p',
  className,
  speed = DEFAULT_SPEED,
  startDelay = 80,
  cursor = true,
  restartOnView = false,
  style,
  ...rest
}: TypewriterTextProps) {
  const [index, setIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setIndex(text.length);
      setHasAnimated(true);
      return;
    }
    if (!inView) return;

    if (!restartOnView && hasAnimated) return;

    let timeoutId: number | undefined;
    let intervalId: number | undefined;

    const startTyping = () => {
      setIndex(0);
      intervalId = window.setInterval(() => {
        setIndex((prev) => {
          const next = Math.min(prev + 1, text.length);
          if (next >= text.length && intervalId) {
            window.clearInterval(intervalId);
            intervalId = undefined;
            setHasAnimated(true);
          }
          return next;
        });
      }, Math.max(10, speed));
    };

    timeoutId = window.setTimeout(startTyping, Math.max(0, startDelay));

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [inView, text, speed, startDelay, reduceMotion, restartOnView, hasAnimated]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (reduceMotion) {
      setInView(true);
      return;
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (!restartOnView) {
            observer.disconnect();
          }
        } else if (restartOnView) {
          setInView(false);
          setHasAnimated(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [restartOnView, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      setIndex(text.length);
      setHasAnimated(true);
      return;
    }
    setIndex(0);
    setHasAnimated(false);
  }, [text, reduceMotion]);

  const Tag = as;
  const combinedClassName = useMemo(
    () => [styles.typewriter, className].filter(Boolean).join(' '),
    [className]
  );

  const displayText = reduceMotion ? text : text.slice(0, Math.min(index, text.length));
  const showCursor = cursor && !reduceMotion && index < text.length;

  const setRef = (node: HTMLElement | null) => {
    containerRef.current = node;
  };

  return (
    <Tag
      ref={setRef}
      className={combinedClassName}
      style={style}
      {...rest}
    >
      {displayText}
      {showCursor ? <span className={styles.cursor} aria-hidden="true" /> : null}
    </Tag>
  );
}
