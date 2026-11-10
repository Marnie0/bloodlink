import { useState } from 'react';
import { MapPin } from 'lucide-react';

// 2 decimals ≈ 1 km: enough to measure distance to a request, without the exact address
const round = (n) => Math.round(n * 100) / 100;

// Shows the chosen area, and lets the user share an approximate location from the browser.
// If they refuse (or the browser can't), the area they picked is used instead.
export default function LocationCard({ governorate, area, location, onLocate }) {
  const [status, setStatus] = useState('idle'); // idle | locating | failed

  function locate() {
    if (!('geolocation' in navigator)) {
      setStatus('failed');
      return;
    }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus('idle');
        onLocate({ lat: round(position.coords.latitude), lng: round(position.coords.longitude) });
      },
      () => setStatus('failed'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  }

  let note = 'نستخدمه لحساب المسافة فقط، ولا يظهر لأحد.';
  if (location) note = 'تم تحديد موقعك التقريبي. نستخدمه لحساب المسافة فقط، ولا يظهر لأحد.';
  if (status === 'failed') note = 'لم نتمكن من تحديد موقعك، وسنعتمد على المنطقة التي اخترتها.';

  let buttonText = 'تحديد موقعي';
  if (location) buttonText = 'تحديث موقعي';
  if (status === 'locating') buttonText = 'جارٍ التحديد…';

  return (
    <div role="group" aria-labelledby="location-label">
      <p id="location-label" className="mb-1 text-[0.86rem] font-semibold">
        موقعك التقريبي
        <span aria-hidden="true" className="text-crimson-ink ms-1">
          *
        </span>
      </p>
      <div className="border-line bg-surface-2 rounded-card flex flex-wrap items-center gap-3 border p-3.5">
        <span
          aria-hidden="true"
          className="border-line bg-surface text-ink-2 grid size-10 shrink-0 place-items-center rounded-full border"
        >
          <MapPin className="size-4.5" />
        </span>
        <div className="min-w-0 grow basis-48">
          <b className="block">
            {area && governorate ? `${area}، ${governorate}` : 'اختر المحافظة والمنطقة'}
          </b>
          <p aria-live="polite" className="text-tiny text-ink-2">
            {note}
          </p>
        </div>
        <button
          type="button"
          onClick={locate}
          disabled={status === 'locating'}
          className="border-line bg-surface text-teal-ink hover:border-ink-3 rounded-field border px-3 py-1.5 text-[0.85rem] font-bold disabled:opacity-60"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
