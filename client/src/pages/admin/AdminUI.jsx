import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, FileSearch, Search, X } from 'lucide-react';
import { formatDate, formatNumber, statusLabels, statusTones } from './adminData';

export function Badge({ status, tone, children }) {
  return (
    <span className={`bl-admin-badge bl-admin-${tone || statusTones[status] || 'neutral'}`}>
      <span className="bl-admin-dot" />
      {children || statusLabels[status]}
    </span>
  );
}
export function Panel({ title, aside, children, className = '' }) {
  return (
    <section className={`bl-admin-panel ${className}`}>
      <div className="bl-admin-panel-head">
        <h2>{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}
export function EmptyState({ title = 'لا توجد نتائج', text = 'جرّب كلمة بحث أخرى أو غيّر التصفية.' }) {
  return (
    <div className="bl-admin-empty">
      <FileSearch size={32} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
export function Filters({ query, onQuery, placeholder, status, onStatus, options, children }) {
  return (
    <div className="bl-admin-filters">
      <label className="bl-admin-search">
        <Search size={18} />
        <input
          type="search"
          aria-label={placeholder}
          placeholder={placeholder}
          value={query}
          onChange={(event) => onQuery(event.target.value)}
        />
      </label>
      {options && (
        <label className="bl-admin-select-label">
          <span className="bl-admin-sr">تصفية حسب الحالة</span>
          <select value={status} onChange={(event) => onStatus(event.target.value)}>
            {options.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      )}
      {children}
    </div>
  );
}
export function DataTable({ rows, columns, caption, page, onPage, pageSize = 5, onRowClick }) {
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, pages);
  const start = (current - 1) * pageSize;
  return (
    <>
      <div className="bl-admin-table-wrap">
        <table className="bl-admin-table">
          <caption className="bl-admin-sr">{caption}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.label} scope="col">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(start, start + pageSize).map((row) => (
              <tr
                key={row.id}
                className={onRowClick ? 'bl-admin-clickable-row' : undefined}
                onClick={
                  onRowClick
                    ? (event) => {
                        // Keep nested controls independent and allow copying text from a row.
                        if (event.target.closest('button, a, input, select, textarea, label')) return;
                        if (window.getSelection()?.isCollapsed === false) return;
                        // Restore focus to a real control when the dialog closes.
                        event.currentTarget.querySelector('button')?.focus({ preventScroll: true });
                        onRowClick(row);
                      }
                    : undefined
                }
              >
                {columns.map((column) => (
                  <td key={column.label} data-label={column.label}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && <EmptyState />}
      </div>
      <div className="bl-admin-pagination">
        <span>
          {rows.length
            ? `عرض ${formatNumber(start + 1)}–${formatNumber(Math.min(start + pageSize, rows.length))} من ${formatNumber(rows.length)} سجل`
            : 'لا توجد سجلات'}
        </span>
        <div>
          <button
            className="bl-admin-page-btn"
            aria-label="الصفحة السابقة"
            disabled={current === 1}
            onClick={() => onPage(current - 1)}
          >
            <ChevronRight size={16} />
          </button>
          {Array.from({ length: pages }, (_, index) => (
            <button
              className="bl-admin-page-btn"
              key={index}
              aria-label={`صفحة ${index + 1}`}
              aria-current={current === index + 1 ? 'page' : undefined}
              onClick={() => onPage(index + 1)}
            >
              {formatNumber(index + 1)}
            </button>
          ))}
          <button
            className="bl-admin-page-btn"
            aria-label="الصفحة التالية"
            disabled={current === pages}
            onClick={() => onPage(current + 1)}
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
export function Modal({ title, subtitle, children, onClose, wide = false }) {
  const dialog = useRef(null);
  const heading = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    // Start at the title so opening with a mouse does not highlight the close button.
    heading.current.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`bl-admin-modal ${wide ? 'bl-admin-modal-wide' : ''}`}
      aria-labelledby="bl-admin-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <div className="bl-admin-modal-head">
        <div>
          <h2 ref={heading} tabIndex={-1} id="bl-admin-dialog-title">
            {title}
          </h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <button type="button" className="bl-admin-icon-btn" aria-label="إغلاق" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <div className="bl-admin-modal-body">{children}</div>
    </dialog>
  );
}
export function DecisionForm({
  options,
  onSubmit,
  noteLabel = 'ملاحظات المراجعة',
  noteHint = 'اكتب سبب القرار بوضوح ليظهر في سجل المراجعة.',
  onCancel,
}) {
  const [action, setAction] = useState(options[0].value);
  const [note, setNote] = useState('');
  const selected = options.find((option) => option.value === action);
  return (
    <form
      className="bl-admin-decision"
      onSubmit={(event) => {
        event.preventDefault();
        if (note.trim().length >= 5) onSubmit(action, note.trim());
      }}
    >
      <h3>قرار المراجعة</h3>
      <div className="bl-admin-decisions">
        {options.map((option) => (
          <label
            className={`bl-admin-choice ${action === option.value ? 'bl-admin-selected' : ''}`}
            key={option.value}
          >
            <input
              type="radio"
              name="decision"
              value={option.value}
              checked={action === option.value}
              onChange={() => setAction(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <label className="bl-admin-field">
        {noteLabel} <span className="bl-admin-required">*</span>
        <textarea
          required
          minLength={5}
          maxLength={600}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="اكتب السبب هنا…"
          rows={3}
          aria-describedby="bl-admin-note-hint"
        />
      </label>
      <p id="bl-admin-note-hint" className="bl-admin-hint">
        {noteHint} خمسة أحرف على الأقل.
      </p>
      <div className="bl-admin-actions">
        <button
          type="submit"
          className={`bl-admin-btn ${['banned', 'rejected'].includes(action) ? 'bl-admin-btn-danger' : 'bl-admin-btn-primary'}`}
          disabled={note.trim().length < 5}
        >
          <Check size={17} />
          {selected.confirm || 'تأكيد القرار'}
        </button>
        <button type="button" className="bl-admin-btn bl-admin-btn-outline" onClick={onCancel}>
          إلغاء
        </button>
      </div>
    </form>
  );
}
export function Details({ items }) {
  return (
    <dl className="bl-admin-details">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function ReviewNote({ item }) {
  return (
    <div className="bl-admin-review-note">
      <Badge status={item.status} />
      <p>{item.note || 'تمت مراجعة هذا الطلب.'}</p>
      {item.reviewedAt && <small>تاريخ القرار: {formatDate(item.reviewedAt, true)}</small>}
    </div>
  );
}
export function SampleDocument({ item, hospital = false }) {
  return (
    <div className="bl-admin-document-area">
      <div className="bl-admin-document-label">
        <span>معاينة المستند</span>
        <Badge tone="neutral">نموذج تجريبي</Badge>
      </div>
      <article className="bl-admin-document" aria-label="نموذج مستند تجريبي">
        <div className="bl-admin-document-watermark">عينة تجريبية</div>
        <div className="bl-admin-document-brand">
          {hospital ? item.name : item.hospital}
          <small>{item.area}</small>
        </div>
        <div className="bl-admin-document-rule" />
        <h3>
          {hospital
            ? 'طلب انضمام مستشفى شريك'
            : item.type === 'طلب دم'
              ? 'نموذج طلب وحدات دم'
              : 'شهادة تحديد فصيلة الدم'}
        </h3>
        <Details
          items={
            hospital
              ? [
                  ['اسم المنشأة', item.name],
                  ['رقم الترخيص التجريبي', item.license],
                  ['المسؤول', item.contact],
                  ['تاريخ الطلب', formatDate(item.date)],
                ]
              : [
                  ['الاسم', item.name],
                  ['الرقم المرجعي', <bdi key="ref">{item.id}</bdi>],
                  ['فصيلة الدم', <bdi key="blood">{item.blood}</bdi>],
                  ...(item.units ? [['عدد الوحدات', formatNumber(item.units)]] : []),
                  ['تاريخ الإصدار', formatDate(item.date)],
                ]
          }
        />
        <div className="bl-admin-document-sign">
          <span>
            توقيع المسؤول
            <br />
            <i>ــــــــــــــــــــ</i>
          </span>
          <span className="bl-admin-stamp">
            نموذج
            <br />
            غير رسمي
          </span>
        </div>
        <p className="bl-admin-document-foot">
          مستند توضيحي للواجهة فقط · ليس مستندًا طبيًا أو ترخيصًا حقيقيًا
        </p>
      </article>
    </div>
  );
}
export function ReviewButton({ onClick, children = 'مراجعة' }) {
  return (
    <button
      type="button"
      className="bl-admin-btn bl-admin-btn-outline bl-admin-btn-small"
      aria-haspopup="dialog"
      onClick={(event) => {
        event.currentTarget.focus({ preventScroll: true });
        onClick();
      }}
    >
      {children}
      <ArrowLeft size={15} />
    </button>
  );
}
