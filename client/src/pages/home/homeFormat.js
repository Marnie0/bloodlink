// Small helpers for the home page text.

// The white card look used by every home card
export const cardClass = 'rounded-card border border-line bg-surface shadow-card hc:border-2';

// 18 → "١٨" (Arabic digits inside Arabic sentences)
export const arNum = (n) => n.toLocaleString('ar-EG');

// 3482 → "3,482" (big stat numbers stay Latin, like the design)
export const enNum = (n) => n.toLocaleString('en-US');

// Hours left → "خلال ١٨ ساعة" / "خلال يومين" / "خلال ٣ أيام"
export function timeLeft(hours) {
  if (hours < 48) return `خلال ${arNum(hours)} ساعة`;
  const days = Math.round(hours / 24);
  return days === 2 ? 'خلال يومين' : `خلال ${arNum(days)} أيام`;
}

// "O-" → "O−" (a real minus sign, easier to read than a hyphen)
export const typeLabel = (type) => type.replace('-', '−');
