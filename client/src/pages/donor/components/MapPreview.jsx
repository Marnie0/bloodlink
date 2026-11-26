import { MapPin } from 'lucide-react';

export default function MapPreview({ label }) {
  return (
    <div
      role="img"
      aria-label={`خريطة توضيحية لموقع ${label}`}
      className="rounded-tile border-line-2 bg-teal-lt hc:border-line relative h-42.5 overflow-hidden border"
    >
      <svg
        viewBox="0 0 300 170"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 size-full"
      >
        <path
          d="M0 60 H300 M0 120 H300 M90 0 V170 M200 0 V170"
          strokeWidth="10"
          className="stroke-surface hc:stroke-line hc:opacity-25 opacity-80"
        />
        <path
          d="M50 140 C 110 130, 120 80, 170 82 S 220 45, 236 42"
          fill="none"
          strokeWidth="3.5"
          strokeDasharray="2 8"
          strokeLinecap="round"
          className="stroke-crimson"
        />
      </svg>
      <span
        aria-hidden
        className="border-surface bg-info shadow-card absolute size-3.5 rounded-full border-2"
        style={{ left: '14%', top: '78%' }}
      />
      <MapPin
        aria-hidden
        className="fill-crimson text-surface absolute size-7"
        style={{ left: '74%', top: '10%' }}
      />
      <span className="border-line bg-surface text-tiny text-head shadow-card absolute inset-s-2 bottom-2 rounded-full border px-2.5 py-0.5 font-semibold">
        {label}
      </span>
    </div>
  );
}
