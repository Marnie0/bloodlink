import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Ltr from '@/components/ui/Ltr';
import Notice from '@/components/ui/Notice';
import { lookupResults } from '../homeData';

const REF = /^BL-\d{4}-\d{6}$/;

// Fake request: waits a bit like a real server, then answers from homeData
function findRequest(ref) {
  return new Promise((resolve) => setTimeout(() => resolve(lookupResults[ref] ?? null), 500));
}

export default function StatusLookup() {
  const [ref, setRef] = useState('');
  const [state, setState] = useState({ status: 'idle' });
  const loading = state.status === 'loading';

  async function handleSubmit(event) {
    event.preventDefault();
    const clean = ref.trim();
    if (!REF.test(clean)) {
      setState({ status: 'invalid' });
      return;
    }
    setState({ status: 'loading' });
    const found = await findRequest(clean);
    setState(found ? { status: 'found', ref: clean, data: found } : { status: 'notFound' });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-hero bg-surface/75 text-ink hc:bg-surface border border-white/40 p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,.5)] backdrop-blur-[18px]"
    >
      <h2 className="text-[1.05rem] font-bold">الاستعلام عن حالة طلب</h2>
      <p className="text-ink-2 mt-0.5 mb-3 text-[0.82rem]">
        أدخل الرقم المرجعي المرسل إليك في رسالة نصية عند تقديم الطلب.
      </p>

      <label htmlFor="ref" className="sr-only">
        الرقم المرجعي
      </label>
      <div className="flex items-center gap-2.5">
        <input
          id="ref"
          dir="ltr"
          value={ref}
          onChange={(e) => setRef(e.target.value.toUpperCase())}
          placeholder="BL-2026-000000"
          autoComplete="off"
          aria-describedby="ref-result"
          aria-invalid={state.status === 'invalid' || undefined}
          className="rounded-field border-line bg-surface-2 focus:border-navy min-w-0 flex-1 border px-3 py-2.5 text-start"
        />
        <button
          type="submit"
          disabled={loading}
          aria-busy={loading || undefined}
          className="bg-navy hover:bg-navy-2 rounded-field hc:border-2 hc:border-ink inline-flex min-h-11 items-center gap-2 px-5 py-2.5 text-[0.92rem] font-semibold text-white disabled:opacity-70"
        >
          {loading && (
            <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          )}
          استعلام
        </button>
      </div>

      <div id="ref-result" aria-live="polite" className="mt-3 empty:hidden">
        {state.status === 'found' && (
          <Notice
            tone={state.data.active ? 'ok' : 'info'}
            small
            className=""
            title={
              <>
                الطلب <Ltr bold>{state.ref}</Ltr> {state.data.active ? 'نشط' : 'مغلق'}
              </>
            }
          >
            {state.data.hospital} · فصيلة <Ltr>{state.data.bloodType}</Ltr> · {state.data.summary}
          </Notice>
        )}
        {state.status === 'invalid' && (
          <Notice tone="warn" small className="">
            الصيغة الصحيحة: <Ltr>BL-2026-000000</Ltr>
          </Notice>
        )}
        {state.status === 'notFound' && (
          <Notice tone="warn" small className="">
            لم نجد طلباً بهذا الرقم. تأكد من الرقم في الرسالة النصية.
          </Notice>
        )}
      </div>
    </form>
  );
}
