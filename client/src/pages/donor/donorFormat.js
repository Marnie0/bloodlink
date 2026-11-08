// 5 -> ٥  (أرقام عربي في الجمل)
export function formatNumber(number) {
  return new Intl.NumberFormat("ar-EG").format(number);
}

// '2026-06-12' -> '12/06/2026'
export function formatDate(dateText) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC" }).format(
    new Date(dateText),
  );
}

// الساعة بالعربي، مثلاً "٣:١٥ م"
export function formatTime(date) {
  return new Intl.DateTimeFormat("ar-EG", { timeStyle: "short" }).format(date);
}

// بترجع الوقت المتبقي على انتهاء الطلب: أقل من 48 ساعة بالساعات، غير كده بالأيام
export function getTimeLeft(expiresAt) {
  const hoursLeft = Math.max(
    0,
    Math.round((new Date(expiresAt) - Date.now()) / 36e5),
  );
  if (hoursLeft < 48) return { number: hoursLeft, unit: "ساعة" };
  return { number: Math.round(hoursLeft / 24), unit: "يوم" };
}
