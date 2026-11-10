// كلاسات الحقول والأزرار لصفحة التقديم. لو عايز تغيّر الشكل، غيّره هنا.

export function inputClass(invalid) {
  return `${
    invalid ? 'border-crimson' : 'border-line'
  } bg-surface text-ink rounded-field w-full border px-3 py-2.5 text-[0.92rem] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal disabled:opacity-60`;
}

const BUTTONS = {
  primary: 'bg-urgent shadow-urgent text-white',
  navy: 'bg-navy text-white',
  line: 'border-line bg-surface text-ink hover:border-ink-3 border',
};

export function buttonClass(kind = 'line') {
  return `${BUTTONS[kind]} rounded-field inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[0.9rem] font-bold disabled:cursor-not-allowed disabled:opacity-50`;
}
