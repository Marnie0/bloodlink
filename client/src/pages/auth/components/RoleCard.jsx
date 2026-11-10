// A checkbox shaped as a card: "متبرع" or "صاحب طلب". The whole card is the label, so clicking
// anywhere on it toggles the checkbox.
export default function RoleCard({ role, checked, onChange, describedBy }) {
  const { value, label, hint, Icon } = role;
  return (
    <label
      className={`rounded-card flex cursor-pointer items-center gap-3 border p-4 ${
        checked ? 'border-navy bg-surface-2 hc:border-2' : 'border-line bg-surface hover:border-ink-3'
      }`}
    >
      <input
        type="checkbox"
        name="roles"
        value={value}
        checked={checked}
        onChange={onChange}
        aria-describedby={describedBy}
        className="checkbox checkbox-sm"
      />
      <span
        aria-hidden="true"
        className="bg-crimson-lt text-crimson-ink grid size-9 shrink-0 place-items-center rounded-xl"
      >
        <Icon className="size-4.5" />
      </span>
      <span className="min-w-0">
        <b className="font-head block">{label}</b>
        <span className="text-tiny text-ink-2">{hint}</span>
      </span>
    </label>
  );
}
