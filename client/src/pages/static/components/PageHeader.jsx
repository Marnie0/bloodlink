const PageHeader = () => {
  return (
    <div className="rounded-hero from-navy via-navy-2 to-teal shadow-raised hc:bg-black hc:bg-none relative mt-2.5 overflow-hidden bg-linear-120 via-45% text-white">
      <div
        aria-hidden
        className="hc:hidden absolute inset-0 bg-[radial-gradient(rgba(255,255,255,.09)_1px,transparent_1.5px)] bg-size-[14px_14px]"
      />
      <div
        aria-hidden
        className="hc:hidden --inset-s-20 absolute -top-30 size-65 rounded-full border-34 border-white/5"
      />
      <div className="relative flex flex-wrap items-end justify-between gap-3 px-4 py-5 sm:px-5.5">
        <div className="min-w-0">
          <h1 className="font-head m-0 text-[1.45rem] font-extrabold text-white md:text-[1.8rem]">
            شروط الاستخدام
          </h1>
          <p className="mt-0.5 mb-0 text-[0.9rem] opacity-90">
            آخر تحديث{' '}
            <span dir="ltr" className="inline-block tabular-nums">
              15/10/2026
            </span>{' '}
            · اقرأها قبل إنشاء حسابك.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="hc:border-white inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-[11px] py-1 text-[0.74rem] font-medium backdrop-blur-[6px]">
            قراءة ٣ دقائق
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
