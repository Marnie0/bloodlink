import { Clock, FileCheck, ShieldCheck, TriangleAlert } from 'lucide-react';
import { CHECK_LABELS, PROBLEM_LABELS } from '../requesterConstants';
import { buttonClass } from '../requesterStyles';

// نتيجة فحص الورقة (result.status):
//   checking          : لسه بنقرأ الورقة
//   pending_hospital  : المستشفى شريكة، بعتنا لها الورقة تأكدها
//   looks_valid       : المستشفى مش شريكة، والفحص الآلي شايفها سليمة
//   queued            : الفحص الآلي واقف، الورقة راحت لطابور المراجعة
//   needs_review      : الورقة مش واضحة، يرفع صورة أوضح أو يطلب مراجعة
// الفحص الآلي عمره ما يقول إن الورقة "أصلية" (FR-10).
const LOOKS = {
  pending_hospital: {
    Icon: ShieldCheck,
    card: 'from-info-lt',
    box: 'bg-info',
    tag: 'bg-info-lt text-info',
    title: (hospital) => `أرسلنا الورقة إلى ${hospital.name} لتأكيدها`,
    text: (hospital) =>
      `${hospital.name} شريك لنا. سيؤكد بنك الدم أن الورقة صادرة منه، عادةً خلال ساعتين في أوقات العمل.`,
    after: 'يُرسل الطلب للمتبرعين فور التأكيد، وتظهر عليه علامة "موثّق".',
  },
  looks_valid: {
    Icon: FileCheck,
    card: 'from-warn-lt',
    box: 'bg-warn',
    tag: 'bg-warn-lt text-warn',
    title: () => 'الورقة تبدو سليمة',
    text: () => 'فحصنا الورقة آليًا ووجدنا أنها تبدو رسمية. الفحص الآلي لا يؤكد أنها أصلية.',
    after: 'يُرسل الطلب للمتبرعين فورًا، وتظهر عليه علامة "ورقة تبدو سليمة".',
  },
  queued: {
    Icon: Clock,
    card: 'from-info-lt',
    box: 'bg-info',
    tag: 'bg-info-lt text-info',
    title: () => 'الورقة في طابور المراجعة',
    text: () => 'الفحص الآلي غير متاح الآن، فأرسلنا الورقة لفريق المراجعة. لا شيء مطلوب منك.',
    after: 'يراجع الفريق الورقة، ثم يُرسل الطلب للمتبرعين.',
  },
  needs_review: {
    Icon: TriangleAlert,
    card: 'from-crimson-lt',
    box: 'bg-crimson',
    tag: 'bg-crimson-lt text-crimson-ink',
    title: () => 'لم نستطع قراءة الورقة بوضوح',
    text: () => 'صوّر الورقة في ضوء جيد وبشكل مستقيم، أو اطلب مراجعة يدوية.',
    after: '',
  },
};

function Row({ label, children }) {
  return (
    <div className="border-line-2 flex flex-wrap items-center justify-between gap-2 border-t py-2.5">
      <dt className="text-ink-2 text-[0.86rem]">{label}</dt>
      <dd className="text-[0.88rem] font-semibold">{children}</dd>
    </div>
  );
}

export default function PaperCheckResult({ result, hospital, onReupload, onRequestReview }) {
  if (result.status === 'checking') {
    return (
      <div aria-busy="true" className="border-line rounded-card flex items-center gap-3 border p-4">
        <span
          aria-hidden="true"
          className="border-info size-7 animate-spin rounded-full border-2 border-t-transparent motion-reduce:animate-none"
        />
        <div>
          <h3 className="font-bold">نقرأ الورقة الآن…</h3>
          <p className="text-ink-2 text-[0.86rem]">عادةً أقل من 10 ثوانٍ.</p>
        </div>
      </div>
    );
  }

  const look = LOOKS[result.status];
  const { Icon } = look;

  return (
    <div className={`${look.card} to-surface border-line rounded-card border bg-linear-to-b p-4.5`}>
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`${look.box} grid size-12 shrink-0 place-items-center rounded-xl text-white`}
        >
          <Icon className="size-6" />
        </span>
        <div>
          <h3 className="text-[1.08rem] font-bold">{look.title(hospital)}</h3>
          <p className="text-ink-2 mt-0.5 text-[0.88rem]">{look.text(hospital)}</p>
        </div>
      </div>

      {result.status === 'needs_review' ? (
        <>
          {result.problems.length > 0 && (
            <ul className="text-ink-2 mt-3 list-disc ps-5 text-[0.88rem]">
              {result.problems.map((problem) => (
                <li key={problem}>{PROBLEM_LABELS[problem] ?? problem}</li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={onReupload} className={buttonClass('primary')}>
              رفع صورة أوضح
            </button>
            <button type="button" onClick={onRequestReview} className={buttonClass('line')}>
              طلب مراجعة يدوية
            </button>
          </div>
        </>
      ) : (
        <dl className="mt-3">
          <Row label="الحالة">
            <span
              className={`${look.tag} inline-flex rounded-full px-2.5 py-0.5 text-[0.76rem] font-semibold`}
            >
              {CHECK_LABELS[result.status]}
            </span>
          </Row>
          <Row label="بعد ذلك">{look.after}</Row>
        </dl>
      )}
    </div>
  );
}
