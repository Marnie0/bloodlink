import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOOD_TYPES } from '@/lib/bloodTypes';
import { arNum, cardClass, typeLabel } from '../homeFormat';

// "ما فصيلتك؟": pick a blood type to see how many requests need it.
// Toggle buttons (aria-pressed), not radios: picking one only shows a shortcut, it isn't a form.
export default function TypeFilter({ counts }) {
  const [selected, setSelected] = useState(null);
  const count = selected ? counts[selected] : 0;

  return (
    <article className={`${cardClass} p-[18px] sm:col-span-2`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-bold">ما فصيلتك؟</h3>
        <span className="text-tiny text-ink-3">اختر لترى الطلبات المتوافقة</span>
      </div>

      <div role="group" aria-label="فصيلة الدم" className="mt-3 flex flex-wrap gap-2">
        {BLOOD_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            dir="ltr"
            aria-pressed={selected === type}
            onClick={() => setSelected(selected === type ? null : type)}
            className="border-line bg-surface font-head text-ink aria-pressed:border-navy aria-pressed:bg-navy w-[62px] rounded-[14px] border-[1.5px] py-2 text-center font-bold aria-pressed:text-white"
          >
            {typeLabel(type)}
            <small dir="rtl" className="font-body block text-[0.64rem] font-normal opacity-75">
              {arNum(counts[type])} {counts[type] === 1 ? 'طلب' : 'طلبات'}
            </small>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="text-small mt-3 empty:hidden">
        {selected &&
          (count > 0 ? (
            <Link to="/donor/requests" className="text-teal-ink font-semibold hover:underline">
              عرض الطلبات القريبة لفصيلة <span dir="ltr">{typeLabel(selected)}</span> ←
            </Link>
          ) : (
            <span className="text-ink-2">لا توجد طلبات لهذه الفصيلة الآن.</span>
          ))}
      </p>
    </article>
  );
}
