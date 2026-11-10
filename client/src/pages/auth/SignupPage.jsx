import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Field from '@/components/ui/Field';
import HeaderChip from '@/components/ui/HeaderChip';
import Notice from '@/components/ui/Notice';
import PageHeader from '@/components/ui/PageHeader';
import Panel from '@/components/ui/Panel';
import { useAuth } from '@/context/AuthContext';
import { GOVERNORATES, PASSWORD_MIN, ROLES } from './signupOptions';
import { signupErrors } from './signupRules';
import BloodTypePicker from './components/BloodTypePicker';
import LocationCard from './components/LocationCard';
import RoleCard from './components/RoleCard';
import SignupSteps from './components/SignupSteps';

const EMPTY = {
  roles: [],
  name: '',
  phone: '',
  email: '',
  password: '',
  bloodType: '',
  governorate: '',
  area: '',
  location: null,
  terms: false,
};

// Moves keyboard focus to a field by its name. Checkboxes and radios that share a name
// come back as a list, so focus the first one.
function focusField(form, name) {
  const element = form.elements.namedItem(name);
  const target = element instanceof RadioNodeList ? element[0] : element;
  target?.focus();
}

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Errors show only after the first submit, then update live as the user fixes them
  const errors = submitted ? signupErrors(values) : {};
  const areas = GOVERNORATES.find((g) => g.name === values.governorate)?.areas ?? [];

  const update = (patch) => setValues((old) => ({ ...old, ...patch }));

  function toggleRole(role) {
    setValues((old) => ({
      ...old,
      roles: old.roles.includes(role) ? old.roles.filter((r) => r !== role) : [...old.roles, role],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    const found = signupErrors(values);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      focusField(event.currentTarget, firstInvalid);
      return;
    }

    setSubmitting(true);
    setServerError('');
    try {
      // Only name, email and password go to the instructor's API (see signupOptions.js)
      await register({ name: values.name, email: values.email, password: values.password });
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(err.message || 'حدث خطأ غير متوقع. الرجاء المحاولة لاحقاً.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10">
      <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: 'إنشاء حساب' }]} />
      <PageHeader
        title="إنشاء حساب جديد"
        subtitle="سجّل كمتبرع، أو كصاحب طلب، أو كليهما. التسجيل مجاني ويستغرق دقيقتين."
        chips={
          <>
            <HeaderChip>مجاني</HeaderChip>
            <HeaderChip>٣ خطوات قصيرة</HeaderChip>
          </>
        }
      />

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Panel
          title="بيانات الحساب"
          meta={<span className="text-tiny text-ink-3">الحقول المعلّمة * مطلوبة</span>}
        >
          <form onSubmit={handleSubmit} noValidate className="grid gap-5 p-4.5 lg:p-6">
            <fieldset aria-describedby={errors.roles ? 'roles-error' : undefined}>
              <legend className="mb-2 text-[0.86rem] font-semibold">
                سجّلني كـ
                <span aria-hidden="true" className="text-crimson-ink ms-1">
                  *
                </span>
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {ROLES.map((role) => (
                  <RoleCard
                    key={role.value}
                    role={role}
                    checked={values.roles.includes(role.value)}
                    onChange={() => toggleRole(role.value)}
                  />
                ))}
              </div>
              {errors.roles && (
                <p id="roles-error" className="text-crimson-ink mt-1 text-[0.82rem]">
                  {errors.roles}
                </p>
              )}
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="الاسم الكامل" required error={errors.name}>
                {(props) => (
                  <input
                    {...props}
                    type="text"
                    autoComplete="name"
                    placeholder="أحمد محمود عبد الله"
                    value={values.name}
                    onChange={(e) => update({ name: e.target.value })}
                  />
                )}
              </Field>

              <Field id="phone" label="رقم الهاتف" required error={errors.phone}>
                {(props) => (
                  <input
                    {...props}
                    type="tel"
                    dir="ltr"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="010 1234 5678"
                    value={values.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                  />
                )}
              </Field>

              <Field id="email" label="البريد الإلكتروني" required error={errors.email}>
                {(props) => (
                  <input
                    {...props}
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    placeholder="ahmed@example.com"
                    value={values.email}
                    onChange={(e) => update({ email: e.target.value })}
                  />
                )}
              </Field>

              <Field
                id="password"
                label="كلمة المرور"
                required
                hint={`${PASSWORD_MIN} أحرف على الأقل`}
                error={errors.password}
              >
                {(props) => (
                  <div className="relative">
                    <input
                      {...props}
                      className={`${props.className} ps-10`}
                      type={passwordVisible ? 'text' : 'password'}
                      dir="ltr"
                      autoComplete="new-password"
                      value={values.password}
                      onChange={(e) => update({ password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible((v) => !v)}
                      aria-label={passwordVisible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                      aria-pressed={passwordVisible}
                      className="text-ink-2 hover:text-ink absolute inset-e-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full"
                    >
                      {passwordVisible ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                )}
              </Field>
            </div>

            {values.roles.includes('donor') && (
              <BloodTypePicker
                value={values.bloodType}
                onChange={(bloodType) => update({ bloodType })}
                error={errors.bloodType}
                hint="ستؤكدها شهادة المستشفى في الخطوة التالية."
              />
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="governorate" label="المحافظة" required error={errors.governorate}>
                {(props) => (
                  <select
                    {...props}
                    value={values.governorate}
                    onChange={(e) => update({ governorate: e.target.value, area: '' })}
                  >
                    <option value="">اختر المحافظة</option>
                    {GOVERNORATES.map((g) => (
                      <option key={g.name} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                )}
              </Field>

              <Field id="area" label="المنطقة" required error={errors.area}>
                {(props) => (
                  <select
                    {...props}
                    value={values.area}
                    onChange={(e) => update({ area: e.target.value })}
                    disabled={!values.governorate}
                  >
                    <option value="">{values.governorate ? 'اختر المنطقة' : 'اختر المحافظة أولاً'}</option>
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>

            <LocationCard
              governorate={values.governorate}
              area={values.area}
              location={values.location}
              onLocate={(location) => update({ location })}
            />

            <div>
              <label
                className={`rounded-field text-small flex cursor-pointer items-start gap-3 border p-3.5 ${
                  errors.terms ? 'border-crimson' : 'border-line'
                }`}
              >
                <input
                  type="checkbox"
                  name="terms"
                  checked={values.terms}
                  onChange={(e) => update({ terms: e.target.checked })}
                  aria-invalid={errors.terms ? true : undefined}
                  aria-describedby={errors.terms ? 'terms-error' : undefined}
                  className="checkbox checkbox-sm mt-0.5"
                />
                <span>
                  قرأت{' '}
                  <Link to="/terms" target="_blank" className="text-info underline">
                    شروط الاستخدام
                  </Link>{' '}
                  وأوافق عليها: المنصة وسيط للتواصل فقط، واللقاء في المستشفى، ولا أموال.
                </span>
              </label>
              {errors.terms && (
                <p id="terms-error" className="text-crimson-ink mt-1 text-[0.82rem]">
                  {errors.terms}
                </p>
              )}
            </div>

            <div>
              <div role="alert">
                {serverError && (
                  <Notice tone="err" title="لم نتمكن من إنشاء حسابك">
                    {serverError}
                  </Notice>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-urgent rounded-field shadow-urgent px-6 py-2.5 font-semibold text-white hover:brightness-110 disabled:opacity-70 disabled:hover:brightness-100"
                >
                  {submitting ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
                </button>
                <Link to="/login" className="text-crimson-ink font-bold hover:underline">
                  لدي حساب، تسجيل الدخول
                </Link>
              </div>
            </div>
          </form>
        </Panel>

        <SignupSteps />
      </div>
    </div>
  );
}
