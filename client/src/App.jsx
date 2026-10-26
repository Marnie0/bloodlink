export default function App() {
  return (
    <main className="mx-auto grid max-w-3xl gap-6 p-8">
      <h1 className="text-3xl">رابط الحياة</h1>
      <p className="text-ink-2">إذا ظهرت هذه الصفحة بخط عربي وألوان BloodLink، فالخطوة ٤ تعمل.</p>

      <div className="rounded-card bg-surface p-6 shadow-card">
        <h2 className="text-xl">بطاقة تجريبية</h2>
        <p className="text-small text-ink-3">rounded-card · bg-surface · shadow-card</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="bg-urgent rounded-field px-5 py-2.5 font-head font-bold text-white">تقديم طلب دم</button>
        <button className="rounded-field bg-navy px-5 py-2.5 font-head font-bold text-white">زر ثانوي</button>
        <span className="rounded-full bg-ok-lt px-3 py-1 text-small font-bold text-ok">موثّق</span>
        <span className="rounded-full bg-warn-lt px-3 py-1 text-small font-bold text-warn">يبدو سليمًا</span>
      </div>

      <button
        className="w-fit rounded-field border border-line px-4 py-2"
        onClick={() => {
          const html = document.documentElement;
          html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
        }}
      >
        تبديل الوضع الليلي
      </button>
    </main>
  );
}
