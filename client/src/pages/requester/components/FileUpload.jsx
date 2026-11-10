import { useRef, useState } from 'react';
import { Camera, FileText } from 'lucide-react';
import { ACCEPTED_FILES, MAX_FILE_MB } from '../requesterConstants';
import { buttonClass } from '../requesterStyles';

function sizeLabel(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} كيلوبايت`;
  return `${(bytes / 1024 / 1024).toFixed(1)} ميجابايت`;
}

// بيتأكد من نوع الملف وحجمه، وبعدين يبعته لـ onPick
export default function FileUpload({ file, onPick, disabled }) {
  const inputRef = useRef(null);
  const [problem, setProblem] = useState('');
  const [dragging, setDragging] = useState(false);

  function accept(picked) {
    if (!picked) return;
    if (!ACCEPTED_FILES.includes(picked.type)) {
      setProblem('نوع الملف غير مدعوم. استخدم JPG أو PNG أو PDF.');
      return;
    }
    if (picked.size > MAX_FILE_MB * 1024 * 1024) {
      setProblem(`حجم الملف أكبر من ${MAX_FILE_MB} ميجابايت.`);
      return;
    }
    setProblem('');
    onPick(picked);
  }

  function openPicker() {
    inputRef.current.click();
  }

  function handleChange(event) {
    accept(event.target.files[0]);
    event.target.value = ''; // علشان تقدر تختار نفس الملف تاني
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    if (!disabled) accept(event.dataTransfer.files[0]);
  }

  function handleDragOver(event) {
    event.preventDefault();
    if (!disabled) setDragging(true);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={handleChange}
        disabled={disabled}
        tabIndex={-1}
        aria-label="اختيار ملف الورقة"
        className="sr-only"
      />

      {file ? (
        <div className="border-line bg-surface rounded-card flex flex-wrap items-center gap-3 border p-3">
          <span
            aria-hidden="true"
            className="bg-crimson-lt text-crimson-ink grid size-11 shrink-0 place-items-center rounded-xl"
          >
            <FileText className="size-5" />
          </span>
          <div className="min-w-0 grow">
            <b dir="ltr" className="block truncate text-start text-[0.9rem]">
              {file.name}
            </b>
            <span className="text-tiny text-ink-2">{sizeLabel(file.size)}</span>
          </div>
          <button type="button" disabled={disabled} onClick={openPicker} className={buttonClass('line')}>
            استبدال
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`rounded-card border-2 border-dashed px-5 py-8 text-center ${
            dragging ? 'border-navy bg-teal-lt' : 'border-line bg-surface-2'
          } ${disabled ? 'opacity-60' : ''}`}
        >
          <span
            aria-hidden="true"
            className="bg-urgent mx-auto mb-3 grid size-14 place-items-center rounded-2xl text-white"
          >
            <Camera className="size-7" />
          </span>
          <h3 className="font-bold">صوّر الورقة أو اسحب الملف هنا</h3>
          <p className="text-ink-2 mt-1 text-[0.86rem]">لا تظهر الورقة للمتبرعين، يرون علامة الثقة فقط</p>
          <button
            type="button"
            disabled={disabled}
            onClick={openPicker}
            className={`${buttonClass('line')} mt-4`}
          >
            اختيار ملف
          </button>
        </div>
      )}

      {problem && (
        <p role="alert" className="text-crimson-ink mt-2 text-[0.84rem]">
          {problem}
        </p>
      )}
    </div>
  );
}
