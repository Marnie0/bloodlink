import { Link } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';
import LiveDot from '@/components/ui/LiveDot';
import { TRUST_LABELS } from '@/pages/donor/donorConstants';
import { arNum, timeLeft, typeLabel } from '../homeFormat';

// The big red card: the most urgent requests right now.
export default function UrgentCard({ requests }) {
  return (
    <article
      aria-labelledby="urgent-title"
      className="rounded-card bg-urgent shadow-raised relative overflow-hidden p-5 text-white sm:col-span-2 lg:row-span-2"
    >
      <div
        aria-hidden="true"
        className="hc:hidden absolute -start-[110px] -top-[120px] size-80 rounded-full bg-white/8"
      />

      <span className="relative inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[0.78rem]">
        <LiveDot /> مباشر · طلبات عاجلة
      </span>

      {requests.length === 0 ? (
        <div className="relative py-8 text-center">
          <Heart className="mx-auto mb-3 size-10" aria-hidden="true" />
          <h2 id="urgent-title" className="text-[1.1rem] font-bold text-white">
            لا توجد طلبات عاجلة الآن
          </h2>
          <p className="mt-1 text-[0.88rem] text-white/90">
            خبر جيد. سجّل كمتبرع لنُبلغك فور ظهور طلب يناسب فصيلتك قريباً منك.
          </p>
          <Link
            to="/signup"
            className="mt-4 inline-block rounded-[10px] bg-white px-3 py-1.5 text-[0.8rem] font-semibold text-[#8E0D2F]"
          >
            تسجيل متبرع
          </Link>
        </div>
      ) : (
        <>
          <h2 id="urgent-title" className="relative mt-3.5 mb-1 text-[1.35rem] font-bold text-white">
            {arNum(requests.length)} مرضى يحتاجون دماً خلال الساعات القادمة
          </h2>
          <ul className="relative">
            {requests.map((request) => (
              <li key={request.id}>
                <UrgentRow request={request} />
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

function UrgentRow({ request }) {
  const { id, bloodType, hospital, area, unitsNeeded, unitsPledged, hoursLeft, trust } = request;

  return (
    <Link
      to={`/donor/requests/${id}`}
      className="hc:bg-transparent hc:border hc:border-white mt-2.5 flex items-center gap-3 rounded-2xl bg-white/14 p-3 text-white backdrop-blur-sm hover:bg-white/22"
    >
      <span
        dir="ltr"
        className="font-head inline-grid h-[30px] min-w-11 shrink-0 place-items-center rounded-[10px] bg-white px-2 text-[0.86rem] font-bold text-[#8E0D2F]"
      >
        {typeLabel(bloodType)}
      </span>
      <div className="min-w-0">
        <b className="font-head block text-[0.95rem] font-semibold">
          {hospital} · {area}
        </b>
        <span className="text-[0.78rem] text-white/92">
          {arNum(unitsPledged)} من {arNum(unitsNeeded)} وحدات · {timeLeft(hoursLeft)} ·{' '}
          {trust === 'verified' ? 'طلب موثّق' : TRUST_LABELS[trust].full}
        </span>
        <span dir="ltr" className="block text-end text-[0.7rem] font-medium text-white/85">
          {id}
        </span>
      </div>
      <span className="ms-auto grid size-[34px] shrink-0 place-items-center rounded-full bg-white text-[#8E0D2F]">
        <ChevronLeft className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
