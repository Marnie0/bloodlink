import Notice from '@/components/ui/Notice';
import Ref from '@/components/ui/Ref';
import { useRequestDetails } from '../RequestDetailsContext';
import QrTicket from './QrTicket';
import NoQrCard from './NoQrCard';
import ArrivalSteps from './ArrivalSteps';

export default function AcceptedView() {
  const { request, pledge, guide, cancelPledge, selfConfirm } = useRequestDetails();
  const partner = request.hospital.partner;

  return (
    <div className="grid gap-4.5">
      <Notice tone="ok" live title={pledge.notice.title}>
        {pledge.notice.text} {partner && <Ref>{pledge.id}</Ref>}
      </Notice>

      <div className="grid gap-4.5 md:grid-cols-[300px_minmax(0,1fr)]">
        {partner ? (
          <QrTicket pledge={pledge} hospitalName={request.hospital.name} />
        ) : (
          <NoQrCard
            hospitalName={request.hospital.name}
            canConfirm={pledge.canSelfConfirm}
            onConfirm={selfConfirm}
          />
        )}
        <ArrivalSteps
          guide={guide}
          summary={pledge.summary}
          directionsLabel={pledge.directionsLabel}
          onCancel={cancelPledge}
        />
      </div>
    </div>
  );
}
