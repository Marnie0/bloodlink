// Fake notifications until the API exists
export const notificationsData = [
  {
    id: 'n1',
    text: 'طلب عاجل يناسب فصيلتك في مستشفى النور · مدينة نصر',
    time: 'منذ ١٠ دقائق',
    to: '/donor/requests/BL-2026-004213',
    read: false,
  },
  {
    id: 'n2',
    text: 'وافق متبرع على طلبك BL-2026-004205',
    time: 'منذ ساعة',
    to: '/requests/BL-2026-004205',
    read: false,
  },
  {
    id: 'n3',
    text: 'تمت مراجعة شهادة فصيلة الدم وأصبح حسابك موثّقاً',
    time: 'أمس',
    to: '/donor/certificate',
    read: true,
  },
];
