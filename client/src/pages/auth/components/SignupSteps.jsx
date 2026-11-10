import Notice from '@/components/ui/Notice';
import Panel from '@/components/ui/Panel';

const STEPS = [
  { title: 'ترفع شهادة الفصيلة', text: 'من المستشفى، عليها الختم.' },
  { title: 'نتحقق من الشهادة', text: 'المستشفى الشريك يؤكدها، أو فحص آلي لغيره.' },
  { title: 'تصلك الطلبات المتوافقة', text: 'ضمن 5 كم ثم 15 كم.' },
];

// The side column: what happens after signing up, and the phone-privacy note
export default function SignupSteps() {
  return (
    <aside className="grid gap-4">
      <Panel title="ماذا يحدث بعد التسجيل؟">
        <ol className="p-4.5">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="after:bg-line-2 relative grid grid-cols-[36px_1fr] gap-3 pb-5 after:absolute after:start-[17px] after:top-11 after:bottom-1 after:w-0.5 last:pb-0 last:after:hidden"
            >
              <span
                aria-hidden="true"
                className="bg-teal-lt text-teal-ink grid size-9 place-items-center rounded-xl font-bold tabular-nums"
              >
                {index + 1}
              </span>
              <div>
                <b className="mt-1.5 block text-[0.92rem]">{step.title}</b>
                <p className="text-ink-2 text-[0.84rem]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
      <Notice tone="gold">لا نعرض رقم هاتفك لأي أحد قبل أن توافق على طلب.</Notice>
    </aside>
  );
}
