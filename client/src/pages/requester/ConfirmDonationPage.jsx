import { useState } from 'react';
import { Clock } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import Notice from '@/components/ui/Notice';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import SelfConfirmList from './components/SelfConfirmList';
import ShareCard from './components/ShareCard';
import TableSkeleton from '@/components/ui/TableSkeleton';
import HeaderChip from '@/components/ui/HeaderChip';

/* ───────── data (replace with GET /api/requests/:id/pledges and /share) ───────── */
const requests = [
  {
    id: '004205',
    ref: 'BL-2026-004205',
    hospital: 'مستشفى الرحمة العام',
    area: 'العباسية',
    bloodType: 'A+',
    unitsTotal: 2,
    deadline: '21/10/2026',
    trust: 'looks_valid',
    shareUrl: 'bloodlink.app/r/004205',
  },
];

const pledges = [
  {
    id: 'AP-2026-118188',
    donor: { name: 'كريم حسن', initials: 'كح', bloodType: 'A+', gender: 'm' },
    acceptedLabel: 'وافق أمس',
    question: 'هل تبرع كريم؟',
    donorConfirmed: 'donated', // 'donated' | 'no_show' | 'deferred' | null
    requesterConfirmed: 'donated',
  },
  {
    id: 'AP-2026-118215',
    donor: { name: 'نور عادل', initials: 'نع', bloodType: 'A+', gender: 'f' },
    acceptedLabel: 'وافقت اليوم',
    question: 'هل تبرعت نور؟',
    donorConfirmed: null,
    requesterConfirmed: 'no_show',
  },
];

const headerChips = ['بدون QR', 'ورقة تبدو سليمة'];

const views = [
  { value: 'default', label: 'تأكيد' },
  { value: 'loading', label: 'تحميل' },
  { value: 'done', label: 'تم التأكيد' },
  { value: 'expired', label: 'منتهي' },
  { value: 'error', label: 'خطأ' },
];
/* ─────────────────────────────────────────────────────────────────────────────── */

const request = requests[0];
const wrap = 'mx-auto w-full max-w-[1240px] px-4 md:px-6';

