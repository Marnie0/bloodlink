import { useState } from 'react';
import { ALLOWED_FILE_TYPES, MAX_UPLOAD_MB } from '../donorConstants';
import { buttonClass } from '../donorStyles';
import { Camera } from 'lucide-react';
import Ltr from './Ltr';

const fieldClass =
  'h-auto w-full rounded-field border border-line bg-surface-2 px-3 py-2.5 text-ink focus:border-navy focus:bg-surface focus:outline-none disabled:opacity-60';
const labelClass = 'mb-[5px] block text-[0.86rem] font-semibold';

export default function CertificateForm({
  hospitals,
  selectedFile,
  isChecking,
  uploadError,
  fileInputRef,
  onFileReady,
}) {
  const [hospitalId, setHospitalId] = useState('');
  const [certificateDate, setCertificateDate] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [dateError, setDateError] = useState(null);
  const [consentError, setConsentError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const currentHospitalId = hospitalId || hospitals[0]?.id;

  function handleFile(file) {
    if (!file) return;

    const missingDate = !certificateDate;
    const missingConsent = !hasConsent;
    setDateError(missingDate ? 'أدخل تاريخ الشهادة أولاً.' : null);
    setConsentError(missingConsent ? 'وافق على الفحص الآلي للشهادة قبل اختيار الملف.' : null);
    if (missingDate || missingConsent) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError('الملف يجب أن يكون JPG أو PNG أو PDF.');
      return;
    }
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setFileError(`حجم الملف أكبر من ${MAX_UPLOAD_MB} ميجابايت.`);
      return;
    }
    setFileError(null);
    onFileReady({ file, hospitalId: currentHospitalId, certificateDate });
  }

  function openFilePicker() {
    fileInputRef.current.click();
  }

  const fileExtension = selectedFile ? selectedFile.name.split('.').pop().toUpperCase().slice(0, 4) : '';
  const showDropArea = !isChecking && !selectedFile;
  const errorMessage = fileError ?? consentError ?? uploadError;

  return (
    <div className="p-[18px]">
      {/* المستشفى + التاريخ */}
      <div className="grid gap-x-4 md:grid-cols-2">
        <div className="mb-3.5">
          <label htmlFor="certificate-hospital" className={labelClass}>
            المستشفى الذي أصدر الشهادة <span className="text-crimson">*</span>
          </label>
          <select
            id="certificate-hospital"
            className={`select ${fieldClass}`}
            value={currentHospitalId}
            disabled={isChecking}
            onChange={(event) => setHospitalId(event.target.value)}
          >
            {hospitals.map((hospital) => (
              <option key={hospital.id} value={hospital.id}>
                {hospital.name} · {hospital.area}
                {hospital.partner ? ' (شريك)' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3.5">
          <label htmlFor="certificate-date" className={labelClass}>
            تاريخ الشهادة <span className="text-crimson">*</span>
          </label>
          <input
            id="certificate-date"
            type="date"
            dir="ltr"
            className={`input text-left ${fieldClass} ${dateError ? 'border-crimson' : ''}`}
            value={certificateDate}
            disabled={isChecking}
            onChange={(event) => {
              setCertificateDate(event.target.value);
              setDateError(null);
            }}
          />
          {dateError && (
            <span className="text-crimson-ink mt-1 block text-[0.78rem] font-semibold">{dateError}</span>
          )}
        </div>
      </div>

      {/* صورة الشهادة */}
      <div>
        <span className={labelClass}>
          صورة الشهادة <span className="text-crimson">*</span>
        </span>
        <span className="text-ink-2 mb-1.5 block text-[0.78rem]">
          JPG أو PNG أو PDF، حتى <Ltr>{MAX_UPLOAD_MB}</Ltr> ميجابايت. يجب أن يظهر اسمك والفصيلة وختم المستشفى.
        </span>

        {/* الموافقة على الفحص الآلي (checkbox من daisyUI) */}
        <label className="rounded-field border-line bg-surface mb-2.5 flex cursor-pointer items-start gap-2.5 border p-3 text-[0.84rem]">
          <input
            type="checkbox"
            className="checkbox border-line bg-surface checked:border-navy checked:bg-navy mt-[3px] size-[18px] shrink-0 rounded-[4px] text-white"
            checked={hasConsent}
            disabled={isChecking}
            onChange={(event) => {
              setHasConsent(event.target.checked);
              setConsentError(null);
            }}
          />
          أوافق على فحص الشهادة آلياً لقراءة الاسم والفصيلة والتاريخ. لا تُعرض الشهادة لأي مستخدم.
        </label>

        {/* input الملف الحقيقي مخفي، وبنفتحه من الزراير (capture عشان الموبايل يفتح الكاميرا) */}
        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          accept={ALLOWED_FILE_TYPES.join(',')}
          capture="environment"
          onChange={(event) => {
            handleFile(event.target.files[0]);
            event.target.value = ''; // عشان يقدر يختار نفس الملف تاني
          }}
        />

        {/* مكان السحب والإفلات */}
        {showDropArea && (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              handleFile(event.dataTransfer.files[0]);
            }}
            className={`rounded-[18px] border-2 border-dashed p-6 text-center transition ${
              isDragging ? 'border-crimson bg-crimson-lt' : 'border-line bg-surface-2'
            }`}
          >
            <span className="bg-urgent mx-auto mb-2.5 grid size-14 place-items-center rounded-[18px] text-white">
              <Camera aria-hidden="true" />
            </span>
            <b className="text-head block">صوّر الشهادة أو اسحب الملف هنا</b>
            <small className="text-ink-2">تظهر للطلبات علامة الثقة فقط</small>
            <div className="mt-3">
              <button type="button" className={buttonClass('line', 'sm')} onClick={openFilePicker}>
                اختيار ملف
              </button>
            </div>
          </div>
        )}

        {/* الملف اللي اتختار + شريط الفحص (progress من daisyUI) */}
        {selectedFile && (
          <div className="rounded-tile border-line bg-surface mt-3 flex items-center gap-3 border px-3 py-2.5 text-[0.85rem]">
            <span
              dir="ltr"
              className="bg-crimson-lt text-crimson-ink grid h-[46px] w-[38px] shrink-0 place-items-center rounded-lg text-[0.62rem] font-bold"
            >
              {fileExtension}
            </span>
            <div className="min-w-0 flex-1">
              <b className="block truncate">{selectedFile.name}</b>
              <span className="text-ink-3 block text-[0.74rem]">
                <Ltr>{(selectedFile.size / 1048576).toFixed(1)}</Ltr> ميجابايت ·{' '}
                {isChecking ? 'جارٍ الفحص…' : 'تم الفحص'}
              </span>
              <progress
                className="progress bg-line-2 [&::-moz-progress-bar]:bg-urgent [&::-webkit-progress-bar]:bg-line-2 [&::-webkit-progress-value]:bg-urgent mt-1.5 block h-1 w-full"
                {...(isChecking ? {} : { value: 100, max: 100 })}
                aria-label="تقدم الفحص"
              />
            </div>
            {!isChecking && (
              <button type="button" className={buttonClass('ghost', 'sm')} onClick={openFilePicker}>
                استبدال
              </button>
            )}
          </div>
        )}

        {/* رسالة الخطأ (موافقة ناقصة / نوع الملف غلط / الرفع فشل) */}
        {errorMessage && (
          <p role="alert" className="text-crimson-ink mt-2 mb-0 text-[0.82rem] font-semibold">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
