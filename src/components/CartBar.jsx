import { useMemo } from 'react';
import { varieties, MIN_ORDER_VALUE } from '../content.jsx';
import {
  formatCurrency,
  getCartItemCount,
  getCartSubtotal,
  getCartDescription,
} from '../order.js';
import { ShoppingBagIcon, TrashIcon } from './icons.jsx';

export default function CartBar({ cart, onReserveClick, onClearCart }) {
  const itemCount = useMemo(() => getCartItemCount(cart), [cart]);
  const subtotal = useMemo(() => getCartSubtotal(cart, varieties), [cart]);
  const description = useMemo(() => getCartDescription(cart, varieties), [cart]);
  const isBelowMin = subtotal > 0 && subtotal < MIN_ORDER_VALUE;

  if (itemCount === 0) return null;

  return (
    <div className="cart-bar" role="status" aria-label="Cart summary">
      <div className="cart-bar-inner">
        <div className="cart-bar-info">
          <span className="cart-bar-desc">{description}</span>
          <div className={`cart-bar-total${isBelowMin ? ' is-below-min' : ''}`}>
            <span className="cart-bar-amount">{formatCurrency(subtotal)}</span>
            {isBelowMin && (
              <span className="cart-bar-min-warn">
                Min {formatCurrency(MIN_ORDER_VALUE)}
              </span>
            )}
          </div>
        </div>
        <div className="cart-bar-actions">
          <button
            className="cart-bar-clear"
            onClick={onClearCart}
            aria-label="Clear cart"
            type="button"
          >
            <TrashIcon />
          </button>
          <button
            className="cart-bar-open"
            onClick={(event) => onReserveClick?.(event.currentTarget)}
            aria-label={`View cart (${itemCount} items)`}
            type="button"
          >
            <ShoppingBagIcon />
            <span className="cart-bar-badge">{itemCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
