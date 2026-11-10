import { FileCheck, ShieldCheck } from 'lucide-react';

// نصوص العلامة ثابتة (FR-10)
const LEVELS = {
  verified: { Icon: ShieldCheck, label: 'موثّق', className: 'bg-ok-lt text-ok' },
  looks_valid: { Icon: FileCheck, label: 'ورقة تبدو سليمة', className: 'bg-warn-lt text-warn' },
};

// <TrustBadge level="verified" />
export default function TrustBadge({ level }) {
  const { Icon, label, className } = LEVELS[level];
  return (
    <span
      className={`hc:border inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.76rem] font-semibold whitespace-nowrap ${className}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
