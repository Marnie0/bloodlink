import React from 'react';

const TocMenu = () => {
  const item = 'flex items-center justify-between rounded-[10px] px-3 py-[9px] text-small text-ink';

  return (
    <nav
      aria-label="المحتويات"
      className="rounded-card border-line bg-surface shadow-card hc:border-2 border lg:sticky lg:top-5"
    >
      <div className="border-line-2 flex items-center gap-2.5 border-b px-4.5 py-3.5">
        <h3 className="before:bg-gold m-0 flex items-center gap-2.5 text-base font-bold before:h-4.5 before:w-1 before:rounded before:content-['']">
          المحتويات
        </h3>
      </div>

      {/* 1 column on phones, 2 from 440px, 1 again in the desktop side column */}
      <ul className="xs:grid-cols-2 m-0 grid list-none grid-cols-1 p-1.5 lg:grid-cols-1">
        <li>
          <span className={item}>١. ما هي المنصة</span>
        </li>
        <li>
          <span className={item}>٢. لا مسؤولية طبية</span>
        </li>
        <li>
          <span className={item}>٣. لا أموال</span>
        </li>
        <li>
          <span className={item}>٤. اللقاء في المستشفى</span>
        </li>
        <li>
          <span className={item}>٥. الأوراق والخصوصية</span>
        </li>
        <li>
          <span className={item}>٦. الإبلاغ والحظر</span>
        </li>
      </ul>
    </nav>
  );
};

export default TocMenu;
