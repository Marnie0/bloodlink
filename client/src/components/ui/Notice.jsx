// Stub from feat/frontend-setup. R3 replaces this whole file on feat/ui-basics.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: tone = 'info', title, children, live, className
export default function Notice({ title, children, live }) {
  return (
    <div role={live ? 'status' : undefined}>
      {title && <b>{title}</b>} {children}
    </div>
  );
}
