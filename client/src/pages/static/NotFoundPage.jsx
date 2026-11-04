import { Link } from 'react-router-dom';
import React from 'react';

const NotFoundPage = () => {
  return (
    <main className="px-4 pt-10 pb-6 text-center">
      <span
        dir="ltr"
        className="font-head text-crimson block text-[4.5rem] leading-none font-extrabold tabular-nums"
      >
        404
      </span>
      <h1 className="mt-2.5 mb-1 text-[1.5rem]">الصفحة غير موجودة</h1>
      <p className="text-ink-2 m-0">ربما تغيّر الرابط أو حُذفت الصفحة. يمكنك البدء من هنا:</p>

      <div className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
        <Link
          to="/"
          className="rounded-field bg-urgent shadow-urgent inline-flex items-center justify-center border border-transparent px-5 py-2.5 text-[0.92rem] font-semibold whitespace-nowrap text-white no-underline hover:brightness-105 active:scale-[.98]"
        >
          الصفحة الرئيسية
        </Link>

        <Link
          to="/donor/requests"
          className="rounded-field border-line bg-surface text-teal-ink hover:border-teal-ink hover:bg-teal-lt hc:border-2 inline-flex items-center justify-center border px-5 py-2.5 text-[0.92rem] font-semibold whitespace-nowrap no-underline active:scale-[.98]"
        >
          الطلبات القريبة
        </Link>
        <Link
          to="/requests/new"
          className="rounded-field border-line bg-surface text-teal-ink hover:border-teal-ink hover:bg-teal-lt hc:border-2 inline-flex items-center justify-center border px-5 py-2.5 text-[0.92rem] font-semibold whitespace-nowrap no-underline active:scale-[.98]"
        >
          تقديم طلب دم
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
