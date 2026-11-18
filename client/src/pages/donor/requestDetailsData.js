import { Banknote, Building2, Check, Heart, ShieldCheck } from 'lucide-react';

/* GET /api/requests/:id */
export const requests = [
  {
    id: 'BL-2026-004213',
    status: 'active',
    trust: 'verified',
    bloodType: 'O+',
    compatibleWithMe: true,
    unitsNeeded: 3,
    unitsPledged: 1,
    deadlineLabel: 'الغد، 6:00 ص',
    urgency: 'urgent',
    urgencyLabel: 'عاجل',
    publishedAgo: 'نُشر منذ ٦ ساعات',
    reason: 'عملية جراحية مجدولة',
    department: 'قسم الجراحة',
    paperConfirmedAt: '21/10/2026',
    hospital: {
      id: 'HP-0007',
      name: 'مستشفى النور',
      area: 'مدينة نصر',
      partner: true,
      address: '١٤ شارع مصطفى النحاس، مدينة نصر',
      bloodBank: 'المبنى ب · الدور الأرضي',
      hours: '9:00 ص – 9:00 م',
      distanceLabel: '2.4 كم · 12 دقيقة',
    },
    requester: {
      name: 'سارة إبراهيم',
      short: 'سارة إ.',
      initials: 'سإ',
      relation: 'ابنة المريض',
      roleLabel: 'صاحبة الطلب · ابنة المريض',
      phoneHint: 'يظهر رقمها بعد موافقتك',
      phoneHref: 'tel:+201000000012', // mock: real number only after accept (FR-17)
    },
  },
  {
    id: 'BL-2026-004205',
    status: 'active',
    trust: 'looks_valid',
    bloodType: 'A+',
    compatibleWithMe: true,
    unitsNeeded: 2,
    unitsPledged: 1,
    deadlineLabel: 'اليوم، 8:00 م',
    urgency: 'normal',
    urgencyLabel: 'عادي',
    publishedAgo: 'نُشر منذ ٣ ساعات',
    reason: 'حالة طارئة',
    department: 'قسم الطوارئ',
    paperConfirmedAt: '21/10/2026',
    hospital: {
      id: 'HP-0031',
      name: 'مستشفى الرحمة العام',
      area: 'العباسية',
      partner: false,
      address: 'شارع رمسيس، العباسية',
      bloodBank: null,
      hours: null,
      distanceLabel: '6.1 كم · 22 دقيقة',
    },
    requester: {
      name: 'محمد كمال',
      short: 'محمد ك.',
      initials: 'مك',
      relation: 'ابن المريض',
      roleLabel: 'صاحب الطلب · ابن المريض',
      phoneHint: 'يظهر رقمه بعد موافقتك',
      phoneHref: 'tel:+201000000034',
    },
  },
];

/* POST /api/requests/:id/pledges */
export const pledges = [
  {
    requestId: 'BL-2026-004213',
    id: 'AP-2026-118204',
    code: 'AP-118204',
    validUntilLabel: '23/10 · 6:00 ص',
    canSelfConfirm: false,
    notice: {
      title: 'تم تسجيل موافقتك بنجاح - شكراً لك يا أحمد',
      text: 'أرسلنا رسالة نصية بالتفاصيل، وأبلغنا صاحبة الطلب والمستشفى. رقم الموعد',
    },
    summary: [
      { label: 'المتبرع', value: 'أحمد محمود · O+' },
      { label: 'الموعد', value: 'اليوم · قبل 8:00 م' },
    ],
    directionsLabel: 'الاتجاهات · ١٢ دقيقة',
    contactNote: 'رقم هاتفك ظاهر لصاحب الطلب منذ موافقتك فقط.',
  },
  {
    requestId: 'BL-2026-004205',
    id: 'AP-2026-118211',
    code: null,
    validUntilLabel: null,
    canSelfConfirm: false, // enable rule not specified in the requirements - agree it as a team
    notice: {
      title: 'تم تسجيل موافقتك - شكراً لك يا أحمد',
      text: 'أبلغنا صاحب الطلب، ويمكنكما الآن رؤية رقمي الهاتف للتنسيق.',
    },
    summary: [],
    directionsLabel: 'الاتجاهات',
    contactNote: 'رقم هاتفك ظاهر لصاحب الطلب منذ موافقتك فقط.',
  },
];

