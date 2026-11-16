import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useDismiss } from '@/lib/useDismiss';
import { notificationsData } from './notificationsData';

export default function NotificationsMenu() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notificationsData);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);
  useDismiss(open, close, wrapperRef, buttonRef);

  const unread = user ? items.filter((item) => !item.read).length : 0;
  const label = unread ? `الإشعارات (${unread.toLocaleString('ar-EG')} جديد)` : 'الإشعارات';

  function markRead(id) {
    setItems((old) => old.map((item) => (item.id === id ? { ...item, read: true } : item)));
    setOpen(false);
  }

  function markAllRead() {
    setItems((old) => old.map((item) => ({ ...item, read: true })));
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        aria-expanded={open}
        aria-controls="notifications-menu"
        className="border-line hover:border-ink-3 relative grid size-11 shrink-0 place-items-center rounded-full border"
      >
        <Bell aria-hidden="true" />
        {unread > 0 && (
          <span
            aria-hidden="true"
            className="bg-crimson border-surface absolute end-2 top-2 size-2.5 rounded-full border-2"
          />
        )}
      </button>

      {open && (
        <div
          id="notifications-menu"
          className="bg-surface border-line rounded-tile shadow-raised hc:border-2 absolute -end-14 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] border sm:inset-e-0"
        >
          <div className="border-line-2 flex items-center justify-between gap-2 border-b px-4 py-2.5">
            <h2 className="text-small font-bold">الإشعارات</h2>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-tiny text-info font-semibold hover:underline"
              >
                تعليم الكل كمقروء
              </button>
            )}
          </div>

          {user ? (
            <ul className="max-h-80 overflow-y-auto p-1.5">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    onClick={() => markRead(item.id)}
                    className={`hover:bg-surface-2 flex gap-2.5 rounded-[10px] px-3 py-2.5 ${
                      item.read ? '' : 'bg-info-lt/60'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-2 size-2 shrink-0 rounded-full ${item.read ? 'bg-transparent' : 'bg-crimson'}`}
                    />
                    <span>
                      <span className="text-small text-ink block">
                        {!item.read && <span className="sr-only">جديد: </span>}
                        {item.text}
                      </span>
                      <span className="text-tiny text-ink-3">{item.time}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-small text-ink-2 px-4 py-4">
              سجّل الدخول لتصلك إشعارات الطلبات التي تناسب فصيلتك.
              <Link
                to="/login"
                onClick={close}
                className="text-info mt-2 block font-semibold hover:underline"
              >
                تسجيل الدخول
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
