// Stub from feat/frontend-setup. R3 replaces this whole file on feat/ui-basics.
// Keep the same file name, the same export and the same props (see the DevKit).
// Props: as = 'button', variant = 'primary', size = 'md', block, loading, icon, className, ...props
export default function Button({
  as: Tag = 'button',
  variant,
  size,
  block,
  loading,
  icon,
  children,
  ...props
}) {
  void [variant, size, block, icon]; // the real Button uses these; here we only keep them off the HTML tag
  const isButton = Tag === 'button';
  return (
    <Tag
      type={isButton ? (props.type ?? 'button') : undefined}
      disabled={isButton ? props.disabled || loading : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
