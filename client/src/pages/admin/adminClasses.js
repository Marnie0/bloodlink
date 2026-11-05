// Shared Tailwind utility strings keep the admin pages consistent without custom CSS.
// All variants are complete class names so Tailwind can discover them at build time.
export const toneClasses = {
  ok: 'bg-ok-lt text-ok',
  info: 'bg-info-lt text-info',
  warn: 'bg-warn-lt text-warn',
  danger: 'bg-crimson-lt text-crimson-ink',
  teal: 'bg-teal-lt text-teal-ink',
  neutral: 'border border-line bg-surface-2 text-ink-2',
};

export const adminClasses = {
  app: 'min-h-screen bg-canvas text-sm leading-[1.8] text-ink [&_h1]:font-head [&_h1]:font-extrabold [&_h2]:font-head [&_h2]:font-extrabold [&_h3]:font-head [&_h3]:font-extrabold [&_p]:m-0 [&_a]:no-underline [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-45 [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-3 [&_:focus-visible]:outline-teal-ink [&_:focus-visible]:shadow-none',
  container:
    'mx-auto w-full max-w-[1320px] px-7 min-[1600px]:max-w-[1440px] max-[1150px]:px-5 max-[600px]:px-3.5',
  sr: 'sr-only',
  skip: 'absolute start-3 -top-20 z-100 rounded-lg bg-focus px-[18px] py-2.5 text-black focus:top-2.5',
  utility:
    'border-b border-line-2 bg-surface text-[.7rem] text-ink-2 [&>div]:flex [&>div]:min-h-[35px] [&>div]:items-center [&>div]:justify-between [&>div]:gap-1.5 [&>div>span]:flex [&>div>span]:items-center [&>div>span]:gap-1.5 max-[600px]:text-[.6rem]',
  utilityControls:
    'flex items-center gap-0.5 [&_button]:inline-flex [&_button]:min-h-7 [&_button]:min-w-7 [&_button]:items-center [&_button]:justify-center [&_button]:rounded-md [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-[7px] [&_button]:py-0 [&_button]:text-ink-2 [&_button:hover]:bg-teal-lt max-[600px]:[&_button]:min-w-[25px] max-[600px]:[&_button]:px-[5px]',
  header:
    'bg-surface [&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:gap-4 [&>div]:py-[19px] max-[600px]:[&>div]:py-[15px]',
  brand:
    'flex items-center gap-3 [&_strong]:block [&_strong]:font-head [&_strong]:text-[1.35rem] [&_strong]:leading-[1.4] [&_strong]:font-extrabold [&_strong]:text-head [&_small]:block [&_small]:text-[.71rem] [&_small]:text-ink-2 [&_em]:block [&_em]:text-right [&_em]:text-[.54rem] [&_em]:tracking-[.09em] [&_em]:text-gold-ink [&_em]:not-italic [&_em]:[direction:ltr] max-[600px]:gap-2 max-[600px]:[&_strong]:text-[1.1rem] max-[600px]:[&_small]:max-w-[180px] max-[600px]:[&_small]:text-[.57rem] max-[600px]:[&_em]:text-[.42rem]',
  brandMark:
    'grid size-[54px] place-items-center rounded-full border-2 border-gold bg-crimson-lt text-crimson shadow-[inset_0_0_0_4px_var(--color-surface)] max-[600px]:size-[42px] max-[600px]:[&_svg]:w-[25px]',
  headerActions: 'flex items-center gap-[25px]',
  adminUser:
    'flex items-center gap-[9px] rounded-[40px] border border-line p-[5px] pl-[18px] [&_b]:text-[.8rem] [&_b]:font-medium [&_small]:block [&_small]:text-[.65rem] [&_small]:text-ink-3 max-[600px]:border-0 max-[600px]:p-[3px] max-[600px]:[&>span:last-child]:hidden',
  avatar:
    'grid size-[38px] place-items-center rounded-full bg-linear-135 from-[#0b5e68] to-[#0e2a47] font-head text-[.8rem] font-bold text-white',
  navband:
    'border-b-[3px] border-gold bg-navy text-[#eef4fa] [&>div]:flex [&>div]:min-h-[47px] [&>div]:items-center [&>div]:justify-between [&_span]:flex [&_span]:items-center [&_span]:gap-[9px] [&_span]:text-[.82rem] max-[600px]:[&>div]:min-h-[41px] max-[600px]:[&_span]:text-[.73rem]',
  navbandNote: 'text-[.7rem]! opacity-[.73] max-[600px]:hidden!',
  breadcrumb:
    'flex flex-wrap items-center gap-[9px] pt-[18px] pb-3 text-[.73rem] text-ink-3 [&_a]:text-info max-[600px]:pt-[13px] max-[600px]:pb-2.5 max-[600px]:text-[.67rem]',
  pageHead:
    "relative isolate flex flex-wrap items-center justify-between gap-[18px] overflow-hidden rounded-[20px] bg-linear-115 from-[#0e2a47] from-4% via-[#173b60] via-55% to-[#0b5e68] px-[30px] py-[25px] text-white shadow-raised before:absolute before:inset-0 before:-z-1 before:bg-[radial-gradient(#ffffff16_1px,transparent_1.5px)] before:bg-size-[14px_14px] before:content-[''] after:absolute after:-top-[158px] after:left-[120px] after:-z-1 after:size-[260px] after:rounded-full after:border-[32px] after:border-white/[.03] after:content-[''] [&_h1]:my-[5px] [&_h1]:text-[1.8rem] [&_h1]:leading-[1.4] [&_h1]:text-white [&_p]:text-[.81rem] [&_p]:text-[#d9e5ed] max-[600px]:gap-[13px] max-[600px]:rounded-2xl max-[600px]:px-5 max-[600px]:py-[21px] max-[600px]:[&_h1]:text-[1.45rem] max-[600px]:[&_p]:text-[.71rem] hc:bg-none hc:bg-black hc:[&_p]:text-white",
  eyebrow: 'flex items-center gap-[7px] text-[.66rem] text-[#d4e4eb] [&>span]:bg-[#8cd4c0] hc:text-white',
  headChip:
    'flex items-center gap-2 rounded-[30px] border border-white/25 bg-white/[.07] px-3.5 py-[7px] text-[.71rem] max-[600px]:px-2.5 max-[600px]:py-[5px] max-[600px]:text-[.65rem]',
  workspace:
    'grid grid-cols-[224px_minmax(0,1fr)] items-start gap-6 pt-6 min-[1600px]:grid-cols-[240px_minmax(0,1fr)] min-[1600px]:gap-7 max-[1150px]:grid-cols-[195px_minmax(0,1fr)] max-[1150px]:gap-[18px] max-[850px]:grid-cols-1 max-[600px]:gap-[15px] max-[600px]:pt-4',
  sidebar:
    'sticky top-5 rounded-2xl border border-line bg-surface px-2.5 pt-[17px] pb-3 shadow-card [&_nav]:grid [&_nav]:gap-[5px] max-[850px]:static max-[850px]:rounded-[13px] max-[850px]:p-[7px] max-[850px]:[&_nav]:grid-cols-4 max-[850px]:[&_nav]:gap-1',
  sidebarLabel: 'px-3.5 pb-[13px] text-[.68rem] text-ink-3 max-[850px]:hidden',
  navItem:
    'group/admin-nav flex items-center gap-2.5 rounded-[10px] border border-transparent px-[13px] py-3 text-[.78rem] text-ink-2 hover:bg-surface-2 max-[850px]:justify-center max-[850px]:gap-[7px] max-[850px]:px-2 max-[850px]:py-[11px] max-[850px]:text-[.7rem] max-[600px]:relative max-[600px]:flex-col max-[600px]:gap-[5px] max-[600px]:px-[3px] max-[600px]:py-2.5 max-[600px]:text-center max-[600px]:text-[.57rem] max-[600px]:[&_svg]:w-[19px]',
  active: 'border-teal/12! bg-teal-lt! font-semibold text-teal-ink!',
  navCount:
    'ms-auto grid h-6 min-w-6 place-items-center rounded-[7px] bg-surface-2 text-[.7rem] text-ink-3 group-aria-[current=page]/admin-nav:bg-surface group-aria-[current=page]/admin-nav:text-teal-ink max-[850px]:ms-0 max-[850px]:h-[19px] max-[850px]:min-w-[19px] max-[850px]:text-[.6rem] max-[600px]:absolute max-[600px]:end-1 max-[600px]:top-1 max-[600px]:h-[17px] max-[600px]:min-w-[17px] max-[600px]:rounded-[5px] max-[600px]:text-[.55rem]',
  sidebarFoot:
    'mx-2 mt-[34px] mb-[13px] rounded-xl border border-line-2 bg-surface-2 px-[13px] py-[17px] text-teal-ink [&_h3]:mt-[9px] [&_h3]:mb-1.5 [&_h3]:text-[.8rem] [&_p]:text-[.68rem] [&_p]:leading-[1.9] [&_p]:text-ink-3 max-[850px]:hidden',
  demoReset:
    'ms-auto flex items-center gap-[7px] border-0 bg-transparent py-0.5 text-[.65rem] text-ink-3 hover:text-crimson-ink',
  content: 'min-w-0 focus-visible:outline-none! focus-visible:shadow-none!',
  demoNote:
    'mb-[23px] flex flex-wrap items-center gap-x-3.5 gap-y-[7px] rounded-[10px] border border-dashed border-line px-[13px] py-[9px] text-[.66rem] text-ink-3 [&>span]:flex [&>span]:items-center [&>span]:gap-[7px] [&>span]:font-semibold [&>span]:text-teal-ink max-[850px]:mb-[18px] max-[600px]:gap-x-2.5 max-[600px]:gap-y-[3px] max-[600px]:px-2.5 max-[600px]:py-2 max-[600px]:text-[.61rem]',
  demoDot: 'size-1.5 rounded-full bg-teal-ink',
  sectionHeading:
    'mb-[18px] flex flex-wrap items-center justify-between gap-2.5 [&_h2]:mb-1 [&_h2]:text-[1.12rem] [&_p]:text-[.76rem] [&_p]:text-ink-3 max-[600px]:[&_h2]:text-base max-[600px]:[&_p]:text-[.69rem]',
  stats: 'grid grid-cols-4 gap-3 max-[1150px]:grid-cols-2 max-[600px]:gap-2.5',
  stat: 'rounded-[14px] border border-line bg-surface px-[15px] pt-[17px] pb-[15px] shadow-card [&>p]:text-[.61rem] [&>p]:text-ink-3 max-[850px]:[&>p]:text-[.67rem] max-[600px]:p-3 max-[600px]:[&>p]:text-[.57rem]',
  statTop:
    'flex items-center justify-between gap-[7px] text-[.67rem] text-ink-2 min-[1600px]:text-[.75rem] max-[1150px]:text-[.75rem] max-[600px]:items-start max-[600px]:text-[.65rem] max-[600px]:[&>span:last-child]:size-[30px] max-[600px]:[&>span:last-child]:rounded-[9px] max-[600px]:[&_svg]:w-[17px]',
  iconTile: 'grid size-[39px] shrink-0 place-items-center rounded-xl hc:border hc:border-current',
  statValue:
    'mt-[7px] flex items-baseline gap-[7px] font-head text-[2rem] leading-[1.6] font-extrabold text-head [&_small]:font-body [&_small]:text-[.7rem] [&_small]:font-normal [&_small]:text-ink-3 max-[600px]:mt-1 max-[600px]:text-[1.8rem]',
  badge:
    'inline-flex items-center gap-[5px] rounded-[25px] px-[9px] py-[3px] text-[.63rem] leading-[1.8] font-medium whitespace-nowrap hc:border hc:border-current',
  dot: 'inline-block size-[5px] shrink-0 rounded-full bg-current',
  sectionTitle:
    'mt-[27px] mb-3.5 flex items-center gap-3 text-base [&>span]:h-px [&>span]:flex-1 [&>span]:bg-line',
  queueGrid: 'grid grid-cols-3 gap-3.5 max-[600px]:grid-cols-1 max-[600px]:gap-2.5',
  queue:
    'block rounded-[15px] border border-line bg-surface p-[18px] shadow-card transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-teal [&_h3]:mt-[13px] [&_h3]:mb-[3px] [&_h3]:text-[.87rem] [&_p]:text-[.68rem] [&_p]:text-ink-3 max-[1150px]:p-3.5 max-[1150px]:[&_h3]:text-[.8rem] max-[600px]:relative max-[600px]:grid max-[600px]:grid-cols-[1fr_auto] max-[600px]:gap-x-2.5 max-[600px]:p-[15px] max-[600px]:[&_h3]:mt-0 max-[600px]:[&_h3]:text-[.86rem] max-[600px]:[&_p]:text-[.66rem]',
  queueTop:
    'flex items-center justify-between [&_strong]:font-head [&_strong]:text-[1.8rem] [&_strong]:font-extrabold [&_strong]:text-head max-[600px]:col-start-2 max-[600px]:row-span-3 max-[600px]:row-start-1 max-[600px]:gap-[13px] max-[600px]:[&>span]:hidden',
  queueLink:
    'mt-3.5 flex items-center justify-between border-t border-line-2 pt-[13px] text-[.68rem] font-medium text-teal-ink max-[600px]:mt-[7px] max-[600px]:justify-start max-[600px]:gap-2 max-[600px]:border-0 max-[600px]:p-0 max-[600px]:text-[.65rem]',
  dashboardGrid:
    'mt-6 grid grid-cols-[1.2fr_1fr] gap-[18px] max-[1150px]:grid-cols-1 max-[600px]:mt-[18px] max-[600px]:gap-[17px]',
  panel: 'overflow-hidden rounded-2xl border border-line bg-surface shadow-card',
  panelHead:
    "flex flex-wrap items-center justify-between gap-2 border-b border-line-2 px-[18px] py-4 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-[9px] [&_h2]:text-[.88rem] [&_h2]:before:h-4 [&_h2]:before:w-[3px] [&_h2]:before:rounded-[5px] [&_h2]:before:bg-gold [&_h2]:before:content-[''] max-[600px]:p-3.5 max-[600px]:[&_h2]:text-[.84rem]",
  textLink: 'flex items-center gap-[5px] text-[.67rem] text-teal-ink',
  small: 'text-[.65rem] text-ink-3',
  pendingList: '',
  pendingItem:
    'flex items-center gap-[11px] border-b border-line-2 px-[18px] py-4 text-ink last:border-0 hover:bg-surface-2 [&_b]:block [&_b]:text-[.74rem] [&_b]:font-medium [&_small]:block [&_small]:text-[.63rem] [&_small]:text-ink-3 max-[600px]:gap-[9px] max-[600px]:p-3.5 max-[600px]:[&_b]:text-[.72rem] max-[600px]:[&_small]:text-[.6rem]',
  fileIcon:
    'grid h-[45px] w-[38px] shrink-0 place-items-center rounded-[9px] border border-line bg-surface-2 text-teal-ink',
  ref: 'mt-0.5 block w-fit text-start text-[.63rem] tracking-[.025em] text-ink-3 tabular-nums [direction:ltr] [unicode-bidi:isolate] max-[600px]:text-[.62rem]',
  pendingEnd:
    'ms-auto flex items-center gap-3 text-ink-3 max-[600px]:flex-col max-[600px]:items-end max-[600px]:gap-1.5',
  timeline:
    "m-0 list-none p-5 [&_li]:relative [&_li]:flex [&_li]:gap-3 [&_li]:pb-[22px] [&_li:last-child]:pb-0 [&_li:not(:last-child)]:before:absolute [&_li:not(:last-child)]:before:start-1.5 [&_li:not(:last-child)]:before:top-[15px] [&_li:not(:last-child)]:before:bottom-0 [&_li:not(:last-child)]:before:w-px [&_li:not(:last-child)]:before:bg-line [&_li:not(:last-child)]:before:content-[''] [&_p]:text-[.72rem] [&_time]:mt-[3px] [&_time]:block [&_time]:text-[.62rem] [&_time]:text-ink-3",
  timelineDot: 'mt-1.5 size-[13px] shrink-0 rounded-full border-[3px] border-current',
  guidance:
    'mt-[22px] flex items-center gap-3.5 rounded-[14px] border border-line bg-teal-lt p-[18px] text-teal-ink [&>svg]:shrink-0 [&>a]:ms-auto [&_h3]:mb-1 [&_h3]:text-[.82rem] [&_p]:text-[.67rem] [&_p]:text-ink-2 max-[1150px]:flex-wrap max-[600px]:items-start max-[600px]:gap-2.5 max-[600px]:p-[15px] max-[600px]:[&>div]:flex-1 max-[600px]:[&>a]:ms-10 max-[600px]:[&_h3]:text-[.78rem] max-[600px]:[&_p]:text-[.65rem]',
  btn: 'inline-flex min-h-10 items-center justify-center gap-[7px] rounded-[10px] border border-transparent px-4 py-2.5 text-[.78rem] leading-[1.6] font-medium no-underline transition-colors duration-150',
  btnSmall: 'min-h-[33px]! px-[11px]! py-1.5! text-[.69rem]!',
  btnOutline: 'border-line! bg-surface text-teal-ink hover:border-teal-ink! hover:bg-teal-lt',
  btnPrimary: 'bg-navy text-white hover:bg-navy-2',
  btnDanger:
    'bg-linear-135 from-[#8e0d2f] via-[#c41e45] via-60% to-[#d13d3d] text-white hover:brightness-110',
  actions: 'mt-5 flex flex-wrap gap-[9px]',
  inlineNotice:
    'mb-5 flex items-start gap-2.5 rounded-[11px] border border-info/22 border-s-[3px] border-s-info bg-info-lt px-[15px] py-[13px] text-[.73rem] text-ink-2 [&>svg]:mt-px [&>svg]:shrink-0 [&>svg]:text-info max-[600px]:p-3 max-[600px]:text-[.69rem]',
  noticeWarn: 'mt-4 border-warn/25! border-s-warn! bg-warn-lt! [&>svg]:text-warn!',
  filters: 'flex flex-wrap items-center gap-2.5 px-[18px] py-[17px] max-[600px]:gap-2 max-[600px]:p-3.5',
  search:
    'flex min-w-[190px] flex-1 items-center gap-[9px] rounded-[10px] border border-line bg-surface-2 px-3 text-ink-3 focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-teal-ink [&_input]:w-full [&_input]:min-w-0 [&_input]:border-0 [&_input]:bg-transparent [&_input]:py-2.5 [&_input]:text-[.72rem] [&_input]:text-ink [&_input]:outline-none [&_input:focus-visible]:outline-none! [&_input:focus-visible]:shadow-none! [&_input::placeholder]:text-ink-3 [&_input::placeholder]:opacity-100 max-[600px]:min-w-full',
  selectLabel:
    '[&_select]:min-h-[41px] [&_select]:max-w-full [&_select]:rounded-[10px] [&_select]:border [&_select]:border-line [&_select]:bg-surface [&_select]:px-[11px] [&_select]:py-2 [&_select]:text-[.71rem] [&_select]:text-ink-2 max-[600px]:flex-1 max-[600px]:[&_select]:w-full max-[600px]:[&_select]:text-[.68rem]',
  tableWrap: 'overflow-auto',
  table:
    'w-full border-collapse text-[.72rem] [&_b]:block [&_b]:min-w-[110px] [&_b]:font-medium [&_small]:mt-0.5 [&_small]:block [&_small]:text-[.62rem] [&_small]:text-ink-3 [&_button]:whitespace-nowrap max-[600px]:block max-[600px]:[&_small]:text-[.59rem]',
  tableHead:
    'max-[600px]:sr-only [&_th]:bg-navy [&_th]:px-3.5 [&_th]:py-3 [&_th]:text-start [&_th]:text-[.67rem] [&_th]:font-medium [&_th]:whitespace-nowrap [&_th]:text-white',
  tableBody: 'max-[600px]:block max-[600px]:w-full max-[600px]:px-3',
  tableRow:
    'even:bg-surface-2 hover:bg-teal-lt [&:last-child_td]:border-b-0 max-[600px]:mb-3 max-[600px]:block max-[600px]:w-full max-[600px]:overflow-hidden max-[600px]:rounded-xl max-[600px]:border max-[600px]:border-line max-[600px]:bg-surface!',
  tableCell:
    'border-b border-line-2 px-3.5 py-4 align-middle max-[600px]:grid max-[600px]:w-full max-[600px]:grid-cols-[95px_minmax(0,1fr)] max-[600px]:items-center max-[600px]:gap-1.5 max-[600px]:px-3 max-[600px]:py-2.5',
  tableLabel: 'hidden self-start pt-0.5 text-[.65rem] text-ink-3 max-[600px]:block',
  clickableRow: 'cursor-pointer transition-colors duration-150 focus-within:bg-teal-lt',
  tableIssue: 'block max-w-[210px] text-[.7rem] max-[600px]:max-w-full',
  blood:
    'inline-grid h-[30px] min-w-[38px] place-items-center rounded-[9px] bg-crimson-lt px-[7px] font-semibold text-crimson-ink [direction:ltr]',
  pagination:
    'flex flex-wrap items-center justify-between gap-3 border-t border-line-2 px-[18px] py-3 text-[.68rem] text-ink-3 [&>div]:flex [&>div]:gap-1 max-[600px]:px-[13px] max-[600px]:py-[11px]',
  pageBtn:
    'grid h-[30px] min-w-[30px] place-items-center rounded-lg border border-line bg-surface text-ink-2 aria-[current=page]:border-navy aria-[current=page]:bg-navy aria-[current=page]:text-white',
  bottomHint: 'mt-[13px]! text-[.68rem] text-ink-3',
  empty:
    'flex min-h-[210px] flex-col items-center justify-center p-[30px] text-center text-ink-3 [&_h3]:mt-3 [&_h3]:mb-[5px] [&_h3]:text-[.95rem] [&_p]:text-[.75rem]',
  tabs: 'mb-5 flex w-fit flex-wrap gap-[5px] rounded-xl border border-line bg-surface p-[5px] [&_button]:flex [&_button]:items-center [&_button]:gap-2 [&_button]:rounded-lg [&_button]:border-0 [&_button]:bg-transparent [&_button]:px-[15px] [&_button]:py-2.5 [&_button]:text-[.75rem] [&_button]:text-ink-2 [&_button[aria-pressed=true]]:bg-navy [&_button[aria-pressed=true]]:text-white [&_button>span]:grid [&_button>span]:h-[23px] [&_button>span]:min-w-[23px] [&_button>span]:place-items-center [&_button>span]:rounded-md [&_button>span]:bg-surface-2 [&_button>span]:text-[.66rem] [&_button>span]:text-ink-2 [&_button[aria-pressed=true]>span]:bg-white/12 [&_button[aria-pressed=true]>span]:text-white max-[600px]:w-full max-[600px]:[&_button]:flex-1 max-[600px]:[&_button]:justify-center max-[600px]:[&_button]:gap-[5px] max-[600px]:[&_button]:px-[5px] max-[600px]:[&_button]:py-[9px] max-[600px]:[&_button]:text-[.65rem] max-[600px]:[&_button_svg]:w-4',
  hospitalSummary:
    'mb-[22px] grid grid-cols-3 gap-3.5 [&>div]:flex [&>div]:items-center [&>div]:gap-[13px] [&>div]:rounded-[14px] [&>div]:border [&>div]:border-line [&>div]:bg-surface [&>div]:p-[17px] [&_strong]:block [&_strong]:font-head [&_strong]:text-[1.5rem] [&_strong]:leading-[1.3] [&_strong]:font-extrabold [&_strong]:text-head [&_small]:mt-1 [&_small]:block [&_small]:text-[.65rem] [&_small]:text-ink-3 max-[1150px]:[&>div]:gap-2 max-[1150px]:[&>div]:p-[13px] max-[600px]:gap-2 max-[600px]:[&>div]:flex-col max-[600px]:[&>div]:items-start max-[600px]:[&>div]:gap-2.5 max-[600px]:[&>div]:px-[9px] max-[600px]:[&>div]:py-3 max-[600px]:[&>div>span:first-child]:size-8 max-[600px]:[&_strong]:text-[1.35rem] max-[600px]:[&_small]:text-[.56rem]',
  hospitalCell: 'flex items-center gap-2.5 max-[600px]:gap-1.5 max-[600px]:[&_b]:text-[.7rem]',
  hospitalIcon:
    'grid size-[38px] shrink-0 place-items-center rounded-[10px] border border-line bg-surface-2 text-teal-ink max-[600px]:hidden',
  footer:
    'mt-[35px] flex flex-wrap justify-between gap-2 border-t border-line pt-[18px] pb-[23px] text-[.64rem] text-ink-3 max-[600px]:mt-[25px] max-[600px]:pb-[18px] max-[600px]:text-[.59rem]',
  toast:
    'pointer-events-none fixed bottom-6 left-1/2 z-100 flex max-w-[calc(100%-28px)] -translate-x-1/2 translate-y-[15px] items-center gap-2.5 rounded-[13px] border border-line bg-surface px-5 py-3.5 text-[.8rem] text-ok opacity-0 shadow-raised transition-[opacity,translate] duration-200 [&>svg]:shrink-0 max-[600px]:bottom-3.5 max-[600px]:w-max max-[600px]:px-[15px] max-[600px]:py-3 max-[600px]:text-[.71rem]',
  toastVisible: 'translate-y-0! opacity-100!',
  modal:
    'fixed inset-0 m-auto max-h-[90dvh] max-w-none overflow-auto rounded-[19px] border border-line bg-surface p-0 font-body text-[.84rem] leading-[1.8] text-ink shadow-[0_24px_80px_#0004] backdrop:bg-[#081b2f99] backdrop:backdrop-blur-sm [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-45 [&_h2]:font-head [&_h2]:font-extrabold [&_h3]:font-head [&_h3]:font-extrabold [&_p]:m-0 max-[600px]:max-h-[94dvh] max-[600px]:rounded-[15px]',
  modalWidth: 'w-[min(620px,calc(100%-32px))] max-[600px]:w-[calc(100%-20px)]',
  modalWide: 'w-[min(1000px,calc(100%-32px))] max-[600px]:w-[calc(100%-20px)]',
  modalHead:
    'sticky top-0 z-3 flex items-center justify-between gap-4 border-b border-line bg-surface px-[22px] py-[17px] [&_h2]:text-[1.1rem] [&_h2:focus]:outline-none! [&_h2:focus]:shadow-none! [&_p]:text-right [&_p]:text-[.7rem] [&_p]:text-ink-3 [&_p]:[direction:ltr] max-[600px]:px-4 max-[600px]:py-3.5 max-[600px]:[&_h2]:text-base',
  iconBtn:
    'grid size-[34px] shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-2 hover:bg-surface-2',
  modalBody: 'p-[23px] max-[600px]:p-[15px]',
  reviewGrid: 'grid grid-cols-2 gap-6 [&>*]:min-w-0 max-[850px]:grid-cols-1',
  modalSectionTitle: 'mb-3 flex flex-wrap items-center justify-between gap-2.5 [&_h3]:text-[.95rem]',
  details:
    'mt-2 mb-[18px] [&>div]:grid [&>div]:grid-cols-[minmax(100px,.85fr)_minmax(0,1.4fr)] [&>div]:gap-2.5 [&>div]:border-b [&>div]:border-dashed [&>div]:border-line [&>div]:py-2.5 [&>div]:text-[.75rem] [&>div:last-child]:border-0 [&_dt]:text-ink-3 [&_dd]:m-0 [&_dd]:font-medium [&_dd]:wrap-anywhere max-[600px]:[&>div]:text-[.7rem]',
  decision: 'mt-5 border-t border-line pt-[18px] [&_h3]:mb-3 [&_h3]:text-[.94rem]',
  decisions: 'mb-[17px] flex flex-wrap gap-[7px]',
  choice:
    'flex cursor-pointer items-center gap-[7px] rounded-[9px] border border-line bg-surface-2 px-[11px] py-[9px] text-[.73rem] [&_input]:size-[15px] [&_input]:accent-teal max-[600px]:px-[9px] max-[600px]:py-2 max-[600px]:text-[.7rem]',
  selected: 'border-teal-ink! bg-teal-lt! text-teal-ink!',
  field:
    'block text-[.8rem] font-medium [&_textarea]:mt-[7px] [&_textarea]:block [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-[10px] [&_textarea]:border [&_textarea]:border-line [&_textarea]:bg-surface-2 [&_textarea]:px-3 [&_textarea]:py-2.5 [&_textarea]:text-[.78rem] [&_textarea]:font-normal [&_textarea]:text-ink',
  required: 'text-crimson',
  hint: 'mt-1.5! text-[.66rem] text-ink-3',
  reviewNote:
    'mt-[18px] rounded-xl border border-line bg-surface-2 p-4 [&_p]:mt-2.5! [&_p]:text-[.8rem] [&_p]:wrap-anywhere [&_small]:text-[.7rem] [&_small]:text-ink-3',
  evidence:
    'rounded-xl border border-line bg-surface-2 p-[17px] [&_h3]:mb-1.5 [&_h3]:text-[.83rem] [&_h3:not(:first-child)]:mt-[18px] [&_p]:text-[.76rem] [&_p]:text-ink-2 [&_blockquote]:mt-2 [&_blockquote]:border-s-[3px] [&_blockquote]:border-gold [&_blockquote]:ps-3 [&_blockquote]:text-[.76rem] [&_blockquote]:text-ink-2',
  documentArea:
    'rounded-xl border border-line bg-surface-2 p-[15px] max-[850px]:mx-auto max-[850px]:w-full max-[850px]:max-w-[480px] max-[600px]:p-2.5',
  documentLabel: 'mb-3.5 flex items-center justify-between gap-[7px] text-[.72rem] text-ink-2',
  document:
    'relative isolate min-h-[410px] overflow-hidden rounded-[3px] border border-[#dce2e9] bg-[#fffefb] px-[22px] pt-[26px] pb-[15px] text-[#15202b] shadow-[0_5px_12px_#0e2a4708] [&_h3]:my-5 [&_h3]:text-center [&_h3]:text-[.95rem] [&_h3]:text-[#0e2a47] [&_dt]:text-[#5f6b78]! [&_dl>div]:border-[#dce2e9]! [&_dl>div]:text-[.7rem]! max-[600px]:px-[15px] max-[600px]:pt-5 max-[600px]:pb-[13px]',
  documentBrand:
    'text-center font-head text-[1.05rem] leading-[1.6] font-extrabold text-[#0e2a47] [&_small]:mt-1.5 [&_small]:block [&_small]:font-body [&_small]:text-[.67rem] [&_small]:font-normal [&_small]:text-[#5f6b78]',
  documentRule: 'mt-[18px] h-0.5 bg-[#0e2a47]',
  documentSign: 'mt-6 flex items-center justify-between gap-2 text-[.7rem]',
  stamp:
    'grid size-[75px] -rotate-13 place-content-center rounded-full border-2 border-double border-[#306da26b] text-center leading-[1.5] text-[#306da2] outline-1 -outline-offset-6 outline-[#306da26b]',
  documentWatermark:
    'pointer-events-none absolute top-[42%] left-[5%] -z-1 w-[95%] -rotate-35 text-center font-head text-[2.6rem] font-extrabold text-[#b3163e0a]',
  documentFoot: 'mt-5! border-t border-[#dce2e9] pt-3 text-center text-[.55rem] text-[#5f6b78]',
};
