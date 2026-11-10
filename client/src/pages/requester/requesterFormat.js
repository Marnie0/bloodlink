// تاريخ ووقت بالعربي وأرقام إنجليزي، زي باقي الموقع
const dateTimeFormat = new Intl.DateTimeFormat('ar-EG-u-nu-latn', {
  day: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: '2-digit',
});

// '2026-11-08T10:05:00+02:00' -> '8 نوفمبر في 10:05 ص'
export function formatDateTime(iso) {
  return dateTimeFormat.format(new Date(iso));
}

// '01012345678' -> '010 1234 5678'
export function formatPhone(phone) {
  return phone.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1 $2 $3');
}
