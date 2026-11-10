import { PASSWORD_MIN } from './signupOptions';

const EGYPT_MOBILE = /^01[0125]\d{8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns { fieldName: message } for every invalid field. Empty object = the form is valid.
// The keys are added in the same order as the fields on the page, so the first key is the
// first invalid field (the page moves focus there).
export function signupErrors(values) {
  const errors = {};
  const phone = values.phone.replace(/[\s-]/g, '');

  if (values.roles.length === 0) errors.roles = 'اختر متبرع أو صاحب طلب، أو كليهما.';
  if (!values.name.trim()) errors.name = 'الرجاء كتابة اسمك الكامل.';
  if (!EGYPT_MOBILE.test(phone)) errors.phone = 'رقم الهاتف يجب أن يكون 11 رقمًا ويبدأ بـ 01.';
  if (!EMAIL.test(values.email.trim())) errors.email = 'الرجاء إدخال بريد إلكتروني صحيح.';
  if (values.password.length < PASSWORD_MIN) {
    errors.password = `كلمة المرور يجب أن تكون ${PASSWORD_MIN} أحرف على الأقل.`;
  }
  if (values.roles.includes('donor') && !values.bloodType) errors.bloodType = 'اختر فصيلة دمك.';
  if (!values.governorate) errors.governorate = 'اختر المحافظة.';
  if (!values.area) errors.area = 'اختر المنطقة.';
  if (!values.terms) errors.terms = 'يجب الموافقة على شروط الاستخدام.';

  return errors;
}
