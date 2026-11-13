import { NavLink } from 'react-router-dom';
import { FileCheck2, LayoutDashboard, PlusCircle } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import Ltr from '@/components/ui/Ltr';

const navItems = [
  {
    to: '/hospital',
    label: 'لوحة اليوم',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/hospital/papers',
    label: 'أوراق بانتظار التأكيد',
    icon: FileCheck2,
    showBadge: true,
  },
  {
    to: '/hospital/join',
    label: 'طلب شراكة مستشفى',
    icon: PlusCircle,
  },
];

export default function HospitalSideMenu({ pendingCount = 0 }) {
  return (
    <Panel title="بوابة المستشفى" as="h3">
      <nav aria-label="تنقل بوابة المستشفى" className="grid gap-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center justify-between gap-2 rounded-[10px] px-3 py-2.5 text-[0.86rem] no-underline transition-colors ${
                  isActive
                    ? 'bg-teal-lt text-teal-ink font-semibold'
                    : 'text-ink hover:bg-surface-2'
                }`
              }
            >
              <span className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </span>

              {item.showBadge && pendingCount > 0 && (
                <span className="bg-urgent inline-grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[0.7rem] font-bold text-white">
                  <Ltr>{pendingCount}</Ltr>
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </Panel>
  );
}