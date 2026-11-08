import { useEffect, useRef, useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ROLE_LABELS = {
  donor: 'متبرع',
  requester: 'صاحب طلب',
  hospital: 'مستشفى شريك',
  admin: 'مدير المنصة',
};

// first letter of the first two words
function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');
}

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  // While the menu is open: close it on a click outside, or on Escape
  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (!wrapperRef.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current.focus();
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const roles = user.roles.map((role) => ROLE_LABELS[role] ?? role).join(' · ');

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="user-menu"
        className="border-line hover:border-ink-3 bg-surface flex items-center gap-2 rounded-full border p-0.75 text-[0.82rem] leading-tight sm:ps-3"
      >
        <span className="hidden text-start sm:block">
          <span className="text-ink block font-semibold">{user.name}</span>
          <small className="text-ink-3">
            {roles} ·{' '}
            <span dir="ltr" className="font-semibold tabular-nums">
              {user.id}
            </span>
          </small>
        </span>
        <span
          aria-hidden="true"
          className="font-head from-teal to-navy grid size-9 shrink-0 place-items-center rounded-full bg-linear-135 text-[0.82rem] font-bold text-white"
        >
          {initials(user.name)}
        </span>
        <span className="sr-only sm:hidden">حساب {user.name}</span>
      </button>

      {open && (
        <div
          id="user-menu"
          className="bg-surface border-line rounded-tile shadow-raised hc:border-2 absolute inset-e-0 top-full z-50 mt-2 w-60 border p-2"
        >
          <div className="border-line-2 mb-1 border-b px-3 pt-1 pb-2.5 sm:hidden">
            <p className="text-ink font-semibold">{user.name}</p>
            <p className="text-tiny text-ink-3">{roles}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="text-crimson-ink hover:bg-crimson-lt rounded-field flex w-full items-center gap-2 px-3 py-2 text-start text-sm font-semibold"
          >
            <LogOut className="size-4" aria-hidden="true" />
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
