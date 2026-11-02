import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpLeft,
  Clock3,
  Droplets,
  FileCheck2,
  Flag,
  Hospital,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useAdmin } from './AdminContext';
import { Badge, EmptyState, Panel } from './AdminUI';
import { formatDate, formatNumber } from './adminData';

export default function AdminDashboardPage() {
  const { data } = useAdmin();
  const queues = [
    {
      title: 'أوراق تحتاج إلى مراجعتك',
      count: data.papers.filter((item) => item.status === 'pending').length,
      text: 'مستندات تعذّر فحصها آليًا',
      to: '/admin/papers',
      icon: FileCheck2,
      tone: 'info',
    },
    {
      title: 'بلاغات بانتظار الإجراء',
      count: data.reports.filter((item) => item.status === 'open').length,
      text: 'راجع التفاصيل واتخذ القرار',
      to: '/admin/reports',
      icon: Flag,
      tone: 'danger',
    },
    {
      title: 'طلبات شراكة جديدة',
      count: data.hospitals.filter((item) => item.status === 'pending').length,
      text: 'مستشفيات ترغب في الانضمام',
      to: '/admin/hospitals',
      icon: Hospital,
      tone: 'teal',
    },
  ];
  const stats = [
    {
      title: 'طلبات الدم النشطة',
      value: '٢٧',
      label: 'تحتاج إلى متبرعين الآن',
      icon: Droplets,
      tone: 'danger',
    },
    {
      title: 'المتبرعون المسجّلون',
      value: '١٬٢٨٤',
      label: '١٬٢٠٦ متبرعين موثّقين',
      icon: Users,
      tone: 'teal',
    },
    {
      title: 'متوسط أول استجابة',
      value: '١٢',
      unit: 'دقيقة',
      label: 'من نشر الطلب حتى أول قبول',
      icon: Clock3,
      tone: 'info',
    },
    {
      title: 'البلاغات المفتوحة',
      value: formatNumber(queues[1].count),
      label: `${formatNumber(data.bannedUsers.length)} حسابات محظورة حاليًا`,
      icon: Flag,
      tone: 'warn',
    },
  ];
  const pendingPapers = data.papers.filter((item) => item.status === 'pending');
  return (
    <>
      <div className="bl-admin-section-heading">
        <div>
          <h2>أهلًا خالد، يوم جديد وفرصة للمساعدة</h2>
          <p>إليك ملخص المنصة وما يحتاج إلى متابعتك.</p>
        </div>
        <Badge tone="neutral">إحصائيات توضيحية</Badge>
      </div>
      <div className="bl-admin-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <section className="bl-admin-stat" key={stat.title}>
              <div className="bl-admin-stat-top">
                <span>{stat.title}</span>
                <span className={`bl-admin-icon-tile bl-admin-${stat.tone}`}>
                  <Icon size={21} />
                </span>
              </div>
              <div className="bl-admin-stat-value">
                {stat.value}
                <small>{stat.unit}</small>
              </div>
              <p>{stat.label}</p>
            </section>
          );
        })}
      </div>
      <h2 className="bl-admin-section-title">
        يحتاج إلى اهتمامك
        <span />
      </h2>
      <div className="bl-admin-queue-grid">
        {queues.map((queue) => {
          const Icon = queue.icon;
          return (
            <Link className="bl-admin-queue" key={queue.to} to={queue.to}>
              <div className="bl-admin-queue-top">
                <span className={`bl-admin-icon-tile bl-admin-${queue.tone}`}>
                  <Icon size={22} />
                </span>
                <strong>{formatNumber(queue.count)}</strong>
              </div>
              <h3>{queue.title}</h3>
              <p>{queue.text}</p>
              <span className="bl-admin-queue-link">
                فتح قائمة المراجعة
                <ArrowLeft size={17} />
              </span>
            </Link>
          );
        })}
      </div>
      <div className="bl-admin-dashboard-grid">
        <Panel
          title="أحدث الأوراق المعلّقة"
          aside={
            <Link className="bl-admin-text-link" to="/admin/papers">
              عرض الكل
              <ArrowLeft size={15} />
            </Link>
          }
        >
          {pendingPapers.length ? (
            <div className="bl-admin-pending-list">
              {pendingPapers.slice(0, 3).map((item) => (
                <Link key={item.id} className="bl-admin-pending-item" to={`/admin/papers?review=${item.id}`}>
                  <span className="bl-admin-file-icon">
                    <FileCheck2 size={22} />
                  </span>
                  <div>
                    <b>{item.name}</b>
                    <small>
                      {item.type} · {item.hospital}
                    </small>
                    <span className="bl-admin-ref">{item.id}</span>
                  </div>
                  <span className="bl-admin-pending-end">
                    <Badge tone={item.urgent ? 'danger' : 'warn'}>
                      {item.urgent ? 'عاجل' : 'مراجعة يدوية'}
                    </Badge>
                    <ArrowUpLeft size={18} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="انتهيت من مراجعة الأوراق" text="لا توجد أوراق معلّقة في النسخة التجريبية." />
          )}
        </Panel>
        <Panel title="آخر إجراءات الإدارة" aside={<span className="bl-admin-small">سجل محلي</span>}>
          <ol className="bl-admin-timeline">
            {data.activities.slice(0, 4).map((item) => (
              <li key={item.id}>
                <span className={`bl-admin-timeline-dot bl-admin-${item.tone}`} />
                <div>
                  <p>{item.text}</p>
                  <time dateTime={item.date}>{formatDate(item.date, true)}</time>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
      <div className="bl-admin-guidance">
        <ShieldCheck size={29} />
        <div>
          <h3>مراجعة دقيقة، ومجتمع أكثر أمانًا</h3>
          <p>
            قبول ورقة من مستشفى غير شريك يمنح علامة «ورقة تبدو سليمة». علامة «موثّق» تتطلب تأكيد المستشفى
            الشريك.
          </p>
        </div>
        <Link to="/admin/papers" className="bl-admin-btn bl-admin-btn-outline bl-admin-btn-small">
          مراجعة الأوراق
          <ArrowLeft size={15} />
        </Link>
      </div>
    </>
  );
}
