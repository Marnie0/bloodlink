import { Link } from 'react-router-dom';
import { AlertTriangle, SearchX } from 'lucide-react';

// أول ما الصفحة بتحمّل
export function ProgressSkeleton() {
  return (
    <div aria-busy="true" className="mt-2.5">
      <span className="sr-only">جارٍ تحميل الطلب...</span>
      <div className="bg-line-2 rounded-hero h-28 animate-pulse motion-reduce:animate-none" />
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          <div className="bg-line-2 rounded-card h-32 animate-pulse motion-reduce:animate-none" />
          <div className="bg-line-2 rounded-card h-56 animate-pulse motion-reduce:animate-none" />
        </div>
        <div className="bg-line-2 rounded-card h-64 animate-pulse motion-reduce:animate-none" />
      </div>
    </div>
  );
}

// لما التحميل يفشل ومفيش حاجة نعرضها
export function ProgressError({ error, onRetry }) {
  const notFound = error.status === 404;
  const Icon = notFound ? SearchX : AlertTriangle;
  return (
    <div
      role="alert"
      className="bg-surface border-line rounded-card shadow-card mt-2.5 border px-5 py-10 text-center"
    >
      <span className="bg-crimson-lt text-crimson-ink mx-auto mb-3.5 grid size-18 place-items-center rounded-[22px]">
        <Icon className="size-8" aria-hidden="true" />
      </span>
      <h1 className="text-[1.2rem] font-extrabold">
        {notFound ? 'لم نجد هذا الطلب' : 'تعذّر تحميل حالة الطلب'}
      </h1>
      <p className="text-ink-2 mx-auto mt-1 max-w-md">
        {notFound
          ? 'تأكد من الرابط، أو ارجع إلى الصفحة الرئيسية.'
          : 'حدثت مشكلة في الاتصال. الطلب ما زال نشطًا، ونحاول من جديد تلقائيًا.'}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {!notFound && (
          <button
            type="button"
            onClick={onRetry}
            className="bg-navy rounded-field px-4 py-2 text-[0.88rem] font-semibold text-white"
          >
            إعادة المحاولة
          </button>
        )}
        <Link
          to="/"
          className="border-line hover:border-ink-3 rounded-field border px-4 py-2 text-[0.88rem] font-semibold"
        >
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
