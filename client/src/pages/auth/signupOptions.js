import { Droplet, Heart } from 'lucide-react';

// Choices for the signup form.
// Roles, phone, blood type and location follow the DevKit design, but the instructor's API only
// stores name, email and password, so they are collected and validated here, not sent yet.

export const ROLES = [
  { value: 'donor', label: 'متبرع', hint: 'تصلني طلبات تناسب فصيلتي', Icon: Heart },
  { value: 'requester', label: 'صاحب طلب', hint: 'أطلب دمًا لمريض', Icon: Droplet },
];

// A short list until the backend provides governorates and areas
export const GOVERNORATES = [
  { name: 'القاهرة', areas: ['مدينة نصر', 'مصر الجديدة', 'المعادي', 'شبرا', 'العباسية', 'وسط البلد'] },
  { name: 'الجيزة', areas: ['الدقي', 'المهندسين', 'الهرم', 'فيصل', '6 أكتوبر', 'الشيخ زايد'] },
  { name: 'الإسكندرية', areas: ['سموحة', 'سيدي جابر', 'المنتزه', 'العجمي', 'محرم بك'] },
  { name: 'القليوبية', areas: ['بنها', 'شبرا الخيمة', 'قليوب', 'العبور'] },
];

export const PASSWORD_MIN = 8;
