// What every page shows until its owner builds it. Delete this file after Round 3.
export default function Placeholder({ name, route, owner, branch }) {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="rounded-card bg-surface shadow-card p-6">
        <h1 className="text-2xl">{name}</h1>
        <p className="text-ink-2">قيد الإنشاء</p>
        <p className="text-small text-ink-3 mt-3" dir="ltr">
          {route} · {owner} · {branch}
        </p>
      </div>
    </div>
  );
}
