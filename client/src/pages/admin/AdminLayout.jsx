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
    <div className="bl-admin-app" dir="rtl">
      <a className="bl-admin-skip" href="#admin-content">
        انتقل إلى المحتوى
      </a>
      <div className="bl-admin-utility">
        <div className="bl-admin-container">
          <span>
            <ShieldCheck size={14} /> بوابة إدارة رابط الحياة
          </span>
          <div className="bl-admin-utility-controls">
            <button
              onClick={changeTheme}
              aria-label={theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>
      <header className="bl-admin-header">
        <div className="bl-admin-container">
          <Link className="bl-admin-brand" to="/">
            <span className="bl-admin-brand-mark">
              <HeartPulse size={29} />
            </span>
            <span>
              <strong>رابط الحياة</strong>
              <small>خدمات رقمية لربط المرضى بمتبرعي الدم</small>
              <em>BLOODLINK · EVERY DROP MATTERS</em>
            </span>
          </Link>
          <div className="bl-admin-header-actions">
            <span className="bl-admin-admin-user">
              <span className="bl-admin-avatar">خ أ</span>
              <span>
                <b>خالد عاطف</b>
                <small>مسؤول النظام · تجريبي</small>
              </span>
            </span>
          </div>
        </div>
      </header>
      <div className="bl-admin-navband">
        <div className="bl-admin-container">
          <span>
            <ShieldCheck size={18} /> مركز إدارة المنصة
          </span>
          <span className="bl-admin-navband-note">معًا، نجعل كل فرصة للتبرع أكثر أمانًا</span>
        </div>
      </div>
      <div className="bl-admin-container">
        <nav className="bl-admin-breadcrumb" aria-label="مسار التنقل">
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
        <div className="bl-admin-page-head">
          <div>
            <span className="bl-admin-eyebrow">
              <span className="bl-admin-dot" /> إدارة المنصة
            </span>
            <h1>{page.title}</h1>
            <p>{page.subtitle}</p>
          </div>
          <span className="bl-admin-head-chip">
            <ShieldCheck size={17} /> {formatNumber(pendingCount)} عناصر بانتظار المراجعة
          </span>
        </div>
        <div className="bl-admin-workspace">
          <aside className="bl-admin-sidebar">
            <div className="bl-admin-sidebar-label">مساحة الإدارة</div>
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
                    className={({ isActive }) => `bl-admin-nav-item ${isActive ? 'bl-admin-active' : ''}`}
                  >
                    <Icon size={19} />
                    <span>{entry.short}</span>
                    {count !== null && <span className="bl-admin-nav-count">{formatNumber(count)}</span>}
                  </NavLink>
                );
              })}
            </nav>
            <div className="bl-admin-sidebar-foot">
              <ShieldCheck size={23} />
              <h3>الثقة تبدأ بالمراجعة</h3>
              <p>كل ورقة تراجعها، وكل بلاغ تتعامل معه، يقرّب المساعدة ممن يحتاجها.</p>
            </div>
          </aside>
          <div id="admin-content" tabIndex={-1} className="bl-admin-content">
            <div className="bl-admin-demo-note">
              <span>
                <span className="bl-admin-demo-dot" /> نسخة عرض تفاعلية
              </span>
              <p>
                {storageError
                  ? 'التخزين المحلي غير متاح؛ التغييرات محفوظة خلال الجلسة الحالية فقط.'
                  : 'بيانات تجريبية · القرارات محفوظة على هذا المتصفح فقط.'}
              </p>
              <button className="bl-admin-demo-reset" onClick={() => setResetOpen(true)}>
                <RotateCcw size={14} /> إعادة البيانات التجريبية
              </button>
            </div>
            <Outlet />
          </div>
        </div>
        <footer className="bl-admin-footer">
          <span>© {new Date().getFullYear()} رابط الحياة · كل قطرة تصنع فرقًا</span>
          <span>التبرع مجاني · اللقاء داخل المستشفى · القرار الطبي للمستشفى</span>
        </footer>
      </div>
      <div
        role="status"
        aria-live="polite"
        className={`bl-admin-toast ${notice ? 'bl-admin-toast-visible' : ''}`}
      >
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
          <div className="bl-admin-actions">
            <button
              className="bl-admin-btn bl-admin-btn-danger"
              onClick={() => {
                resetDemo();
                setResetOpen(false);
              }}
            >
              إعادة البيانات
            </button>
            <button className="bl-admin-btn bl-admin-btn-outline" onClick={() => setResetOpen(false)}>
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
