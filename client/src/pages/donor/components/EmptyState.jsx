const iconColors = {
  teal: "bg-teal-lt text-teal-ink",
  warn: "bg-warn-lt text-warn",
  err: "bg-crimson-lt text-crimson-ink",
};
export default function EmptyState({
  icon: Icon,
  title,
  tone = "teal",
  actions,
  children,
}) {
  return (
    <div className="px-5 py-[34px] text-center">
      <span
        className={`mx-auto mb-3.5 grid size-[72px] place-items-center rounded-[22px] ${iconColors[tone]}`}
      >
        <Icon className="size-8" aria-hidden="true" />
      </span>
      <h3 className="font-head text-head text-[1.1rem] leading-[1.4] font-bold">
        {title}
      </h3>
      {children && (
        <p className="text-small text-ink-2 mx-auto mt-1.5 mb-0 max-w-[460px]">
          {children}
        </p>
      )}
      {actions && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
