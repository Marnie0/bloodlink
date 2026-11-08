import { FIRST_WAVE_KM } from "../donorConstants";
import { formatNumber } from "../donorFormat";

export default function FilterChips({ selectedFilter, allCount, onChange }) {
  const filters = [
    {
      name: "all",
      label: allCount == null ? "الكل" : `الكل · ${formatNumber(allCount)}`,
    },
    { name: "urgent", label: "عاجل" },
    { name: "verified", label: "موثّق فقط" },
    { name: "lt5km", label: `أقل من ${formatNumber(FIRST_WAVE_KM)} كم` },
    { name: "today", label: "ينتهي اليوم" },
  ];

  return (
    <div
      role="group"
      aria-label="تصفية"
      className="border-line-2 flex gap-2 overflow-x-auto border-b px-[18px] py-3.5"
    >
      {filters.map((filter) => {
        const isSelected = filter.name === selectedFilter;
        return (
          <button
            key={filter.name}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(filter.name)}
            className={`font-body cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.82rem] leading-normal font-medium whitespace-nowrap ${
              isSelected
                ? "border-navy bg-navy text-white"
                : "border-line bg-surface text-ink-2"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
