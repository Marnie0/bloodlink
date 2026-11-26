import { Link } from 'react-router-dom';
import { Banknote, Hospital, ShieldCheck } from 'lucide-react';

const RULES = [
  { icon: Hospital, text: 'اللقاء داخل المستشفى فقط' },
  { icon: Banknote, text: 'لا أموال، أبداً' },
  { icon: ShieldCheck, text: 'القرار الطبي للمستشفى' },
];

// The navy strip with the three platform rules
export default function RulesBar() {
  return (
    <article
      aria-label="قواعد المنصة"
      className="rounded-card bg-navy hc:border-2 hc:border-white flex flex-wrap items-center gap-4 p-[18px] text-white sm:col-span-2 lg:col-span-4"
    >
      {RULES.map(({ icon: Icon, text }) => (
        <div
          key={text}
          className="font-head flex min-w-[200px] flex-1 items-center gap-2.5 text-[0.92rem] font-semibold"
        >
          <Icon className="hc:text-white size-5 shrink-0 text-[#FF9A8A]" aria-hidden="true" />
          {text}
        </div>
      ))}
      <Link
        to="/terms"
        className="text-navy rounded-[10px] bg-white px-3 py-1.5 text-[0.8rem] font-semibold hover:bg-white/90"
      >
        الشروط والأحكام
      </Link>
    </article>
  );
}
