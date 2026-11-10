import { UNITS_MAX } from './requesterConstants';

// أخطاء الخطوة 1: المفتاح هو اسم الحقل. لو الكائن فاضي يبقى كله تمام.
export function detailsErrors(draft) {
  const errors = {};
  const units = Number(draft.units);

  if (!draft.bloodType) errors.bloodType = 'اختر فصيلة الدم';
  if (!Number.isInteger(units) || units < 1 || units > UNITS_MAX) {
    errors.units = `عدد الوحدات من 1 إلى ${UNITS_MAX}`;
  }
  if (!draft.urgency) errors.urgency = 'اختر درجة الاستعجال';
  if (!draft.neededBy) {
    errors.neededBy = 'حدد موعد الاحتياج';
  } else if (new Date(draft.neededBy) <= new Date()) {
    errors.neededBy = 'الموعد لازم يكون في المستقبل';
  }
  return errors;
}

// الورقة عدّت الفحص؟ (needs_review و checking مش بيعدّوا)
const PASSING = ['pending_hospital', 'looks_valid', 'queued'];

export function paperPassed(check) {
  return Boolean(check) && PASSING.includes(check.status);
}
