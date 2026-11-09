import TrustBadge from './TrustBadge';

export default function ProgressSummary({ pledged, needed, wave, trust }) {
  const filled = pledged >= needed;
  const percent = Math.min(100, (pledged / needed) * 100);
  const sent = `أرسلنا الطلب إلى ${wave.notified} متبرعًا ضمن ${wave.radiusKm} كم.`;

  let note;
  if (filled) {
    note = 'لن نرسل الطلب لمتبرعين آخرين. يمكنك إغلاقه بعد التبرع.';
  } else if (pledged === 0) {
    note = `${sent} سيظهر هنا كل من يوافق، مباشرة.`;
  } else {
    note = `${sent} سنوسّع البحث إلى ${wave.nextRadiusKm} كم إن لم يكتمل.`;
  }

  return (
    <section className="bg-surface border-line rounded-card shadow-card border p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* aria-live: قارئ الشاشة بيعلن العدد الجديد لما متبرع يوافق */}
        <h2 aria-live="polite" className="text-[1.1rem] font-extrabold">
          {filled ? `اكتملت الوحدات ${needed} من ${needed}` : `${pledged} من ${needed} وحدات لها متبرع`}
        </h2>
        <TrustBadge level={trust} />
      </div>
      <div
        role="progressbar"
        aria-label="الوحدات التي لها متبرع"
        aria-valuemin={0}
        aria-valuemax={needed}
        aria-valuenow={pledged}
        className="bg-line-2 hc:border mt-3 h-3 overflow-hidden rounded-full"
      >
        <div className="bg-urgent h-full rounded-full" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-tiny text-ink-2 mt-2">{note}</p>
    </section>
  );
}
