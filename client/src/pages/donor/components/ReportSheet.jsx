import { useState } from 'react';
import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';

export default function ReportSheet({ open, onClose, requestId, reasons = [], onSubmit }) {
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');

  const reset = () => {
    setReason('');
    setNote('');
  };
  const close = () => {
    reset();
    onClose();
  };
  const submit = () => {
    onSubmit({ targetType: 'request', targetId: requestId, reason, note: note.trim() });
    reset();
  };

  return (
    <BottomSheet
      open={open}
      onClose={close}
      eyebrow={requestId}
      title="الإبلاغ عن هذا الطلب"
      description="يراجع فريقنا كل بلاغ. اختر السبب الأقرب."
    >
      <fieldset className="mt-3 grid gap-2 border-0 p-0">
        <legend className="sr-only">سبب الإبلاغ</legend>
        {reasons.map((r) => (
          <label
            key={r.id}
            className="rounded-tile border-line bg-surface-2 text-small has-[:checked]:border-crimson has-[:checked]:bg-crimson-lt flex cursor-pointer items-center gap-3 border px-3.5 py-3"
          >
            <input
              type="radio"
              name="report-reason"
              value={r.id}
              checked={reason === r.id}
              onChange={() => setReason(r.id)}
              className="accent-crimson size-4"
            />
            {r.label}
          </label>
        ))}
      </fieldset>

      <label className="text-small text-ink-2 mt-3 block font-medium" htmlFor="report-note">
        تفاصيل إضافية (اختياري)
      </label>
      <textarea
        id="report-note"
        rows={3}
        maxLength={300}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="rounded-field border-line bg-surface-2 text-small text-ink placeholder:text-ink-3 mt-1 w-full resize-none border p-3"
      />

      <Button block className="mt-4" disabled={!reason} onClick={submit}>
        إرسال البلاغ
      </Button>
      <Button block variant="ghost" className="mt-2" onClick={close}>
        إلغاء
      </Button>
    </BottomSheet>
  );
}
