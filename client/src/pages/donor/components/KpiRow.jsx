import Ltr from "./Ltr";

const barColors = { navy: "before:bg-navy", ok: "before:bg-ok" };
const numberColors = { navy: "text-head", ok: "text-ok" };

export default function KpiRow({ items }) {
  return (
    <div className="mb-[18px] grid grid-cols-2 gap-3 md:grid-cols-5">
      {items.map((item) => {
        const tone = item.tone ?? "navy";
        return (
          <div
            key={item.label}
            className={`rounded-card border-line hc:border-2 bg-surface shadow-card relative overflow-hidden border px-4 py-3.5 before:absolute before:inset-x-0 before:top-0 before:h-1 ${barColors[tone]}`}
          >
            <b
              className={`font-head block text-[1.7rem] leading-tight font-extrabold ${numberColors[tone]}`}
            >
              <Ltr>{item.value}</Ltr>
            </b>
            <span className="text-ink-2 text-[0.76rem]">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
