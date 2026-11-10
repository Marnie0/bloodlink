import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Notice from '@/components/ui/Notice';
import { useRequestProgress } from './useRequestProgress';
import ProgressHeader from './components/ProgressHeader';
import ProgressSummary from './components/ProgressSummary';
import DonorPledgeList from './components/DonorPledgeList';
import RequestTimeline from './components/RequestTimeline';
import { ProgressError, ProgressSkeleton } from './components/ProgressStates';

function RequestProgressView({ id }) {
  const { progress, error, retry } = useRequestProgress(id);

  let content;
  if (progress) {
    const pledged = progress.pledges.length; // بيتحسب، مش متخزّن
    content = (
      <>
        <ProgressHeader progress={progress} />
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <ProgressSummary
              pledged={pledged}
              needed={progress.unitsNeeded}
              wave={progress.wave}
              trust={progress.trust}
            />
            <DonorPledgeList
              requestId={progress.id}
              pledges={progress.pledges}
              needed={progress.unitsNeeded}
            />
            <Link
              to={`/requests/${progress.id}/confirm`}
              className="border-line bg-surface hover:border-ink-3 rounded-field mt-4 inline-block border px-4 py-2.5 font-semibold"
            >
              مشاركة على واتساب
            </Link>
          </div>
          <aside className="grid gap-4">
            <RequestTimeline events={progress.timeline} pledged={pledged} />
            <Notice tone="gold">
              التقوا داخل {progress.hospital.name} فقط. لا أموال، والقرار الطبي للمستشفى.
            </Notice>
          </aside>
        </div>
      </>
    );
  } else if (error) {
    content = <ProgressError error={error} onRetry={retry} />;
  } else {
    content = <ProgressSkeleton />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10">
      <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: `الطلب ${id}` }]} />
      {content}
    </div>
  );
}

// key={id}: لما تنتقل من طلب لطلب، الصفحة تبدأ من الصفر
// بدل ما تعرض بيانات الطلب القديم لحد ما الجديد يحمّل.
export default function RequestProgressPage() {
  const { id } = useParams();
  return <RequestProgressView key={id} id={id} />;
}
