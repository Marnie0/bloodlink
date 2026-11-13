import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import StaffBar from './StaffBar';
import HospitalSideMenu from './HospitalSideMenu';

export default function HospitalLayout({
  breadcrumbs,
  title,
  subtitle,
  chips,
  pendingCount = 0,
  children,
}) {
  return (
    <div className="pb-12">
      <StaffBar />

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <Breadcrumb items={breadcrumbs} />

        <PageHeader title={title} subtitle={subtitle} chips={chips} />

        <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-4">
            <HospitalSideMenu pendingCount={pendingCount} />
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}