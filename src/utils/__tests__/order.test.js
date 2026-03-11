import { describe, expect, it } from 'vitest';
import { siteConfig } from '../../data/siteConfig.js';
import { varieties } from '../../data/content.jsx';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  getCartItemCount,
  getCartLines,
  getCartSubtotal,
  getDisabledReason,
  getVariantId,
  isMinimumMet,
  setVariantQuantity,
} from '../order.js';

describe('order utilities', () => {
  it('stores quantities against stable variant ids and removes empty entries', () => {
    let cart = {};
    cart = setVariantQuantity(cart, 'imam-pasand', '1kg', 2);
    cart = setVariantQuantity(cart, 'alphonso-reserve', '2kg', 1);

    expect(cart).toEqual({
      [getVariantId('imam-pasand', '1kg')]: 2,
      [getVariantId('alphonso-reserve', '2kg')]: 1,
    });

    cart = setVariantQuantity(cart, 'imam-pasand', '1kg', 0);
    expect(cart).toEqual({
      [getVariantId('alphonso-reserve', '2kg')]: 1,
    });
  });

  it('calculates subtotal and cart item count from the active content data', () => {
    let cart = {};
    cart = setVariantQuantity(cart, 'imam-pasand', '1kg', 2);
    cart = setVariantQuantity(cart, 'alphonso-reserve', '2kg', 1);

    expect(getCartItemCount(cart)).toBe(3);
    expect(getCartSubtotal(cart, varieties)).toBe(800);
    expect(getCartLines(cart, varieties)).toHaveLength(2);
  });

  it('checks the minimum order threshold and disabled-state messaging', () => {
    expect(isMinimumMet(349, siteConfig.minimumOrderValue)).toBe(false);
    expect(isMinimumMet(350, siteConfig.minimumOrderValue)).toBe(true);

    expect(
      getDisabledReason({
        itemCount: 1,
        subtotal: 300,
        minimumOrderValue: siteConfig.minimumOrderValue,
        customerDetails: {
          name: 'Ashwin',
          address: '12 Orchard Lane',
          notes: '',
          consentConfirmed: false,
        },
      })
    ).toContain('Add ₹50 more');
  });

  it('formats the WhatsApp reservation message and url', () => {
    const cart = setVariantQuantity({}, 'imam-pasand', '2kg', 2);
    const lines = getCartLines(cart, varieties);
    const subtotal = getCartSubtotal(cart, varieties);
    const message = buildWhatsAppMessage({
      lines,
      subtotal,
      customer: {
        name: 'Ashwin Kumar',
        address: '12 Orchard Lane, Coimbatore 641001',
        notes: 'Call before dispatch',
      },
      brandName: siteConfig.brandName,
    });
    const url = buildWhatsAppUrl(message, siteConfig.phoneNumberE164);

    expect(message).toContain('MKKS Organics Reservation Request');
    expect(message).toContain('1. Imam Pasand - 2 kg x 2');
    expect(message).toContain('Notes: Call before dispatch');
    expect(url).toContain('https://wa.me/919976759956?text=');
  });
});
