import { partnerHospitals } from '@/lib/partnerHospitals';

// What the header search can find. `words` are extra words people may type for the same thing.
const SERVICES = [
  { title: 'تقديم طلب دم', to: '/requests/new', words: 'طلب دم مريض محتاج' },
  { title: 'الطلبات القريبة', to: '/donor/requests', words: 'تبرع متبرع طلبات عاجلة قريب' },
  { title: 'الاستعلام عن طلب', to: '/#ref', words: 'استعلام رقم مرجعي حالة طلب' },
  { title: 'إنشاء حساب', to: '/signup', words: 'تسجيل متبرع حساب جديد' },
  { title: 'تسجيل الدخول', to: '/login', words: 'دخول' },
  { title: 'شهادة فصيلة الدم', to: '/donor/certificate', words: 'شهادة فصيلة رفع' },
  { title: 'سجل التبرعات', to: '/donor/history', words: 'تبرعاتي سجل موعد' },
  { title: 'بوابة المستشفى الشريك', to: '/hospital', words: 'مستشفى موظف بوابة' },
  { title: 'طلب شراكة مستشفى', to: '/hospital/join', words: 'شراكة مستشفى انضمام' },
  { title: 'شروط الاستخدام', to: '/terms', words: 'شروط أحكام قواعد' },
].map((item) => ({ ...item, type: 'خدمة' }));

const HOSPITALS = partnerHospitals.map((hospital) => ({
  title: hospital.name,
  to: '/#partners',
  words: hospital.place,
  type: 'مستشفى شريك',
}));

export const SEARCH_ITEMS = [...SERVICES, ...HOSPITALS];

// Makes Arabic spelling differences not matter: أ/إ/آ → ا, ة → ه, ى → ي, no tashkeel or tatweel
export function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[ً-ْـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim();
}

// "الشروط" should find "شروط الاستخدام": drop "ال" at the start of each typed word
const stripAl = (word) => (word.length > 3 && word.startsWith('ال') ? word.slice(2) : word);

// Every typed word must appear somewhere in the item's title or extra words
export function searchItems(query, limit = 6) {
  const words = normalize(query).split(/\s+/).filter(Boolean).map(stripAl);
  if (words.length === 0) return [];
  return SEARCH_ITEMS.filter((item) => {
    const text = normalize(`${item.title} ${item.words}`);
    return words.every((word) => text.includes(word));
  }).slice(0, limit);
}
