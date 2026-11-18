import { useParams } from 'react-router-dom';
import RequestDetailsPage from './RequestDetailsPage';

export default function RequestDetailsRoute() {
  const { id } = useParams();
  return <RequestDetailsPage requestId={id} />;
}
