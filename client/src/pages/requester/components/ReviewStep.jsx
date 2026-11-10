import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CHECK_LABELS, HOSPITALS, PAPER_TYPES, URGENCY } from '../requesterConstants';
import { formatDateTime } from '../requesterFormat';
import { buttonClass } from '../requesterStyles';
import StepCard from './StepCard';

function Row({ label, children }) {
  return (
    <div className="border-line-2 flex flex-wrap items-center justify-between gap-2 border-b py-3 last:border-b-0">
      <dt className="text-ink-2 text-[0.88rem]">{label}</dt>
      <dd className="text-[0.92rem] font-bold">{children}</dd>
    </div>
  );
}

export default function ReviewStep({ draft, check, onBack, onNext }) {
  const hospital = HOSPITALS.find((item) => item.id === draft.hospitalId);
  const urgency = URGENCY.find((item) => item.value === draft.urgency);
  const paperType = PAPER_TYPES.find((item) => item.value === draft.paperType);

  return (
    <div>
      <StepCard title="الخطوة 3 من 4: راجع بياناتك">
        <dl>
          <Row label="فصيلة الدم">
            <span dir="ltr">{draft.bloodType}</span>
          </Row>
          <Row label="عدد الوحدات">{draft.units}</Row>
          <Row label="درجة الاستعجال">{urgency?.label}</Row>
          <Row label="مطلوب قبل">{formatDateTime(draft.neededBy)}</Row>
          <Row label="المستشفى">
            {hospital?.name} · {hospital?.area}
          </Row>
          <Row label="نوع الورقة">{paperType?.label}</Row>
          <Row label="الملف">
            <span dir="ltr">{draft.file?.name}</span>
          </Row>
          <Row label="نتيجة الفحص">{CHECK_LABELS[check.status]}</Row>
        </dl>
      </StepCard>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onBack} className={buttonClass('line')}>
          <ArrowRight className="size-4" aria-hidden="true" />
          السابق: ورقة المستشفى
        </button>
        <button type="button" onClick={onNext} className={buttonClass('primary')}>
          التالي: الإقرار والإرسال
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
