import { formatDateTime } from '../requesterFormat';

export default function ProgressHeader({ progress }) {
  const { id, hospital, bloodType, neededBy, trust } = progress;
  return (
    <header className="rounded-hero from-navy via-navy-2 to-teal shadow-raised hc:bg-black hc:bg-none mt-2.5 flex flex-wrap items-end justify-between gap-3 bg-linear-120 px-4 py-5 text-white sm:px-5.5">
      <div>
        <h1 className="text-[1.45rem] font-extrabold text-white md:text-[1.8rem]">
          متابعة الطلب{' '}
          <span dir="ltr" className="inline-block tabular-nums">
            {id}
          </span>
        </h1>
        <p className="mt-0.5 text-[0.9rem] opacity-90">
          {hospital.name} · {hospital.area} · فصيلة <span dir="ltr">{bloodType}</span> · مطلوب قبل{' '}
          {formatDateTime(neededBy)}
        </p>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        <li className="hc:border-white rounded-full border border-white/30 bg-white/15 px-2.75 py-1 text-[0.74rem] font-medium">
          {trust === 'verified' ? '✓ طلب موثّق' : '✓ ورقة تبدو سليمة'}
        </li>
        <li className="hc:border-white flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-2.75 py-1 text-[0.74rem] font-medium">
          <span
            aria-hidden="true"
            className="size-2 animate-pulse rounded-full bg-white motion-reduce:animate-none"
          />
          يتحدث تلقائيًا
        </li>
      </ul>
    </header>
  );
}
