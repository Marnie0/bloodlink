// Stub from feat/frontend-setup. R4 replaces this whole file on feat/ui-forms.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: label (or children), ...props for the <input>
export default function Checkbox({ label, children, ...props }) {
  return (
    <label>
      <input type="checkbox" {...props} /> {label ?? children}
    </label>
  );
}
