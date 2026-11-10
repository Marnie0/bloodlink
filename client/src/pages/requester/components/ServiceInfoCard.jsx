import Notice from '@/components/ui/Notice';

function Section({ title, children }) {
  return (
    <div className="border-line-2 border-b px-4.5 py-3.5 last:border-b-0">
      <h3 className="mb-1 text-[0.92rem] font-bold">{title}</h3>
      <div className="text-ink-2 text-[0.86rem]">{children}</div>
    </div>
  );
}

// معلومات ثابتة عن الخدمة، بتظهر على الجنب في كل الخطوات
export default function ServiceInfoCard() {
  return (
    <aside className="grid gap-4">
      <section className="bg-surface border-line rounded-card shadow-card border">
        <h2 className="border-line-2 flex items-center gap-2.5 border-b px-4.5 py-3.5 text-[1.05rem] font-extrabold">
          <span aria-hidden="true" className="bg-gold inline-block h-4.5 w-1 rounded" />
          بطاقة الخدمة
        </h2>
        <Section title="المستندات المطلوبة">
          <ol className="list-decimal ps-5">
            <li>ورقة طلب دم أو تقرير من المستشفى، عليها الختم.</li>
            <li>رقم هاتف صاحب الطلب.</li>
          </ol>
        </Section>
        <Section title="مدة الخدمة">فوري للفحص الآلي · حتى ساعتين لتأكيد المستشفى الشريك.</Section>
        <Section title="رسوم الخدمة">
          <b className="text-ok">مجانًا</b> · ممنوع أي مقابل مادي.
        </Section>
      </section>
      <Notice tone="gold">
        المنصة تربط صاحب الطلب بالمتبرعين فقط. اللقاء في المستشفى، والمستشفى وحده يقرر طبيًا. ورقتك خاصة ولا
        تظهر لأي مستخدم.
      </Notice>
    </aside>
  );
}
