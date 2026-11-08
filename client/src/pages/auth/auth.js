const API_URL = import.meta.env.VITE_API_URL;

const MESSAGES = {
  wrong: 'البريد الإلكتروني أو رقم الهاتف أو كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى.',
  network: 'حدث خطأ أثناء الاتصال بالخادم. الرجاء التحقق من اتصالك بالإنترنت.',
  other: 'حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة لاحقاً.',
};

function fail(status, message) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

export async function loginRequest({ identifier, password }) {
  if (!API_URL) {
    throw new Error('VITE_API_URL is missing: create client/.env.local (see .env.example)');
  }
  const value = identifier.trim();
  const isEmail = value.includes('@');
  const cleaned = isEmail ? value.toLowerCase() : value.replace(/[\s-]/g, '');

  let response;
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleaned, password }),
    });
  } catch {
    fail(0, MESSAGES.network);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    fail(response.status, response.status === 401 ? MESSAGES.wrong : MESSAGES.other);
  }

  const user = data.user ?? data;

  return {
    id: user.id,
    name: user.name ?? cleaned,
    email: user.email ?? cleaned,
    phone: user.phone ?? '',
    roles: user.roles ?? ['donor'],
  };
}
