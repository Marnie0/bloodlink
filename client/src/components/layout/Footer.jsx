import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

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
  const year = new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    calendar: 'gregory',
    timeZone: 'Africa/Cairo',
  }).format(new Date());

  return (
    <footer className={styles.siteFooter} dir="rtl" aria-label="تذييل رابط الحياة">
      <div className={`${styles.inner} ${styles.columns}`}>
        <div className={styles.about}>
          <Link to="/" className={styles.brand} aria-label="رابط الحياة — الرئيسية">
            <span className={styles.brandMark}>
              <HeartPulse size={25} aria-hidden="true" />
            </span>
            <span>
              <strong>رابط الحياة</strong>
              <span className={styles.brandEnglish} lang="en" dir="ltr">
                BloodLink
              </span>
            </span>
          </Link>
          <p>
            منصة مجتمعية مستقلة تربط المرضى المحتاجين للدم بالمتبرعين، عبر أوراق رسمية من المستشفيات. ليست جهة
            حكومية ولا طبية.
          </p>
        </div>

        {sections.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <h2 className={styles.heading}>{section.title}</h2>
            <ul className={styles.links}>
              {section.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className={styles.link}>
                      {link.label}
                    </Link>
                  ) : (
                    <span className={styles.unavailable} role="link" aria-disabled="true">
                      <span>{link.label}</span>
                      <span className={styles.comingSoon}>قريبًا</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className={styles.disclaimer}>
        <div className={`${styles.inner} ${styles.disclaimerContent}`}>
          <ShieldCheck size={20} aria-hidden="true" />
          <p>
            <strong>إخلاء مسؤولية:</strong> المنصة وسيط للتواصل فقط ولا تتحمل أي مسؤولية طبية. التبرع مجاني،
            واللقاء في المستشفى دائمًا، والقرار الطبي للمستشفى.
          </p>
        </div>
      </div>

      <div className={`${styles.inner} ${styles.legal}`}>
        <span>
          © {year} رابط الحياة · مشروع تخرج <bdi lang="en">DEPI</bdi>
        </span>
        <span>كل قطرة تصنع فرقًا</span>
      </div>
    </footer>
  );
}
