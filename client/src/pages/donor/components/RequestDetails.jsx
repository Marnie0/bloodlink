import { Heart, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import Notice from '@/components/ui/Notice';
import Ref from '@/components/ui/Ref';
import KeyValueTable from '@/components/ui/KeyValueTable';
import Tag from '@/components/ui/Tag';
import TrustBadge from '@/components/ui/TrustBadge';
import { notices } from '../requestDetailsData';
import { useRequestDetails } from '../RequestDetailsContext';
import FactGrid from './FactGrid';

export default function RequestDetails() {
  const { request, openAccept, decline, openReport } = useRequestDetails();
  const { hospital, requester } = request;
  const notice = notices.find((n) => n.id === 'before-accept');

  const facts = [
    {
      label: 'الفصيلة المطلوبة',
      value: <Ref>{request.bloodType}</Ref>,
      extra: request.compatibleWithMe && <Tag tone="ok">متوافقة معك</Tag>,
    },
    {
      label: 'الوحدات',
      value: <Ref>{request.unitsNeeded}</Ref>,
      extra: (
        <>
          وافق <Ref>{request.unitsPledged}</Ref>
        </>
      ),
    },
    { label: 'مطلوب قبل', value: request.deadlineLabel },
    { label: 'الاستعجال', value: request.urgencyLabel, hot: request.urgency === 'urgent' },
  ];

  const rows = [
    { label: 'المستشفى', value: `${hospital.name} · ${request.department}` },
    { label: 'سبب الطلب', value: request.reason },
    {
      label: 'ورقة المستشفى',
      value: (
        <>
          <Tag tone="ok">✓ أكّدها {hospital.name}</Tag> في <Ref>{request.paperConfirmedAt}</Ref>
        </>
      ),
    },
    { label: 'صاحب الطلب', value: `${requester.short} (${requester.relation}) · ${requester.phoneHint}` },
  ];

  return (
    <article className="rounded-card border-line bg-surface shadow-card border p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-tiny text-ink-3">
          طلب رقم <Ref>{request.id}</Ref> · {request.publishedAgo}
        </span>
        <TrustBadge level="verified" icon={<ShieldCheck aria-hidden className="size-3.5" />}>
          طلب موثّق · مستشفى شريك
        </TrustBadge>
      </div>

      <h2 className="mt-2.5 text-[1.25rem] font-bold md:text-[1.45rem]">هل يمكنك التبرع بالدم اليوم؟</h2>

      <FactGrid facts={facts} />
      <KeyValueTable rows={rows} />

      <Notice tone={notice.tone} title={notice.title} className="mt-4">
        {notice.text}
      </Notice>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button icon={Heart} className="flex-1" aria-haspopup="dialog" onClick={openAccept}>
          نعم، أستطيع التبرع
        </Button>
        <Button variant="ghost" className="flex-1" onClick={decline}>
          لا أستطيع هذه المرة
        </Button>
      </div>

      <Button variant="link" size="sm" className="mt-1.5" aria-haspopup="dialog" onClick={openReport}>
        الإبلاغ عن هذا الطلب
      </Button>
    </article>
  );
}
