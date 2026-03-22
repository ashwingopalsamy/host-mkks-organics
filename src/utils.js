export function triggerHaptic() {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
        try { window.navigator.vibrate([15]); } catch { /* ignore */ }
    }
}
