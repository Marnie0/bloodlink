import Ltr from '@/components/ui/Ltr';
import { formatDate } from '../donorFormat';
import { tagClass } from '../donorStyles';

export default function AvailabilitySwitch({ isAvailable, eligibleFrom, onToggle }) {
  // هل عدّت فترة الراحة بعد آخر تبرع؟ (إرشاد بس، المستشفى هي اللي تقرر)
  const isEligibleNow = new Date(eligibleFrom) <= new Date();

  return (
    <div className="rounded-card border-line bg-surface shadow-card hc:border-2 border px-4.5 py-3.5">
      <label className="text-small text-ink flex cursor-pointer items-center justify-between gap-2.5">
        متاح لاستقبال الطلبات
        <input
          type="checkbox"
          role="switch"
          className="toggle border-ink-3 bg-ink-3 checked:border-success checked:bg-success text-white [--size:1.75rem]"
          checked={isAvailable}
          onChange={(event) => onToggle(event.target.checked)}
        />
      </label>

      <div className="mt-2.5 flex items-center justify-between gap-2.5">
        <span className="text-small">الحالة الطبية</span>
        {isEligibleNow ? (
          <span className={tagClass('ok')}>مؤهل الآن</span>
        ) : (
          <span className={tagClass('warn')}>
            مؤهل من <Ltr>{formatDate(eligibleFrom)}</Ltr>
          </span>
        )}
      </div>

      <p className="text-tiny text-ink-3 mt-2 mb-0">القرار الطبي النهائي للمستشفى دائماً.</p>
    </div>
  );
}
