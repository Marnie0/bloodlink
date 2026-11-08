// نص علامة الثقة ثابت ومينفعش يتغير (FR-10): الـ AI عمره ما يقول "أصلية".
export const TRUST_LABELS = {
  verified: { full: "موثّق", short: "موثّق" },
  looks_valid: { full: "ورقة تبدو سليمة", short: "تبدو سليمة" },
  needs_review: { full: "بحاجة لمراجعة", short: "مراجعة" },
  pending: { full: "بانتظار تأكيد المستشفى", short: "بانتظار" },
};

// المتبرع بفصيلة (المفتاح) يقدر يتبرع لأنهي فصائل (القيمة). بنستخدمها في الرسالة اللي فوق الجدول.
export const CAN_DONATE_TO = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"],
};

export const FIRST_WAVE_KM = 5; // الطلبات القريبة: أول 5 كم
export const SECOND_WAVE_KM = 15; // لو مفيش كفاية: بعدين 15 كم
export const MAX_UPLOAD_MB = 5; // أقصى حجم لشهادة الدم
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];
