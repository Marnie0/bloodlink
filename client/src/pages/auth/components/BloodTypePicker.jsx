import Ltr from '@/components/ui/Ltr';
import { BLOOD_TYPES } from '@/lib/bloodTypes';

// Eight radio buttons that look like chips. The real <input type="radio"> is visually hidden
// (sr-only) but still focusable, so arrow keys and screen readers work like a normal radio group.
export default function BloodTypePicker({ value, onChange, error, hint }) {
  const describedBy = [error && 'bloodType-error', hint && 'bloodType-hint'].filter(Boolean).join(' ');

  return (
    <fieldset aria-describedby={describedBy || undefined}>
      <legend className="mb-2 text-[0.86rem] font-semibold">
        فصيلة الدم
        <span aria-hidden="true" className="text-crimson-ink ms-1">
          *
        </span>
      </legend>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {BLOOD_TYPES.map((type) => (
          <label
            key={type}
            className={`rounded-field has-checked:bg-navy has-checked:border-navy has-focus-visible:outline-teal grid h-12 cursor-pointer place-items-center border font-bold has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 ${
              error ? 'border-crimson' : 'border-line bg-surface hover:border-ink-3'
            }`}
          >
            <input
              type="radio"
              name="bloodType"
              value={type}
              checked={value === type}
              onChange={() => onChange(type)}
              className="sr-only"
            />
            <Ltr>{type}</Ltr>
          </label>
        ))}
      </div>
      {hint && (
        <p id="bloodType-hint" className="text-tiny text-ink-3 mt-1.5">
          {hint}
        </p>
      )}
      {error && (
        <p id="bloodType-error" className="text-crimson-ink mt-1 text-[0.82rem]">
          {error}
        </p>
      )}
    </fieldset>
  );
}
