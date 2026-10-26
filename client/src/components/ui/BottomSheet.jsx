// Stub from feat/frontend-setup. R6 replaces this whole file on feat/ui-dialogs.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: open, onClose, title, description, children
export default function BottomSheet({ open, onClose, title, description, children }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-label={title}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
      <button type="button" onClick={onClose}>
        إغلاق
      </button>
    </div>
  );
}
