// Stub from feat/frontend-setup. R5 replaces this whole file on feat/ui-data.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: icon, title, children, actions, tone = 'teal'
export default function EmptyState({ title, children, actions }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
      {actions}
    </div>
  );
}
