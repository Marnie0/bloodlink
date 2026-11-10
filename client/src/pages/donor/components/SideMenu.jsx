import { NavLink } from 'react-router-dom';
import Panel from '@/components/ui/Panel';

const menuItems = [
  { label: 'لوحة الحساب' },
  { label: 'الطلبات القريبة', link: '/donor/requests', showCount: true },
  { label: 'مواعيدي' },
  { label: 'سجل التبرعات', link: '/donor/history' },
  { label: 'شهادة فصيلة الدم', link: '/donor/certificate' },
  { label: 'المنطقة والإشعارات' },
  { label: 'إيقاف مؤقت' },
];

const itemClass =
  'flex items-center justify-between rounded-[10px] px-3 py-[9px] text-[0.88rem] text-ink no-underline';

export default function SideMenu({ nearbyCount }) {
  return (
    <Panel title="حسابي" as="h3">
      <div className="p-1.5">
        {menuItems.map((item) => {
          // العدد الأحمر جنب "الطلبات القريبة"
          const count = item.showCount && nearbyCount > 0 && (
            <span className="bg-urgent inline-block rounded-full px-2 text-[0.7rem] font-semibold text-white">
              <span dir="ltr" className="inline-block tabular-nums">
                {nearbyCount}
              </span>
            </span>
          );

          if (!item.link) {
            return (
              <div key={item.label} className={itemClass}>
                {item.label}
              </div>
            );
          }
          return (
            <NavLink
              key={item.label}
              to={item.link}
              end
              className={({ isActive }) =>
                `${itemClass} ${isActive ? 'bg-teal-lt text-teal-ink font-semibold' : 'hover:bg-surface-2'}`
              }
            >
              {item.label}
              {count}
            </NavLink>
          );
        })}
      </div>
    </Panel>
  );
}
