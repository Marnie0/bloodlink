export default function PageHeader({ title, subtitle, chips }) {
  return (
    <div className="rounded-hero from-navy via-navy-2 to-teal shadow-raised relative mt-2.5 overflow-hidden bg-linear-120 via-45% text-white">
      <div
        aria-hidden="true"
        className="hc:hidden absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.09)_1px,transparent_1.5px)] bg-size-[14px_14px]"
      />
      <div
        aria-hidden="true"
        className="hc:hidden absolute -start-20 -top-[120px] size-[260px] rounded-full border-[34px] border-white/5"
      />
      <div className="relative flex flex-wrap items-end justify-between gap-3 px-[22px] py-5">
        <div>
          <h1 className="font-head text-[1.45rem] leading-[1.4] font-extrabold text-white md:text-[1.8rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 mb-0 text-[0.9rem] opacity-90">{subtitle}</p>
          )}
        </div>
        {chips && <div className="flex flex-wrap gap-1.5">{chips}</div>}
      </div>
    </div>
  );
}
