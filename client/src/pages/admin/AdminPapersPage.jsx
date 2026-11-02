import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info } from 'lucide-react';
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

export default function AdminPapersPage() {
  const { data, decide } = useAdmin();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('pending');
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const selected = data.papers.find((item) => item.id === params.get('review'));
  const rows = data.papers.filter(
    (item) =>
      (status === 'all' || item.status === status) &&
      (type === 'all' || item.type === type) &&
      matchesSearch(item, query),
  );
  const close = () => setParams({}, { replace: true });
  const columns = [
    {
      label: 'الطلب / صاحب الورقة',
      render: (item) => (
        <>
          <b>{item.name}</b>
          <span className="bl-admin-ref">{item.id}</span>
        </>
      ),
    },
    {
      label: 'المستند',
      render: (item) => (
        <>
          <span>{item.type}</span>
          <small>{item.hospital}</small>
        </>
      ),
    },
    { label: 'الفصيلة', render: (item) => <span className="bl-admin-blood">{item.blood}</span> },
    {
      label: 'سبب المراجعة',
      render: (item) => (
        <>
          <span className="bl-admin-table-issue">{item.issue}</span>
          {item.urgent && <Badge tone="danger">عاجل</Badge>}
        </>
      ),
    },
    { label: 'الحالة', render: (item) => <Badge status={item.status} /> },
    {
      label: 'الإجراء',
      render: (item) => (
        <ReviewButton onClick={() => setParams({ review: item.id })}>
          {item.status === 'pending' ? 'مراجعة' : 'التفاصيل'}
        </ReviewButton>
      ),
    },
  ];
  return (
    <>
      <div className="bl-admin-inline-notice">
        <Info size={20} />
        <p>
          الأوراق هنا تحتاج إلى مراجعة بشرية. القبول يمنح علامة <b>«ورقة تبدو سليمة»</b>، ولا يُعد تأكيدًا من
          المستشفى.
        </p>
      </div>
      <Panel
        title="قائمة الأوراق"
        aside={
          <Badge tone="neutral">
            {formatNumber(data.papers.filter((item) => item.status === 'pending').length)} بانتظار المراجعة
          </Badge>
        }
      >
        <Filters
          query={query}
          onQuery={(value) => {
            setQuery(value);
            setPage(1);
          }}
          placeholder="ابحث بالاسم أو الرقم المرجعي…"
          status={status}
          onStatus={(value) => {
            setStatus(value);
            setPage(1);
          }}
          options={[
            ['pending', 'بانتظار المراجعة'],
            ['all', 'كل الحالات'],
            ['approved', 'المقبولة'],
            ['rejected', 'المرفوضة'],
          ]}
        >
          <label className="bl-admin-select-label">
            <span className="bl-admin-sr">نوع المستند</span>
            <select
              value={type}
              onChange={(event) => {
                setType(event.target.value);
                setPage(1);
              }}
            >
              <option value="all">كل المستندات</option>
              <option value="طلب دم">طلبات الدم</option>
              <option value="شهادة فصيلة">شهادات الفصيلة</option>
            </select>
          </label>
        </Filters>
        <DataTable
          rows={rows}
          columns={columns}
          caption="الأوراق التي تحتاج إلى مراجعة يدوية وسجل القرارات"
          page={page}
          onPage={setPage}
          onRowClick={(item) => setParams({ review: item.id })}
        />
      </Panel>
      <p className="bl-admin-bottom-hint">
        المستندات مخصّصة للمراجعة الإدارية؛ بيانات هذه الواجهة ونماذج الأوراق تجريبية بالكامل.
      </p>
      {selected && (
        <Modal wide title="مراجعة الورقة" subtitle={selected.id} onClose={close}>
          <div className="bl-admin-review-grid">
            <SampleDocument item={selected} />
            <div>
              <div className="bl-admin-modal-section-title">
                <h3>بيانات الطلب</h3>
                <Badge status={selected.status} />
              </div>
              <Details
                items={[
                  ['صاحب الورقة', selected.name],
                  ['نوع المستند', selected.type],
                  ['المستشفى', selected.hospital],
                  ['تاريخ الإرسال', formatDate(selected.date)],
                ]}
              />
              <div className="bl-admin-inline-notice bl-admin-notice-warn">
                <Info size={18} />
                <p>{selected.issue}</p>
              </div>
              {selected.status === 'pending' ? (
                <DecisionForm
                  key={selected.id}
                  options={[
                    { value: 'approved', label: 'قبول الورقة', confirm: 'قبول — ورقة تبدو سليمة' },
                    { value: 'rejected', label: 'رفض وطلب صورة أوضح', confirm: 'تأكيد رفض الورقة' },
                  ]}
                  onSubmit={(action, note) => {
                    decide('papers', selected.id, action, note);
                    close();
                  }}
                  onCancel={close}
                  noteHint="عند الرفض، وضّح البيانات المطلوب استكمالها أو إعادة تصويرها."
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
