import { Users } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import DeclarationCheckbox from '@/components/ui/DeclarationCheckbox';
import SelfConfirmCard from './SelfConfirmCard';

export default function SelfConfirmList({
  pledges,
  units,
  values,
  onChange,
  declared,
  onDeclaredChange,
  errors = {},
  saving = false,
  done = false,
  onSave,
  backHref = '#',
}) {
  const aside = (
    <span className="text-tiny text-ink-3">
      <bdi>{units.pledged}</bdi> من <bdi>{units.total}</bdi> وحدة
    </span>
  );

  // empty state
  if (!pledges.length) {
    return (
      <Panel id="pledges-title" title="المتبرعون الذين وافقوا" aside={aside}>
        <EmptyState
          icon={Users}
          title="لم يوافق أحد بعد"
          actions={
            <Button as="a" href={backHref} variant="outline" size="sm">
              رجوع للطلب
            </Button>
          }
        >
          عادةً يوافق أول متبرع خلال ساعة. ستصلك رسالة فور الموافقة.
        </EmptyState>
      </Panel>
    );
  }

  return (
    <Panel id="pledges-title" title="المتبرعون الذين وافقوا" aside={aside}>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <ul className="space-y-3">
          {pledges.map((p) => (
            <li key={p.id}>
              <SelfConfirmCard
                pledge={p}
                value={values[p.id]}
                onChange={onChange}
                disabled={done || saving}
                error={errors.pledges?.[p.id]}
              />
            </li>
          ))}
        </ul>

        <div className="mt-3">
          <DeclarationCheckbox
            checked={declared}
            onChange={onDeclaredChange}
            disabled={done || saving}
            required
            error={errors.declaration}
          >
            أقرّ بأن ما سجّلته صحيح.
          </DeclarationCheckbox>
        </div>

        <div className="xs:flex-row xs:flex-wrap mt-4 flex flex-col gap-2">
          {!done && (
            <Button type="submit" loading={saving} className="xs:w-auto w-full">
              حفظ التأكيد
            </Button>
          )}
          <Button as="a" href={backHref} variant="outline" className="xs:w-auto w-full">
            رجوع للطلب
          </Button>
        </div>
      </form>
    </Panel>
  );
}
