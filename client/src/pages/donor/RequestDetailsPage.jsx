
import { useCallback, useState } from 'react';
import { Banknote, Building2, Check, Heart, SearchX, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import Ref from '@/components/ui/Ref';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import RequestSkeleton from '@/components/ui/TableSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import RequestsContext, { useRequestsData } from './RequestsContext';
import RequestDetails from './components/RequestDetails';
import RequestSidebar from './components/RequestSidebar';
import ReportSheet from './components/ReportSheet';
import AcceptedView from './components/AcceptedView';
import AcceptSheet from './components/AcceptSheet';
import { useParams } from 'react-router-dom';

/* ---------------- constants (not from the API) ---------------- */
const arrivalGuides = [
  {
    partner: true,
    heading: 'عند وصولك إلى المستشفى',
    steps: [
      { title: 'ادخل من البوابة رقم ٢', text: 'شارع مصطفى النحاس، أمام موقف السيارات.' },
      { title: 'بنك الدم · المبنى ب · الدور الأرضي', text: 'اتبع اللافتات الحمراء.' },
      { title: 'اعرض رمز QR وبطاقة الرقم القومي', text: 'يمسح الموظف الرمز من بوابة المستشفى ويسجّل وصولك.' },
      {
        title: 'الفريق الطبي يفحصك ويقرر',
        text: 'قد يُؤجَّل التبرع لأسباب طبية، وهذا طبيعي ولن يؤثر على حسابك.',
      },
    ],
  },
  {
    partner: false,
    heading: 'الخطوات',
    steps: [
      { title: 'اتفقا على موعد داخل المستشفى', text: 'تواصل مع صاحب الطلب من الرقم الظاهر بجانبك.' },
      { title: 'اذهب إلى بنك الدم في مستشفى الرحمة العام', text: 'المستشفى يفحصك ويقرر طبياً.' },
      {
        title: 'بعد التبرع اضغط «تبرعتُ بالفعل»',
        text: 'ثم يؤكد صاحب الطلب، ويُسجَّل التبرع «بتأكيد ذاتي».',
      },
    ],
  },
];

const notices = [
  {
    id: 'before-accept',
    tone: 'warn',
    title: 'قبل أن توافق',
    text: 'اللقاء داخل المستشفى فقط. لا تدفع ولا تقبل أي أموال. القرار النهائي بشأن تبرعك يعود للفريق الطبي.',
  },
  {
    id: 'free',
    tone: 'err',
    title: 'التبرع مجاني تماماً',
    text: 'إذا طلب منك أحد مالاً أو عرضه عليك، أبلغنا فوراً.',
  },
];

const sheetChecks = [
  { icon: Building2, text: 'سألتقي صاحب الطلب داخل المستشفى فقط' },
  { icon: Banknote, text: 'لن أدفع ولن أقبل أي أموال' },
  { icon: ShieldCheck, text: 'الفريق الطبي في المستشفى هو من يقرر' },
];

const reportReasons = [
  { id: 'misleading', label: 'معلومات الطلب تبدو مضلّلة' },
  { id: 'money', label: 'طلب أو عرض مقابل مادي' },
  { id: 'abuse', label: 'سلوك مسيء من صاحب الطلب' },
  { id: 'duplicate', label: 'هذا الطلب مكرر' },
  { id: 'other', label: 'سبب آخر' },
];

const breadcrumbs = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الطلبات القريبة', href: '/donor/requests' },
];

const trustChips = [
  { level: 'verified', label: '✓ طلب موثّق' },
  { level: 'looks_valid', label: '✦ ورقة تبدو سليمة' },
];

const statusChips = [
  { views: ['before'], label: 'الحالة: بانتظار ردّك' },
  { views: ['accepted'], label: 'الحالة: تمت موافقتك' },
  { views: ['closed'], label: 'الحالة: اكتمل' },
  { views: ['declined'], label: 'الحالة: اعتذرت' },
];

const emptyStates = [
  {
    view: 'closed',
    icon: Check,
    title: 'اكتمل هذا الطلب، شكراً لاهتمامك',
    text: 'وافق العدد المطلوب من المتبرعين، أو انتهت مدة الطلب. لن تُطلب منك أي خطوة.',
  },
  {
    view: 'declined',
    icon: Heart,
    title: 'شكراً لك، سجّلنا اعتذارك',
    text: 'سنبلغ متبرعاً آخر بالطلب. يمكنك دائماً مساعدة طلب آخر قريب منك.',
  },
];

const toastMessages = [
  { id: 'accepted', text: 'تم تسجيل موافقتك، شكراً لك' },
  { id: 'cancelled', text: 'أُلغيت موافقتك' },
  { id: 'reported', text: 'وصلنا بلاغك، سيراجعه فريقنا' },
];

/* views that show the hospital sidebar */
const asideViews = ['before', 'accepted', 'loading'];

const say = (id) => toastMessages.find((m) => m.id === id)?.text ?? '';

/* ---------------- small pieces ---------------- */
const Chip = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-[11px] py-1 text-[0.74rem] font-medium backdrop-blur-sm">
    {children}
  </span>
);

const Shell = ({ children }) => (
  <div className="mx-auto w-full max-w-[1240px] px-4 py-10 md:px-6">{children}</div>
);

