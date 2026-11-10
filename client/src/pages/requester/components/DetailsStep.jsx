import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BLOOD_TYPES, UNITS_MAX, URGENCY } from '../requesterConstants';
import { detailsErrors } from '../requesterRules';
import { buttonClass } from '../requesterStyles';
import Field from './Field';
import StepCard from './StepCard';

const BLOOD_OPTIONS = BLOOD_TYPES.map((type) => ({ value: type, label: `${type}\u200E` }));

export default function DetailsStep({ draft, onChange, onNext }) {
  const [showErrors, setShowErrors] = useState(false);
  const errors = showErrors ? detailsErrors(draft) : {};

  function handleNext() {
    if (Object.keys(detailsErrors(draft)).length > 0) {
      setShowErrors(true); // الأخطاء بتظهر بعد أول ضغطة بس
      return;
    }
    onNext();
  }

  return (
    <StepCard title="الخطوة 1 من 4: بيانات المريض">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="bloodType"
          label="فصيلة الدم"
          required
          options={BLOOD_OPTIONS}
          placeholder="اختر الفصيلة"
          value={draft.bloodType}
          onChange={(event) => onChange({ bloodType: event.target.value })}
          error={errors.bloodType}
        />
        <Field
          id="units"
          label="عدد الوحدات"
          required
          type="number"
          min={1}
          max={UNITS_MAX}
          value={draft.units}
          onChange={(event) => onChange({ units: event.target.value })}
          error={errors.units}
        />
        <Field
          id="urgency"
          label="درجة الاستعجال"
          required
          options={URGENCY}
          placeholder="اختر درجة الاستعجال"
          value={draft.urgency}
          onChange={(event) => onChange({ urgency: event.target.value })}
          error={errors.urgency}
        />
        <Field
          id="neededBy"
          label="مطلوب قبل"
          required
          type="datetime-local"
          value={draft.neededBy}
          onChange={(event) => onChange({ neededBy: event.target.value })}
          error={errors.neededBy}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button type="button" onClick={handleNext} className={buttonClass('primary')}>
          التالي: ورقة المستشفى
          <ArrowLeft className="size-4" ari a-hidden="true" />
        </button>
      </div>
    </StepCard>
  );
}
