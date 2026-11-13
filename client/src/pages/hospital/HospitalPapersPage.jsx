import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Check,
  FileCheck2,
  FileText,
  Info,
  RotateCcw,
  ShieldCheck,
  X,
} from 'lucide-react';
import HospitalLayout from './components/HospitalLayout';
import Panel from '@/components/ui/Panel';
import Notice from '@/components/ui/Notice';
import BloodTypeChip from '@/components/ui/BloodTypeChip';
import Button from '@/components/ui/Button';
import Ltr from '@/components/ui/Ltr';
import HeaderChip from '@/components/ui/HeaderChip';
import TableSkeleton from '@/components/ui/TableSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import { INITIAL_PENDING_PAPERS, formatPaperDate } from './hospitalData';

const KIND_LABELS = {
  request: { label: 'طلب دم', badgeClass: 'bg-info-lt text-info' },
  certificate: { label: 'شهادة فصيلة', badgeClass: 'bg-teal-lt text-teal-ink' },
};

export default function HospitalPapersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadCount, setReloadCount] = useState(0);
  const [feedback, setFeedback] = useState(null); // { tone, title, text }
  const [rejectingId, setRejectingId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const shouldSimulateError = searchParams.get('error') === '1';

  useEffect(() => {
    const prev = document.title;
    document.title = 'أوراق بانتظار التأكيد · رابط الحياة';
    return () => {
      document.title = prev;
    };
  }, []);

  // جلب الأوراق المعلقة عند فتح الصفحة أو عند طلب إعادة التحميل
  useEffect(() => {
    let isCancelled = false;

    async function fetchPapers() {
      // محاكاة زمن الاستجابة من السيرفر (تُستبدل لاحقاً بـ GET /api/hospital/papers?status=pending)
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (isCancelled) return;

      if (shouldSimulateError) {
        setError('تعذّر الاتصال بخادم المستشفى.');
        setLoading(false);
        return;
      }

      setPapers(INITIAL_PENDING_PAPERS);
      setLoading(false);
    }

    fetchPapers();
    return () => {
      isCancelled = true;
    };
  }, [shouldSimulateError, reloadCount]);

  // ترتيب الأوراق تصاعدياً من الأقدم للأحدث حسب تاريخ الورقة
  const sortedPapers = [...papers].sort(
    (a, b) => new Date(a.paperDate) - new Date(b.paperDate),
  );

  // تأكيد أن الورقة صادرة من المستشفى (FR-07)
  function handleConfirm(paper) {
    setPapers((prev) => prev.filter((item) => item.id !== paper.id));
    setRejectingId(null);
    setFeedback({
      tone: 'ok',
      title: 'تم تأكيد الورقة ومنح شارة «موثّق»',
      text: `تم اعتماد المرجع ${paper.id} (${paper.nameOnPaper}) كصادر رسميًا من المستشفى.`,
    });
  }

  // رفض الورقة لعدم مطابقتها سجلات المستشفى
  function handleRejectSubmit(paper) {
    setPapers((prev) => prev.filter((item) => item.id !== paper.id));
    setRejectingId(null);
    const reasonText = rejectReason.trim() ? ` — السبب: ${rejectReason.trim()}` : '';
    setRejectReason('');
    setFeedback({
      tone: 'warn',
      title: 'تم تسجيل عدم صدور الورقة من المستشفى',
      text: `تم رفض المرجع ${paper.id}${reasonText}، وسيُطلب من المستخدم رفع ورقة صحيحة.`,
    });
  }

  // زرار إعادة المحاولة في شاشة الخطأ
  function handleRetry() {
    setLoading(true);
    setError('');
    if (shouldSimulateError) {
      setSearchParams({}, { replace: true });
    } else {
      setReloadCount((c) => c + 1);
    }
  }

  // زرار إعادة تحميل الأمثلة التجريبية بعد تفريغ القائمة
  function handleReloadDemo() {
    setRejectingId(null);
    setRejectReason('');
    setFeedback(null);
    setLoading(true);
    setError('');
    setReloadCount((c) => c + 1);
  }

  return (
    <HospitalLayout
      breadcrumbs={[
        { label: 'الرئيسية', to: '/' },
        { label: 'بوابة المستشفى', to: '/hospital' },
        { label: 'أوراق بانتظار التأكيد' },
      ]}
      title="أوراق بانتظار التأكيد"
      subtitle="طابق الرقم المرجعي والبيانات مع سجلات بنك الدم لتأكيد صدور الورقة من المستشفى."
      pendingCount={sortedPapers.length}
      chips={
        <HeaderChip>
          <FileCheck2 className="size-3.5" aria-hidden="true" />
          <span>
            <Ltr bold>{sortedPapers.length}</Ltr> بانتظار التأكيد
          </span>
        </HeaderChip>
      }
    >
      {/* إشعار نتيجة آخر إجراء (تأكيد أو رفض) */}
      {feedback && (
        <Notice tone={feedback.tone} title={feedback.title} live>
          {feedback.text}
        </Notice>
      )}

      {/* اللوحة الرئيسية لقائمة الأوراق */}
      <Panel
        title="قائمة الأوراق المعلقة"
        meta={<span className="text-tiny text-ink-3">مرتبة من الأقدم للأحدث</span>}
      >
        {loading && <TableSkeleton label="جارٍ تحميل الأوراق المعلقة…" />}

        {!loading && error && (
          <ErrorState title="تعذّر تحميل قائمة الأوراق" onRetry={handleRetry}>
            حدث خطأ أثناء الاتصال بخادم المستشفى. تأكد من اتصالك بالشبكة ثم أعد المحاولة.
          </ErrorState>
        )}

        {!loading && !error && sortedPapers.length === 0 && (
          <EmptyState
            icon={ShieldCheck}
            tone="teal"
            title="لا توجد أوراق بانتظار التأكيد حاليًا"
            actions={
              <Button variant="outline" size="sm" icon={RotateCcw} onClick={handleReloadDemo}>
                إعادة تحميل الأمثلة التجريبية
              </Button>
            }
          >
            تمت مراجعة جميع الأوراق المنسوبة للمستشفى. ستظهر هنا أي طلبات دم أو شهادات فصيلة جديدة
            فور رفعها.
          </EmptyState>
        )}

        {!loading && !error && sortedPapers.length > 0 && (
          <>
            {/* 1. عرض الجدول للشاشات المتوسطة والكبيرة */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-[0.84rem]">
                <caption className="sr-only">
                  الأوراق المنسوبة للمستشفى وبانتظار تأكيد صدورها
                </caption>
                <thead>
                  <tr className="bg-navy text-tiny text-right font-semibold text-white">
                    <th scope="col" className="px-4 py-3">
                      الرقم المرجعي
                    </th>
                    <th scope="col" className="px-4 py-3">
                      نوع المستند
                    </th>
                    <th scope="col" className="px-4 py-3">
                      الاسم على الورقة
                    </th>
                    <th scope="col" className="px-4 py-3">
                      الفصيلة
                    </th>
                    <th scope="col" className="px-4 py-3">
                      تاريخ الورقة
                    </th>
                    <th scope="col" className="px-4 py-3">
                      قرار المستشفى
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPapers.map((paper) => {
                    const kind = KIND_LABELS[paper.kind] ?? KIND_LABELS.request;
                    const isRejecting = rejectingId === paper.id;

                    return (
                      <tr
                        key={paper.id}
                        className="border-line-2 even:bg-surface-2 hover:bg-teal-lt/40 border-b transition-colors last:border-b-0"
                      >
                        <td className="px-4 py-3.5 align-middle">
                          <span className="text-head font-mono text-[0.82rem]">
                            <Ltr bold>{paper.id}</Ltr>
                          </span>
                        </td>

                        <td className="px-4 py-3.5 align-middle">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.74rem] font-semibold ${kind.badgeClass}`}
                          >
                            <FileText className="size-3" aria-hidden="true" />
                            {kind.label}
                          </span>
                          {paper.department && (
                            <span className="text-ink-3 mt-0.5 block text-[0.74rem]">
                              {paper.department}
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3.5 align-middle">
                          <b className="text-ink font-semibold">{paper.nameOnPaper}</b>
                        </td>

                        <td className="px-4 py-3.5 align-middle">
                          <BloodTypeChip type={paper.bloodType} />
                        </td>

                        <td className="text-ink-2 px-4 py-3.5 align-middle text-[0.8rem]">
                          {formatPaperDate(paper.paperDate)}
                        </td>

                        <td className="px-4 py-3.5 align-middle">
                          {!isRejecting ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <Button
                                variant="secondary"
                                size="sm"
                                icon={Check}
                                onClick={() => handleConfirm(paper)}
                              >
                                صدرت منّا
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                icon={X}
                                onClick={() => {
                                  setRejectingId(paper.id);
                                  setRejectReason('');
                                }}
                              >
                                لم تصدر منّا
                              </Button>
                            </div>
                          ) : (
                            <div className="bg-crimson-lt/50 border-crimson/30 grid gap-2 rounded-xl border p-2.5">
                              <label className="text-crimson-ink text-[0.75rem] font-semibold">
                                سبب الرفض (اختياري):
                                <input
                                  type="text"
                                  value={rejectReason}
                                  onChange={(e) => setRejectReason(e.target.value)}
                                  placeholder="مثال: الرقم المرجعي غير موجود بالسجلات"
                                  className="border-line bg-surface text-ink text-tiny mt-1 block w-full rounded-lg border px-2.5 py-1.5 font-normal"
                                />
                              </label>
                              <div className="flex items-center gap-1.5">
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleRejectSubmit(paper)}
                                >
                                  تأكيد الرفض
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setRejectingId(null)}
                                >
                                  إلغاء
                                </Button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 2. عرض الكروت للموبايل (< 768px) */}
            <div className="grid gap-3 p-3.5 md:hidden">
              {sortedPapers.map((paper) => {
                const kind = KIND_LABELS[paper.kind] ?? KIND_LABELS.request;
                const isRejecting = rejectingId === paper.id;

                return (
                  <article
                    key={paper.id}
                    className="border-line bg-surface-2 rounded-xl border p-3.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-head font-mono text-[0.8rem]">
                          <Ltr bold>{paper.id}</Ltr>
                        </span>
                        <h3 className="font-head text-ink mt-0.5 text-[0.95rem] font-bold">
                          {paper.nameOnPaper}
                        </h3>
                      </div>
                      <BloodTypeChip type={paper.bloodType} />
                    </div>

                    <div className="text-ink-2 mt-2.5 flex flex-wrap items-center gap-2 text-[0.76rem]">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold ${kind.badgeClass}`}
                      >
                        {kind.label}
                      </span>
                      {paper.department && <span>· {paper.department}</span>}
                      <span>· {formatPaperDate(paper.paperDate)}</span>
                    </div>

                    {!isRejecting ? (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Check}
                          onClick={() => handleConfirm(paper)}
                        >
                          صدرت منّا
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={X}
                          onClick={() => {
                            setRejectingId(paper.id);
                            setRejectReason('');
                          }}
                        >
                          لم تصدر منّا
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-crimson-lt/50 border-crimson/30 mt-3 grid gap-2 rounded-xl border p-2.5">
                        <input
                          type="text"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="سبب الرفض (اختياري)…"
                          aria-label="سبب الرفض"
                          className="border-line bg-surface text-ink w-full rounded-lg border px-2.5 py-2 text-[0.8rem]"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleRejectSubmit(paper)}
                          >
                            تأكيد الرفض
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setRejectingId(null)}
                          >
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}
      </Panel>

      {/* تنبيه الخصوصية وآلية التأكيد (FR-07 / FR-11) */}
      <div className="mt-4">
        <Notice tone="info" small>
          <span className="inline-flex items-center gap-1.5">
            <Info className="text-info size-4 shrink-0" aria-hidden="true" />
            <span>
              تُعرض هنا البيانات المرجعية فقط دون صورة المستند حمايةً للخصوصية. الضغط على{' '}
              <b>«صدرت منّا»</b> يمنح الطلب أو الشهادة شارة <b>«موثّق من المستشفى»</b> مباشرةً.
            </span>
          </span>
        </Notice>
      </div>
    </HospitalLayout>
  );
}