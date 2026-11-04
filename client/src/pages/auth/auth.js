import { users } from '@/mocks/users';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function fail(status, message) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

export async function login({ identifier, password }) {
  await wait(800);

  const value = identifier.trim();
  const isEmail = value.includes('@');
  const cleaned = isEmail ? value.toLowerCase() : value.replace(/[\s-]/g, '');

  const user = users.find((u) => (isEmail ? u.email : u.phone) === cleaned && u.password === password);

  if (!user) {
    fail(401, 'البريد الإلكتروني أو رقم الهاتف أو كلمة المرور غير صحيحة.');
  }

  if (user.status === 'pending') {
    fail(403, 'حسابك قيد المراجعة من قبل الإدارة.');
  }

  if (user.status === 'banned') {
    fail(403, 'تم حظر حسابك من قبل الإدارة.');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
  };
}
