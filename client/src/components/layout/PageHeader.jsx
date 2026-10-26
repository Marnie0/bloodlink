// Stub from feat/frontend-setup. R2 replaces this whole file on feat/app-layout.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: title, subtitle, chips = []
export default function PageHeader({ title, subtitle }) {
  return (
    <header>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
