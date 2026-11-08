import Ltr from './Ltr';

// أزرار الصفحات تحت الجدول (زراير btn من daisyUI) + جملة "عرض 1–3 من 3 سجلات".
// currentPage = الصفحة الحالية     onPageChange(pageNumber) = بتتنادى لما يدوس على رقم صفحة
export default function Pager({ currentPage, pageSize, totalCount, onPageChange }) {
  const pagesCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const firstShown = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastShown = Math.min(currentPage * pageSize, totalCount);
  const pageNumbers = Array.from({ length: pagesCount }, (_, index) => index + 1);

  return (
    <div className="border-line-2 text-ink-2 flex flex-wrap items-center justify-between gap-2 border-t px-4.5 py-2.5 text-[0.8rem]">
      <span>
        عرض{' '}
        <Ltr>
          {firstShown}–{lastShown}
        </Ltr>{' '}
        من <Ltr>{totalCount}</Ltr> سجلات
      </span>

      <div role="group" aria-label="الصفحات" className="flex gap-1">
        {pageNumbers.map((pageNumber) => {
          const isCurrent = pageNumber === currentPage;
          return (
            <button
              key={pageNumber}
              type="button"
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => onPageChange(pageNumber)}
              className={`btn h-7.5 min-h-0 w-auto min-w-7.5 rounded-[9px] px-1.5 text-[0.8rem] font-normal shadow-none ${
                isCurrent
                  ? 'border-navy bg-navy text-white'
                  : 'border-line bg-surface text-ink hover:bg-surface-2'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
}
