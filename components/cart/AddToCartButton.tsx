"use client";

import { useEffect, useState } from 'react';
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

  const handleClick = () => {
    addItem(product);
    setAdded(true);
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
