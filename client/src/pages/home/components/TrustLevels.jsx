import TrustBadge from '@/components/ui/TrustBadge';
import { cardClass } from '../homeFormat';

const LEVELS = [
  { level: 'verified', text: 'ورقة صادرة من مستشفى شريك، وأكّدها المستشفى بنفسه.' },
  {
    level: 'looks_valid',
    text: 'من مستشفى رسمي غير شريك، فحصها الذكاء الاصطناعي. لا تعني أننا تأكدنا منها، وصاحبها مسؤول عن صحتها.',
  },
  {
    level: 'needs_review',
    text: 'لم يستطع الفحص الآلي قراءة الورقة. يراجعها فريقنا، ولا يُنشر الطلب قبل ذلك.',
  },
];

export default function TrustLevels() {
  return (
    <article className={`${cardClass} p-[18px] sm:col-span-2`}>
      <h3 className="text-base font-bold">مستويات الثقة</h3>
      <ul>
        {LEVELS.map(({ level, text }) => (
          <li
            key={level}
            className="border-line flex items-start gap-3 border-b border-dashed py-3 last:border-0 last:pb-0"
          >
            <TrustBadge level={level} />
            <p className="text-ink-2 text-[0.82rem]">{text}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
