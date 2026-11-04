import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from './components/PageHeader';
import TocMenu from './components/TocMenu';
import TermsArticle from './components/TermsArticle';

const TermsPage = () => {
  return (
    <div dir="rtl" lang="ar">
      <div className="mx-auto w-full max-w-310 px-4 md:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: 'شروط الاستخدام' }]} />
        <PageHeader />
      </div>

      <main className="mx-auto w-full max-w-310 px-4 pt-5.5 pb-10 md:px-6">
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
