import { Link } from 'react-router-dom';
import { getTimeLeft } from '../donorFormat';
import { buttonClass, tagClass } from '../donorStyles';
import BloodTypeChip from '@/components/ui/BloodTypeChip';
import LiveDot from '@/components/ui/LiveDot';
import Ltr from '@/components/ui/Ltr';
import TrustBadge from '@/components/ui/TrustBadge';

// عرض الأعمدة الـ 8 على الشاشة الكبيرة
const columnsWidth = 'md:grid-cols-[1.4fr_.55fr_1.6fr_.65fr_.85fr_.95fr_.7fr_1fr]';
const columnTitles = ['الرقم المرجعي', 'الفصيلة', 'المستشفى', 'المسافة', 'الوحدات', 'الورقة', 'ينتهي', ''];

const cellClass =
  'relative flex min-h-10 flex-col justify-center border-b border-line-2 py-[11px] pe-3 ps-[124px] before:absolute before:start-3 before:top-3 before:w-[104px] before:text-[0.76rem] before:leading-normal before:font-semibold before:text-ink-3 before:content-[attr(data-label)] md:min-h-0 md:ps-3 md:before:hidden';

export default function RequestsTable({ requests }) {
  return (
    <div className="rounded-b-card overflow-x-auto text-[0.86rem]">
      {/* صف العناوين (مخفي في الموبايل) */}
      <div
        className={`bg-navy hidden text-[0.8rem] font-medium whitespace-nowrap text-white md:grid ${columnsWidth}`}
      >
        {columnTitles.map((title, index) => (
          <div key={index} className="px-3 py-2.5 text-start">
            {index === columnTitles.length - 1 ? <span className="sr-only">الإجراء</span> : title}
          </div>
        ))}
      </div>

      {/* صف لكل طلب */}
      <div className="max-md:p-3">
        {requests.map((request) => {
          const isUrgent = request.urgency === 'urgent';
          const timeLeft = getTimeLeft(request.expiresAt);
          const pledgedPercent = (request.unitsPledged / request.unitsNeeded) * 100;

          return (
            <div
              key={request.id}
              className={`md:even:bg-surface-2 md:hover:bg-teal-lt max-md:rounded-tile max-md:border-line max-md:bg-surface max-md:mb-2.5 max-md:overflow-hidden max-md:border md:grid [&:last-child>div]:border-b-0 ${columnsWidth}`}
            >
              {/* الرقم المرجعي + علامة "عاجل" */}
              <div data-label="الرقم المرجعي" className={cellClass}>
                <div>
                  <Ltr bold>{request.id}</Ltr>
                </div>
                {isUrgent && (
                  <div className="mt-1">
                    <span className={tagClass('err')}>
                      <LiveDot />
                      عاجل
                    </span>
                  </div>
                )}
              </div>

              <div data-label="الفصيلة" className={cellClass}>
                <div>
                  <BloodTypeChip type={request.bloodType} solid={isUrgent} />
                </div>
              </div>

              <div data-label="المستشفى" className={cellClass}>
                <div>
                  <b>{request.hospital.name}</b>
                  <br />
                  <small className="text-ink-3">
                    {request.hospital.area} · {request.hospital.partner ? 'شريك' : 'غير شريك'}
                  </small>
                </div>
              </div>

              <div data-label="المسافة" className={cellClass}>
                <div className="whitespace-nowrap">
                  <Ltr>{request.distanceKm}</Ltr> كم
                </div>
              </div>

              {/* الوحدات المتعهد بيها من المطلوبة + شريط تقدم (progress من daisyUI) */}
              <div data-label="الوحدات" className={cellClass}>
                <div>
                  <Ltr>
                    {request.unitsPledged}/{request.unitsNeeded}
                  </Ltr>
                </div>
                <progress
                  className="progress bg-line-2 text-crimson [&::-moz-progress-bar]:bg-urgent [&::-webkit-progress-value]:bg-urgent [&::-webkit-progress-bar]:bg-line-2 mt-[5px] block h-[5px] w-20 rounded-full"
                  value={pledgedPercent}
                  max="100"
                  aria-label={`${request.unitsPledged} من ${request.unitsNeeded}`}
                />
              </div>

              <div data-label="الورقة" className={cellClass}>
                <div>
                  <TrustBadge level={request.trust} short />
                </div>
              </div>

              <div data-label="ينتهي" className={cellClass}>
                <div className="whitespace-nowrap">
                  <Ltr>{timeLeft.number}</Ltr> {timeLeft.unit}
                </div>
              </div>

              <div data-label="الإجراء" className={cellClass}>
                <div>
                  <Link
                    to={`/donor/requests/${request.id}`}
                    className={buttonClass(isUrgent ? 'primary' : 'line', 'sm')}
                  >
                    عرض الطلب
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
