import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { HOSPITALS, STEPS } from './requesterConstants';
import { checkPaper, submitRequest } from './requesterData';
import { detailsErrors, paperPassed } from './requesterRules';
import DetailsStep from './components/DetailsStep';
import PaperStep from './components/PaperStep';
import ReviewStep from './components/ReviewStep';
import SendStep from './components/SendStep';
import ServiceInfoCard from './components/ServiceInfoCard';
import Stepper from './components/Stepper';

const EMPTY_DRAFT = {
  bloodType: '',
  units: 1,
  urgency: '',
  neededBy: '',
  hospitalId: '',
  paperType: 'blood_request',
  consent: false,
  file: null,
  declared: false,
};

function NewRequestHeader() {
  return (
    <header className="rounded-hero from-navy via-navy-2 to-teal shadow-raised hc:bg-black hc:bg-none mt-2.5 flex flex-wrap items-end justify-between gap-3 bg-linear-120 px-4 py-5 text-white sm:px-5.5">
      <div>
        <h1 className="text-[1.45rem] font-extrabold text-white md:text-[1.8rem]">خدمة تقديم طلب دم</h1>
        <p className="mt-0.5 text-[0.9rem] opacity-90">أرسل طلبك مع ورقة المستشفى، وسنصل لأقرب المتبرعين.</p>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {['مجانية', 'إلكترونية بالكامل'].map((chip) => (
          <li
            key={chip}
            className="hc:border-white rounded-full border border-white/30 bg-white/15 px-2.75 py-1 text-[0.74rem] font-medium"
          >
            {chip}
          </li>
        ))}
      </ul>
    </header>
  );
}

export default function NewRequestPage() {
  const { step } = useParams();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [check, setCheck] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const current = STEPS.findIndex((item) => item.key === step);
  if (current === -1) return <Navigate to={`/requests/new/${STEPS[0].key}`} replace />;

  // مينفعش تقفز لخطوة قبل ما تخلّص اللي قبلها
  let allowed = STEPS.length - 1;
  if (!paperPassed(check)) allowed = 1;
  if (Object.keys(detailsErrors(draft)).length > 0) allowed = 0;
  if (current > allowed) return <Navigate to={`/requests/new/${STEPS[allowed].key}`} replace />;

  const goTo = (key) => navigate(`/requests/new/${key}`);
  const update = (patch) => setDraft((old) => ({ ...old, ...patch }));

  // تغيير المستشفى أو نوع الورقة أو الموافقة يلغي الفحص القديم
  function updatePaperField(patch) {
    update({ ...patch, file: null });
    setCheck(null);
  }

  async function handlePick(file) {
    update({ file });
    setCheck({ status: 'checking', problems: [] });
    const hospital = HOSPITALS.find((item) => item.id === draft.hospitalId);
    try {
      setCheck(await checkPaper({ hospital, file }));
    } catch {
      // الفحص الآلي وقع: الورقة تروح للمراجعة، ومفيش صفحة خطأ (NFR-13)
      setCheck({ status: 'queued', problems: [] });
    }
  }

  function handleReupload() {
    update({ file: null });
    setCheck(null);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError('');
    try {
      const { id } = await submitRequest();
      navigate(`/requests/${id}`);
    } catch {
      setSubmitError('تعذّر إرسال الطلب. حاول مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  }

  const key = STEPS[current].key;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10">
      <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: 'تقديم طلب دم' }]} />
      <NewRequestHeader />
      <Stepper steps={STEPS} current={current} />

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          {key === 'details' && <DetailsStep draft={draft} onChange={update} onNext={() => goTo('paper')} />}
          {key === 'paper' && (
            <PaperStep
              draft={draft}
              check={check}
              onFieldChange={updatePaperField}
              onPick={handlePick}
              onReupload={handleReupload}
              onRequestReview={() => setCheck({ status: 'queued', problems: [] })}
              onBack={() => goTo('details')}
              onNext={() => goTo('review')}
            />
          )}
          {key === 'review' && (
            <ReviewStep
              draft={draft}
              check={check}
              onBack={() => goTo('paper')}
              onNext={() => goTo('send')}
            />
          )}
          {key === 'send' && (
            <SendStep
              declared={draft.declared}
              onDeclare={(declared) => update({ declared })}
              submitting={submitting}
              error={submitError}
              onSubmit={handleSubmit}
              onBack={() => goTo('review')}
            />
          )}
        </div>
        <ServiceInfoCard />
      </div>
    </div>
  );
}
