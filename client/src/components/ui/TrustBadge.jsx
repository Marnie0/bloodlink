// Stub from feat/frontend-setup. R3 replaces this whole file on feat/ui-basics.
// Keep the same file name, the same export and the same props (see the DevKit).
import { TRUST_LEVELS } from '@/lib/constants';

// Props: level, short = false, className
export default function TrustBadge({ level, short = false }) {
  const label = TRUST_LEVELS.label[level];
  return <span>{label ? (short ? label.short : label.full) : level}</span>;
}
