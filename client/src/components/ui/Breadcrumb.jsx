import { Link } from 'react-router-dom';

// items: [{ label: 'الرئيسية', to: '/' }, { label: 'تسجيل الدخول' }]
// The last item is the current page: no link.
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="مسار التنقل" className="pt-4 text-[0.8rem]">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-ink-2">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.to} className="text-info hover:underline">
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className="text-ink-3 ms-1">
                    ‹
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
