// بنحسب وقت الانتهاء من "دلوقتي" عشان الطلبات التجريبية متظهرش منتهية
const hoursFromNow = (hours) =>
  new Date(Date.now() + hours * 36e5).toISOString();

// بيانات المتبرع (الصفحات التلاتة بتستخدمها)
export const donorProfile = {
  id: "DN-2026-01877",
  name: "أحمد محمود عبد الله",
  bloodType: "O+",
  trust: "verified",
  certificateHospital: "مستشفى النور",
  donations: 4,
  lastDonation: "2026-06-12",
  eligibleFrom: "2026-08-07", // بعد الفترة دي يقدر يتبرع تاني (إرشاد بس، المستشفى هي اللي تقرر)
  available: true, // مفتاح "متاح لاستقبال الطلبات"
  area: { name: "مدينة نصر", lat: 30.0561, lng: 31.3301 },
};

// الطلبات القريبة (صفحة /donor/requests)
export const nearbyRequestsList = [
  {
    id: "BL-2026-004213",
    bloodType: "O+",
    hospital: { name: "مستشفى النور", area: "مدينة نصر", partner: true },
    distanceKm: 2.4,
    unitsNeeded: 3,
    unitsPledged: 1,
    trust: "verified",
    urgency: "urgent",
    expiresAt: hoursFromNow(18),
  },
  {
    id: "BL-2026-004205",
    bloodType: "A+",
    hospital: { name: "مستشفى الرحمة العام", area: "العباسية", partner: false },
    distanceKm: 6.1,
    unitsNeeded: 2,
    unitsPledged: 0,
    trust: "looks_valid",
    urgency: "normal",
    expiresAt: hoursFromNow(26),
  },
  {
    id: "BL-2026-004187",
    bloodType: "B+",
    hospital: { name: "مستشفى الشفاء التخصصي", area: "المعادي", partner: true },
    distanceKm: 9.8,
    unitsNeeded: 4,
    unitsPledged: 2,
    trust: "verified",
    urgency: "normal",
    expiresAt: hoursFromNow(50),
  },
];

// المستشفيات اللي تطلع الشهادة (القايمة المنسدلة في صفحة الشهادة)
export const hospitalsList = [
  { id: "HP-0007", name: "مستشفى النور", area: "مدينة نصر", partner: true },
  { id: "HP-0021", name: "مستشفى الأمل", area: "الدقي", partner: false },
];

// نتيجة فحص الشهادة: واحدة لكل حالة
export const certificateResultsByStatus = {
  pending_hospital: {
    status: "pending_hospital",
    extracted: null,
    problems: [],
  },
  looks_valid: {
    status: "looks_valid",
    extracted: {
      name: "أحمد محمود عبد الله",
      bloodType: "O+",
      stampVisible: true,
      date: "2026-10-02",
    },
    problems: [],
  },
  needs_review: {
    status: "needs_review",
    extracted: null,
    problems: ["stamp_missing"],
  },
};

// سجل التبرعات (صفحة /donor/history)
export const donationHistoryList = [
  {
    date: "2026-06-12",
    hospital: { name: "مستشفى النور", area: "مدينة نصر", partner: true },
    requestId: "BL-2026-003118",
    confirmedBy: "hospital_qr", // 'hospital_qr' (مسح QR) أو 'self_confirmed' (تأكيد ذاتي)
    outcome: "donated", // 'donated' أو 'deferred' أو 'no_show'
  },
  {
    date: "2026-02-03",
    hospital: { name: "مستشفى الرحمة العام", area: "العباسية", partner: false },
    requestId: "BL-2026-000874",
    confirmedBy: "self_confirmed",
    outcome: "donated",
  },
  {
    date: "2025-09-28",
    hospital: { name: "مستشفى الشفاء التخصصي", area: "المعادي", partner: true },
    requestId: "BL-2025-012409",
    confirmedBy: "hospital_qr",
    outcome: "donated",
  },
  {
    date: "2025-05-14",
    hospital: { name: "مستشفى النور", area: "مدينة نصر", partner: true },
    requestId: "BL-2025-006611",
    confirmedBy: "hospital_qr",
    outcome: "deferred",
  },
];
