import clsx from 'clsx';

const tones = {
  ok: 'bg-ok-lt text-ok',
  warn: 'bg-warn-lt text-warn',
  info: 'bg-info-lt text-info',
  grey: 'border border-line bg-surface-2 text-ink-2',
  glass: 'bg-white/20 text-white', // only on top of bg-urgent / bg-navy (always dark)
};

export default function Tag({ tone = 'ok', className, children }) {
  return (
    <span
      className={clsx(
        'text-tiny inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
