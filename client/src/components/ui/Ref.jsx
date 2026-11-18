import clsx from 'clsx';

export default function Ref({ children, className }) {
  return (
    <span dir="ltr" className={clsx('inline-block font-semibold tabular-nums', className)}>
      {children}
    </span>
  );
}
