import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { House, Heart, Droplet, Calendar, Hospital } from 'lucide-react';
const links = [
  { to: '/', label: 'الرئيسية', end: true, icon: House },
  { to: '/donor/requests', label: 'الطلبات', end: true, icon: Heart },
  { to: '/requests/new', label: 'طلب دم', icon: Droplet },
  { to: '/donor/history', label: 'موعدي', icon: Calendar },
  { to: '/hospital', label: 'المستشفى', icon: Hospital },
];

export default function BottomTabBar() {
  return (
    <>
      <div className="h-19 lg:hidden" />
      <nav
        className="bg-surface/90 border-line fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] mx-auto max-w-lg rounded-2xl border shadow-lg backdrop-blur lg:hidden"
        aria-label="القائمة الرئيسية للشاشات الصغيرة"
      >
        <div className="grid grid-cols-5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  clsx(
                    'text-tiny flex flex-col items-center justify-center gap-1 py-2 font-medium transition-colors',
                    isActive ? 'text-crimson' : 'text-ink-2',
                  )
                }
              >
                <Icon className="size-5" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
