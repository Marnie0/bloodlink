import { useId } from 'react';

export default function DeclarationCheckbox({
  checked,
  onChange,
  disabled = false,
  required = false,
  error,
  children,
}) {
  const errId = useId();
  return (
    <div>
      <label
        className={`bg-surface hc:border-2 flex items-start gap-2.5 rounded-xl border p-3 text-[0.84rem] ${
          error ? 'border-crimson' : 'border-line'
        } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          onChange={(e) => onChange(e.target.checked)}
          className="accent-navy dark:accent-teal-ink mt-1 size-[18px] shrink-0"
        />
        <span>
          {children}
          {required && (
            <span className="text-crimson ms-1" aria-hidden="true">
              *
            </span>
          )}
        </span>
      </label>
      {error && (
        <p id={errId} role="alert" className="text-tiny text-crimson-ink mt-1.5 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
