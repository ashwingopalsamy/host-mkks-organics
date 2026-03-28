export function formatCurrency(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}
/**
 * Ceiling-rounds to the next whole rupee.
 * ₹179.98 → ₹180, ₹309.97 → ₹310.
 * Provides clean totals while individual .99 prices feel like savings.
 */
export function smartRoundTotal(amount) {
  return Math.ceil(amount);
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
  return Object.keys(cart).length;
}

export function getDisabledReason({ itemCount, subtotal, minimumOrderValue, customerDetails }) {
  if (itemCount === 0) {
    return 'Add at least 1 kg to continue.';
  }

  if (subtotal < minimumOrderValue) {
    return `Add ${formatCurrency(minimumOrderValue - subtotal)} more to reach the minimum order of ${formatCurrency(minimumOrderValue)}.`;
  }

  if (!customerDetails.name.trim()) {
    return 'Enter your name to continue.';
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

  // Indian PIN: exactly 6 digits, first digit 1-9
  if (!/^[1-9][0-9]{5}$/.test(customerDetails.pin.trim())) {
    return 'Enter a valid 6-digit Indian Pincode.';
  }

  return null;
}

export function getCartDescription(cart, varieties) {
  const lines = getCartLines(cart, varieties);
  if (lines.length === 0) return '';
  return lines.map((l) => `${l.name} ${l.kg}kg`).join(', ');
}

function formatAddress(customer) {
  const lines = [
    customer.flat?.trim(),
    customer.addressLine1?.trim(),
  ].filter(Boolean);

  if (customer.addressLine2?.trim()) {
    lines.push(`Landmark: ${customer.addressLine2.trim()}`);
  }

  const cityState = [customer.city?.trim(), customer.state?.trim()]
    .filter(Boolean)
    .join(', ');
  const pin = customer.pin?.trim();
  const lastLine = cityState && pin ? `${cityState} – ${pin}` : (cityState || pin || '');
  if (lastLine) lines.push(lastLine);

  return lines.join('\n');
}

export function buildWhatsAppMessage({ lines, productSubtotal, customer, brandName, tasteBoxLine = null }) {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const area = customer.addressLine1?.trim() || '';
  const areaLastSegment = area ? area.split(',').pop().trim() : '';
  const locationTag = [areaLastSegment, customer.city?.trim()].filter(Boolean).join(', ');
  const reservationHeader = locationTag
    ? `🥭 *Mango Reservation from ${customer.name.trim()}, ${locationTag}*`
    : `🥭 *Mango Reservation from ${customer.name.trim()}*`;

  const parts = [
    reservationHeader,
    '',
    `📅 ${dateStr}`,
    '',
    '📦 *Order Details*',
    '------------------------',
    ...lines.map(
      (line) =>
        `• ${line.name} – ${line.kg} kg × ${formatCurrency(line.pricePerKg)}/kg – *${formatCurrency(line.subtotal)}*`
    ),
    ...(tasteBoxLine ? [`• ${tasteBoxLine}`] : []),
    '------------------------',
    `Subtotal: ${formatCurrency(productSubtotal)}`,
    `Packing & Delivery: _Subject to your location (confirmed after reservation)_`,
    `*Total: ${formatCurrency(productSubtotal)} and delivery charges*`,
    '',
    '📍 *Delivery Address*',
    '------------------------',
    `*${customer.name.trim()}*`,
    formatAddress(customer),
  ];

  parts.push('', '------------------------', 'Confirm availability and dispatch window.');

  return parts.join('\n');
}

export function buildWhatsAppUrl(message, phoneNumberE164) {
  return `https://wa.me/${phoneNumberE164.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}