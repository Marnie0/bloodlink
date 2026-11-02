import { useState } from 'react';
import { Flag, ShieldBan } from 'lucide-react';
import { useAdmin } from './AdminContext';
import {
  Badge,
  DataTable,
  DecisionForm,
  Details,
  Filters,
  Modal,
  Panel,
  ReviewButton,
  ReviewNote,
} from './AdminUI';
import { formatDate, formatNumber, matchesSearch } from './adminData';

export default function AdminReportsPage() {
  const { data, decide, unban } = useAdmin();
  const [tab, setTab] = useState('reports');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('open');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [unbanId, setUnbanId] = useState(null);
  const selected = data.reports.find((item) => item.id === selectedId);
  const bannedUser = data.bannedUsers.find((item) => item.id === unbanId);
  const rows =
    tab === 'banned'
      ? data.bannedUsers.filter((item) => matchesSearch(item, query))
      : data.reports.filter(
          (item) => (status === 'all' || item.status === status) && matchesSearch(item, query),
        );
  const reportColumns = [
    {
      label: 'البلاغ',
      render: (item) => (
        <>
          <b>{item.subject}</b>
          <span className="ad-ref">{item.id}</span>
        </>
      ),
    },
    {
      label: 'الحساب المُبلّغ عنه',
      render: (item) => (
        <>
          <span>{item.account}</span>
          <span className="ad-ref">{item.userId}</span>
        </>
      ),
    },
    {
      label: 'الأولوية',
      render: (item) => (
        <Badge tone={item.priority === 'high' ? 'danger' : 'neutral'}>
          {item.priority === 'high' ? 'مرتفعة' : 'عادية'}
        </Badge>
      ),
    },
    { label: 'تاريخ البلاغ', render: (item) => formatDate(item.date) },
    { label: 'الحالة', render: (item) => <Badge status={item.status} /> },
    {
      label: 'الإجراء',
      render: (item) => (
        <ReviewButton onClick={() => setSelectedId(item.id)}>
          {item.status === 'open' ? 'مراجعة' : 'التفاصيل'}
        </ReviewButton>
      ),
    },
  ];
  const bannedColumns = [
    {
      label: 'الحساب',
      render: (item) => (
        <>
          <b>{item.name}</b>
          <span className="ad-ref">{item.id}</span>
        </>
      ),
    },
    { label: 'سبب الحظر', render: (item) => <span className="ad-table-issue">{item.reason}</span> },
    { label: 'تاريخ الحظر', render: (item) => formatDate(item.date) },
    { label: 'الحالة', render: () => <Badge tone="danger">محظور حاليًا</Badge> },
    {
      label: 'الإجراء',
      render: (item) => <ReviewButton onClick={() => setUnbanId(item.id)}>إلغاء الحظر</ReviewButton>,
    },
  ];
  function changeTab(value) {
    setTab(value);
    setQuery('');
    setPage(1);
  }
  return (
    <>
      <div className="ad-tabs" role="group" aria-label="عرض البلاغات أو الحسابات المحظورة">
        <button aria-pressed={tab === 'reports'} onClick={() => changeTab('reports')}>
          <Flag size={18} /> البلاغات{' '}
          <span>{formatNumber(data.reports.filter((item) => item.status === 'open').length)}</span>
        </button>
        <button aria-pressed={tab === 'banned'} onClick={() => changeTab('banned')}>
          <ShieldBan size={18} /> الحسابات المحظورة <span>{formatNumber(data.bannedUsers.length)}</span>
        </button>
      </div>
      <Panel
        title={tab === 'reports' ? 'بلاغات المستخدمين' : 'الحسابات المحظورة'}
        aside={<Badge tone="neutral">{formatNumber(rows.length)} سجلات</Badge>}
      >
        {tab === 'reports' ? (
          <Filters
            query={query}
            onQuery={(value) => {
              setQuery(value);
              setPage(1);
            }}
            placeholder="ابحث بالبلاغ أو اسم الحساب…"
            status={status}
            onStatus={(value) => {
              setStatus(value);
              setPage(1);
            }}
            options={[
              ['open', 'البلاغات المفتوحة'],
              ['all', 'كل البلاغات'],
              ['dismissed', 'المحفوظة'],
              ['warned', 'تم التنبيه'],
              ['banned', 'انتهت بالحظر'],
            ]}
          />
        ) : (
          <Filters
            query={query}
            onQuery={(value) => {
              setQuery(value);
              setPage(1);
            }}
            placeholder="ابحث في الحسابات المحظورة…"
          />
        )}
        <DataTable
          rows={rows}
          columns={tab === 'reports' ? reportColumns : bannedColumns}
          caption={tab === 'reports' ? 'البلاغات وحالة معالجتها' : 'الحسابات المحظورة حاليًا'}
          page={page}
          onPage={setPage}
          onRowClick={(item) => (tab === 'reports' ? setSelectedId(item.id) : setUnbanId(item.id))}
        />
      </Panel>
      <p className="ad-bottom-hint">
        راجع التفاصيل قبل اتخاذ القرار. إلغاء الحظر لا يغيّر قرار البلاغ السابق، ويُسجّل كإجراء مستقل.
      </p>
      {selected && (
        <Modal title="مراجعة البلاغ" subtitle={selected.id} onClose={() => setSelectedId(null)}>
          <div className="ad-modal-section-title">
            <h3>{selected.subject}</h3>
            <Badge status={selected.status} />
          </div>
          <Details
            items={[
              ['الحساب المُبلّغ عنه', `${selected.account} · ${selected.userId}`],
              ['مقدّم البلاغ', selected.reporter],
              ['الطلب المرتبط', <bdi key="req">{selected.request}</bdi>],
              ['التصنيف', selected.category],
              ['التاريخ', formatDate(selected.date)],
            ]}
          />
          <div className="ad-evidence">
            <h3>وصف البلاغ</h3>
            <p>{selected.details}</p>
            <h3>المعلومات المتاحة · تجريبي</h3>
            <blockquote>{selected.evidence}</blockquote>
          </div>
          {selected.status === 'open' ? (
            <DecisionForm
              key={selected.id}
              options={[
                { value: 'dismissed', label: 'حفظ البلاغ', confirm: 'حفظ البلاغ دون إجراء' },
                { value: 'warned', label: 'تنبيه الحساب', confirm: 'تسجيل تنبيه تجريبي' },
                { value: 'banned', label: 'حظر الحساب', confirm: 'تأكيد حظر الحساب' },
              ]}
              onSubmit={(action, note) => {
                decide('reports', selected.id, action, note);
                setSelectedId(null);
              }}
              onCancel={() => setSelectedId(null)}
              noteHint="القرار تجريبي ولا يرسل أي رسائل فعلية للمستخدمين."
            />
          ) : (
            <ReviewNote item={selected} />
          )}
        </Modal>
      )}
      {bannedUser && (
        <Modal title="إلغاء حظر الحساب" subtitle={bannedUser.name} onClose={() => setUnbanId(null)}>
          <p>سبب الحظر الحالي: {bannedUser.reason}</p>
          <DecisionForm
            options={[{ value: 'unban', label: 'السماح للحساب بالعودة', confirm: 'تأكيد إلغاء الحظر' }]}
            noteLabel="سبب إلغاء الحظر"
            onSubmit={(_, reason) => {
              unban(bannedUser.id, reason);
              setUnbanId(null);
            }}
            onCancel={() => setUnbanId(null)}
          />
        </Modal>
      )}
    </>
  );
}
