// Fake data for the home page until the real API exists.

export const platformStats = {
  donors: 3482,
  verifiedDonors: 1206,
  activeRequests: 27,
  partnerHospitals: 14,
  // new donors per week for the last 7 weeks (the small bar chart)
  donorsTrend: [30, 45, 42, 60, 58, 80, 100],
};

export const urgentRequests = [
  {
    id: 'BL-2026-004213',
    bloodType: 'O+',
    hospital: 'مستشفى النور',
    area: 'مدينة نصر',
    unitsNeeded: 3,
    unitsPledged: 1,
    hoursLeft: 18,
    trust: 'verified',
  },
  {
    id: 'BL-2026-004205',
    bloodType: 'A-',
    hospital: 'مستشفى الأمل',
    area: 'الدقي',
    unitsNeeded: 2,
    unitsPledged: 0,
    hoursLeft: 31,
    trust: 'looks_valid',
  },
  {
    id: 'BL-2026-004187',
    bloodType: 'B+',
    hospital: 'مستشفى الشفاء التخصصي',
    area: 'المعادي',
    unitsNeeded: 4,
    unitsPledged: 2,
    hoursLeft: 48,
    trust: 'verified',
  },
];

// Active requests per blood type (the "ما فصيلتك؟" card)
export const requestsByType = {
  'O-': 3,
  'O+': 4,
  'A-': 1,
  'A+': 2,
  'B-': 0,
  'B+': 1,
  'AB-': 1,
  'AB+': 0,
};

export const partnerHospitals = [
  { name: 'مستشفى النور', place: 'مدينة نصر، القاهرة' },
  { name: 'مستشفى الشفاء التخصصي', place: 'المعادي، القاهرة' },
  { name: 'مستشفى الرحمة العام', place: 'الهرم، الجيزة' },
  { name: 'مستشفى السلام الجامعي', place: 'سموحة، الإسكندرية' },
];

// What the status lookup "finds". Only status, hospital, blood type and units,
// never names or phone numbers (privacy).
export const lookupResults = {
  'BL-2026-004213': {
    active: true,
    hospital: 'مستشفى النور',
    bloodType: 'O+',
    summary: 'وافق متبرع واحد من ثلاثة',
  },
  'BL-2026-004187': {
    active: false,
    hospital: 'مستشفى الشفاء التخصصي',
    bloodType: 'B+',
    summary: 'اكتمل الطلب وأُغلق',
  },
};
