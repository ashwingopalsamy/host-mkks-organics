import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App.jsx';
import ReservationForm from '../ReservationForm.jsx';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('reservation flow', () => {
  it('restores focus to the trigger when the sheet closes', async () => {
    const user = userEvent.setup();
    render(<App />);

    const hero = document.getElementById('home');
    const heroReserveButton = within(hero).getByRole('button', { name: /reserve mangoes/i });

    await user.click(heroReserveButton);
    expect(screen.getByRole('dialog', { name: /reserve mangoes/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close reservation sheet/i }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /reserve mangoes/i })).not.toBeInTheDocument();
      expect(heroReserveButton).toHaveFocus();
    });
  });

  it('updates validation guidance as the user completes the reservation request', async () => {
    const user = userEvent.setup();
    render(<ReservationForm isOpen onClose={() => {}} />);

    expect(screen.getByText(/add at least one box to continue/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /add one 2 kg of alphonso reserve/i }));
    expect(screen.getByText(/add ₹50 more to reach the minimum order/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /add one 1 kg of sendhooram/i }));
    expect(screen.getByText(/enter your full name and complete delivery address/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/full name/i), 'Ashwin Kumar');
    await user.type(
      screen.getByLabelText(/complete delivery address/i),
      '12 Orchard Lane, Coimbatore 641001'
    );
    expect(
      screen.getByText(/confirm that shipping charges will be shared separately on whatsapp/i)
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('checkbox', {
        name: /i understand shipping charges will be confirmed separately on whatsapp/i,
      })
    );

    expect(
      screen.getByText(/ready to send a structured reservation request on whatsapp/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send reservation request on whatsapp/i })
    ).toBeEnabled();
  });

  it('opens a structured WhatsApp reservation request once the form is complete', async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, 'open').mockReturnValue({});
    render(<ReservationForm isOpen onClose={() => {}} />);

    await user.click(screen.getByRole('button', { name: /add one 2 kg of imam pasand/i }));
    await user.type(screen.getByLabelText(/full name/i), 'Ashwin Kumar');
    await user.type(
      screen.getByLabelText(/complete delivery address/i),
      '12 Orchard Lane, Coimbatore 641001'
    );
    await user.type(screen.getByLabelText(/notes or landmark/i), 'Call before dispatch');
    await user.click(
      screen.getByRole('checkbox', {
        name: /i understand shipping charges will be confirmed separately on whatsapp/i,
      })
    );

    await user.click(screen.getByRole('button', { name: /send reservation request on whatsapp/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    const url = new URL(openSpy.mock.calls[0][0]);
    const message = url.searchParams.get('text') ?? '';

    expect(url.origin + url.pathname).toBe('https://wa.me/919976759956');
    expect(message).toContain('MKKS Organics Reservation Request');
    expect(message).toContain('Imam Pasand - 2 kg x 1');
    expect(message).toContain('Call before dispatch');
  });
});
