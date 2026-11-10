const tones = {
  info: { box: 'bg-info-lt border-info', icon: 'bg-info', glyph: 'i' },
  ok: { box: 'bg-ok-lt border-ok', icon: 'bg-ok', glyph: '✓' },
  warn: { box: 'bg-warn-lt border-warn', icon: 'bg-warn', glyph: '!' },
  err: { box: 'bg-crimson-lt border-crimson', icon: 'bg-crimson', glyph: '×' },
  gold: {
    box: 'bg-[color-mix(in_srgb,var(--color-gold)_12%,var(--color-surface))] border-gold',
    icon: 'bg-gold',
    glyph: '!',
  },
};

const Notice = ({ tone = 'info', title, live = false, small = false, className = 'mb-4', children }) => {
  const t = tones[tone];
  const role = live ? (tone === 'err' ? 'alert' : 'status') : undefined;

  return (
    <div
      role={role}
      className={`rounded-tile hc:border-2 hc:border-s-[6px] grid grid-cols-[auto_1fr] gap-3 border border-s-[5px] px-4 py-3.5 ${
        small ? 'text-[0.82rem]' : 'text-small'
      } ${t.box} ${className}`}
    >
      <span
        aria-hidden
        className={`dark:text-canvas hc:text-white grid size-7 place-items-center rounded-[10px] text-[0.85rem] font-extrabold text-white ${t.icon}`}
      >
        {t.glyph}
      </span>
      <div className="min-w-0">
        {title && <b className="font-head text-ink mb-0.5 block text-[0.95rem] font-bold">{title}</b>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Notice;
