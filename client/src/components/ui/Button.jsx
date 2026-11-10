import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-urgent text-white shadow-urgent hover:brightness-105',
  secondary: 'bg-navy text-white hover:bg-navy-2',
  outline: 'border-line bg-surface text-teal-ink hover:border-teal-ink hover:bg-teal-lt',
  ghost: 'border-line-2 bg-surface-2 text-ink',
  danger: 'border-crimson bg-surface text-crimson-ink hover:bg-crimson-lt',
  link: 'bg-transparent px-1.5 text-crimson-ink',
  whatsapp: 'bg-wa text-white hover:brightness-110',
};

const SIZES = {
  md: 'rounded-field px-5 py-2.5 text-[0.92rem]',
  sm: 'rounded-[10px] px-3 py-1.5 text-[0.8rem]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  block = false,
  icon: Icon,
  as: Tag = 'button',
  disabled = false,
  type,
  className = '',
  children,
  ...rest
}) {
  const isButton = Tag === 'button';
  return (
    <Tag
      {...(isButton ? { type: type ?? 'button', disabled: disabled || loading } : {})}
      aria-busy={loading || undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
      className={`hc:border-2 hc:border-ink inline-flex min-h-11 items-center justify-center gap-2 border border-transparent font-semibold whitespace-nowrap no-underline transition active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-progress ${SIZES[size]} ${VARIANTS[variant]} ${block ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
      ) : (
        Icon && <Icon className="size-4" aria-hidden="true" />
      )}
      {children}
    </Tag>
  );
}
