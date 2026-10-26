// Stub from feat/frontend-setup. R5 replaces this whole file on feat/ui-data.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: lines = [12, 12, 12], onDark = false, label = 'جارٍ التحميل…'
export default function Skeleton({ label = 'جارٍ التحميل…' }) {
  return <p aria-busy="true">{label}</p>;
}