export const arrivalGuides = [
  {
    partner: true,
    heading: 'عند وصولك إلى المستشفى',
    steps: [
      { title: 'ادخل من البوابة رقم ٢', text: 'شارع مصطفى النحاس، أمام موقف السيارات.' },
      { title: 'بنك الدم · المبنى ب · الدور الأرضي', text: 'اتبع اللافتات الحمراء.' },
      { title: 'اعرض رمز QR وبطاقة الرقم القومي', text: 'يمسح الموظف الرمز من بوابة المستشفى ويسجّل وصولك.' },
      {
        title: 'الفريق الطبي يفحصك ويقرر',
        text: 'قد يُؤجَّل التبرع لأسباب طبية، وهذا طبيعي ولن يؤثر على حسابك.',
      },
    ],
  },
  {
    partner: false,
    heading: 'الخطوات',
    steps: [
      { title: 'اتفقا على موعد داخل المستشفى', text: 'تواصل مع صاحب الطلب من الرقم الظاهر بجانبك.' },
      { title: 'اذهب إلى بنك الدم في مستشفى الرحمة العام', text: 'المستشفى يفحصك ويقرر طبياً.' },
      {
        title: 'بعد التبرع اضغط «تبرعتُ بالفعل»',
        text: 'ثم يؤكد صاحب الطلب، ويُسجَّل التبرع «بتأكيد ذاتي».',
      },
    ],
  },
];

export const notices = [
  {
    id: 'before-accept',
    tone: 'warn',
    title: 'قبل أن توافق',
    text: 'اللقاء داخل المستشفى فقط. لا تدفع ولا تقبل أي أموال. القرار النهائي بشأن تبرعك يعود للفريق الطبي.',
  },
  {
    id: 'free',
    tone: 'err',
    title: 'التبرع مجاني تماماً',
    text: 'إذا طلب منك أحد مالاً أو عرضه عليك، أبلغنا فوراً.',
  },
];

export const sheetChecks = [
  { icon: Building2, text: 'سألتقي صاحب الطلب داخل المستشفى فقط' },
  { icon: Banknote, text: 'لن أدفع ولن أقبل أي أموال' },
  { icon: ShieldCheck, text: 'الفريق الطبي في المستشفى هو من يقرر' },
];

export const reportReasons = [
  { id: 'misleading', label: 'معلومات الطلب تبدو مضلّلة' },
  { id: 'money', label: 'طلب أو عرض مقابل مادي' },
  { id: 'abuse', label: 'سلوك مسيء من صاحب الطلب' },
  { id: 'duplicate', label: 'هذا الطلب مكرر' },
  { id: 'other', label: 'سبب آخر' },
];

export const breadcrumbs = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الطلبات القريبة', href: '/donor' },
];

export const trustChips = [
  { level: 'verified', label: '✓ طلب موثّق' },
  { level: 'looks_valid', label: '✦ ورقة تبدو سليمة' },
];

export const statusChips = [
  { views: ['before'], label: 'الحالة: بانتظار ردّك' },
  { views: ['accepted'], label: 'الحالة: تمت موافقتك' },
  { views: ['closed'], label: 'الحالة: اكتمل' },
  { views: ['declined'], label: 'الحالة: اعتذرت' },
];

export const emptyStates = [
  {
    view: 'closed',
    icon: Check,
    title: 'اكتمل هذا الطلب، شكراً لاهتمامك',
    text: 'وافق العدد المطلوب من المتبرعين، أو انتهت مدة الطلب. لن تُطلب منك أي خطوة.',
  },
  {
    view: 'declined',
    icon: Heart,
    title: 'شكراً لك، سجّلنا اعتذارك',
    text: 'سنبلغ متبرعاً آخر بالطلب. يمكنك دائماً مساعدة طلب آخر قريب منك.',
  },
];

export const toastMessages = [
  { id: 'accepted', text: 'تم تسجيل موافقتك، شكراً لك' },
  { id: 'cancelled', text: 'أُلغيت موافقتك' },
  { id: 'reported', text: 'وصلنا بلاغك، سيراجعه فريقنا' },
];

/* views that show the hospital sidebar */
export const asideViews = ['before', 'accepted', 'loading'];
