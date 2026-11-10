import { formatDate } from '../donorFormat';
import BloodTypeChip from '@/components/ui/BloodTypeChip';
import Ltr from '@/components/ui/Ltr';
import TrustBadge from '@/components/ui/TrustBadge';

export default function DonorIdCard({ donor }) {
  const facts = [
    { label: 'الشهادة', value: donor.certificateHospital },
    { label: 'التبرعات', value: <Ltr>{donor.donations}</Ltr> },
    { label: 'آخر تبرع', value: <Ltr>{formatDate(donor.lastDonation)}</Ltr> },
    { label: 'مؤهل من', value: <Ltr>{formatDate(donor.eligibleFrom)}</Ltr> }, // فترة الراحة (إرشاد بس، المستشفى هي اللي تقرر)
  ];

  return (
    <div className="rounded-card from-navy via-navy-2 to-teal shadow-raised relative overflow-hidden bg-linear-135 via-60% p-5 text-white">
      {/* دايرة الزينة اللي في الركن (بتختفي في التباين العالي) */}
      <div
        aria-hidden="true"
        className="hc:hidden absolute -end-10 -top-10 size-40 rounded-full border-[22px] border-white/[.06]"
      />

      <div className="relative flex items-center gap-3">
        <BloodTypeChip type={donor.bloodType} size="lg" onCard />
        <div>
          <h2 className="font-head text-[1.02rem] leading-[1.4] font-bold text-white">{donor.name}</h2>
          <div className="text-[0.72rem] opacity-85">
            <Ltr bold>{donor.id}</Ltr>
          </div>
          <div className="mt-1">
            {donor.trust === 'verified' ? (
              <span className="text-ok inline-flex items-center gap-[5px] rounded-full bg-white px-2.5 py-0.5 text-[0.74rem] font-semibold whitespace-nowrap">
                ✓ متبرع موثّق
              </span>
            ) : (
              <TrustBadge level={donor.trust} />
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-3.5 grid grid-cols-2 gap-2">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-xl bg-white/10 px-2.5 py-2 text-[0.72rem] opacity-95">
            {fact.label}
            <b className="block text-[0.88rem]">{fact.value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
