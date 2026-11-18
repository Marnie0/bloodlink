import { useEffect } from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message, onClose, duration = 3500 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [message, onClose, duration]);

  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-navy text-small shadow-raised fixed bottom-24 left-1/2 z-80 inline-flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full px-[18px] py-[11px] text-white lg:bottom-7"
    >
      <Check aria-hidden className="size-4.5 shrink-0" />
      {message}
    </div>
  );
}
