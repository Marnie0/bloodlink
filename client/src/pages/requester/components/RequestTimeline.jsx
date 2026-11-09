import { formatDateTime } from '../requesterFormat';

const EVENT_LABELS = {
  submitted: 'أُرسل الطلب',
  paper_confirmed: 'أكّد المستشفى الورقة',
  wave_sent: 'أُرسل للمتبرعين القريبين',
};

export default function RequestTimeline({ events, pledged }) {
  return (
    <section className="bg-surface border-line rounded-card shadow-card border">
      <h2 className="border-line-2 flex items-center gap-2.5 border-b px-4.5 py-3.5 text-[1.05rem] font-extrabold">
        <span aria-hidden="true" className="bg-gold inline-block h-4.5 w-1 rounded" />
        ما حدث حتى الآن
      </h2>
      <ol className="p-4.5">
        {events.map((item) => (
          <li key={item.event} className="grid grid-cols-[36px_1fr] gap-3 pb-4">
            <span
              aria-hidden="true"
              className="bg-teal-lt text-teal-ink grid size-9 place-items-center rounded-xl font-bold"
            >
              ✓
            </span>
            <div>
              <b className="mt-1.5 block text-[0.92rem]">{EVENT_LABELS[item.event] ?? item.event}</b>
              <p className="text-ink-2 text-[0.82rem]">{formatDateTime(item.at)}</p>
            </div>
          </li>
        ))}
        {pledged > 0 && (
          <li className="grid grid-cols-[36px_1fr] gap-3">
            <span
              aria-hidden="true"
              className="bg-teal-lt text-teal-ink grid size-9 place-items-center rounded-xl font-bold tabular-nums"
            >
              {pledged}
            </span>
            <b className="mt-1.5 block text-[0.92rem]">
              {pledged === 1 ? 'وافق متبرع واحد' : `وافق ${pledged} من المتبرعين`}
            </b>
          </li>
        )}
      </ol>
    </section>
  );
}
