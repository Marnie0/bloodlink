import { Link } from 'react-router-dom';
import { Phone, Users } from 'lucide-react';
import TrustBadge from './TrustBadge';
import { formatDateTime, formatPhone } from '../requesterFormat';

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}

// متبرع واحد وافق. الأرقام بتظهر لهؤلاء بس (FR-17).
function ContactCard({ pledge }) {
  const { donor, distanceKm, acceptedAt, phone } = pledge;
  return (
    <li className="bg-surface-2 rounded-tile flex flex-wrap items-center gap-3 p-3">
      <span
        aria-hidden="true"
        className="font-head from-teal to-navy grid size-9 shrink-0 place-items-center rounded-full bg-linear-135 text-[0.82rem] font-bold text-white"
      >
        {initials(donor.name)}
      </span>
      <div className="min-w-0 grow basis-48">
        <b className="block text-[0.88rem]">{donor.name}</b>
        <span className="text-tiny text-ink-2 flex flex-wrap items-center gap-1.5">
          وافق {formatDateTime(acceptedAt)} · {distanceKm} كم
          <TrustBadge level={donor.trust} />
        </span>
      </div>
      <a
        href={`tel:${phone}`}
        aria-label={`اتصال بـ ${donor.name}، ${formatPhone(phone)}`}
        className="border-line bg-surface text-teal-ink hover:border-ink-3 rounded-field ms-auto flex items-center gap-2 border px-3 py-1.5 text-[0.85rem] font-semibold"
      >
        <Phone className="size-4" aria-hidden="true" />
        <span dir="ltr" className="tabular-nums">
          {formatPhone(phone)}
        </span>
      </a>
    </li>
  );
}

export default function DonorPledgeList({ requestId, pledges, needed }) {
  const waiting = Math.max(0, needed - pledges.length);
  return (
    <section className="bg-surface border-line rounded-card shadow-card mt-4 border">
      <div className="border-line-2 flex flex-wrap items-center justify-between gap-2 border-b px-4.5 py-3.5">
        <h2 className="flex items-center gap-2.5 text-[1.05rem] font-extrabold">
          <span aria-hidden="true" className="bg-gold inline-block h-4.5 w-1 rounded" />
          المتبرعون
        </h2>
        {pledges.length > 0 && (
          <span className="text-tiny text-ink-3">يظهر رقم الهاتف بعد موافقة المتبرع فقط</span>
        )}
      </div>

      {pledges.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <span className="bg-teal-lt text-teal-ink mx-auto mb-3.5 grid size-18 place-items-center rounded-[22px]">
            <Users className="size-8" aria-hidden="true" />
          </span>
          <h3 className="font-bold">لم يوافق أحد بعد</h3>
          <p className="text-ink-2 mx-auto mt-1 max-w-sm text-[0.88rem]">
            عادةً يوافق أول متبرع خلال ساعة. ستظهر الموافقات هنا تلقائيًا.
          </p>
          <Link
            to={`/requests/${requestId}/confirm`}
            className="border-line hover:border-ink-3 rounded-field mt-4 inline-block border px-4 py-2 text-[0.88rem] font-semibold"
          >
            مشاركة الطلب
          </Link>
        </div>
      ) : (
        <ul className="grid gap-2.5 p-4.5">
          {pledges.map((pledge) => (
            <ContactCard key={pledge.id} pledge={pledge} />
          ))}
          {Array.from({ length: waiting }, (_, i) => (
            <li key={i} className="bg-surface-2 rounded-tile flex items-center gap-3 p-3 opacity-80">
              <span
                aria-hidden="true"
                className="bg-line-2 text-ink-3 grid size-9 shrink-0 place-items-center rounded-full font-bold"
              >
                ؟
              </span>
              <div>
                <b className="block text-[0.88rem]">بانتظار متبرع</b>
                <span className="text-tiny text-ink-3">لا يظهر أي رقم قبل الموافقة</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
