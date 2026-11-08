// المربع الصغير اللي بيكتب فصيلة الدم (مثلاً O+). الفصيلة إنجليزي جوه نص عربي، عشان كده dir="ltr".
//   solid = أحمر متدرج (للطلب العاجل)
//   size  = 'md' (العادي) أو 'lg' (الكبير اللي في كارت المتبرع)
//   onCard = أبيض (لما يتحط فوق الكارت الكحلي)
export default function BloodTypeChip({ type, solid = false, size = 'md', onCard = false }) {
  const sizeClass =
    size === 'lg'
      ? 'size-[58px] rounded-[18px] text-[1.3rem]'
      : 'h-[30px] min-w-11 rounded-[10px] px-2 text-[0.86rem]';

  let colorClass = 'bg-crimson-lt text-crimson-ink';
  if (solid) colorClass = 'bg-urgent text-white';
  if (onCard) colorClass = 'bg-white text-[#8E0D2F]';

  return (
    <span
      dir="ltr"
      className={`font-head inline-grid place-items-center font-bold ${sizeClass} ${colorClass}`}
    >
      {type.replace('-', '−')}
    </span>
  );
}
