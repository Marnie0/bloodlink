import { Check } from 'lucide-react';

// current = رقم الخطوة الحالية (يبدأ من 0)
export default function Stepper({ steps, current }) {
  return (
    <nav
      aria-label="خطوات تقديم الطلب"
      className="bg-surface border-line rounded-card shadow-card mt-5 border p-2"
    >
      <ol className="grid grid-cols-4 gap-1">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          let circle = 'bg-line-2 text-ink-2';
          if (done) circle = 'bg-ok text-white';
          if (active) circle = 'bg-white/20 text-white';
          return (
            <li
              key={step.key}
              aria-current={active ? 'step' : undefined}
              className={`flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-[0.82rem] font-semibold ${
                active ? 'bg-navy hc:border text-white' : 'text-ink-2'
              }`}
            >
              <span
                aria-hidden="true"
                className={`grid size-7 shrink-0 place-items-center rounded-full text-[0.8rem] font-bold tabular-nums ${circle}`}
              >
                {done ? <Check className="size-4" /> : index + 1}
              </span>
              <span className={active ? 'inline' : 'hidden sm:inline'}>{step.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
