// styles.js: أشكال الزراير والعلامات الصغيرة في مكان واحد.
// لو عايز تغير شكل كل الزراير في المشروع غيّره هنا بس.
// الألوان (bg-navy, text-teal-ink, border-line ...) من index.css، و btn / badge من daisyUI.

//  الزراير
// الاستخدام: <button className={buttonClass('primary')}>  أو  <Link className={buttonClass('line', 'sm')}>
//   variant: 'primary' (أحمر، للحاجة الأساسية بس) | 'navy' | 'line' (أبيض بحدود) | 'ghost' (رمادي فاتح)
//   size:    'md' (العادي) | 'sm' (الصغير)
const buttonBase =
  "btn h-auto min-h-0 gap-2 whitespace-nowrap border hc:border-2 font-body font-semibold leading-normal shadow-none transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 hc:border-black";

const buttonSizes = {
  md: "rounded-field px-5 py-2.5 text-[0.92rem]",
  sm: "rounded-[10px] px-3 py-[5px] text-[0.8rem]",
};

const buttonVariants = {
  primary:
    "border-transparent bg-urgent text-white shadow-urgent hover:brightness-105",
  navy: "border-transparent bg-navy text-white hover:bg-navy-2",
  line: "border-line bg-surface text-teal-ink hover:border-teal-ink hover:bg-teal-lt",
  ghost: "border-line-2 bg-surface-2 text-ink",
};

export function buttonClass(variant = "primary", size = "md") {
  return `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]}`;
}

//  العلامات الصغيرة (tag)
// الاستخدام: <span className={tagClass('ok')}>   color: 'ok' | 'warn' | 'err' | 'info' | 'grey'
const tagBase =
  "badge h-auto gap-[5px] whitespace-nowrap rounded-full border border-transparent px-2.5 py-0.5 text-[0.74rem] font-semibold leading-[1.75] hc:border-[1.5px] hc:border-current";

const tagColors = {
  ok: "bg-ok-lt text-ok",
  warn: "bg-warn-lt text-warn",
  err: "bg-crimson-lt text-crimson-ink",
  info: "bg-info-lt text-info",
  grey: "border-line bg-surface-2 text-ink-2",
};

export function tagClass(color) {
  return `${tagBase} ${tagColors[color]}`;
}
