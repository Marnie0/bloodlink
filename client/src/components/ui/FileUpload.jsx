// Stub from feat/frontend-setup. R4 replaces this whole file on feat/ui-forms.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: label, hint, onFile(file), status = 'idle', file, onCancel
export default function FileUpload({ label, onFile }) {
  return (
    <label>
      {label} <input type="file" onChange={(e) => onFile?.(e.target.files[0])} />
    </label>
  );
}
