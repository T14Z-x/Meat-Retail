"use client";

import { MouseEvent, useEffect, useState } from 'react';
import Button from '../ui/Button';
import { useCart } from '../../contexts/CartContext';

type Props = {
  product: {
    slug: string;
    name: string;
    price: string;
    src?: string;
  };
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
};

export default function AddToCartButton({ product, variant = 'primary', className }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timeout = window.setTimeout(() => setAdded(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [added]);

  const triggerFlyAnimation = (event: MouseEvent<HTMLButtonElement>) => {
    if (typeof window === 'undefined') return;
    const cartButton = document.querySelector('[data-cart-button]') as HTMLElement | null;
    if (!cartButton) return;

    const escapeAttr = (value: string) => {
      if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
        return window.CSS.escape(value);
      }
      return value.replace(/"/g, '\\"');
    };

    const buttonEl = event.currentTarget;
    const root = buttonEl.closest('[data-product-root]');
    const selector = `[data-fly-image="${escapeAttr(product.slug)}"]`;
    const image = (root?.querySelector(selector) ?? document.querySelector(selector)) as
      | HTMLImageElement
      | null;
    const cartRect = cartButton.getBoundingClientRect();

    const animateToCart = (startX: number, startY: number, width: number, height: number, element: HTMLElement) => {
      const deltaX = cartRect.left + cartRect.width / 2 - (startX + width / 2);
      const deltaY = cartRect.top + cartRect.height / 2 - (startY + height / 2);
      const animation = element.animate(
        [
          { transform: 'translate(0, 0) scale(1)', opacity: 1 },
          { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.2)`, opacity: 0.1 },
        ],
        {
          duration: 620,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );
      animation.onfinish = () => {
        element.remove();
      };
      animation.oncancel = () => {
        element.remove();
      };
    };

    if (image) {
      const rect = image.getBoundingClientRect();
      const clone = image.cloneNode(true) as HTMLImageElement;
      clone.removeAttribute('loading');
      clone.style.position = 'fixed';
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.objectFit = 'cover';
      clone.style.borderRadius = '16px';
      clone.style.pointerEvents = 'none';
      clone.style.zIndex = '999';
      clone.style.boxShadow = '0 16px 32px rgba(15, 23, 42, 0.28)';
      document.body.appendChild(clone);
      animateToCart(rect.left, rect.top, rect.width, rect.height, clone);
    } else {
      const buttonRect = buttonEl.getBoundingClientRect();
      const dot = document.createElement('span');
      const size = 14;
      const originLeft = buttonRect.left + buttonRect.width / 2 - size / 2;
      const originTop = buttonRect.top + buttonRect.height / 2 - size / 2;
      dot.style.position = 'fixed';
      dot.style.left = `${originLeft}px`;
      dot.style.top = `${originTop}px`;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.borderRadius = '999px';
      dot.style.background = 'var(--color-primary)';
      dot.style.boxShadow = '0 8px 20px rgba(3, 165, 80, 0.35)';
      dot.style.pointerEvents = 'none';
      dot.style.zIndex = '999';
      document.body.appendChild(dot);
      animateToCart(originLeft, originTop, size, size, dot);
    }

    cartButton.removeAttribute('data-pulse');
    void cartButton.offsetWidth;
    cartButton.setAttribute('data-pulse', 'true');
    window.setTimeout(() => {
      cartButton.removeAttribute('data-pulse');
    }, 500);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    addItem(product);
    setAdded(true);
    triggerFlyAnimation(event);
  };

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={handleClick}
      aria-live="polite"
    >
      {added ? 'Added!' : 'Add to Cart'}
    </Button>
  );
}
