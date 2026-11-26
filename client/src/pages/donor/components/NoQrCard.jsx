import { Ticket } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NoQrCard({ hospitalName, canConfirm = false, onConfirm }) {
  return (
    <div className="rounded-card border-line bg-surface shadow-card min-w-0 border p-[22px] text-center">
      <div
        aria-hidden
        className="bg-surface-2 text-ink-3 mx-auto mb-3 grid size-[72px] place-items-center rounded-[22px]"
      >
        <Ticket className="size-10" />
      </div>
      <h2 className="font-head text-[1.1rem] font-bold">لا يوجد رمز QR في هذا المستشفى</h2>
      <p className="text-small text-ink-2 mt-1.5">
        {hospitalName} ليس شريكاً. أكّد التبرع من هنا بعد أن تتبرع.
      </p>
      <div className="mt-4 flex justify-center">
        <Button
          variant="navy"
          disabled={!canConfirm}
          title={canConfirm ? undefined : 'يتاح بعد موعد اللقاء'}
          onClick={onConfirm}
        >
          تبرعتُ بالفعل
        </Button>
      </div>
      <p className="text-tiny text-ink-3 mt-2">
        يؤكد صاحب الطلب أيضاً. هذا التأكيد لا يغيّر علامة الثقة الخاصة بك.
      </p>
    </div>
  );
}
