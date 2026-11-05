const Notice = ({ tone = 'info', title, children }) => {
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

  const t = tones[tone];
  return (
    <div
      className={`rounded-tile text-small hc:border-2 hc:border-s-[6px] mb-4 grid grid-cols-[auto_1fr] gap-3 border border-s-[5px] px-4 py-3.5 ${t.box}`}
    >
      <span
        aria-hidden
        className={`dark:text-canvas hc:text-white grid size-7 place-items-center rounded-[10px] text-[0.85rem] font-extrabold text-white ${t.icon}`}
      >
        {t.glyph}
      </span>
      <div className="min-w-0">
        {title && <b className="font-head text-ink mb-0.5 block text-[0.95rem] font-bold">{title}</b>}
        <p className="m-0">{children}</p>
      </div>
    </div>
  );
};

export default Notice;
