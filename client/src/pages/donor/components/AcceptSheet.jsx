import BottomSheet from '@/components/ui/BottomSheet';
import Button from '@/components/ui/Button';
import { sheetChecks } from '../requestDetailsData';
import { useRequestDetails } from '../RequestDetailsContext';

export default function AcceptSheet() {
  const { sheet, closeSheet, request, submitting, confirmAccept } = useRequestDetails();

  return (
    <BottomSheet
      open={sheet === 'accept'}
      onClose={closeSheet}
      dismissible={!submitting}
      eyebrow={`${request.id} · ${request.hospital.name}`}
      title="تأكيد الموافقة على التبرع"
      description="بموافقتك نشارك اسمك الأول ورقمك مع صاحب الطلب فقط، ونُصدر لك رمز حضور."
    >
      <ul className="mt-3 grid list-none gap-2 p-0">
        {sheetChecks.map(({ icon: Icon, text }) => (
          <li
            key={text}
            className="rounded-tile bg-surface-2 text-small flex items-center gap-2.5 px-3.5 py-[11px]"
          >
            <Icon aria-hidden className="text-ok size-[18px] shrink-0" />
            {text}
          </li>
        ))}
      </ul>

      <Button block autoFocus loading={submitting} className="mt-4" onClick={confirmAccept}>
        أؤكد، أستطيع التبرع
      </Button>
      <Button block variant="ghost" disabled={submitting} className="mt-2" onClick={closeSheet}>
        إلغاء
      </Button>
    </BottomSheet>
  );
}
