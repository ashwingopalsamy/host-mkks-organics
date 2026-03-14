export function getVariantId(varietyId) {
  return varietyId;
}

export function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

export function getCartLines(cart, varieties) {
  return varieties.flatMap((variety) => {
    const kg = cart[variety.id] ?? 0;
    if (kg <= 0) return [];
    return [{
      id: variety.id,
      varietyId: variety.id,
      name: variety.name,
      kg,
      pricePerKg: variety.pricePerKg,
      subtotal: variety.pricePerKg * kg,
    }];
  });
}

export function getCartSubtotal(cart, varieties) {
  return getCartLines(cart, varieties).reduce((sum, line) => sum + line.subtotal, 0);
}

export function getCartItemCount(cart) {
  return Object.values(cart).reduce((sum, kg) => sum + kg, 0);
}

export function getDisabledReason({ itemCount, subtotal, minimumOrderValue, customerDetails }) {
  if (itemCount === 0) {
    return 'Add at least 1 kg to continue.';
  }

  if (subtotal < minimumOrderValue) {
    return `Add ${formatCurrency(minimumOrderValue - subtotal)} more to reach the minimum order of ${formatCurrency(minimumOrderValue)}.`;
  }

  if (!customerDetails.name.trim()) {
    return 'Enter your full name to continue.';
  }

  if (
    !customerDetails.flat.trim() ||
    !customerDetails.addressLine1.trim() ||
    !customerDetails.city.trim() ||
    !customerDetails.state.trim() ||
    !customerDetails.pin.trim()
  ) {
    return 'Complete your delivery address to continue.';
  }

  return null;
}

export function getCartDescription(cart, varieties) {
  const lines = getCartLines(cart, varieties);
  if (lines.length === 0) return '';
  return lines.map((l) => `${l.name} ${l.kg}kg`).join(', ');
}

export function isSampleBoxInCart(cart, sampleBoxConfig) {
  return sampleBoxConfig.items.every((item) => {
    return (cart[item.varietyId] ?? 0) >= item.kg;
  });
}

export function applySampleBox(cart, sampleBoxConfig) {
  const nextCart = { ...cart };
  for (const item of sampleBoxConfig.items) {
    nextCart[item.varietyId] = item.kg;
  }
  return nextCart;
}

export function getAppliedBundleDiscount(cart, sampleBox, varieties) {
  if (!isSampleBoxInCart(cart, sampleBox)) return 0;
  const rackPrice = sampleBox.items.reduce((sum, item) => {
    const variety = varieties.find((v) => v.id === item.varietyId);
    return sum + (variety ? variety.pricePerKg * item.kg : 0);
  }, 0);
  return rackPrice - sampleBox.price;
}

function formatAddress(customer) {
  const parts = [
    customer.flat,
    customer.addressLine1,
    customer.addressLine2,
    customer.city,
    customer.state,
    customer.pin,
  ].filter((p) => p && p.trim());
  return parts.join(', ');
}

export function buildWhatsAppMessage({ lines, productSubtotal, packagingDelivery, customer, brandName, bundleDiscount = 0 }) {
  const effectiveSubtotal = productSubtotal - bundleDiscount;
  const grandTotal = effectiveSubtotal + packagingDelivery;
  return [
    `${brandName} Reservation Request`,
    '',
    'Items',
    ...lines.map(
      (line, index) =>
        `${index + 1}. ${line.name} - ${line.kg}kg × ${formatCurrency(line.pricePerKg)}/kg - ${formatCurrency(line.subtotal)}`
    ),
    ...(bundleDiscount > 0 ? [`   Taste Box discount: -${formatCurrency(bundleDiscount)}`] : []),
    '',
    `Product Total: ${formatCurrency(effectiveSubtotal)}`,
    `Packing & Delivery: ${formatCurrency(packagingDelivery)}`,
    `Order Total: ${formatCurrency(grandTotal)}`,
    '',
    'Delivery Details',
    `Name: ${customer.name.trim()}`,
    `Address: ${formatAddress(customer)}`,
    `Notes: ${customer.notes?.trim() || 'None'}`,
    '',
    'Please confirm availability and dispatch timing.',
  ].join('\n');
}

export function buildWhatsAppUrl(message, phoneNumberE164) {
  return `https://wa.me/${phoneNumberE164.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
