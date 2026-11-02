import { useState } from 'react';
import { Building2, CheckCircle2, Clock3 } from 'lucide-react';
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
  SampleDocument,
} from './AdminUI';
import { formatDate, formatNumber, matchesSearch } from './adminData';

export default function AdminHospitalsPage() {
  const { data, decide } = useAdmin();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('pending');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const selected = data.hospitals.find((item) => item.id === selectedId);
  const rows = data.hospitals.filter(
    (item) => (status === 'all' || item.status === status) && matchesSearch(item, query),
  );
  const columns = [
    {
      label: 'المستشفى',
      render: (item) => (
        <div className="bl-admin-hospital-cell">
          <span className="bl-admin-hospital-icon">
            <Building2 size={21} />
          </span>
          <div>
            <b>{item.name}</b>
            <span className="bl-admin-ref">{item.id}</span>
          </div>
        </div>
      ),
    },
    { label: 'المنطقة', render: (item) => item.area },
    {
      label: 'مسؤول التواصل',
      render: (item) => (
        <>
          <span>{item.contact}</span>
          <small>
            <bdi>{item.email}</bdi>
          </small>
        </>
      ),
    },
    { label: 'تاريخ التقديم', render: (item) => formatDate(item.date) },
    {
      label: 'الحالة',
      render: (item) => (
        <Badge status={item.status}>{item.status === 'approved' ? 'شريك معتمد' : undefined}</Badge>
      ),
    },
    {
      label: 'الإجراء',
      render: (item) => (
        <ReviewButton onClick={() => setSelectedId(item.id)}>
          {item.status === 'pending' ? 'مراجعة الطلب' : 'التفاصيل'}
        </ReviewButton>
      ),
    },
  ];
  return (
    <>
      <div className="bl-admin-hospital-summary">
        {[
          {
            icon: Clock3,
            label: 'طلبات بانتظار المراجعة',
            count: data.hospitals.filter((item) => item.status === 'pending').length,
            tone: 'warn',
          },
          {
            icon: CheckCircle2,
            label: 'شركاء معتمدون في العرض',
            count: data.hospitals.filter((item) => item.status === 'approved').length,
            tone: 'ok',
          },
          { icon: Building2, label: 'إجمالي طلبات الشراكة', count: data.hospitals.length, tone: 'info' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label}>
              <span className={`bl-admin-icon-tile bl-admin-${stat.tone}`}>
                <Icon size={22} />
              </span>
              <span>
                <strong>{formatNumber(stat.count)}</strong>
                <small>{stat.label}</small>
              </span>
            </div>
          );
        })}
      </div>
      <Panel title="طلبات انضمام المستشفيات" aside={<Badge tone="neutral">شراكة من أجل الحياة</Badge>}>
        <Filters
          query={query}
          onQuery={(value) => {
            setQuery(value);
            setPage(1);
          }}
          placeholder="ابحث بالمستشفى أو المنطقة…"
          status={status}
          onStatus={(value) => {
            setStatus(value);
            setPage(1);
          }}
          options={[
            ['pending', 'بانتظار المراجعة'],
            ['all', 'كل المستشفيات'],
            ['approved', 'الشركاء المعتمدون'],
            ['rejected', 'الطلبات المرفوضة'],
          ]}
        />
        <DataTable
          rows={rows}
          columns={columns}
          caption="طلبات شراكة المستشفيات وحالة اعتمادها"
          page={page}
          onPage={setPage}
          onRowClick={(item) => setSelectedId(item.id)}
        />
      </Panel>
      <p className="bl-admin-bottom-hint">
        حساب المستشفى يظل غير نشط حتى الاعتماد. في هذه النسخة، يتغير وضع الطلب محليًا فقط.
      </p>
      {selected && (
        <Modal wide title="مراجعة طلب الشراكة" subtitle={selected.id} onClose={() => setSelectedId(null)}>
          <div className="bl-admin-review-grid">
            <SampleDocument item={selected} hospital />
            <div>
              <div className="bl-admin-modal-section-title">
                <h3>بيانات المنشأة</h3>
                <Badge status={selected.status} />
              </div>
              <Details
                items={[
                  ['المستشفى', selected.name],
                  ['العنوان', selected.area],
                  ['مسؤول التواصل', selected.contact],
                  ['البريد الإلكتروني', <bdi key="email">{selected.email}</bdi>],
                  ['الهاتف التجريبي', <bdi key="phone">{selected.phone}</bdi>],
                  ['رقم الترخيص التجريبي', <bdi key="lic">{selected.license}</bdi>],
                ]}
              />
              {selected.status === 'pending' ? (
                <DecisionForm
                  key={selected.id}
                  options={[
                    { value: 'approved', label: 'اعتماد المستشفى', confirm: 'تأكيد اعتماد الشراكة' },
                    { value: 'rejected', label: 'رفض الطلب', confirm: 'تأكيد رفض الطلب' },
                  ]}
                  onSubmit={(action, note) => {
                    decide('hospitals', selected.id, action, note);
                    setSelectedId(null);
                  }}
                  onCancel={() => setSelectedId(null)}
                  noteHint="دوّن نتيجة مراجعة الترخيص وبيانات المنشأة ومسؤول التواصل."
                />
              ) : (
                <ReviewNote item={selected} />
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
