import { useState } from 'react';
import { cardClass } from '../homeFormat';

// "Did you find what you need?" Only shows a thank-you for now (nothing is sent anywhere).
export default function PageFeedback() {
  const [answered, setAnswered] = useState(false);

  return (
    <div
      className={`${cardClass} mt-5.5 flex min-h-[60px] flex-wrap items-center justify-between gap-2 px-[18px] py-3 text-[0.84rem]`}
    >
      <p role="status">
        {answered ? 'شكراً لك، رأيك يساعدنا على تحسين الصفحة.' : 'هل وجدت ما تبحث عنه في هذه الصفحة؟'}
      </p>
      {!answered && (
        <div className="flex gap-2">
          {['نعم', 'لا'].map((answer) => (
            <button
              key={answer}
              type="button"
              onClick={() => setAnswered(true)}
              className="border-line bg-surface text-teal-ink hover:border-teal-ink hover:bg-teal-lt hc:border-2 rounded-[10px] border px-3 py-1.5 text-[0.8rem] font-semibold"
            >
              {answer}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
