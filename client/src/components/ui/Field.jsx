// One labelled form control: label, the control, a hint and an error.
// children is a function that receives the props every control needs (id, name, aria-*, className),
// so all fields get the same accessibility wiring without repeating it.
export default function Field({ id, label, required = false, hint, error, children }) {
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined;

  const controlProps = {
    id,
    name: id,
    'aria-invalid': error ? true : undefined,
    'aria-required': required || undefined,
    'aria-describedby': describedBy,
    className: `rounded-field bg-surface-2 focus:bg-surface w-full border px-3 py-2.5 disabled:opacity-60 ${
      error ? 'border-crimson' : 'border-line focus:border-navy'
    }`,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.86rem] font-semibold">
        {label}
        {required && (
          <span aria-hidden="true" className="text-crimson-ink ms-1">
            *
          </span>
        )}
      </label>
      {children(controlProps)}
      {hint && (
        <p id={`${id}-hint`} className="text-tiny text-ink-3 mt-1">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-crimson-ink mt-1 text-[0.82rem]">
          {error}
        </p>
      )}
    </div>
  );
}
