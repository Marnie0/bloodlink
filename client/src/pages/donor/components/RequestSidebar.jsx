import Panel from '@/components/ui/Panel';
import Notice from '@/components/ui/Notice';
import KeyValueTable from '@/components/ui/KeyValueTable';

import MapPreview from './MapPreview';
import ContactCard from './ContactCard';

export default function RequestSidebar({ hospital, contact, contactNote, notice }) {

  const rows = [
    { label: 'العنوان', value: hospital.address },
    { label: 'بنك الدم', value: hospital.bloodBank },
    { label: 'الاستقبال', value: hospital.hours },
    { label: 'المسافة', value: hospital.distanceLabel },
  ].filter((r) => r.value); // non-partner hospitals have fewer rows

  return (

    <aside className="grid min-w-0 content-start gap-[18px]">

      <Panel as="h3" title="موقع المستشفى">
        <MapPreview label={hospital.name} />
        <KeyValueTable rows={rows} className="mt-2.5" />
      </Panel>
      {contact && <ContactCard person={contact} note={contactNote} />}

      <Notice tone={notice.tone} title={notice.title}>
        {notice.text}
      </Notice>
    </aside>
  );
}
