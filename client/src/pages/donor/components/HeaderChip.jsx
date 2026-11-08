// الشارة الشفافة اللي بتبقى على جنب الشريط الكحلي (زي رقم المتبرع).
export default function HeaderChip({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-[11px] py-1 text-[0.74rem] font-medium backdrop-blur-sm">
      {children}
    </span>
  );
}
