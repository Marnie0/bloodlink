// Arabic-Indic digits in prose, Latin digits for codes (BL-2026-004213) and blood types.
const nf = new Intl.NumberFormat('ar-EG');

export const formatNumber = (n) => nf.format(n);

const CAIRO = 'Africa/Cairo'; // always show Egypt time, whatever the laptop's clock says

export const formatDate = (iso) =>
  new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium', timeZone: CAIRO }).format(new Date(iso));

export const formatDateTime = (iso) =>
  new Intl.DateTimeFormat('ar-EG', { dateStyle: 'short', timeStyle: 'short', timeZone: CAIRO }).format(
    new Date(iso),
  );

const rtf = new Intl.RelativeTimeFormat('ar-EG', { numeric: 'always' }); // handles Arabic plurals: ساعتين، ٥ ساعات، ١١ ساعة

export function formatHoursLeft(iso) {
  const h = Math.round((new Date(iso) - Date.now()) / 36e5);
  if (h <= 0) return 'انتهى الوقت';
  return h < 48 ? rtf.format(h, 'hour') : rtf.format(Math.round(h / 24), 'day');
}
