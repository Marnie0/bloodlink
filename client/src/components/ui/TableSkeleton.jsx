// صفوف رمادية متحركة بتظهر وإحنا بنحمّل الجدول (skeleton من daisyUI).
// label = النص اللي بيتقرا لقارئ الشاشة
export default function TableSkeleton({ label = "جارٍ التحميل…" }) {
  const rows = [1, 2, 3];
  return (
    <div aria-busy="true">
      {rows.map((row) => (
        <div
          key={row}
          className="border-line-2 grid grid-cols-2 items-center gap-3.5 border-b px-[18px] py-3.5 last:border-b-0 md:grid-cols-6"
        >
          <span className="skeleton my-2 block h-3" />
          <span className="skeleton block h-[30px] w-11" />
          <span className="skeleton my-2 block h-3" />
          <span className="skeleton my-2 block h-3" />
          <span className="skeleton my-2 block h-3" />
          <span className="skeleton rounded-field block h-10" />
        </div>
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}
