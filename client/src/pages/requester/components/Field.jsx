import { inputClass } from '../requesterStyles';

// حقل واحد: لو فيه options بيبقى select، وغير كده input.
// أي خاصية تانية (value, onChange, type, min...) بتتمرر للعنصر نفسه.
export default function Field({ id, label, required, error, hint, options, placeholder, ...controlProps }) {
  let describedBy;
  if (error) describedBy = `${id}-error`;
  else if (hint) describedBy = `${id}-hint`;

  const common = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    className: inputClass(Boolean(error)),
    ...controlProps,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.88rem] font-bold">
        {label}
        {required && (
          <span aria-hidden="true" className="text-crimson-ink ms-1">
            *
          </span>
        )}
      </label>
      {options ? (
        <select {...common}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} />
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-tiny text-ink-3 mt-1">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-crimson-ink mt-1 text-[0.82rem]">
          {error}
        </p>
      )}
    </div>
  );
}
