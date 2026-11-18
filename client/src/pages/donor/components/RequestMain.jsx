import Button from '@/components/ui/Button';
import RequestSkeleton from '@/components/ui/TableSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import RequestDetails from './RequestDetails';
import { useRequestDetails } from '../RequestDetailsContext';
import AcceptedView from './AcceptedView';

export default function RequestMain() {
  const { view, emptyState, retry } = useRequestDetails();

  if (view === 'before') return <RequestDetails />;
  if (view === 'accepted') return <AcceptedView />;
  if (view === 'loading') return <RequestSkeleton />;

  if (view === 'error') {
    return (
      <ErrorState
        title="تعذّر تحميل الطلب"
        text="ربما أُلغي الطلب أو انقطع الاتصال. جرّب مرة أخرى."
        onRetry={retry}
        backHref="/donor"
        backLabel="العودة للطلبات"
      />
    );
  }

  if (emptyState) {
    return (
      <EmptyState
        icon={emptyState.icon}
        title={emptyState.title}
        text={emptyState.text}
        actions={
          <Button as="a" href="/donor" variant="navy" size="sm">
            طلبات أخرى قريبة
          </Button>
        }
      />
    );
  }

  return null;
}
