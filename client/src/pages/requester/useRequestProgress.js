import { useEffect, useState } from 'react';
import { getRequestProgress } from './requesterData';

const REFRESH_MS = 30_000; // تحديث كل 30 ثانية لحد ما نبقى عندنا تحديث لحظي

// بيحمّل بيانات الطلب، بيحدّثها كل 30 ثانية، وبيدّي retry()
export function useRequestProgress(id) {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await getRequestProgress(id);
        if (!ignore) {
          setProgress(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err);
      }
    }

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      ignore = true;
      clearInterval(timer);
    };
  }, [id, attempt]);

  function retry() {
    setError(null);
    setAttempt((a) => a + 1);
  }

  return { progress, error, retry };
}
