import { cardClass, enNum } from '../homeFormat';

// "المنصة بالأرقام": four numbers, the first one with a small weekly bar chart.
export default function PlatformStats({ stats }) {
  const items = [
    { value: stats.donors, label: 'متبرع مسجّل', trend: stats.donorsTrend },
    { value: stats.verifiedDonors, label: 'متبرع موثّق من مستشفى شريك' },
    { value: stats.activeRequests, label: 'طلب نشط الآن' },
    { value: stats.partnerHospitals, label: 'مستشفى شريك' },
  ];

  return (
    <article className={`${cardClass} p-[18px] sm:col-span-2`}>
      <h3 className="text-base font-bold">المنصة بالأرقام</h3>
      <dl className="mt-3 grid grid-cols-2 gap-2.5">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-line-2 bg-surface-2 flex flex-col rounded-[14px] border px-3.5 py-3"
          >
            <dt className="text-ink-2 order-2 text-[0.74rem]">{item.label}</dt>
            <dd
              dir="ltr"
              className="font-head text-head order-1 text-end text-2xl leading-[1.2] font-extrabold"
            >
              {enNum(item.value)}
            </dd>
            {item.trend && <Spark values={item.trend} />}
          </div>
        ))}
      </dl>
    </article>
  );
}

// Decoration: the numbers are already written above, so screen readers skip it
function Spark({ values }) {
  const last = values.length - 1;
  return (
    <div aria-hidden="true" className="order-3 mt-1.5 flex h-[22px] items-end gap-[3px]">
      {values.map((height, i) => (
        <i
          key={i}
          style={{ height: `${height}%` }}
          className={`flex-1 rounded-[3px] ${i === last ? 'bg-teal' : 'bg-teal-lt hc:border-ink hc:border hc:bg-transparent'}`}
        />
      ))}
    </div>
  );
}
