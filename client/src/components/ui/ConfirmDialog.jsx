// Stub from feat/frontend-setup. R6 replaces this whole file on feat/ui-dialogs.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: open, title, message, confirmLabel = 'تأكيد', onConfirm, onClose, danger = false
export default function ConfirmDialog({ open, title, message, confirmLabel = 'تأكيد', onConfirm, onClose }) {
  if (!open) return null;
  return (
    <div role="alertdialog" aria-label={title}>
      <h2>{title}</h2>
      <p>{message}</p>
      <button type="button" onClick={onConfirm}>
        {confirmLabel}
      </button>
      <button type="button" onClick={onClose}>
        إلغاء
      </button>
    </div>
  );
}
