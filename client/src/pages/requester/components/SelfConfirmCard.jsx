import { TriangleAlert } from 'lucide-react';
import BloodTypeChip from '@/components/ui/BloodTypeChip';

// values match the API: 'donated' | 'no_show' | 'deferred'
const outcomes = [
  { value: 'donated', label: 'تبرع' },
  { value: 'no_show', label: 'لم يحضر' },
  { value: 'deferred', label: 'لم يستطع (قرار طبي)' },
];

const donorSays = {
  donated: { text: 'تبرعتُ', cls: 'bg-ok-lt text-ok' },
  no_show: { text: 'لم أحضر', cls: 'border border-line bg-surface-2 text-ink-2' },
  deferred: { text: 'لم أستطع (قرار طبي)', cls: 'bg-warn-lt text-warn' },
};

export default function SelfConfirmCard({ pledge, value, onChange, disabled = false, error }) {
  const { donor } = pledge;
  const donorNoun = donor.gender === 'f' ? 'المتبرعة' : 'المتبرع';
  const said = pledge.donorConfirmed ? donorSays[pledge.donorConfirmed] : null;
  const mismatch = said && value && value !== pledge.donorConfirmed;
  const name = `outcome-${pledge.id}`;
  const errId = `${name}-err`;

  return (
    <div className={`rounded-tile hc:border-2 border p-3.5 ${error ? 'border-crimson' : 'border-line'}`}>
      {/* donor row */}
      <div className="rounded-tile bg-surface-2 flex items-center gap-3 p-3">
        <span
          aria-hidden="true"
          className="from-teal to-navy font-head grid size-9 shrink-0 place-items-center rounded-full bg-linear-135 text-[0.82rem] font-bold text-white"
        >
          {donor.initials}
        </span>
        <div className="min-w-0">
          <b className="text-small block truncate">{donor.name}</b>
          <span className="text-tiny text-ink-3 block">
            {pledge.acceptedLabel} ·{' '}
            <bdi dir="ltr" className="font-semibold tracking-[0.02em] tabular-nums">
              {pledge.id}
            </bdi>
          </span>
        </div>
        <BloodTypeChip type={donor.bloodType} className="ms-auto" />
      </div>

      {/* requester answer */}
      <div
        role="radiogroup"
        aria-label={pledge.question}
        aria-describedby={error ? errId : undefined}
        className="border-line-2 bg-surface-2 hc:border-line mt-3 grid grid-cols-1 gap-1 rounded-2xl border p-1 sm:grid-cols-3 sm:rounded-full"
      >
        {outcomes.map((o) => (
          <label key={o.value} className={disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              disabled={disabled}
              onChange={() => onChange(pledge.id, o.value)}
              className="peer sr-only"
            />
            <span className="text-ink-2 hover:bg-line-2 peer-checked:bg-navy peer-checked:hover:bg-navy peer-focus-visible:outline-focus dark:peer-checked:bg-teal dark:peer-checked:hover:bg-teal flex min-h-11 items-center justify-center rounded-full px-3.5 py-2 text-center text-[0.82rem] font-medium transition peer-checked:font-bold peer-checked:text-white peer-focus-visible:shadow-[0_0_0_6px_var(--color-navy)] peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2">
              {o.label}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p id={errId} role="alert" className="text-tiny text-crimson-ink mt-2 font-medium">
          {error}
        </p>
      )}

      {/* what the donor said */}
      <p className="text-tiny text-ink-3 mt-2 flex flex-wrap items-center gap-1.5">
        {said ? (
          <>
            {donorNoun} أكّد:
            <span className={`rounded-full px-2.5 py-0.5 font-semibold ${said.cls}`}>{said.text}</span>
          </>
        ) : (
          <>{donorNoun} لم تؤكد بعد.</>
        )}
      </p>

      {mismatch && (
        <p className="text-tiny text-warn mt-2 flex items-start gap-1.5 font-medium">
          <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          اختلف تأكيدك عن تأكيد {donorNoun}. راجع اختيارك قبل الحفظ.
        </p>
      )}
    </div>
  );
}
