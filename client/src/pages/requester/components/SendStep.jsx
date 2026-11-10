import { ArrowRight } from 'lucide-react';
import Notice from '@/components/ui/Notice';
import { buttonClass } from '../requesterStyles';
import StepCard from './StepCard';

export default function SendStep({ declared, onDeclare, submitting, error, onSubmit, onBack }) {
  return (
    <div>
      <StepCard title="الخطوة 4 من 4: الإقرار والإرسال">
        <label className="border-line bg-surface-2 rounded-field flex cursor-pointer items-start gap-3 border p-3 text-[0.9rem] font-semibold">
          <input
            type="checkbox"
            checked={declared}
            onChange={(event) => onDeclare(event.target.checked)}
            disabled={submitting}
            className="accent-navy mt-1 size-4"
          />
          أقرّ بأن البيانات صحيحة، وأن الورقة خاصة بالمريض، وأن المنصة وسيط للتواصل فقط ولا مقابل مادي.
        </label>

        {error && (
          <div role="alert" className="mt-4">
            <Notice tone="err">{error}</Notice>
          </div>
        )}
      </StepCard>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onBack} disabled={submitting} className={buttonClass('line')}>
          <ArrowRight className="size-4" aria-hidden="true" />
          السابق: المراجعة
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!declared || submitting}
          className={buttonClass('primary')}
        >
          {submitting ? 'جارٍ الإرسال…' : 'إرسال الطلب'}
        </button>
      </div>
    </div>
  );
}
