import { Link } from 'react-router-dom';
import { cardClass } from '../homeFormat';

// One service card (SRV-01 … SRV-04). primary = the red one (the main service).
// Extra props (like onClick) go to the link.
export default function ServiceTile({
  to,
  code,
  icon: Icon,
  title,
  text,
  meta,
  cta,
  primary = false,
  ...rest
}) {
  return (
    <Link
      to={to}
      className={`${cardClass} group text-ink hover:border-teal-ink hover:shadow-raised relative flex flex-col p-[18px] no-underline transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0`}
      {...rest}
    >
      <span
        dir="ltr"
        className="border-line-2 bg-surface-2 text-ink-3 absolute end-3.5 top-3.5 rounded-full border px-2 text-[0.66rem]"
      >
        {code}
      </span>
      <span
        className={`rounded-tile mb-3 grid size-[46px] place-items-center ${
          primary ? 'bg-crimson-lt text-crimson-ink' : 'bg-teal-lt text-teal-ink'
        }`}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="text-ink-2 mt-0.5 text-[0.8rem] leading-relaxed">{text}</p>
      <div className="text-ink-3 mt-auto flex items-center justify-between pt-3 text-[0.74rem]">
        <span>{meta}</span>
        <b className={`font-semibold ${primary ? 'text-crimson-ink' : 'text-teal-ink'}`}>{cta} ←</b>
      </div>
    </Link>
  );
}
