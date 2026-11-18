import clsx from 'clsx';

export default function FactGrid({ facts = [] }) {
  return (
    <dl className="my-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
      {facts.map((f) => (
        <div key={f.label} className="rounded-tile border-line-2 bg-surface-2 min-w-0 border p-3.5">
          <dt className="text-ink-3 text-[0.72rem]">{f.label}</dt>
          <dd className="m-0 break-words">
            <b className={clsx('font-head text-[1.05rem] font-bold', f.hot ? 'text-crimson' : 'text-head')}>
              {f.value}
            </b>
            {f.extra && <div className="text-tiny text-ink-2 mt-1">{f.extra}</div>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