export default function ConfirmDonationPage({
  initialView = 'default', // 'default' | 'loading' | 'done' | 'expired' | 'error'
  onSave = () => new Promise((resolve) => setTimeout(resolve, 800)), // POST /api/pledges/:id/self-confirm
  showStateSwitcher = false, // dev only: turn it on to preview every state
}) {
  const [view, setView] = useState(initialView);
  const [values, setValues] = useState(() =>
    Object.fromEntries(pledges.map((p) => [p.id, p.requesterConfirmed])),
  );
  const [declared, setDeclared] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  const crumbs = [
    { label: 'الرئيسية', to: '/' },
    { label: 'طلباتي', to: '/requests' },
    { label: `الطلب ${request.ref}`, to: `/requests/${request.id}` },
    { label: 'تأكيد التبرع' },
  ];
  const backHref = `/requests/${request.id}`;

  const handleChange = (id, value) => {
    setValues((v) => ({ ...v, [id]: value }));
    setErrors((e) => ({ ...e, pledges: { ...e.pledges, [id]: undefined } }));
  };

  const handleSave = async () => {
    const next = { pledges: {}, declaration: undefined };
    pledges.forEach((p) => {
      if (!values[p.id]) next.pledges[p.id] = 'اختر إجابة قبل الحفظ.';
    });
    if (!declared) next.declaration = 'يجب الإقرار بصحة ما سجّلته.';
    setErrors(next);
    if (Object.values(next.pledges).some(Boolean) || next.declaration) return;

    setSaving(true);
    setSaveFailed(false);
    try {
      await onSave(values);
      setView('done');
    } catch {
      setSaveFailed(true);
    } finally {
      setSaving(false);
    }
  };

  const retry = () => {
    // replace with your refetch
    setView('loading');
    setTimeout(() => setView('default'), 900);
  };

  return (
    <>
      <div className={wrap}>
        <Breadcrumb items={crumbs} />
        <PageHeader
          title="تأكيد التبرع · مستشفى غير شريك"
          subtitle={
            <>
              طلب رقم{' '}
              <bdi dir="ltr" className="font-semibold tabular-nums">
                {request.ref}
              </bdi>{' '}
              · {request.hospital} · {request.area}
            </>
          }
          chips={
            <>
              <HeaderChip>{headerChips[0]}</HeaderChip>
              <HeaderChip>{headerChips[1]}</HeaderChip>
            </>
          }
        />
      </div>

      <main className={`${wrap} pt-5 pb-[calc(84px+env(safe-area-inset-bottom))] lg:pb-10`}>
        {showStateSwitcher && (
          <div role="group" aria-label="معاينة الحالات" className="mb-4 flex flex-wrap gap-1.5">
            {views.map((v) => (
              <Button
                key={v.value}
                size="sm"
                variant={view === v.value ? 'secondary' : 'outline'}
                aria-pressed={view === v.value}
                onClick={() => setView(v.value)}
              >
                {v.label}
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-5 *:min-w-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* main column */}
          <div>
            {(view === 'default' || view === 'done') && (
              <>
                <Notice tone="info" title="لا يوجد رمز QR في هذا المستشفى" className="mb-4">
                  <p>
                    أكّد بنفسك من تبرع ومن لم يحضر. يؤكد المتبرع أيضاً من جهته. هذا التأكيد{' '}
                    <b>لا يغيّر علامة الثقة</b> الخاصة بالمتبرع.
                  </p>
                </Notice>

                {view === 'done' && (
                  <Notice tone="ok" live title="شكراً، سجّلنا تأكيدك" className="mb-4">
                    <p>سيُغلق الطلب عندما يؤكد المتبرعون من جهتهم أيضاً.</p>
                  </Notice>
                )}

                {saveFailed && (
                  <Notice tone="err" live title="تعذّر حفظ التأكيد" className="mb-4">
                    <p>حدثت مشكلة في الاتصال. لم يضِع شيء، حاول مرة أخرى.</p>
                  </Notice>
                )}

                <SelfConfirmList
                  pledges={pledges}
                  units={{ pledged: pledges.length, total: request.unitsTotal }}
                  values={values}
                  onChange={handleChange}
                  declared={declared}
                  onDeclaredChange={setDeclared}
                  errors={errors}
                  saving={saving}
                  done={view === 'done'}
                  onSave={handleSave}
                  backHref={backHref}
                />
              </>
            )}

            {view === 'loading' && (
              <section
                aria-busy="true"
                className="rounded-card border-line bg-surface shadow-card hc:border-2 border p-4.5"
              >
                <TableSkeleton lines={[20, 70, 70, 44]} label="جارٍ تحميل المتبرعين…" />
              </section>
            )}

            {view === 'expired' && (
              <section className="rounded-card border-line bg-surface shadow-card hc:border-2 border">
                <EmptyState
                  icon={Clock}
                  tone="warn"
                  title="انتهت مدة هذا الطلب"
                  actions={
                    <>
                      <Button as="a" href={`/requests/new?from=${request.id}`} size="sm">
                        طلب جديد بنفس البيانات
                      </Button>
                      <Button as="a" href="/" variant="outline" size="sm">
                        الرئيسية
                      </Button>
                    </>
                  }
                >
                  انتهى الموعد النهائي (<bdi dir="ltr">{request.deadline}</bdi>) قبل اكتمال الوحدات، فأغلقناه
                  تلقائياً. إذا كان المريض ما زال يحتاج دماً، أنشئ طلباً جديداً بورقة حديثة.
                </EmptyState>
              </section>
            )}

            {view === 'error' && (
              <section className="rounded-card border-line bg-surface shadow-card hc:border-2 border">
                <ErrorState onRetry={retry} />
              </section>
            )}
          </div>

          {/* side column: drops below the main column under lg */}
          <aside className="space-y-4.5">
            <ShareCard request={request} disabled={view === 'expired'} />
            <Notice tone="gold" small>
              <p>التبرع مجاني. إن طلب أحد مالاً، أبلغنا من زر الإبلاغ في صفحة الطلب.</p>
            </Notice>
          </aside>
        </div>
      </main>
    </>
  );
}
