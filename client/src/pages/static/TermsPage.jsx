import Breadcrumb from '@/components/ui/Breadcrumb';
import PageHeader from '@/components/ui/PageHeader';
import TocMenu from './components/TocMenu';
import TermsArticle from './components/TermsArticle';

const TermsPage = () => {
  return (
    <div dir="rtl" lang="ar">
      <div className="mx-auto w-full max-w-310 px-4 md:px-6">
        <Breadcrumb items={[{ label: 'الرئيسية', to: '/' }, { label: 'شروط الاستخدام' }]} />
        <PageHeader
          title="شروط الاستخدام"
          subtitle={
            <>
              آخر تحديث{' '}
              <span dir="ltr" className="inline-block tabular-nums">
                15/10/2026
              </span>{' '}
              · اقرأها قبل إنشاء حسابك.
            </>
          }
          chips={
            <span className="hc:border-white inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-[11px] py-1 text-[0.74rem] font-medium backdrop-blur-[6px]">
              قراءة ٣ دقائق
            </span>
          }
        />
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
