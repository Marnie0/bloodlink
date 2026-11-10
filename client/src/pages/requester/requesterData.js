// مفيش سيرفر للطلبات لسه، فالبيانات هنا وهمية.
// لما السيرفر يجهز، بنبدّل اللي جوه getRequestProgress بـ fetch وخلاص.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fail(status, message) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

const REQUESTS = {
  // 2 من 3 وحدات ليها متبرع (الحالة العادية)
  'BL-2026-004213': {
    id: 'BL-2026-004213',
    hospital: { name: 'مستشفى النور', area: 'مدينة نصر' },
    bloodType: 'O+',
    neededBy: '2026-11-12T06:00:00+02:00',
    trust: 'verified',
    unitsNeeded: 3,
    wave: { radiusKm: 5, notified: 14, nextRadiusKm: 15 },
    pledges: [
      {
        id: 'AP-2026-118201',
        donor: { name: 'أحمد محمود', trust: 'verified' },
        distanceKm: 2.4,
        acceptedAt: '2026-11-08T10:05:00+02:00',
        phone: '01012345678',
      },
      {
        id: 'AP-2026-118188',
        donor: { name: 'كريم حسن', trust: 'looks_valid' },
        distanceKm: 4.1,
        acceptedAt: '2026-11-08T08:40:00+02:00',
        phone: '01198762290',
      },
    ],
    timeline: [
      { at: '2026-11-07T21:12:00+02:00', event: 'submitted' },
      { at: '2026-11-07T22:05:00+02:00', event: 'paper_confirmed' },
      { at: '2026-11-07T22:06:00+02:00', event: 'wave_sent' },
    ],
  },

  // لسه محدش وافق (الحالة الفاضية)
  'BL-2026-004220': {
    id: 'BL-2026-004220',
    hospital: { name: 'مستشفى الرحمة العام', area: 'العباسية' },
    bloodType: 'A+',
    neededBy: '2026-11-12T12:00:00+02:00',
    trust: 'looks_valid',
    unitsNeeded: 2,
    wave: { radiusKm: 5, notified: 9, nextRadiusKm: 15 },
    pledges: [],
    timeline: [
      { at: '2026-11-08T09:30:00+02:00', event: 'submitted' },
      { at: '2026-11-08T09:31:00+02:00', event: 'wave_sent' },
    ],
  },
};

// من التحميل التالت للطلب 004213، متبرع تالت "بيوافق"
// علشان تشوف الصفحة بتتحدث لوحدها من 2 لـ 3.
let calls = 0;
const THIRD_PLEDGE = {
  id: 'AP-2026-118230',
  donor: { name: 'هالة مصطفى', trust: 'verified' },
  distanceKm: 3,
  acceptedAt: '2026-11-08T11:20:00+02:00',
  phone: '01277817781',
};

export async function getRequestProgress(id) {
  await wait(700);
  if (id === 'BL-2026-000500') fail(500, 'Server error'); // لتجربة شاشة الخطأ
  const request = REQUESTS[id];
  if (!request) fail(404, 'لم نجد هذا الطلب.');
  if (id === 'BL-2026-004213') {
    calls += 1;
    if (calls >= 3) return { ...request, pledges: [...request.pledges, THIRD_PLEDGE] };
  }
  return request;
}

// فحص الورقة. للتجربة:
//   اسم الملف فيه "unclear" -> الورقة غير واضحة
//   اسم الملف فيه "down"    -> الفحص الآلي واقف، الورقة تروح للمراجعة
//   غير كده: مستشفى شريكة -> بانتظار تأكيدها، وغير شريكة -> تبدو سليمة
export async function checkPaper({ hospital, file }) {
  await wait(1500);
  const name = file.name.toLowerCase();
  if (name.includes('down')) return { status: 'queued', problems: [] };
  if (name.includes('unclear')) {
    return { status: 'needs_review', problems: ['stamp_missing', 'date_unreadable'] };
  }
  return { status: hospital.isPartner ? 'pending_hospital' : 'looks_valid', problems: [] };
}

// إرسال الطلب. لما السيرفر يجهز هتاخد الـ draft وترجّع رقم الطلب الحقيقي.
// دلوقتي بترجّع طلب من اللي في getRequestProgress علشان صفحة المتابعة تفتح.
export async function submitRequest() {
  await wait(900);
  return { id: 'BL-2026-004220' };
}
