// Stub from feat/frontend-setup. R4 replaces this whole file on feat/ui-forms.
// Keep the same file name, the same export and the same props (see the DevKit).
import { useId } from 'react';

// Props: label, required, options = [{ value, label }], ...props
export default function SelectField({ label, options = [], ...props }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
