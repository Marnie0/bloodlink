import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck } from 'lucide-react';

// Only link to existing routes. Replace unavailable items as their pages are built.
const sections = [
  {
    title: 'الخدمات',
    links: [
      { label: 'تقديم طلب دم', to: '/requests/new' },
      { label: 'تسجيل متبرع', to: '/signup' },
      { label: 'الاستعلام عن طلب' },
      { label: 'تأكيد تبرع' },
    ],
  },
  {
    title: 'المستشفيات',
    links: [
      { label: 'دليل المستشفيات' },
      { label: 'طلب الشراكة', to: '/hospital/join' },
      { label: 'بوابة الموظفين', to: '/hospital' },
    ],
  },
  {
    title: 'المساعدة',
    links: [
      { label: 'الأسئلة الشائعة' },
      { label: 'علامات الثقة' },
      { label: 'الإبلاغ عن مخالفة' },
      { label: 'تواصل معنا' },
    ],
  },
  {
    title: 'عن المنصة',
    links: [
      { label: 'من نحن' },
      { label: 'الشروط والأحكام', to: '/terms' },
      { label: 'سياسة الخصوصية' },
      { label: 'إمكانية الوصول' },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="border-gold hc:bg-black hc:text-white mt-5 shrink-0 border-t-2 bg-[#0a1f35] text-[.82rem] leading-[1.8] text-[#c9d3dd] [&_a:focus-visible]:shadow-none [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#e6c46e]"
      dir="rtl"
      aria-label="تذييل رابط الحياة"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-5 gap-y-7 px-4 py-8 min-[900px]:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))] min-[900px]:gap-8 min-[900px]:py-9 [&>*]:min-w-0">
        <div className="col-span-full min-[900px]:col-span-1">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-3 rounded-lg text-white no-underline"
            aria-label="رابط الحياة — الرئيسية"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#a9842f] bg-white/[.03] text-[#ff9aae]">
              <HeartPulse size={25} aria-hidden="true" />
            </span>
            <span>
              <strong className="font-head block text-[1.1rem] leading-[1.4] font-extrabold">
                رابط الحياة
              </strong>
              <span
                className="mt-[.1rem] block w-fit text-[.68rem] tracking-[.08em] text-[#e6c46e]"
                lang="en"
                dir="ltr"
              >
                BloodLink
              </span>
            </span>
          </Link>
          <p className="hc:text-white mt-4 max-w-md leading-[1.95] text-[#bac8d5]">
            منصة مجتمعية مستقلة تربط المرضى المحتاجين للدم بالمتبرعين، عبر أوراق رسمية من المستشفيات. ليست جهة
            حكومية ولا طبية.
          </p>
        </div>

        {sections.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <h2 className="font-head mb-[.65rem] inline-block border-b-2 border-[#a9842f] pb-[.4rem] text-[.9rem] leading-[1.6] font-bold text-white">
              {section.title}
            </h2>
            <ul className="m-0 list-none space-y-[.3rem] p-0 max-sm:space-y-0">
              {section.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="hc:text-white inline-flex min-h-8 flex-wrap items-center gap-[.4rem] py-[.2rem] leading-[1.7] text-[#c9d3dd] no-underline underline-offset-4 transition-colors duration-150 hover:text-white hover:underline max-sm:min-h-11"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span
                      className="hc:text-white inline-flex min-h-8 cursor-default flex-wrap items-center gap-[.4rem] py-[.2rem] leading-[1.7] text-[#a8b8c8] max-sm:min-h-11"
                      role="link"
                      aria-disabled="true"
                    >
                      <span>{link.label}</span>
                      <span className="hc:border-white hc:text-white rounded-2xl border border-white/12 px-[.35rem] text-[.6rem] whitespace-nowrap text-[#bac8d5]">
                        قريبًا
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="hc:border-white hc:bg-black hc:text-white border-y border-[#23394f] bg-[#071728] text-[.76rem] text-[#b5c2cf]">
        <div className="mx-auto flex w-full max-w-7xl items-start gap-[.65rem] px-4 py-4">
          <ShieldCheck size={20} className="mt-[.15rem] shrink-0 text-[#e6c46e]" aria-hidden="true" />
          <p className="m-0">
            <strong className="font-semibold text-[#e6c46e]">إخلاء مسؤولية:</strong> المنصة وسيط للتواصل فقط
            ولا تتحمل أي مسؤولية طبية. التبرع مجاني، واللقاء في المستشفى دائمًا، والقرار الطبي للمستشفى.
          </p>
        </div>
      </div>
    </footer>
  );
}
