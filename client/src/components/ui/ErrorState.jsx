// Stub from feat/frontend-setup. R5 replaces this whole file on feat/ui-data.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: title = 'تعذّر التحميل', children, onRetry
export default function ErrorState({ title = 'تعذّر التحميل', children, onRetry }) {
  return (
    <div role="alert">
      <h2>{title}</h2>
      {children}
      {onRetry && (
        <button type="button" onClick={onRetry}>
          إعادة المحاولة
        </button>
      )}
    </div>
  );
}
