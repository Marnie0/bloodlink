import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

export default function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="border-gold text-crimson grid size-10 place-items-center rounded-full border-2 sm:size-12">
        <HeartPulse className="size-5 sm:size-6" />
      </span>
      <span>
        <span className="font-head text-head block text-xl font-extrabold">رابط الحياة</span>
        <span className="text-tiny text-ink-2 sm:text-small block">خدمات رقمية لربط المرضى بمتبرعي الدم</span>
        <span className="text-tiny text-gold-ink sm:text-small xs:block hidden">
          BLOODLINK · DIGITAL SERVICES
        </span>
      </span>
    </Link>
  );
}
