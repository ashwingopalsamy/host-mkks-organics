export function getVariantId(varietyId, tierId) {
  return `${varietyId}:${tierId}`;
}

export function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function getVariantQuantity(cart, varietyId, tierId) {
  return cart[getVariantId(varietyId, tierId)] ?? 0;
}

export function setVariantQuantity(cart, varietyId, tierId, quantity) {
  const variantId = getVariantId(varietyId, tierId);
  const safeQuantity = Math.max(0, quantity);

  if (safeQuantity === 0) {
    if (!(variantId in cart)) {
      return cart;
    }

    const nextCart = { ...cart };
    delete nextCart[variantId];
    return nextCart;
  }

  return {
    ...cart,
    [variantId]: safeQuantity,
  };
}

export function getCartLines(cart, varieties) {
  return varieties.flatMap((variety) =>
    variety.pricing.flatMap((tier) => {
      const variantId = getVariantId(variety.id, tier.id);
      const quantity = cart[variantId] ?? 0;

      if (quantity <= 0) {
        return [];
      }

      return [
        {
          id: variantId,
          varietyId: variety.id,
          tierId: tier.id,
          name: variety.name,
          weight: tier.weight,
          unitPrice: tier.price,
          quantity,
          subtotal: tier.price * quantity,
        },
      ];
    })
  );
}

export function getCartSubtotal(cart, varieties) {
  return getCartLines(cart, varieties).reduce((sum, line) => sum + line.subtotal, 0);
}

export function getCartItemCount(cart) {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

export function isMinimumMet(subtotal, minimumOrderValue) {
  return subtotal >= minimumOrderValue;
}

export function getDisabledReason({ itemCount, subtotal, minimumOrderValue, customerDetails }) {
  if (itemCount === 0) {
    return 'Add at least one box to continue.';
  }

  if (subtotal < minimumOrderValue) {
    return `Add ${formatCurrency(minimumOrderValue - subtotal)} more to reach the minimum order of ${formatCurrency(minimumOrderValue)}.`;
  }

  if (!customerDetails.name.trim() || !customerDetails.address.trim()) {
    return 'Enter your full name and complete delivery address.';
  }

  if (!customerDetails.consentConfirmed) {
    return 'Confirm that shipping charges will be shared separately on WhatsApp.';
  }

  return null;
}

export function buildWhatsAppMessage({ lines, subtotal, customer, brandName }) {
  return [
    `${brandName} Reservation Request`,
    '',
    'Items',
    ...lines.map(
      (line, index) =>
        `${index + 1}. ${line.name} - ${line.weight} x ${line.quantity} - Unit ${formatCurrency(line.unitPrice)} - Subtotal ${formatCurrency(line.subtotal)}`
    ),
    '',
    'Subtotal',
    formatCurrency(subtotal),
    '',
    'Delivery Details',
    `Name: ${customer.name.trim()}`,
    `Address: ${customer.address.trim()}`,
    `Notes: ${customer.notes.trim() || 'None'}`,
    '',
    'Please confirm availability, shipping charges, and dispatch timing.',
  ].join('\n');
}

export function buildWhatsAppUrl(message, phoneNumberE164) {
  return `https://wa.me/${phoneNumberE164.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
