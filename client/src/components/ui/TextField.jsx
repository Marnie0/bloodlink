// Stub from feat/frontend-setup. R4 replaces this whole file on feat/ui-forms.
// Keep the same file name, the same export and the same props (see the DevKit).
import { useId } from 'react';

// Props: label, type = 'text', hint, error, ltr = false, required, ...props
export default function TextField({ label, type = 'text', hint, error, ltr = false, ...props }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} dir={ltr ? 'ltr' : undefined} {...props} />
      {hint && <p>{hint}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
