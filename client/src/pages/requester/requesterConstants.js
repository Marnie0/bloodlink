// ثوابت صفحة تقديم الطلب. لو عايز تغيّر اختيار، غيّره هنا.

// خطوات الصفحة: key هو اللي بيظهر في الرابط /requests/new/:step
export const STEPS = [
  { key: 'details', label: 'بيانات المريض' },
  { key: 'paper', label: 'ورقة المستشفى' },
  { key: 'review', label: 'المراجعة' },
  { key: 'send', label: 'الإقرار والإرسال' },
];

export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// المهلة اللي الطلب لازم يتغطّى فيها
export const URGENCY = [
  { value: 'critical', label: 'عاجل جدًا (خلال 6 ساعات)' },
  { value: 'urgent', label: 'عاجل (خلال 24 ساعة)' },
  { value: 'soon', label: 'خلال 3 أيام' },
];

export const UNITS_MAX = 6;

export const PAPER_TYPES = [
  { value: 'blood_request', label: 'طلب دم صادر من المستشفى' },
  { value: 'medical_report', label: 'تقرير طبي من المستشفى' },
];

// مستشفيات وهمية لحد ما السيرفر يجهز. isPartner: المستشفى شريكة (FR-07)
export const HOSPITALS = [
  { id: 'HP-0007', name: 'مستشفى النور', area: 'مدينة نصر', isPartner: true },
  { id: 'HP-0003', name: 'مستشفى الأمل', area: 'الدقي', isPartner: false },
  { id: 'HP-0012', name: 'مستشفى الرحمة العام', area: 'العباسية', isPartner: false },
];

// حدود رفع الورقة (US-02: 5 ميجا)
export const MAX_FILE_MB = 5;
export const ACCEPTED_FILES = ['image/jpeg', 'image/png', 'application/pdf'];

// نصوص نتيجة الفحص (FR-10: النصوص ثابتة، والفحص الآلي عمره ما يقول "أصلية")
export const CHECK_LABELS = {
  pending_hospital: 'بانتظار تأكيد المستشفى',
  looks_valid: 'ورقة تبدو سليمة',
  queued: 'قيد المراجعة',
};

// أسباب عدم وضوح الورقة
export const PROBLEM_LABELS = {
  hospital_name_unreadable: 'اسم المستشفى غير مقروء',
  stamp_missing: 'الختم غير ظاهر',
  date_unreadable: 'التاريخ غير مقروء',
};
