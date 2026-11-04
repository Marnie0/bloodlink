import React from 'react';
import { useState } from 'react';
import Breadcrumb from './components/Breadcrumb';
import PageHeader from './components/PageHeader';
import TocMenu from './components/TocMenu';
import TermsArticle from './components/TermsArticle';

const TermsPage = () => {
  const [theme, setTheme] = useState('light');

  return (
    <div
      dir="rtl"
      lang="ar"
      /* your index.css selectors: [data-theme='dark'] and .hc - they cascade to every child */
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 md:px-6">
        <Breadcrumb />
        <PageHeader />
      </div>

      <main className="mx-auto w-full max-w-[1240px] px-4 pt-[22px] pb-10 md:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside>
            <TocMenu />
          </aside>
          <TermsArticle />
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
