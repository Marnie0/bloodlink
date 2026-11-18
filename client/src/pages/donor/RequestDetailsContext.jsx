import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  requests,
  pledges,
  arrivalGuides,
  trustChips,
  statusChips,
  emptyStates,
  toastMessages,
  asideViews,
} from './requestDetailsData';

const RequestDetailsContext = createContext(null);

const say = (id) => toastMessages.find((m) => m.id === id)?.text ?? '';

/* initialView: before | accepted | loading | closed | declined | error */
export function RequestDetailsProvider({ requestId, initialView = 'before', children }) {
  const [view, setView] = useState(initialView);
  const [sheet, setSheet] = useState(null); // null | "accept" | "report"
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  /* ---------- derived ---------- */
  const derived = useMemo(() => {
    const request = requests.find((r) => r.id === requestId) ?? null; // no fallback

    if (!request) {
      return {
        request: null,
        pledge: null,
        guide: null,
        accepted: false,
        showAside: false,
        emptyState: null,
        chips: [],
      };
    }

    return {
      request,
      pledge: pledges.find((p) => p.requestId === request.id),
      guide: arrivalGuides.find((g) => g.partner === request.hospital.partner),
      accepted: view === 'accepted',
      showAside: asideViews.includes(view),
      emptyState: emptyStates.find((e) => e.view === view),
      chips: [
        trustChips.find((c) => c.level === request.trust)?.label,
        statusChips.find((c) => c.views.includes(view))?.label,
      ].filter(Boolean),
    };
  }, [requestId, view]);

  /* ---------- actions (swap the mock bodies for your API calls) ---------- */
  const openAccept = useCallback(() => setSheet('accept'), []);
  const openReport = useCallback(() => setSheet('report'), []);
  const closeSheet = useCallback(() => setSheet(null), []);
  const closeToast = useCallback(() => setToast(''), []);

  const confirmAccept = useCallback(async () => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 700)); // POST /api/requests/:id/pledges
      setSheet(null);
      setView('accepted');
      setToast(say('accepted'));
    } finally {
      setSubmitting(false);
    }
  }, []);

  const decline = useCallback(() => {
    setView('declined'); // POST /api/requests/:id/decline
  }, []);

  const cancelPledge = useCallback(() => {
    setView('before'); // DELETE /api/pledges/:id
    setToast(say('cancelled'));
  }, []);

  const selfConfirm = useCallback(() => {
    // POST /api/pledges/:id/self-confirm  (button is disabled until the enable rule is agreed)
  }, []);

  const submitReport = useCallback((payload) => {
    console.log('report', payload); // POST /api/reports
    setSheet(null);
    setToast(say('reported'));
  }, []);

  const retry = useCallback(() => {
    setView('before'); // refetch GET /api/requests/:id
  }, []);

  const value = useMemo(
    () => ({
      ...derived,
      view,
      sheet,
      submitting,
      toast,
      openAccept,
      openReport,
      closeSheet,
      closeToast,
      confirmAccept,
      decline,
      cancelPledge,
      selfConfirm,
      submitReport,
      retry,
    }),
    [
      derived,
      view,
      sheet,
      submitting,
      toast,
      openAccept,
      openReport,
      closeSheet,
      closeToast,
      confirmAccept,
      decline,
      cancelPledge,
      selfConfirm,
      submitReport,
      retry,
    ],
  );

  return <RequestDetailsContext.Provider value={value}>{children}</RequestDetailsContext.Provider>;
}

export function useRequestDetails() {
  const ctx = useContext(RequestDetailsContext);
  if (!ctx) throw new Error('useRequestDetails must be used inside <RequestDetailsProvider>');
  return ctx;
}
