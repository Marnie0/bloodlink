const nf = new Intl.NumberFormat('ar-EG');
export const formatNumber = (n) => nf.format(n);
export const formatDate = (iso) =>
  new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(new Date(iso));
export const formatDateTime = (iso) =>
  new Intl.DateTimeFormat('ar-EG', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Africa/Cairo',
  }).format(new Date(iso));
export function formatHoursLeft(iso) {
  const h = Math.max(0, Math.round((new Date(iso) - Date.now()) / 36e5));
  return h < 48 ? `خلال ${formatNumber(h)} ساعة` : `خلال ${formatNumber(Math.round(h / 24))} يوم`;
}
