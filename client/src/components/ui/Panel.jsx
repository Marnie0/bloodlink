// الصندوق الأبيض اللي بنحط فيه كل جزء في الصفحة: شريط عنوان (فيه شريط دهبي صغير قبل العنوان) + المحتوى.
export default function Panel({
  title,
  as: Heading = "h2",
  meta,
  className = "",
  children,
}) {
  return (
    <div
      className={`rounded-card border-line hc:border-2 bg-surface shadow-card border ${className}`}
    >
      <div className="border-line-2 flex flex-wrap items-center justify-between gap-2 border-b px-[18px] py-3.5">
        <Heading className="font-head text-head before:bg-gold flex items-center gap-2.5 text-base leading-[1.4] font-bold before:h-[18px] before:w-1 before:rounded-sm">
          {title}
        </Heading>
        {meta}
      </div>
      {children}
    </div>
  );
}
