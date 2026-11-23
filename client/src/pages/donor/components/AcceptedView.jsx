import Notice from '@/components/ui/Notice';
import Ref from '@/components/ui/Ref';
import QrTicket from './QrTicket';
import NoQrCard from './NoQrCard';
import ArrivalSteps from './ArrivalSteps';

export default function AcceptedView({ request, pledge, guide, onCancel, onSelfConfirm }) {
  const partner = request.hospital.partner;
  const { location, name, address } = request.hospital;
  const destination = location ? `${location.lat},${location.lng}` : `${name} ${address}`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

  return (
    <div className="grid gap-[18px]">
      <Notice tone="ok" live title={pledge.notice.title}>
        {pledge.notice.text} {partner && <Ref>{pledge.id}</Ref>}
      </Notice>

      <div className="grid gap-[18px] md:grid-cols-[300px_minmax(0,1fr)]">
        {partner ? (
          <QrTicket pledge={pledge} hospitalName={request.hospital.name} />
        ) : (
          <NoQrCard
            hospitalName={request.hospital.name}
            canConfirm={pledge.canSelfConfirm}
            onConfirm={onSelfConfirm}
          />
        )}
        <ArrivalSteps
          guide={guide}
          summary={pledge.summary}
          directionsLabel={pledge.directionsLabel}
          directionsHref={directionsHref}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
