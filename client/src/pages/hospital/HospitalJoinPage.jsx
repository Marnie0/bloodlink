import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EGYPT_GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية',
  'الشرقية',
  'القليوبية',
  'الغربية',
  'المنوفية',
  'البحيرة',
  'كفر الشيخ',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء',
];

const BLOCKED_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'test.com',
  'fake.com',
  'asdasd.com',
  'asdf.com',
  'qwerty.com',
  'mailinator.com',
  'yopmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'tempmail.com',
  'temp-mail.org',
]);

async function fetchMXRecords(domain) {
  const endpoints = [
    {
      url: `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`,
      headers: { Accept: 'application/dns-json' },
    },
    {
      url: `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
      headers: {},
    },
  ];

  for (const endpoint of endpoints) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    try {
      const res = await fetch(endpoint.url, {
        headers: endpoint.headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) return await res.json();
    } catch {
      clearTimeout(timeoutId);
    }
  }
  return null;
}

async function verifyEmailDomainMX(email) {
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) {
    return { valid: false, reason: 'صيغة البريد الإلكتروني غير صحيحة.' };
  }

  if (BLOCKED_DOMAINS.has(domain)) {
    return { valid: false, reason: `النطاق "${domain}" غير مسموح به، يرجى استخدام بريد رسمي.` };
  }

  const data = await fetchMXRecords(domain);

  if (!data) {
    console.warn('DNS lookup failed (network/blocked).');
    return { valid: false, reason: 'تعذر التحقق من نطاق البريد الإلكتروني، تأكد من اتصالك بالإنترنت.' };
  }

  if (data.Status === 3) {
    return { valid: false, reason: `النطاق "${domain}" غير موجود، تأكد من كتابة البريد بشكل صحيح.` };
  }

  const validMXRecords = (data.Answer || []).filter(
    (record) => record.type === 15 && record.data && record.data.trim() !== '0 .'
  );

  if (validMXRecords.length === 0) {
    return { valid: false, reason: `النطاق "${domain}" غير صالح لاستقبال رسائل البريد الإلكتروني.` };
  }

  return { valid: true };
}

export default function HospitalJoinPage() {
  const [formData, setFormData] = useState({
    hospitalName: '',
    licenseNumber: '',
    email: '',
    phone: '',
    governorate: '',
    address: '',
    documentFile: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatusText, setSubmitStatusText] = useState('');
  const [submitError, setSubmitError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isPreviewModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsPreviewModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewModalOpen]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
  }, []);

  const processFile = useCallback((file) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFieldErrors((prev) => ({
        ...prev,
        documentFile: 'صيغة الملف غير مدعومة. يُسمح فقط بـ JPG أو PNG أو WEBP أو PDF.',
      }));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFieldErrors((prev) => ({
        ...prev,
        documentFile: 'حجم الملف يتجاوز الحد الأقصى المسموح به (5 ميجابايت).',
      }));
      return;
    }

    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }

    setFormData((prev) => ({ ...prev, documentFile: file }));
    setFieldErrors((prev) => ({ ...prev, documentFile: '' }));
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      processFile(e.target.files?.[0]);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      processFile(e.dataTransfer.files?.[0]);
    },
    [processFile]
  );

  const handleRemoveFile = useCallback((e) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setIsPreviewModalOpen(false);
    setFormData((prev) => ({ ...prev, documentFile: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const validateFieldsSync = () => {
    const errors = {};

    if (formData.hospitalName.trim().length < 3) {
      errors.hospitalName = 'يرجى إدخال اسم المستشفى (3 أحرف على الأقل).';
    }

    if (formData.licenseNumber.trim().length < 4) {
      errors.licenseNumber = 'يرجى إدخال رقم ترخيص طبي صحيح.';
    }

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'يرجى إدخال بريد إلكتروني بصيغة صحيحة (مثال: info@hospital.org).';
    }

    const cleanPhone = formData.phone.replace(/[\s\-+]/g, '');
    if (!/^\d{8,15}$/.test(cleanPhone)) {
      errors.phone = 'يرجى إدخال رقم هاتف أو خط ساخن صحيح (من 8 إلى 15 رقم).';
    }

    if (!formData.governorate) {
      errors.governorate = 'يرجى اختيار المحافظة.';
    }

    if (formData.address.trim().length < 5) {
      errors.address = 'يرجى إدخال العنوان التفصيلي للمستشفى.';
    }

    if (!formData.documentFile) {
      errors.documentFile = 'يرجى إرفاق الخطاب الرسمي للتفويض أو صورة الترخيص.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateFieldsSync()) return;

    setIsSubmitting(true);
    setSubmitStatusText('جاري التحقق من البريد الإلكتروني...');

    try {
      const domainCheck = await verifyEmailDomainMX(formData.email.trim());
      if (!domainCheck.valid) {
        setFieldErrors((prev) => ({ ...prev, email: domainCheck.reason }));
        setIsSubmitting(false);
        setSubmitStatusText('');
        return;
      }

      setSubmitStatusText('جاري إرسال طلب الانضمام...');
      const dataToSubmit = new FormData();
      dataToSubmit.append('hospitalName', formData.hospitalName.trim());
      dataToSubmit.append('licenseNumber', formData.licenseNumber.trim());
      dataToSubmit.append('email', formData.email.trim());
      dataToSubmit.append('phone', formData.phone.trim());
      dataToSubmit.append('governorate', formData.governorate);
      dataToSubmit.append('address', formData.address.trim());
      dataToSubmit.append('document', formData.documentFile);

      /*
      const response = await fetch('/api/hospital/join', {
        method: 'POST',
        body: dataToSubmit,
      });
      if (!response.ok) throw new Error('تعذر إرسال الطلب إلى الخادم، حاول مجددًا.');
      */

      console.log('FormData ready for API:', Object.fromEntries(dataToSubmit));
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
      setSubmitStatusText('');
    }
  };

  // ==========================================
  // شاشة حالة الطلب (Stepper بعد التقديم)
  // ==========================================
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8" dir="rtl">
        <div className="bg-slate-900 rounded-2xl border border-slate-700/80 shadow-xl shadow-slate-950/40 p-6 md:p-10 text-center">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-5 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">تم استلام طلب الانضمام بنجاح</h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto">
            جاري مراجعة الأوراق الرسمية الخاصة بـ{' '}
            <span className="font-semibold text-white">{formData.hospitalName}</span>. سيصلك الرد على البريد{' '}
            <span className="text-red-400 font-medium" dir="ltr">
              {formData.email}
            </span>
            .
          </p>

          {/* Stepper */}
          <div className="flex flex-col md:flex-row items-center justify-between relative gap-8 md:gap-0 max-w-2xl mx-auto mb-8">
            <div className="hidden md:block absolute top-5 left-8 right-8 h-0.5 bg-slate-700 z-0" />

            <div className="flex flex-col items-center relative z-10 bg-slate-900 px-3">
              <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2 shadow-[0_0_18px_rgba(220,38,38,0.6)]">
                1
              </div>
              <span className="text-sm font-semibold text-white">تقديم الطلب</span>
              <span className="text-xs text-emerald-400 mt-0.5">تم الانتهاء</span>
            </div>

            <div className="flex flex-col items-center relative z-10 bg-slate-900 px-3">
              <div className="w-10 h-10 bg-red-500/15 text-red-400 border-2 border-red-500 rounded-full flex items-center justify-center font-bold mb-2 shadow-[0_0_20px_rgba(239,68,68,0.45)] animate-pulse">
                2
              </div>
              <span className="text-sm font-semibold text-white">مراجعة الأوراق</span>
              <span className="text-xs text-red-400 mt-0.5">قيد المراجعة</span>
            </div>

            <div className="flex flex-col items-center relative z-10 bg-slate-900 px-3">
              <div className="w-10 h-10 bg-slate-800 text-slate-400 border border-slate-700 rounded-full flex items-center justify-center font-bold mb-2">
                3
              </div>
              <span className="text-sm font-semibold text-slate-300">تفعيل الحساب</span>
              <span className="text-xs text-slate-400 mt-0.5">في الانتظار</span>
            </div>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-4 max-w-xl mx-auto text-right flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="space-y-1 text-sm min-w-0">
              <p className="text-slate-300">
                رقم الترخيص: <span className="text-white font-medium">{formData.licenseNumber}</span>
              </p>
              <p className="text-slate-300">
                رقم الطوارئ:{' '}
                <span className="text-white font-medium" dir="ltr">
                  {formData.phone}
                </span>
              </p>
              <p className="text-slate-300">
                الموقع:{' '}
                <span className="text-white font-medium">
                  {formData.governorate} - {formData.address}
                </span>
              </p>
            </div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="المستند المرفق"
                decoding="async"
                className="w-16 h-16 rounded-lg object-cover border border-slate-600"
              />
            )}
          </div>

          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl border border-slate-600 transition-colors"
            >
              <span>العودة إلى الصفحة الرئيسية</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // نموذج التقديم (هوية موحدة بالأزرق الداكن Slate)
  // ==========================================
  const inputBaseClass =
    'w-full px-4 py-2.5 bg-slate-800/80 text-white placeholder:text-slate-400 border rounded-xl outline-none transition-colors duration-200 focus:ring-2 focus:ring-red-500/30';

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8" dir="rtl">
      <div className="bg-slate-900 rounded-2xl border border-slate-700/80 shadow-xl shadow-slate-950/40 p-6 md:p-8">
        <div className="mb-8 border-b border-slate-800 pb-5">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-500/15 text-red-400 border border-red-500/30 mb-3">
            بوابة المستشفيات الشريكة
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1.5">انضم كشريك طبي</h2>
          <p className="text-slate-300 text-sm">
            أدخل بيانات المستشفى وارفق الخطاب الرسمي للتفويض لربط بنك الدم بشبكة BloodLink.
          </p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-950/60 text-red-300 rounded-xl text-sm border border-red-500/40">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                اسم المستشفى
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  fieldErrors.hospitalName
                    ? 'border-red-500'
                    : 'border-slate-700 focus:border-red-500'
                }`}
                placeholder="مثال: مستشفى القصر العيني"
              />
              {fieldErrors.hospitalName && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.hospitalName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                رقم الترخيص الطبي
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  fieldErrors.licenseNumber
                    ? 'border-red-500'
                    : 'border-slate-700 focus:border-red-500'
                }`}
                placeholder="مثال: 12345678"
              />
              {fieldErrors.licenseNumber && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.licenseNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                البريد الإلكتروني الرسمي
              </label>
              <input
                type="email"
                name="email"
                dir="ltr"
                value={formData.email}
                onChange={handleChange}
                className={`${inputBaseClass} text-right ${
                  fieldErrors.email
                    ? 'border-red-500'
                    : 'border-slate-700 focus:border-red-500'
                }`}
                placeholder="info@kasralainy.edu.eg"
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                رقم الهاتف للطوارئ
              </label>
              <input
                type="tel"
                name="phone"
                dir="ltr"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputBaseClass} text-right ${
                  fieldErrors.phone
                    ? 'border-red-500'
                    : 'border-slate-700 focus:border-red-500'
                }`}
                placeholder="01xxxxxxxxx"
              />
              {fieldErrors.phone && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                المحافظة
              </label>
              <select
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  fieldErrors.governorate
                    ? 'border-red-500'
                    : 'border-slate-700 focus:border-red-500'
                } ${!formData.governorate ? 'text-slate-400' : 'text-white'}`}
              >
                <option value="" disabled className="bg-slate-900 text-slate-400">
                  اختر المحافظة
                </option>
                {EGYPT_GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov} className="bg-slate-900 text-white">
                    {gov}
                  </option>
                ))}
              </select>
              {fieldErrors.governorate && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.governorate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                العنوان التفصيلي
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`${inputBaseClass} ${
                  fieldErrors.address
                    ? 'border-red-500'
                    : 'border-slate-700 focus:border-red-500'
                }`}
                placeholder="مثال: شارع القصر العيني، المنيل"
              />
              {fieldErrors.address && (
                <p className="mt-1.5 text-xs text-red-400">{fieldErrors.address}</p>
              )}
            </div>
          </div>

          {/* منطقة رفع الملفات مع Drag & Drop ومعاينة الصورة */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              الخطاب الرسمي للتفويض (JPG / PNG / PDF)
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mt-1 flex flex-col items-center justify-center px-5 py-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
                isDragging
                  ? 'border-red-500 bg-red-500/10 shadow-[0_0_25px_rgba(239,68,68,0.25)]'
                  : fieldErrors.documentFile
                  ? 'border-red-500/80 bg-slate-800/50'
                  : 'border-slate-600 hover:border-red-500/70 bg-slate-800/40'
              }`}
            >
              {!formData.documentFile ? (
                <div className="space-y-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-red-400">
                    اضغط لاختيار ملف أو اسحبه وأفلته هنا
                  </p>
                  <p className="text-xs text-slate-400">
                    JPG, PNG, WEBP أو PDF — الحد الأقصى 5 ميجابايت
                  </p>
                </div>
              ) : (
                <div className="w-full min-w-0 flex flex-col items-center gap-4">
                  {previewUrl ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPreviewModalOpen(true);
                      }}
                      className="relative group max-w-full"
                      title="اضغط لتكبير الصورة"
                    >
                      <img
                        src={previewUrl}
                        alt="معاينة الخطاب الرسمي"
                        decoding="async"
                        className="max-h-60 w-auto max-w-full rounded-xl object-contain border border-slate-600 bg-slate-950 shadow-lg"
                      />
                      <span className="absolute bottom-2 left-2 px-2.5 py-1 text-[11px] font-medium bg-slate-950/85 text-white rounded-md border border-slate-700 opacity-90 group-hover:opacity-100">
                        اضغط للتكبير
                      </span>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 flex items-center justify-center font-bold text-sm">
                      PDF
                    </div>
                  )}

                  <div className="w-full max-w-md min-w-0 text-center px-2">
                    <p
                      className="text-sm font-medium text-slate-100 truncate"
                      title={formData.documentFile.name}
                    >
                      {formData.documentFile.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {(formData.documentFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-3.5 py-1.5 text-xs font-medium bg-slate-800 text-slate-100 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      تغيير الملف
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="px-3.5 py-1.5 text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/25 transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </div>

            {fieldErrors.documentFile && (
              <p className="mt-1.5 text-xs text-red-400">{fieldErrors.documentFile}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:shadow-[0_0_28px_rgba(239,68,68,0.65)] focus:outline-none focus:ring-2 focus:ring-red-500/60 transition-[background-color,box-shadow] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>{submitStatusText || 'جاري الإرسال...'}</span>
                </>
              ) : (
                'تقديم طلب الانضمام'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* نافذة تكبير الصورة */}
      {isPreviewModalOpen && previewUrl && (
        <div
          onClick={() => setIsPreviewModalOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(false)}
              className="absolute -top-10 left-0 px-3 py-1 text-sm bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700"
            >
              إغلاق ✕
            </button>
            <img
              src={previewUrl}
              alt="معاينة كاملة للمستند"
              className="max-h-[85vh] w-auto rounded-xl border border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}