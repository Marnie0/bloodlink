import { formatDate } from '../donorFormat';
import { buttonClass } from '../donorStyles';
import { Camera, FileCheck, ShieldCheck, TriangleAlert } from 'lucide-react';
import Ltr from '@/components/ui/Ltr';
import TrustBadge from '@/components/ui/TrustBadge';

// نتيجة فحص الشهادة. فيه 4 حالات (result.status):
//   checking          : لسه بنقرأ الشهادة
//   pending_hospital  : المستشفى شريكة، بعتنا لها الشهادة تأكدها
//   looks_valid       : المستشفى مش شريكة، والفحص الآلي شايفها سليمة
//   needs_review      : مقدرناش نقرأها (يرفع صورة أوضح أو يطلب مراجعة يدوية)
// ملحوظة: الفحص الآلي عمره ما يقول إن الشهادة "أصلية" (FR-10).
//   hospital = المستشفى اللي اختارها     reviewStatus = 'idle' | 'sending' | 'sent'
const looks = {
  pending_hospital: {
    card: 'from-info-lt',
    iconBox: 'bg-info',
    icon: ShieldCheck,
  },
  looks_valid: { card: 'from-warn-lt', iconBox: 'bg-warn', icon: FileCheck },
  needs_review: {
    card: 'from-crimson-lt',
    iconBox: 'bg-crimson',
    icon: TriangleAlert,
  },
};

export default function PaperCheckResult({
  result,
  hospital,
  reviewStatus,
  onSave,
  onReupload,
  onRequestReview,
}) {
  //  لسه بنفحص
  if (result.status === 'checking') {
    return (
      <div aria-busy="true" className="rounded-card border-line border p-[18px]">
        <div className="flex items-start gap-3">
          <span className="text-info grid size-12 shrink-0 place-items-center">
            <span className="loading loading-spinner loading-md" />
          </span>
          <div>
            <h3 className="font-head text-head text-[1.08rem] leading-[1.4] font-bold">نقرأ الشهادة الآن…</h3>
            <p className="text-ink-2 mt-0.5 mb-0 text-[0.86rem]">عادةً أقل من ١٠ ثوانٍ.</p>
          </div>
        </div>
      </div>
    );
  }

  const look = looks[result.status];

  let title;
  let text;
  if (result.status === 'pending_hospital') {
    title = `أرسلنا الشهادة إلى ${hospital.name} لتأكيدها`;
    text = (
      <>
        عند التأكيد يصبح حسابك <b>متبرعاً موثّقاً</b>.
      </>
    );
  } else if (result.status === 'looks_valid') {
    title = 'فحصنا الشهادة آلياً، وتبدو سليمة';
    text = `${hospital.name} ليس شريكاً، لذلك سيظهر حسابك بعلامة «قدّم ورقة تبدو سليمة». أنت مسؤول عن صحتها.`;
  } else {
    title = 'لم نتمكن من قراءة الشهادة';
    text = 'ارفع صورة أوضح، أو اطلب مراجعة يدوية من فريقنا (حتى ٢٤ ساعة).';
  }

  return (
    <div className={`rounded-card border-line to-surface border bg-linear-160 to-65% p-[18px] ${look.card}`}>
      {/* الأيقونة + العنوان + الشرح */}
      <div className="mb-3 flex items-start gap-3">
        <span
          className={`dark:text-canvas grid size-12 shrink-0 place-items-center rounded-2xl text-white ${look.iconBox}`}
        >
          <look.icon className="size-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-head text-head text-[1.08rem] leading-[1.4] font-bold">{title}</h3>
          <p className="text-ink-2 mt-0.5 mb-0 text-[0.86rem]">{text}</p>
        </div>
      </div>

      {/* مستشفى شريكة: الحالة الحالية وإيه اللي هيحصل بعد التأكيد */}
      {result.status === 'pending_hospital' && (
        <div className="text-[0.88rem]">
          <div className="border-line flex items-center gap-3 border-b border-dashed py-[9px]">
            <span className="text-ink-2 w-[38%] font-medium">الحالة</span>
            <TrustBadge level="pending" />
          </div>
          <div className="flex items-center gap-3 py-[9px]">
            <span className="text-ink-2 w-[38%] font-medium">عند التأكيد</span>
            <TrustBadge level="verified" />
          </div>
        </div>
      )}

      {/* الفحص الآلي قرأ الشهادة: بنعرض اللي اتقرأ */}
      {result.status === 'looks_valid' && (
        <>
          <div className="my-3 grid grid-cols-2 gap-2">
            <ExtractedItem label="الاسم" value={result.extracted.name} />
            <ExtractedItem label="الفصيلة" value={<Ltr>{result.extracted.bloodType}</Ltr>} />
            <ExtractedItem
              label="ختم المستشفى"
              value={result.extracted.stampVisible ? 'ظاهر ✓' : 'غير ظاهر'}
            />
            <ExtractedItem label="التاريخ" value={<Ltr>{formatDate(result.extracted.date)}</Ltr>} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={buttonClass('primary')} onClick={onSave}>
              حفظ ومتابعة
            </button>
          </div>
        </>
      )}

      {/* مقدرناش نقرأها: زرارين */}
      {result.status === 'needs_review' && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className={buttonClass('primary')} onClick={onReupload}>
            <Camera aria-hidden="true" />
            رفع صورة أوضح
          </button>
          <button
            type="button"
            className={buttonClass('line')}
            disabled={reviewStatus !== 'idle'}
            onClick={onRequestReview}
          >
            {reviewStatus === 'sent'
              ? 'تم طلب المراجعة اليدوية'
              : reviewStatus === 'sending'
                ? 'جارٍ الإرسال…'
                : 'طلب مراجعة يدوية'}
          </button>
        </div>
      )}
    </div>
  );
}

// مربع صغير فيه عنوان وقيمة (الاسم / الفصيلة / ختم المستشفى / التاريخ)
function ExtractedItem({ label, value }) {
  return (
    <div className="rounded-field border-line-2 bg-surface text-ink-3 border px-3 py-2.5 text-[0.74rem]">
      {label}
      <b className="font-head text-ink mt-px block text-[0.9rem] font-semibold">{value}</b>
    </div>
  );
}
