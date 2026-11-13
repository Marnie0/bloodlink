import { Building2, ShieldCheck, UserCheck } from 'lucide-react';
import Ltr from '@/components/ui/Ltr';
import { HOSPITAL_INFO } from '../hospitalData';

export default function StaffBar({ hospital = HOSPITAL_INFO }) {
  return (
    <div className="border-line bg-surface hc:border-b-2 border-b text-[0.8rem]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-6">
        {/* اسم المستشفى وكوده */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-teal-lt text-teal-ink grid size-7 place-items-center rounded-lg">
            <Building2 className="size-4" aria-hidden="true" />
          </span>
          <strong className="font-head text-head font-bold">{hospital.name}</strong>
          <span className="border-line bg-surface-2 text-ink-2 rounded-md border px-2 py-0.5 text-[0.72rem]">
            <Ltr bold>{hospital.id}</Ltr>
          </span>
          {hospital.active && (
            <span className="bg-ok-lt text-ok inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.72rem] font-semibold">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              مستشفى شريك مفعّل
            </span>
          )}
        </div>

        {/* بيانات الموظف المناوب */}
        <div className="text-ink-2 flex items-center gap-2 text-[0.76rem]">
          <UserCheck className="text-teal-ink size-4 shrink-0" aria-hidden="true" />
          <span>
            <b className="text-ink font-semibold">{hospital.staff.name}</b> · {hospital.staff.role}
          </span>
        </div>
      </div>
    </div>
  );
}