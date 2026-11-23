import { Navigation } from 'lucide-react';
import Button from '@/components/ui/Button';
import Panel from '@/components/ui/Panel';
import KeyValueTable from '@/components/ui/KeyValueTable';


export default function ArrivalSteps({ guide, summary = [], directionsLabel, directionsHref, onCancel }) {

  return (
    <Panel title={guide.heading} className="min-w-0">
      <ol className="m-0 list-none p-0">
        {guide.steps.map((s, i) => (
          <li
            key={s.title}
            className="before:bg-line relative grid grid-cols-[36px_1fr] gap-3 pb-4 before:absolute before:start-[17px] before:top-9 before:bottom-0 before:w-0.5 last:pb-0 last:before:hidden"
          >
            <span className="bg-teal-lt font-head text-teal-ink grid size-9 place-items-center rounded-xl text-[0.9rem] font-bold">
              {i + 1}
            </span>
            <div>
              <b className="font-head text-head mt-1.5 mb-0.5 block text-[0.92rem] font-semibold">
                {s.title}
              </b>
              <p className="text-ink-2 m-0 text-[0.82rem] leading-relaxed">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      {summary.length > 0 && <KeyValueTable rows={summary} className="mt-4" />}

      <div className="mt-4 flex flex-wrap items-center gap-2">

        <Button as="a" href={directionsHref} target="_blank" rel="noopener noreferrer" icon={Navigation}>
          {directionsLabel}
        </Button>

        <Button variant="link" size="sm" onClick={onCancel}>
          إلغاء الموافقة
        </Button>
      </div>
    </Panel>
  );
}
