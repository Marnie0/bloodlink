// البيانات التجريبية لبوابة المستشفى الشريك (مطابقة لـ DevKit R6)
export const HOSPITAL_INFO = {
  id: 'HP-0007',
  name: 'مستشفى النور',
  area: 'مدينة نصر، القاهرة',
  active: true,
  staff: {
    name: 'د. منى سعيد',
    role: 'مسؤولة بنك الدم · الفترة الصباحية',
  },
};

// قائمة الأوراق بانتظار التأكيد (US-15 / FR-07 / FR-11)
export const INITIAL_PENDING_PAPERS = [
  {
    id: 'BL-2026-004231',
    kind: 'request', // 'request' | 'certificate'
    department: 'قسم الجراحة',
    nameOnPaper: 'محمد إبراهيم سالم',
    bloodType: 'O+',
    paperDate: '2026-10-21',
  },
  {
    id: 'DN-2026-01902',
    kind: 'certificate',
    department: 'بنك الدم',
    nameOnPaper: 'مريم عادل',
    bloodType: 'B+',
    paperDate: '2026-10-18',
  },
  {
    id: 'BL-2026-004245',
    kind: 'request',
    department: 'وحدة الرعاية المركزة',
    nameOnPaper: 'طارق محمود عبد الرحمن',
    bloodType: 'A-',
    paperDate: '2026-10-22',
  },
];

// تنسيق التاريخ بالعربي مع الحفاظ على وضوح الأرقام
export function formatPaperDate(isoDate) {
  return new Intl.DateTimeFormat('ar-EG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate));
}