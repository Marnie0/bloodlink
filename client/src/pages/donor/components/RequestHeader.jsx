import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import Ref from '@/components/ui/Ref';
import { breadcrumbs } from '../requestDetailsData';
import { useRequestDetails } from '../RequestDetailsContext';
const Chip = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-[11px] py-1 text-[0.74rem] font-medium backdrop-blur-sm">
    {children}
  </span>
);

export default function RequestHeader() {
  const { request, chips } = useRequestDetails();
  const { hospital } = request;

  const crumbs = [
    ...breadcrumbs,
    {
      label: (
        <>
          الطلب <Ref>{request.id}</Ref>
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb items={crumbs} />
      <PageHeader
        title={
          <>
            طلب رقم <Ref>{request.id}</Ref>
          </>
        }
        subtitle={`${hospital.name} · ${hospital.area} · ${hospital.partner ? 'مستشفى شريك' : 'غير شريك'}`}
        chips={chips.length > 0 ? chips.map((label) => <Chip key={label}>{label}</Chip>) : null}
      />
    </>
  );
}
