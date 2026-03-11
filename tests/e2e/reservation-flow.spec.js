import { expect, test } from '@playwright/test';

test('hero reserve CTA opens the reservation sheet and close restores focus', async ({ page }) => {
  await page.goto('/');

  const heroReserveButton = page.locator('#home').getByRole('button', { name: /reserve mangoes/i });
  await heroReserveButton.click();

  const dialog = page.getByRole('dialog', { name: /reserve mangoes/i });
  await expect(dialog).toBeVisible();

  await dialog.getByRole('button', { name: /close reservation sheet/i }).click();
  await expect(dialog).toHaveCount(0);
  await expect(heroReserveButton).toBeFocused();
});

test('reservation sheet shows explicit validation states before WhatsApp is enabled', async ({ page }) => {
  await page.goto('/');
  await page.locator('#home').getByRole('button', { name: /reserve mangoes/i }).click();

  const dialog = page.getByRole('dialog', { name: /reserve mangoes/i });
  await expect(dialog.getByText(/add at least one box to continue/i)).toBeVisible();

  await dialog.getByRole('button', { name: /add one 2 kg of alphonso reserve/i }).click();
  await expect(dialog.getByText(/add ₹50 more to reach the minimum order/i)).toBeVisible();

  await dialog.getByRole('button', { name: /add one 1 kg of sendhooram/i }).click();
  await expect(dialog.getByText(/enter your full name and complete delivery address/i)).toBeVisible();

  await dialog.getByLabel(/full name/i).fill('Ashwin Kumar');
  await dialog.getByLabel(/complete delivery address/i).fill('12 Orchard Lane, Coimbatore 641001');
  await expect(dialog.getByText(/confirm that shipping charges will be shared separately on whatsapp/i)).toBeVisible();

  await dialog.getByRole('checkbox', { name: /i understand shipping charges will be confirmed separately on whatsapp/i }).check();
  await expect(dialog.getByText(/ready to send a structured reservation request on whatsapp/i)).toBeVisible();
  await expect(dialog.getByRole('button', { name: /send reservation request on whatsapp/i })).toBeEnabled();
});

test('sending the completed request opens WhatsApp with a structured reservation message', async ({ page }) => {
  await page.goto('/');
  await page.locator('#home').getByRole('button', { name: /reserve mangoes/i }).click();

  const dialog = page.getByRole('dialog', { name: /reserve mangoes/i });
  await dialog.getByRole('button', { name: /add one 2 kg of imam pasand/i }).click();
  await dialog.getByLabel(/full name/i).fill('Ashwin Kumar');
  await dialog.getByLabel(/complete delivery address/i).fill('12 Orchard Lane, Coimbatore 641001');
  await dialog.getByLabel(/notes or landmark/i).fill('Call before dispatch');
  await dialog.getByRole('checkbox', { name: /i understand shipping charges will be confirmed separately on whatsapp/i }).check();

  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    dialog.getByRole('button', { name: /send reservation request on whatsapp/i }).click(),
  ]);

  await expect
    .poll(() => new URL(popup.url()).searchParams.get('phone') ?? '')
    .toBe('919976759956');
  await expect
    .poll(() => decodeURIComponent(new URL(popup.url()).searchParams.get('text') ?? ''))
    .toContain('MKKS Organics Reservation Request');
  await expect
    .poll(() => decodeURIComponent(new URL(popup.url()).searchParams.get('text') ?? ''))
    .toContain('Imam Pasand - 2 kg x 1');
});
