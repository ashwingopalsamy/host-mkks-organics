import { describe, expect, it, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SeasonBadge from '../SeasonBadge.jsx';

afterEach(() => {
  vi.useRealTimers();
});

describe('SeasonBadge', () => {
  it('shows the upcoming state before the season starts', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-14T10:00:00+05:30'));

    render(<SeasonBadge />);

    expect(screen.getByText(/season opens tomorrow/i)).toBeInTheDocument();
  });

  it('shows the active state during harvest', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-20T10:00:00+05:30'));

    render(<SeasonBadge />);

    expect(screen.getByText(/week 1 of harvest/i)).toBeInTheDocument();
  });

  it('shows the ended state after the season closes', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-07-01T10:00:00+05:30'));

    render(<SeasonBadge />);

    expect(screen.getByText(/season ended/i)).toBeInTheDocument();
  });
});
