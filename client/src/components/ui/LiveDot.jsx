// نقطة صغيرة بتنبض (زي "متاح للطلبات" و "عاجل"). لونها لون الكلام اللي جنبها.
export default function LiveDot() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block size-2 shrink-0 rounded-full bg-current after:absolute after:-inset-1 after:animate-ping after:rounded-full after:border-2 after:border-current after:content-[''] motion-reduce:after:animate-none"
    />
  );
}
