import { cardClass } from '../homeFormat';

const STEPS = [
  { title: 'تقديم الطلب', text: 'بيانات المريض وورقة رسمية من المستشفى.' },
  { title: 'فحص الورقة', text: 'تأكيد من المستشفى الشريك، أو فحص آلي لغير الشريك.' },
  { title: 'إشعار المتبرعين', text: 'لمتبرعين قريبين بفصيلة متوافقة.' },
  { title: 'اللقاء في المستشفى', text: 'المستشفى وحده يقرر طبياً.' },
];

export default function HowItWorks() {
  return (
    <article className={`${cardClass} p-[18px] sm:col-span-2`}>
      <h3 className="text-base font-bold">خطوات الخدمة</h3>
      <ol className="xs:grid-cols-2 mt-3 grid gap-2.5">
        {STEPS.map((step, i) => (
          <li
            key={step.title}
            className="bg-surface-2 text-ink-2 rounded-[14px] px-3.5 py-3 text-[0.8rem] leading-relaxed"
          >
            <span
              dir="ltr"
              aria-hidden="true"
              className="font-head text-gold-ink block text-[1.15rem] font-extrabold"
            >
              0{i + 1}
            </span>
            <b className="text-head block text-[0.88rem]">{step.title}</b>
            {step.text}
          </li>
        ))}
      </ol>
    </article>
  );
}
