import { formatDate } from '../donorFormat';
import { tagClass } from '../donorStyles';
import { ShieldCheck } from 'lucide-react';
import Ltr from '@/components/ui/Ltr';

// جدول سجل التبرعات (مكتوب بـ div). نفس فكرة جدول الطلبات: على الموبايل كل تبرع بيبقى كارت.
const columnsWidth = 'md:grid-cols-[.85fr_1.5fr_1.2fr_1.6fr_.9fr]';
const columnTitles = ['التاريخ', 'المستشفى', 'للطلب', 'كيف تأكّد', 'النتيجة'];

const cellClass =
  'relative flex min-h-10 flex-col justify-center border-b border-line-2 py-[11px] pe-3 ps-[124px] before:absolute before:start-3 before:top-3 before:w-[104px] before:text-[0.76rem] before:leading-normal before:font-semibold before:text-ink-3 before:content-[attr(data-label)] md:min-h-0 md:ps-3 md:before:hidden';

export default function HistoryTable({ donations }) {
  return (
    <div className="rounded-b-card overflow-x-auto text-[0.86rem]">
      {/* صف العناوين (مخفي في الموبايل) */}
      <div
        className={`bg-navy hidden text-[0.8rem] font-medium whitespace-nowrap text-white md:grid ${columnsWidth}`}
      >
        {columnTitles.map((title) => (
          <div key={title} className="px-3 py-2.5 text-start">
            {title}
          </div>
        ))}
      </div>

      <div className="max-md:p-3">
        {donations.map((donation) => (
          <div
            key={donation.requestId}
            className={`md:even:bg-surface-2 md:hover:bg-teal-lt max-md:rounded-tile max-md:border-line max-md:bg-surface max-md:mb-2.5 max-md:overflow-hidden max-md:border md:grid [&:last-child>div]:border-b-0 ${columnsWidth}`}
          >
            <div data-label="التاريخ" className={cellClass}>
              <div>
                <Ltr>{formatDate(donation.date)}</Ltr>
              </div>
            </div>

            <div data-label="المستشفى" className={cellClass}>
              <div>
                <b>{donation.hospital.name}</b>
                <br />
                <small className="text-ink-3">
                  {donation.hospital.area} · {donation.hospital.partner ? 'شريك' : 'غير شريك'}
                </small>
              </div>
            </div>

            <div data-label="للطلب" className={cellClass}>
              <div>
                <Ltr bold>{donation.requestId}</Ltr>
              </div>
            </div>

            {/* كيف اتأكد التبرع: مسح QR في المستشفى، أو تأكيد ذاتي */}
            <div data-label="كيف تأكّد" className={cellClass}>
              <div>
                {donation.confirmedBy === 'hospital_qr' ? (
                  <span className={tagClass('ok')}>
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                    مسح QR في المستشفى
                  </span>
                ) : (
                  <span className={tagClass('grey')}>تأكيد ذاتي من الطرفين</span>
                )}
              </div>
            </div>

            {/* نتيجة التبرع: تم / تأجيل طبي / لم يحضر */}
            <div data-label="النتيجة" className={cellClass}>
              <div>
                {donation.outcome === 'donated' && <span className={tagClass('ok')}>تم التبرع</span>}
                {donation.outcome === 'deferred' && <span className={tagClass('warn')}>تأجيل طبي</span>}
                {donation.outcome === 'no_show' && <span className={tagClass('err')}>لم يحضر</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
