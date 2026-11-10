import { Pause, Search } from 'lucide-react';
import { useState } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import DonorIdCard from './components/DonorIdCard';
import AvailabilitySwitch from './components/AvailabilitySwitch';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import FilterChips from './components/FilterChips';
import HeaderChip from '@/components/ui/HeaderChip';
import LiveDot from '@/components/ui/LiveDot';
import Ltr from '@/components/ui/Ltr';
import Notice from '@/components/ui/Notice';
import PageHeader from '@/components/ui/PageHeader';
import Pager from '@/components/ui/Pager';
import Panel from '@/components/ui/Panel';
import RequestsTable from './components/RequestsTable';
import SideMenu from './components/SideMenu';
import TableSkeleton from '@/components/ui/TableSkeleton';
import { useDonor } from './DonorContext';
import { CAN_DONATE_TO, FIRST_WAVE_KM, SECOND_WAVE_KM } from './donorConstants';
import { formatTime } from './donorFormat';
import { buttonClass, tagClass } from './donorStyles';

const PAGE_SIZE = 10;

export default function DonorRequestsPage() {
  const {
    donor,
    toggleAvailability,
    requests,
    selectedFilter,
    changeFilter,
    allRequestsCount,
    requestsLoading,
    requestsError,
    lastUpdate,
    reloadRequests,
  } = useDonor();

  const [currentPage, setCurrentPage] = useState(1);

  const isPaused = donor !== null && donor.available === false;

  function handleFilterChange(filterName) {
    changeFilter(filterName);
    setCurrentPage(1);
  }

  let boxContent;
  if (isPaused) {
    boxContent = (
      <EmptyState
        icon={Pause}
        tone="warn"
        title="الطلبات مخفية أثناء الإيقاف المؤقت"
        actions={
          <button
            type="button"
            className={buttonClass('primary', 'sm')}
            onClick={() => toggleAvailability(true)}
          >
            تفعيل استقبال الطلبات
          </button>
        }
      >
        فعّل استقبال الطلبات لتظهر لك الطلبات المتوافقة القريبة.
      </EmptyState>
    );
  } else if (requestsError) {
    boxContent = (
      <ErrorState title="تعذّر تحميل الطلبات" onRetry={reloadRequests}>
        حدثت مشكلة في الاتصال. لم يضِع شيء، والإشعارات ما زالت تعمل.
      </ErrorState>
    );
  } else if (requestsLoading) {
    boxContent = <TableSkeleton label="جارٍ تحميل الطلبات…" />;
  } else if (requests.length === 0) {
    boxContent = (
      <EmptyState
        icon={Search}
        title="لا توجد طلبات تناسب فصيلتك قريباً منك الآن"
        actions={
          <>
            <button type="button" className={buttonClass('line', 'sm')}>
              تعديل المنطقة
            </button>
            <button type="button" className={buttonClass('ghost', 'sm')}>
              إعدادات الإشعارات
            </button>
          </>
        }
      >
        سنرسل لك إشعاراً فور ظهور طلب متوافق ضمن <Ltr>{FIRST_WAVE_KM}</Ltr> كم، ثم <Ltr>{SECOND_WAVE_KM}</Ltr>{' '}
        كم. لا تحتاج لفتح الصفحة.
      </EmptyState>
    );
  } else {
    // بنعرض طلبات الصفحة الحالية بس
    const requestsOnThisPage = requests.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    boxContent = (
      <>
        <RequestsTable requests={requestsOnThisPage} />
        <Pager
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          totalCount={requests.length}
          onPageChange={setCurrentPage}
        />
      </>
    );
  }

  const showTable = !isPaused && !requestsError && !requestsLoading && requests.length > 0;
  const showFilters = !isPaused && !requestsError && !requestsLoading;

  return (
    <div>
      <div className="mx-auto max-w-310 px-4 md:px-6">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', to: '/' },
            { label: 'حسابي', to: '/donor/requests' },
            { label: 'الطلبات القريبة' },
          ]}
        />
        <PageHeader
          title="طلبات قريبة تناسب فصيلتك"
          subtitle={
            <>
              طلبات نشطة في مستشفيات ضمن <Ltr>{FIRST_WAVE_KM}</Ltr> كم من منطقتك
              {donor && ` (${donor.area.name})`}، ثم <Ltr>{SECOND_WAVE_KM}</Ltr> كم إذا لم يكفِ.
            </>
          }
          chips={
            donor && (
              <>
                <HeaderChip>
                  رقم المتبرع <Ltr bold>{donor.id}</Ltr>
                </HeaderChip>
                {isPaused ? (
                  <HeaderChip>⏸ متوقف مؤقتاً</HeaderChip>
                ) : (
                  <HeaderChip>
                    <LiveDot /> متاح للطلبات
                  </HeaderChip>
                )}
              </>
            )
          }
        />
      </div>

      <div className="mx-auto max-w-310 px-4 pt-[22px] pb-10 md:px-6">
        <div className="grid items-start gap-5 *:min-w-0 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="space-y-[18px]">
            {donor && <DonorIdCard donor={donor} />}
            {donor && (
              <AvailabilitySwitch
                isAvailable={donor.available}
                eligibleFrom={donor.eligibleFrom}
                onToggle={toggleAvailability}
              />
            )}
            <SideMenu nearbyCount={allRequestsCount} />
          </div>

          <div>
            {donor && !isPaused && (
              <Notice tone="info" title="من يمكنه الاستفادة من تبرعك">
                فصيلة <Ltr>{donor.bloodType}</Ltr> تناسب المرضى من فصائل{' '}
                <Ltr>{CAN_DONATE_TO[donor.bloodType].join(' · ')}</Ltr>. نعرض لك هذه الطلبات فقط.
              </Notice>
            )}
            {isPaused && (
              <Notice tone="warn" title="أنت متوقف مؤقتاً عن استقبال الطلبات">
                لن تصلك إشعارات ولن تظهر لك طلبات جديدة. يمكنك التفعيل في أي وقت من المفتاح بجانب بطاقتك.
              </Notice>
            )}

            <Panel
              title={
                <>
                  الطلبات المتاحة
                  {showTable && (
                    <span className={tagClass('grey')}>
                      <Ltr>{requests.length}</Ltr>
                    </span>
                  )}
                </>
              }
              meta={
                showFilters &&
                lastUpdate && (
                  <span className="text-tiny text-ink-3">آخر تحديث: {formatTime(lastUpdate)}</span>
                )
              }
            >
              {showFilters && (
                <FilterChips
                  selectedFilter={selectedFilter}
                  allCount={allRequestsCount}
                  onChange={handleFilterChange}
                />
              )}
              {boxContent}
            </Panel>

            <p className="text-tiny text-ink-3 mt-2.5 mb-0">
              لن نشارك رقم هاتفك مع صاحب الطلب إلا بعد موافقتك.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
