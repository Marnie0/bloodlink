import React from 'react';

import Notice from '@/components/ui/Notice';

const TermsArticle = () => {
  const h2 = 'mt-[18px] mb-1.5 scroll-mt-5 text-[1.05rem] font-extrabold';
  const p = 'm-0 leading-[1.9]';

  return (
    <article className="rounded-card border-line bg-surface shadow-card hc:border-2 min-w-0 border">
      <div className="p-4 sm:p-4.5">
        <Notice tone="gold" title="باختصار">
          المنصة وسيط للتواصل فقط. التبرع مجاني، واللقاء داخل المستشفى، والقرار الطبي للمستشفى وحده.
        </Notice>

        <section aria-labelledby="what">
          <h2 id="what" className={h2}>
            ١. ما هي المنصة
          </h2>
          <p className={p}>
            رابط الحياة منصة مجتمعية تربط من يحتاج دماً بمتبرعين قريبين. لا نجمع الدم ولا نخزّنه ولا ننقله.
          </p>
        </section>

        <section aria-labelledby="medical">
          <h2 id="medical" className={h2}>
            ٢. لا مسؤولية طبية
          </h2>
          <p className={p}>
            لا تقدّم المنصة أي نصيحة طبية. الفريق الطبي في المستشفى هو من يقرر إن كان المتبرع مؤهلاً، وإن كان
            المريض يحتاج الدم.
          </p>
        </section>

        <section aria-labelledby="money">
          <h2 id="money" className={h2}>
            ٣. لا أموال
          </h2>
          <p className={p}>التبرع مجاني تماماً. يُمنع طلب أي مقابل أو عرضه. أي مخالفة تؤدي إلى حظر الحساب.</p>
        </section>

        <section aria-labelledby="meet">
          <h2 id="meet" className={h2}>
            ٤. اللقاء في المستشفى
          </h2>
          <p className={p}>
            يلتقي المتبرع وصاحب الطلب داخل المستشفى فقط، ولا نشارك رقم الهاتف إلا بعد موافقة المتبرع.
          </p>
        </section>

        <section aria-labelledby="papers">
          <h2 id="papers" className={h2}>
            ٥. الأوراق والخصوصية
          </h2>
          <p className={p}>
            الأوراق التي ترفعها خاصة ولا تظهر لأي مستخدم. علامة «تبدو سليمة» تعني أن الورقة اجتازت فحصاً
            آلياً، ولا تعني أنها صحيحة؛ صاحب الورقة مسؤول عن صحتها.
          </p>
        </section>

        <section aria-labelledby="reports">
          <h2 id="reports" className={h2}>
            ٦. الإبلاغ والحظر
          </h2>
          <p className={p}>
            يمكن الإبلاغ عن أي طلب أو حساب. يراجع فريقنا البلاغات، وقد يحذّر الحساب أو يحظره.
          </p>
        </section>
      </div>
    </article>
  );
};

export default TermsArticle;
