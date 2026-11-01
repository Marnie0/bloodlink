import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Droplet } from 'lucide-react';

const links = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/donor/requests', label: 'الطلبات القريبة', end: true },
  { to: '/donor/history', label: 'تبرعاتي' },
  { to: '/hospital', label: 'بوابة المستشفى الشريك' },
  { to: '/terms', label: 'شروط الاستخدام' },
];

export default function MainNav() {
  return (
    <nav aria-label="القائمة الرئيسية" className="bg-navy border-gold hidden border-b-2 lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                clsx(
                  'focus-visible:outline-gold rounded-full px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
                  isActive
                    ? 'bg-surface text-navy font-semibold'
                    : 'font-medium text-white hover:bg-white/10',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <NavLink
          to="/donor/requests/new"
          className={({ isActive }) =>
            clsx(
              'btn btn-primary rounded-full',
              isActive ? 'bg-surface text-navy hover:bg-primary hover:text-white' : 'text-white',
            )
          }
        >
          <Droplet className="size-4" />
          تقديم طلب الدم
        </NavLink>
      </div>
    </nav>
  );
}
