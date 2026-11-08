import { tagClass } from '../donorStyles';
import { TRUST_LABELS } from '../donorConstants';
import { Clock, FileCheck, ShieldCheck, TriangleAlert } from 'lucide-react';

// علامة الثقة: موثّق / ورقة تبدو سليمة / بحاجة لمراجعة / بانتظار تأكيد المستشفى.
// النص بييجي من TRUST_LABELS ومينفعش نغيره (FR-10). short = النسخة القصيرة للجدول.
const badgeStyles = {
  verified: { color: 'ok', icon: ShieldCheck },
  looks_valid: { color: 'warn', icon: FileCheck },
  needs_review: { color: 'grey', icon: TriangleAlert },
  pending: { color: 'info', icon: Clock },
};

export default function TrustBadge({ level, short = false }) {
  const style = badgeStyles[level];
  const label = TRUST_LABELS[level];
  return (
    <span className={tagClass(style.color)}>
      <style.icon className="size-3.5" aria-hidden="true" />
      {short ? label.short : label.full}
    </span>
  );
}
