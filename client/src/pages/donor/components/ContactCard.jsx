import { Phone } from 'lucide-react';
import Panel from '@/components/ui/Panel';

export default function ContactCard({ person, note }) {
  return (
    <Panel as="h3" title="التواصل">
      <div className="rounded-tile bg-surface-2 flex items-center gap-3 p-3">
        <span
          aria-hidden
          className="bg-navy grid size-10 shrink-0 place-items-center rounded-full text-[0.8rem] font-bold text-white"
        >
          {person.initials}
        </span>
        <div className="min-w-0">
          <b className="font-head text-head block truncate">{person.name}</b>
          <span className="text-tiny text-ink-3">{person.roleLabel}</span>
        </div>
        <a
          href={person.phoneHref}
          aria-label={`اتصال بـ ${person.name}`}
          className="border-line bg-surface text-teal-ink hover:bg-teal-lt ms-auto grid size-11 shrink-0 place-items-center rounded-full border"
        >
          <Phone aria-hidden className="size-4.5" />
        </a>
      </div>
      <p className="text-tiny text-ink-3 mt-2.5">{note}</p>
    </Panel>
  );
}
