import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Notice from '@/components/ui/Notice';

// Shown in place of the form after the account is created.
// Donors are sent to upload their blood-type certificate; requesters to create a request.
export default function SignupDone({ name, isDonor }) {
  const boxRef = useRef(null);
  const firstName = name.trim().split(/\s+/)[0];

  // Move focus here so keyboard and screen-reader users land on the result
  useEffect(() => {
    boxRef.current?.focus();
  }, []);

  const next = isDonor
    ? {
        text: 'الخطوة التالية: ارفع شهادة فصيلة الدم ليظهر حسابك للطلبات المتوافقة.',
        to: '/donor/certificate',
        label: 'رفع شهادة الفصيلة ←',
      }
    : {
        text: 'يمكنك الآن تقديم طلب دم بورقة رسمية من المستشفى.',
        to: '/requests/new',
        label: 'تقديم طلب دم ←',
      };

  return (
    <div ref={boxRef} tabIndex={-1} className="p-4.5 outline-none focus-visible:shadow-none lg:p-6">
      <Notice tone="ok" live title={`تم إنشاء حسابك يا ${firstName}`} className="">
        <p>{next.text}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to={next.to}
            className="bg-urgent shadow-urgent rounded-[10px] px-3 py-1.5 text-[0.8rem] font-semibold text-white hover:brightness-110"
          >
            {next.label}
          </Link>
          <Link
            to="/"
            className="border-line bg-surface text-teal-ink hover:border-teal-ink hover:bg-teal-lt rounded-[10px] border px-3 py-1.5 text-[0.8rem] font-semibold"
          >
            لاحقاً
          </Link>
        </div>
      </Notice>
    </div>
  );
}
