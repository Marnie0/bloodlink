import Toast from '@/components/ui/Toast';
import { requests } from './requestDetailsData';
import RequestHeader from './components/RequestHeader';
import RequestSidebar from './components/RequestSidebar';
import ReportSheet from './components/ReportSheet';
import { RequestDetailsProvider, useRequestDetails } from './RequestDetailsContext';
import RequestMain from './components/RequestMain';
import AcceptSheet from './components/AcceptSheet';
import { SearchX } from 'lucide-react';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';

function Layout() {
  const { request, showAside, toast, closeToast } = useRequestDetails();

  if (!request) {
    return (
      <div className="mx-auto w-full max-w-310 px-4 py-10 md:px-6">
        <EmptyState
          icon={SearchX}
          tone="warn"
          title="لم نجد هذا الطلب"
          text="ربما أُلغي الطلب أو أن الرابط غير صحيح."
          actions={
            <Button as="a" href="/donor/requests" variant="navy" size="sm">
              العودة للطلبات
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-310 px-4 md:px-6">
      <RequestHeader />

      <main className="pt-5.5 pb-10">
        <div className={showAside ? 'grid gap-4.5 lg:grid-cols-[minmax(0,1fr)_320px]' : 'grid'}>
          <div className="min-w-0">
            <RequestMain />
          </div>
          {showAside && <RequestSidebar />}
        </div>
      </main>

      <AcceptSheet />
      <ReportSheet />
      <Toast message={toast} onClose={closeToast} />
    </div>
  );
}

// initialView: before | accepted | loading | closed | declined | error
export default function RequestDetailsPage({ requestId = requests[0].id, initialView = 'before' }) {
  return (
    // key resets all state when the route :id changes
    <RequestDetailsProvider key={requestId} requestId={requestId} initialView={initialView}>
      <Layout />
    </RequestDetailsProvider>
  );
}
