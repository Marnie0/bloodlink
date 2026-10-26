export const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const TRUST_LEVELS = Object.freeze({
  VERIFIED: 'verified',
  LOOKS_VALID: 'looks_valid',
  NEEDS_REVIEW: 'needs_review',
  PENDING: 'pending',
  label: {
    verified: { full: 'موثّق', short: 'موثّق', en: 'Verified' },
    looks_valid: { full: 'ورقة تبدو سليمة', short: 'تبدو سليمة', en: 'Paper looks valid' },
    needs_review: { full: 'بحاجة لمراجعة', short: 'مراجعة', en: 'Needs review' },
    pending: { full: 'بانتظار تأكيد المستشفى', short: 'بانتظار', en: 'Waiting for hospital' },
  },
});

export const REQUEST_STATUS = Object.freeze({
  DRAFT: 'draft',
  CHECKING: 'checking',
  PENDING_HOSPITAL: 'pending_hospital',
  NEEDS_REVIEW: 'needs_review',
  ACTIVE: 'active',
  FULFILLED: 'fulfilled',
  EXPIRED: 'expired',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
});

export const PLEDGE_STATUS = Object.freeze({
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  CANCELLED: 'cancelled',
  CLOSED: 'closed',
});

export const DONATION_OUTCOME = Object.freeze({
  DONATED: 'donated',
  DEFERRED: 'deferred',
  NO_SHOW: 'no_show',
  SELF_CONFIRMED: 'self_confirmed',
});

export const WAVES_KM = [5, 15];
export const MAX_UPLOAD_MB = 5;
export const UPLOAD_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