/* ---------------- the page once the data is ready ---------------- */
// initialView: before | accepted | loading | closed | declined | error
function RequestDetailsView({ pledges, request, initialView }) {
  const [view, setView] = useState(initialView);
  const [sheet, setSheet] = useState(null); // null | "accept" | "report"
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');
  const closeToast = useCallback(() => setToast(''), []);

  const { hospital } = request;
  const pledge = pledges.find((p) => p.requestId === request.id);
  const guide = arrivalGuides.find((g) => g.partner === hospital.partner);
  const accepted = view === 'accepted';
  const showAside = asideViews.includes(view);
  const emptyState = emptyStates.find((e) => e.view === view);

  /* handlers: swap the mock bodies for your API calls */
  const confirmAccept = async () => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700)); // POST /api/requests/:id/pledges
      setSheet(null);
      setView('accepted');
      setToast(say('accepted'));
    } finally {
      setSubmitting(false);
    }
  };
  const decline = () => setView('declined'); // POST /api/requests/:id/decline
  const cancelPledge = () => {
    setView('before'); // DELETE /api/pledges/:id
    setToast(say('cancelled'));
  };
  const submitReport = (payload) => {
    console.log('report', payload); // POST /api/reports
    setSheet(null);
    setToast(say('reported'));
  };

  const chips = [
    trustChips.find((c) => c.level === request.trust)?.label,
    statusChips.find((c) => c.views.includes(view))?.label,
  ].filter(Boolean);

  const crumbs = [
    ...breadcrumbs,
    {
      label: (
        <>
          الطلب <Ref>{request.id}</Ref>
        </>
      ),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1240px] px-4 md:px-6">
      <Breadcrumb items={crumbs} />
      <PageHeader
        title={
          <>
            طلب رقم <Ref>{request.id}</Ref>
          </>
        }
        subtitle={`${hospital.name} · ${hospital.area} · ${hospital.partner ? 'مستشفى شريك' : 'غير شريك'}`}
        chips={chips.length > 0 ? chips.map((label) => <Chip key={label}>{label}</Chip>) : null}
      />

      <main className="pt-[22px] pb-10">
        <div className={showAside ? 'grid gap-[18px] lg:grid-cols-[minmax(0,1fr)_320px]' : 'grid'}>
          <div className="min-w-0">
            {view === 'before' && (
              <RequestDetails
                request={request}
                notice={notices.find((n) => n.id === 'before-accept')}
                onAccept={() => setSheet('accept')}
                onDecline={decline}
                onReport={() => setSheet('report')}
              />
            )}

            {accepted && pledge && (
              <AcceptedView
                request={request}
                pledge={pledge}
                guide={guide}
                onCancel={cancelPledge}
                onSelfConfirm={() => {}}
              />
            )}

            {view === 'loading' && <RequestSkeleton />}

            {emptyState && (
              <EmptyState
                icon={emptyState.icon}
                title={emptyState.title}
                text={emptyState.text}
                actions={
                  <Button as="a" href="/donor/requests" variant="navy" size="sm">
                    طلبات أخرى قريبة
                  </Button>
                }
              />
            )}

            {view === 'error' && (
              <ErrorState
                title="تعذّر تحميل الطلب"
                text="ربما أُلغي الطلب أو انقطع الاتصال. جرّب مرة أخرى."
                onRetry={() => setView('before')}
                backHref="/donor/requests"
                backLabel="العودة للطلبات"
              />
            )}
          </div>

          {showAside && (
            <RequestSidebar
              hospital={hospital}
              contact={accepted ? request.requester : null}
              contactNote={pledge?.contactNote}
              notice={notices.find((n) => n.id === 'free')}
            />
          )}
        </div>
      </main>

      <AcceptSheet
        open={sheet === 'accept'}
        onClose={() => setSheet(null)}
        request={request}
        items={sheetChecks}
        submitting={submitting}
        onConfirm={confirmAccept}
      />
      <ReportSheet
        open={sheet === 'report'}
        onClose={() => setSheet(null)}
        requestId={request.id}
        reasons={reportReasons}
        onSubmit={submitReport}
      />
      <Toast message={toast} onClose={closeToast} />
    </div>
  );
}

/* ---------------- fetch states, then the view ---------------- */
function Content({ requestId, initialView }) {
  const { data, dataError, dataLoading, getData } = useRequestsData();

  if (dataLoading) {
    return (
      <Shell>
        <RequestSkeleton />
      </Shell>
    );
  }

  if (dataError || !data) {
    return (
      <Shell>
        <ErrorState
          title="تعذّر تحميل الطلب"
          text="ربما انقطع الاتصال. جرّب مرة أخرى."
          onRetry={getData}
          backHref="/donor/requests"
          backLabel="العودة للطلبات"
        />
      </Shell>
    );
  }

  const request = data.requests.find((r) => r.id === requestId);

  if (!request) {
    return (
      <Shell>
        <EmptyState
          icon={SearchX}
          tone="warn"
          title="لم نجد هذا الطلب"
          text="ربما أُلغي الطلب أو أن الرابط غير صحيح."
          actions={
            <Button as="a" href="/donor/requests" variant="navy" size="sm">
              العودة للطلبات
            </Button>
          }
        />
      </Shell>
    );
  }

  // key resets all state when the route :id changes
  return (
    <RequestDetailsView key={request.id} pledges={data.pledges} request={request} initialView={initialView} />
  );
}

export default function RequestDetailsPage({ initialView = 'before' }) {
  const { id } = useParams();
  return (
    <RequestsContext>
      <Content requestId={id} initialView={initialView} />
    </RequestsContext>

  );
}
