import Panel from '@/components/ui/Panel';
import Notice from '@/components/ui/Notice';
import KeyValueTable from '@/components/ui/KeyValueTable';
import { notices } from '../requestDetailsData';
import { useRequestDetails } from '../RequestDetailsContext';
import MapPreview from './MapPreview';
import ContactCard from './ContactCard';

export default function RequestSidebar() {
  const { request, pledge, accepted } = useRequestDetails();
  const { hospital } = request;
  const notice = notices.find((n) => n.id === 'free');

  const rows = [
    { label: 'العنوان', value: hospital.address },
    { label: 'بنك الدم', value: hospital.bloodBank },
    { label: 'الاستقبال', value: hospital.hours },
    { label: 'المسافة', value: hospital.distanceLabel },
  ].filter((r) => r.value); // non-partner hospitals have fewer rows

  return (
    <aside className="grid min-w-0 content-start gap-4.5">
      <Panel as="h3" title="موقع المستشفى">
        <MapPreview label={hospital.name} />
        <KeyValueTable rows={rows} className="mt-2.5" />
      </Panel>
      {accepted && <ContactCard person={request.requester} note={pledge.contactNote} />}
      <Notice tone={notice.tone} title={notice.title}>
        {notice.text}
      </Notice>
    </aside>
  );
}
