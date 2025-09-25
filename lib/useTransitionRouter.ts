"use client";

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type NavigateOptions = {
  scroll?: boolean;
};

type TransitionRouter = {
  isTransitioning: boolean;
  push: (href: string, options?: NavigateOptions) => void;
  replace: (href: string, options?: NavigateOptions) => void;
  back: () => void;
};

/**
 * Wraps Next's router with React startTransition and the View Transition API
 * so imperative navigations match the link-driven page animations.
 */
export function useTransitionRouter(): TransitionRouter {
  const router = useRouter();
  const [isPending, startReactTransition] = useTransition();

  const start = (navigate: () => void) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as typeof document & { startViewTransition: (cb: () => void) => void }).startViewTransition(
        () => {
          startReactTransition(navigate);
        }
      );
    } else {
      startReactTransition(navigate);
    }
  };

  return {
    isTransitioning: isPending,
    push(href, options) {
      start(() => router.push(href, options));
    },
    replace(href, options) {
      start(() => router.replace(href, options));
    },
    back() {
      start(() => router.back());
    },
  };
}
