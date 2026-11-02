import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  FileCheck2,
  Flag,
  HeartPulse,
  Hospital,
  LayoutDashboard,
  Moon,
  RotateCcw,
  ShieldCheck,
  Sun,
} from 'lucide-react';
import AdminProvider from './AdminProvider';
import { useAdmin } from './AdminContext';
import { formatNumber } from './adminData';
import { Modal } from './AdminUI';
import './admin.css';

const pages = [
  {
    to: '/admin',
    title: 'لوحة الإدارة',
    subtitle: 'نظرة واضحة على المنصة، ومتابعة كل ما يحتاج إلى اهتمامك.',
    icon: LayoutDashboard,
    short: 'نظرة عامة',
  },
  {
    to: '/admin/papers',
    title: 'مراجعة الأوراق',
    subtitle: 'راجع الأوراق التي تحتاج إلى تدقيق يدوي، وسجّل قرارك وسببه.',
    icon: FileCheck2,
    short: 'مراجعة الأوراق',
    collection: 'papers',
  },
  {
    to: '/admin/reports',
    title: 'البلاغات والحظر',
    subtitle: 'راجع البلاغات، واتخذ الإجراء المناسب للحفاظ على مجتمع آمن.',
    icon: Flag,
    short: 'البلاغات والحظر',
    collection: 'reports',
  },
  {
    to: '/admin/hospitals',
    title: 'اعتماد المستشفيات',
    subtitle: 'راجع طلبات الشراكة وبيانات المنشآت قبل اعتمادها.',
    icon: Hospital,
    short: 'اعتماد المستشفيات',
    collection: 'hospitals',
  },
];
function AdminShell() {
  const { pathname } = useLocation();
  const page = pages.find((entry) => entry.to === pathname.replace(/\/$/, '')) || pages[0];
  const { data, notice, storageError, resetDemo } = useAdmin();
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );
  const [resetOpen, setResetOpen] = useState(false);
  useEffect(() => {
    // Clear preferences left by the removed font-size and contrast controls.
    document.documentElement.classList.remove('fs-s', 'fs-l', 'hc');
  }, []);
  const pendingCount =
    data.papers.filter((item) => item.status === 'pending').length +
    data.reports.filter((item) => item.status === 'open').length +
    data.hospitals.filter((item) => item.status === 'pending').length;
  useEffect(() => {
    const previous = document.title;
    document.title = `${page.title} · رابط الحياة`;
    return () => {
      document.title = previous;
    };
  }, [page.title]);
  function changeTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }
  return (
    <div className="ad-app" dir="rtl">
      <a className="ad-skip" href="#admin-content">
        انتقل إلى المحتوى
      </a>
      <div className="ad-utility">
        <div className="ad-container">
          <span>
            <ShieldCheck size={14} /> بوابة إدارة رابط الحياة
          </span>
          <div className="ad-utility-controls">
            <button
              onClick={changeTheme}
              aria-label={theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
      <header className="ad-header">
        <div className="ad-container">
          <Link className="ad-brand" to="/">
            <span className="ad-brand-mark">
              <HeartPulse size={29} />
            </span>
            <span>
              <strong>رابط الحياة</strong>
              <small>خدمات رقمية لربط المرضى بمتبرعي الدم</small>
              <em>BLOODLINK · EVERY DROP MATTERS</em>
            </span>
          </Link>
          <div className="ad-header-actions">
            <span className="ad-admin-user">
              <span className="ad-avatar">خ أ</span>
              <span>
                <b>خالد عاطف</b>
                <small>مسؤول النظام · تجريبي</small>
              </span>
            </span>
          </div>
        </div>
      </header>
      <div className="ad-navband">
        <div className="ad-container">
          <span>
            <ShieldCheck size={18} /> مركز إدارة المنصة
          </span>
          <span className="ad-navband-note">معًا، نجعل كل فرصة للتبرع أكثر أمانًا</span>
        </div>
      </div>
      <div className="ad-container">
        <nav className="ad-breadcrumb" aria-label="مسار التنقل">
          <Link to="/">الرئيسية</Link>
          <span>‹</span>
          <Link to="/admin">بوابة الإدارة</Link>
          {pathname !== '/admin' && (
            <>
              <span>‹</span>
              <span aria-current="page">{page.title}</span>
            </>
          )}
        </nav>
        <div className="ad-page-head">
          <div>
            <span className="ad-eyebrow">
              <span className="ad-dot" /> إدارة المنصة
            </span>
            <h1>{page.title}</h1>
            <p>{page.subtitle}</p>
          </div>
          <span className="ad-head-chip">
            <ShieldCheck size={17} /> {formatNumber(pendingCount)} عناصر بانتظار المراجعة
          </span>
        </div>
        <div className="ad-workspace">
          <aside className="ad-sidebar">
            <div className="ad-sidebar-label">مساحة الإدارة</div>
            <nav aria-label="صفحات الإدارة">
              {pages.map((entry) => {
                const Icon = entry.icon;
                const count = entry.collection
                  ? data[entry.collection].filter(
                      (item) => item.status === (entry.collection === 'reports' ? 'open' : 'pending'),
                    ).length
                  : null;
                return (
                  <NavLink
                    end={entry.to === '/admin'}
                    key={entry.to}
                    to={entry.to}
                    className={({ isActive }) => `ad-nav-item ${isActive ? 'ad-active' : ''}`}
                  >
                    <Icon size={19} />
                    <span>{entry.short}</span>
                    {count !== null && <span className="ad-nav-count">{formatNumber(count)}</span>}
                  </NavLink>
                );
              })}
            </nav>
            <div className="ad-sidebar-foot">
              <ShieldCheck size={23} />
              <h3>الثقة تبدأ بالمراجعة</h3>
              <p>كل ورقة تراجعها، وكل بلاغ تتعامل معه، يقرّب المساعدة ممن يحتاجها.</p>
            </div>
          </aside>
          <div id="admin-content" tabIndex={-1} className="ad-content">
            <div className="ad-demo-note">
              <span>
                <span className="ad-demo-dot" /> نسخة عرض تفاعلية
              </span>
              <p>
                {storageError
                  ? 'التخزين المحلي غير متاح؛ التغييرات محفوظة خلال الجلسة الحالية فقط.'
                  : 'بيانات تجريبية · القرارات محفوظة على هذا المتصفح فقط.'}
              </p>
              <button className="ad-demo-reset" onClick={() => setResetOpen(true)}>
                <RotateCcw size={14} /> إعادة البيانات التجريبية
              </button>
            </div>
            <Outlet />
          </div>
        </div>
        <footer className="ad-footer">
          <span>© {new Date().getFullYear()} رابط الحياة · كل قطرة تصنع فرقًا</span>
          <span>التبرع مجاني · اللقاء داخل المستشفى · القرار الطبي للمستشفى</span>
        </footer>
      </div>
      <div role="status" aria-live="polite" className={`ad-toast ${notice ? 'ad-toast-visible' : ''}`}>
        {notice && (
          <>
            <CheckCircle2 size={21} />
            <span>{notice}</span>
          </>
        )}
      </div>
      {resetOpen && (
        <Modal title="إعادة البيانات التجريبية؟" onClose={() => setResetOpen(false)}>
          <p>سيتم مسح قرارات المراجعة والحظر المحلية واستعادة الأمثلة الأصلية في جزء الإدارة.</p>
          <div className="ad-actions">
            <button
              className="ad-btn ad-btn-danger"
              onClick={() => {
                resetDemo();
                setResetOpen(false);
              }}
            >
              إعادة البيانات
            </button>
            <button className="ad-btn ad-btn-outline" onClick={() => setResetOpen(false)}>
              إلغاء
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default function AdminLayout() {
  return (
    <AdminProvider>
      <AdminShell />
    </AdminProvider>
  );
}
