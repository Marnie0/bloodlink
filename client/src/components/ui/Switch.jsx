// Stub from feat/frontend-setup. R4 replaces this whole file on feat/ui-forms.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: checked, onChange(nextChecked), labelledBy
export default function Switch({ checked, onChange, labelledBy }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={() => onChange(!checked)}
    >
      {checked ? 'ON' : 'OFF'}
    </button>
  );
}
