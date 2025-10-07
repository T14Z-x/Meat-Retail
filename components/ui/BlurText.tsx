"use client";

import {
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import styles from '../../styles/blur-text.module.css';

type AnimationSnapshot = Record<string, string | number>;

type BlurTextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type BlurTextProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  text?: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: BlurTextElement;
};

const defaultEasing = (t: number) => t;
const NBSP = '\u00A0';

const buildKeyframes = (
  from: AnimationSnapshot,
  steps: AnimationSnapshot[]
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step))
  ]);

  const keyframes: Record<string, Array<string | number>> = {};

  keys.forEach((key) => {
    const firstDefinedInSteps = steps.find((step) => step[key] !== undefined)?.[key];
    const startValue = from[key] ?? firstDefinedInSteps ?? 0;
    const frames: Array<string | number> = [startValue];
    let lastKnown: string | number = startValue;

    steps.forEach((step) => {
      const next = step[key] ?? lastKnown;
      frames.push(next);
      lastKnown = next;
    });

    keyframes[key] = frames;
  });

  return keyframes;
};

const getDefaultFrom = (direction: 'top' | 'bottom'): AnimationSnapshot =>
  direction === 'top'
    ? { filter: 'blur(12px)', opacity: 0, y: -60 }
    : { filter: 'blur(12px)', opacity: 0, y: 60 };

const getDefaultTo = (direction: 'top' | 'bottom'): AnimationSnapshot[] => [
  {
    filter: 'blur(6px)',
    opacity: 0.55,
    y: direction === 'top' ? 6 : -6
  },
  { filter: 'blur(0px)', opacity: 1, y: 0 }
];

export default function BlurText({
  text = '',
  delay = 200,
  className,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = defaultEasing,
  onAnimationComplete,
  stepDuration = 0.35,
  as = 'p',
  style,
  ...rest
}: BlurTextProps) {
  const segments = useMemo(() => {
    if (!text) return [] as string[];
    if (animateBy === 'words') {
      return text.split(' ');
    }
    return text.split('');
  }, [text, animateBy]);

  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const fromSnapshot = useMemo(
    () => ({ ...getDefaultFrom(direction), ...animationFrom }),
    [direction, animationFrom]
  );

  const toSnapshots = useMemo(() => {
    if (animationTo?.length) {
      return animationTo.map((step) => ({ ...step }));
    }
    return getDefaultTo(direction);
  }, [animationTo, direction]);

  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * Math.max(stepCount - 1, 1);
  const times = useMemo(
    () =>
      Array.from({ length: stepCount }, (_, index) =>
        stepCount === 1 ? 0 : index / (stepCount - 1)
      ),
    [stepCount]
  );

  const finalSnapshot = useMemo(() => {
    const lastStep = toSnapshots[toSnapshots.length - 1];
    return lastStep ? { ...fromSnapshot, ...lastStep } : { ...fromSnapshot };
  }, [fromSnapshot, toSnapshots]);

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
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin, reduceMotion]);

  useEffect(() => {
    if (!reduceMotion) return;
    if (!onAnimationComplete) return;
    if (!inView) return;
    onAnimationComplete();
  }, [reduceMotion, onAnimationComplete, inView]);

  const combinedClassName = [styles.blurText, className]
    .filter(Boolean)
    .join(' ');

  const baseStyle = useMemo<CSSProperties>(
    () => ({
      display: 'flex',
      flexWrap: 'wrap',
      whiteSpace: 'normal'
    }),
    []
  );

  const setRef = (node: HTMLElement | null) => {
    containerRef.current = node;
  };

  const ContainerTag = as;

  return (
    <ContainerTag
      ref={setRef}
      className={combinedClassName}
      style={{ ...baseStyle, ...(style ?? {}) }}
      {...rest}
    >
      {segments.map((segment, index) => {
        const transition: Transition = reduceMotion
          ? { duration: 0, delay: 0 }
          : {
              duration: totalDuration,
              times,
              delay: (index * Math.max(delay, 0)) / 1000,
              ease: easing
            };

        const initialState = reduceMotion ? finalSnapshot : fromSnapshot;
        const animateState = reduceMotion ? finalSnapshot : animateKeyframes;
        const isLast = index === segments.length - 1;

        return (
          <motion.span
            key={`${segment}-${index}`}
            initial={initialState}
            animate={inView ? animateState : initialState}
            transition={transition}
            onAnimationComplete={isLast ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity'
            }}
          >
            {segment === ' ' ? NBSP : segment}
            {animateBy === 'words' && index < segments.length - 1 ? NBSP : ''}
          </motion.span>
        );
      })}
    </ContainerTag>
  );
}
