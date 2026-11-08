import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Notice from '@/components/ui/Notice';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const identifier = data.get('identifier');
    const password = data.get('password');
    const remember = data.get('remember') === 'on';

    if (!identifier.trim() || !password.trim()) {
      setError('الرجاء إدخال البريد الإلكتروني أو رقم الهاتف وكلمة المرور.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      await login({ identifier, password, remember });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة لاحقاً.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: 'تسجيل الدخول' }]} />
      </div>

      <div className="mx-auto max-w-115 px-4 py-8 lg:grid lg:min-h-[70vh] lg:max-w-130 lg:content-center">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-surface border-line rounded-card shadow-card border"
        >
          <div className="border-line-2 border-b px-4.5 py-3.5 lg:px-6 lg:py-4">
            <h1 className="flex items-center gap-2.5 text-[1.15rem] font-extrabold lg:text-[1.35rem]">
              <span aria-hidden="true" className="bg-gold inline-block h-4.5 w-1 rounded" />
              تسجيل الدخول
            </h1>
          </div>

          <div className="p-4.5 lg:p-6">
            <div role="alert">
              {error && (
                <Notice tone="err" title="لم نتمكن من تسجيل دخولك">
                  {error}
                </Notice>
              )}
            </div>
            <div className="mb-3.5">
              <label htmlFor="identifier" className="mb-1 block text-[0.86rem] font-semibold">
                البريد الإلكتروني أو رقم الهاتف
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                dir="ltr"
                autoComplete="username"
                placeholder="010 1234 5678"
                className="rounded-field border-line bg-surface-2 focus:border-navy focus:bg-surface w-full border px-3 py-2.5 lg:py-3"
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
                  type={visible ? 'text' : 'password'}
                  dir="ltr"
                  autoComplete="current-password"
                  className="rounded-field border-line bg-surface-2 focus:border-navy focus:bg-surface w-full border py-2.5 ps-10 pe-3 lg:py-3"
                />
                <button
                  type="button"
                  onClick={() => setVisible((v) => !v)}
                  aria-label={visible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  aria-pressed={visible}
                  className="text-ink-2 hover:text-ink absolute inset-e-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full"
                >
                  {visible ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
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
              disabled={submitting}
              className="bg-urgent rounded-field shadow-urgent w-full py-2.5 font-semibold text-white hover:brightness-110 disabled:opacity-70 disabled:hover:brightness-100 lg:py-3"
            >
              {submitting ? 'جاري تسجيل الدخول...' : 'دخول'}
            </button>

            <hr className="border-line-2 my-4" />

            <p className="text-small text-center">
              ليس لديك حساب؟{' '}
              <Link to="/signup" className="text-info font-semibold hover:underline">
                أنشئ حساباً جديداً
              </Link>
            </p>
          </div>
        </form>

        <p className="text-tiny text-ink-3 mt-3 text-center">
          موظف في مستشفى شريك؟ ادخل بنفس الصفحة بحساب المستشفى.{' '}
          <Link to="/hospital/join" className="text-info whitespace-nowrap hover:underline">
            طلب شراكة
          </Link>
        </p>
      </div>
    </>
  );
}
