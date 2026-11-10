import { Download, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import HeaderChip from '@/components/ui/HeaderChip';
import HistoryTable from './components/HistoryTable';
import KpiRow from './components/KpiRow';
import Ltr from '@/components/ui/Ltr';
import Notice from '@/components/ui/Notice';
import PageHeader from '@/components/ui/PageHeader';
import Panel from '@/components/ui/Panel';
import SideMenu from './components/SideMenu';
import TableSkeleton from '@/components/ui/TableSkeleton';
import { useDonor } from './DonorContext';
import { formatDate } from './donorFormat';
import { buttonClass } from './donorStyles';

// بينزّل السجل كملف CSV (بيتعمل في المتصفح، من غير backend)
function downloadHistoryCsv(donations) {
  const header = 'date,hospital,request,confirmedBy,outcome';
  const rows = donations.map((d) =>
    [d.date, d.hospital.name, d.requestId, d.confirmedBy, d.outcome].join(','),
  );
  const csvText = '\uFEFF' + [header, ...rows].join('\n'); // \uFEFF عشان الإكسل يفهم العربي
  const fileUrl = URL.createObjectURL(new Blob([csvText], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = 'donation-history.csv';
  link.click();
  URL.revokeObjectURL(fileUrl);
}

export default function DonationHistoryPage() {
  const { donor, allRequestsCount, donations, historyLoading, historyError, reloadHistory } = useDonor();

  const hasDonations = !historyError && !historyLoading && donations.length > 0;
  const isResting = donor !== null && new Date(donor.eligibleFrom) > new Date();

  const hospitalConfirmedCount = donations.filter(
    (donation) => donation.confirmedBy === 'hospital_qr',
  ).length;

  const selfConfirmedCount = donations.filter((donation) => donation.confirmedBy === 'self_confirmed').length;

  const donatedDates = donations
    .filter((donation) => donation.outcome === 'donated')
    .map((donation) => donation.date)
    .sort();

  const lastDonationText =
    donatedDates.length > 0 ? formatDate(donatedDates[donatedDates.length - 1]).slice(0, 5) : '—';

  // إيه اللي يتعرض جوه صندوق التبرعات؟ واحد بس من: خطأ / تحميل / فاضي / الجدول
  let boxContent;
  if (historyError) {
    boxContent = (
      <ErrorState title="تعذّر تحميل السجل" onRetry={reloadHistory}>
        حدثت مشكلة في الاتصال. لم يضِع شيء، حاول مرة أخرى.
      </ErrorState>
    );
  } else if (historyLoading) {
    boxContent = <TableSkeleton label="جارٍ تحميل السجل…" />;
  } else if (donations.length === 0) {
    boxContent = (
      <EmptyState
        icon={Heart}
        title="لا توجد تبرعات بعد"
        actions={
          <Link to="/donor/requests" className={buttonClass('primary', 'sm')}>
            عرض الطلبات القريبة
          </Link>
        }
      >
        عندما تتبرع لأول مرة سيظهر التبرع هنا، مع طريقة تأكيده.
      </EmptyState>
    );
  } else {
    boxContent = <HistoryTable donations={donations} />;
  }

  return (
    <div>
      {/* ===== فوق: مسار الصفحة + الشريط الكحلي ===== */}
      <div className="mx-auto max-w-310 px-4 md:px-6">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', to: '/' },
            { label: 'حسابي', to: '/donor/requests' },
            { label: 'سجل التبرعات' },
          ]}
        />
        <PageHeader
          title="سجل تبرعاتي"
          subtitle="كل تبرع سجّلته، وكيف تأكّد. شكراً لك."
          chips={
            donor && (
              <HeaderChip>
                رقم المتبرع <Ltr bold>{donor.id}</Ltr>
              </HeaderChip>
            )
          }
        />
      </div>

      {/* ===== تحت: العمود الجانبي + المحتوى ===== */}
      <div className="mx-auto max-w-310 px-4 pt-[22px] pb-10 md:px-6">
        <div className="grid items-start gap-5 *:min-w-0 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* العمود الجانبي: قايمة حسابي بس */}
          <div className="space-y-[18px]">
            <SideMenu nearbyCount={allRequestsCount} />
          </div>

          {/* المحتوى */}
          <div>
            {hasDonations && isResting && (
              <Notice tone="warn" title="فترة راحة بعد آخر تبرع">
                لن تصلك طلبات جديدة حتى <Ltr>{formatDate(donor.eligibleFrom)}</Ltr> تقريباً. هذه إرشادات عامة،
                والمستشفى هو من يقرر إن كنت مؤهلاً.
              </Notice>
            )}

            {hasDonations && (
              <KpiRow
                items={[
                  { value: donations.length, label: 'تبرعات' },
                  {
                    value: hospitalConfirmedCount,
                    label: 'أكّدها مستشفى شريك',
                    tone: 'ok',
                  },
                  { value: selfConfirmedCount, label: 'تأكيد ذاتي' },
                  { value: lastDonationText, label: 'آخر تبرع' },
                ]}
              />
            )}

            <Panel
              title="التبرعات"
              meta={
                hasDonations && (
                  <button
                    type="button"
                    className={buttonClass('line', 'sm')}
                    onClick={() => downloadHistoryCsv(donations)}
                  >
                    <Download className="size-4" aria-hidden="true" />
                    تنزيل
                  </button>
                )
              }
            >
              {boxContent}
            </Panel>

            <p className="text-tiny text-ink-3 mt-2.5 mb-0">
              التأكيد الذاتي في مستشفى غير شريك لا يغيّر علامة الثقة الخاصة بك.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
