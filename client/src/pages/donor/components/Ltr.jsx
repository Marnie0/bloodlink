// بيعرض أرقام / أكواد / فصيلة دم إنجليزي جوه جملة عربي من الشمال لليمين، عشان متتلخبطش.
// bold = للأكواد المرجعية (BL-2026-...)
export default function Ltr({ children, bold = false }) {
  return (
    <span dir="ltr" className={`inline-block tabular-nums ${bold ? 'font-semibold tracking-[0.02em]' : ''}`}>
      {children}
    </span>
  );
}
