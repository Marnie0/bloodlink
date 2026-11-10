import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HOSPITALS, PAPER_TYPES } from '../requesterConstants';
import { paperPassed } from '../requesterRules';
import { buttonClass } from '../requesterStyles';
import Field from './Field';
import FileUpload from './FileUpload';
import PaperCheckResult from './PaperCheckResult';
import StepCard from './StepCard';

const HOSPITAL_OPTIONS = HOSPITALS.map((hospital) => ({
  value: hospital.id,
  label: `${hospital.name} · ${hospital.area}${hospital.isPartner ? ' (شريك)' : ''}`,
}));

export default function PaperStep({
  draft,
  check,
  onFieldChange,
  onPick,
  onReupload,
  onRequestReview,
  onBack,
  onNext,
}) {
  const hospital = HOSPITALS.find((item) => item.id === draft.hospitalId);
  const ready = Boolean(draft.hospitalId && draft.paperType && draft.consent);
  const checking = check?.status === 'checking';

  return (
    <div>
      <StepCard title="الخطوة 2 من 4: ورقة المستشفى">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id="hospital"
            label="المستشفى"
            required
            options={HOSPITAL_OPTIONS}
            placeholder="اختر المستشفى"
            value={draft.hospitalId}
            onChange={(event) => onFieldChange({ hospitalId: event.target.value })}
            disabled={checking}
          />
          <Field
            id="paperType"
            label="نوع الورقة"
            required
            options={PAPER_TYPES}
            placeholder="اختر نوع الورقة"
            value={draft.paperType}
            onChange={(event) => onFieldChange({ paperType: event.target.value })}
            disabled={checking}
          />
        </div>

        <p className="mt-5 mb-1.5 text-[0.88rem] font-bold">
          صورة الورقة <span className="text-crimson-ink">*</span>
        </p>
        <p className="text-tiny text-ink-2 mb-3">
          يجب أن يظهر ختم المستشفى واسم المريض والفصيلة وعدد الوحدات بوضوح. JPG أو PNG أو PDF، حتى 5 ميجابايت.
        </p>

        <label className="border-line bg-surface-2 rounded-field mb-3 flex cursor-pointer items-start gap-3 border p-3 text-[0.88rem] font-semibold">
          <input
            type="checkbox"
            checked={draft.consent}
            onChange={(event) => onFieldChange({ consent: event.target.checked })}
            disabled={checking}
            className="accent-navy mt-1 size-4"
          />
          أوافق على فحص الورقة آليًا لقراءة اسم المستشفى والختم والفصيلة والتاريخ. لا تُعرض الورقة لأي مستخدم.
        </label>

        <FileUpload file={draft.file} onPick={onPick} disabled={!ready || checking} />
        {!ready && (
          <p className="text-tiny text-ink-3 mt-2">اختر المستشفى ونوع الورقة ووافق على الفحص أولًا.</p>
        )}
      </StepCard>

      {check && (
        <StepCard title="نتيجة فحص الورقة">
          <PaperCheckResult
            result={check}
            hospital={hospital}
            onReupload={onReupload}
            onRequestReview={onRequestReview}
          />
        </StepCard>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onBack} className={buttonClass('line')}>
          <ArrowRight className="size-4" aria-hidden="true" />
          السابق: بيانات المريض
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!paperPassed(check)}
          className={buttonClass('primary')}
        >
          التالي: المراجعة
          <ArrowLeft className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
