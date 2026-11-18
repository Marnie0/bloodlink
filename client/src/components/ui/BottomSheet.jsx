import { useEffect, useId, useRef } from 'react';

export default function BottomSheet({ open, onClose, eyebrow, title, description, children }) {
  const ref = useRef(null);
  const uid = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${uid}-t`}
      aria-describedby={description ? `${uid}-d` : undefined}
      onClose={onClose} // fires on Esc and on d.close()
      onClick={(e) => e.target === e.currentTarget && onClose()} // backdrop click
      className="border-line bg-surface text-ink m-0 mx-auto mt-auto max-h-[90dvh] w-full max-w-140 overflow-y-auto overscroll-contain rounded-t-[26px] rounded-b-none border p-0 shadow-[0_-20px_50px_-20px_rgba(0,0,0,.4)] backdrop:bg-[rgba(6,16,28,.45)] open:animate-[sheet-in_.32s_cubic-bezier(.2,.8,.2,1)] motion-reduce:animate-none"
    >
      <div className="px-5.5 pt-3 pb-6.5">
        <div aria-hidden className="bg-line mx-auto mb-3 h-1 w-10 rounded-full" />
        {eyebrow && (
          <span dir="ltr" className="text-tiny text-ink-3 block font-semibold">
            {eyebrow}
          </span>
        )}
        <h2 id={`${uid}-t`} className="font-head text-head text-xl font-bold">
          {title}
        </h2>
        {description && (
          <p id={`${uid}-d`} className="text-small text-ink-2 mt-1">
            {description}
          </p>
        )}
        {children}
      </div>
    </dialog>
  );
}
