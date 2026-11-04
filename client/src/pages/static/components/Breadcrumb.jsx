import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  return (
    <nav aria-label="مسار التنقل" className="pt-4 text-[0.8rem]">
      <ol className="m-0 flex list-none flex-wrap gap-1 p-0">
        <li className="after:text-ink-3 after:ms-1.5 after:content-['‹']">
          <Link to="/" className="text-info hc:underline no-underline hover:underline">
            الرئيسية
          </Link>
        </li>
        <li aria-current="page" className="text-ink-2">
          شروط الاستخدام
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
