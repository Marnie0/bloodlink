export default function App() {
  return (
    <main className="mx-auto grid max-w-3xl gap-6 p-8">
      <h1 className="text-3xl">رابط الحياة</h1>
      <p className="text-ink-2">إذا ظهرت هذه الصفحة بخط عربي وألوان BloodLink، فالخطوة ٤ تعمل.</p>

      <div className="rounded-card bg-surface shadow-card p-6">
        <h2 className="text-xl">بطاقة تجريبية</h2>
        <p className="text-small text-ink-3">rounded-card · bg-surface · shadow-card</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="bg-urgent rounded-field font-head px-5 py-2.5 font-bold text-white">
          تقديم طلب دم
        </button>
        <button className="rounded-field bg-navy font-head px-5 py-2.5 font-bold text-white">زر ثانوي</button>
        <span className="bg-ok-lt text-small text-ok rounded-full px-3 py-1 font-bold">موثّق</span>
        <span className="bg-warn-lt text-small text-warn rounded-full px-3 py-1 font-bold">يبدو سليمًا</span>
      </div>

      <button
        className="rounded-field border-line w-fit border px-4 py-2"
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
