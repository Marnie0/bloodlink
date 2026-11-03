import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';

function handleSubmit(event) {
  event.preventDefault();
  // Handle form submission logic here
}

export default function LoginPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: 'تسجيل الدخول' }]} />
      </div>

      <div className="mx-auto max-w-[460px] px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-surface border-line rounded-card shadow-card border">
          <div className="border-line-2 border-b px-[18px] py-3.5">
            <h1 className="flex items-center gap-2.5 text-[1.15rem] font-extrabold">
              <span aria-hidden="true" className="bg-gold inline-block h-[18px] w-1 rounded" />
              تسجيل الدخول
            </h1>
          </div>

          <div className="p-[18px]">
            <div className="mb-3.5">
              <label htmlFor="email" className="mb-1 block text-[0.86rem] font-semibold">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                dir="ltr"
                autoComplete="username"
                placeholder="name@example.com"
                className="rounded-field border-line bg-surface-2 focus:border-navy focus:bg-surface w-full border px-3 py-2.5"
              />
            </div>

            <div className="mb-3.5">
              <label htmlFor="password" className="mb-1 block text-[0.86rem] font-semibold">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  dir="ltr"
                  autoComplete="current-password"
                  className="rounded-field border-line bg-surface-2 focus:border-navy focus:bg-surface w-full border py-2.5 ps-10 pe-3"
                />
                <button
                  type="button"
                  aria-label="إظهار كلمة المرور"
                  className="text-ink-2 hover:text-ink absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full"
                >
                  <Eye className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
              <label className="text-small flex items-center gap-1.5">
                <input type="checkbox" name="remember" className="checkbox checkbox-sm" />
                تذكرني على هذا الجهاز
              </label>
              <a href="#" className="text-small text-info hover:underline">
                نسيت كلمة المرور؟
              </a>
            </div>

            <button
              type="submit"
              className="bg-urgent rounded-field shadow-urgent w-full py-2.5 font-semibold text-white hover:brightness-110"
            >
              دخول
            </button>

            <hr className="border-line-2 my-4" />

            <p className="text-small text-center">
              ليس لديك حساب؟
              <Link to="/signup" className="text-info font-semibold hover:underline">
                أنشئ حساباً جديداً
              </Link>
            </p>
          </div>
        </form>

        <p className="text-tiny text-ink-3 mt-3 text-center">
          موظف في مستشفى شريك؟ ادخل بنفس الصفحة بحساب المستشفى.
          <Link to="/hospital/join" className="text-info hover:underline">
            طلب شراكة
          </Link>
        </p>
      </div>
    </>
  );
}
