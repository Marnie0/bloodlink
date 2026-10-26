// Stub from feat/frontend-setup. R6 replaces this whole file on feat/ui-dialogs.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: open, onClose, targetType: 'request' | 'profile', targetId
export default function ReportDialog({ open, onClose }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-label="إبلاغ">
      <p>إبلاغ (قريبًا)</p>
      <button type="button" onClick={onClose}>
        إغلاق
      </button>
    </div>
  );
}
