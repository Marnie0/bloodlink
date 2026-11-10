const API_URL = import.meta.env.VITE_API_URL;

const MESSAGES = {
  wrong: 'البريد الإلكتروني أو رقم الهاتف أو كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى.',
  network: 'حدث خطأ أثناء الاتصال بالخادم. الرجاء التحقق من اتصالك بالإنترنت.',
  duplicate: 'البريد الإلكتروني أو رقم الهاتف مستخدم بالفعل. الرجاء استخدام بريد إلكتروني أو رقم هاتف آخر.',
  other: 'حدث خطأ غير متوقع. الرجاء المحاولة لاحقاً.',
};

function cleanIdentifier(identifier) {
  const value = identifier.trim();
  const isEmail = value.includes('@');
  return isEmail ? value.toLowerCase() : value.replace(/[\s-]/g, '');
}

function fail(status, message) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

async function postJson(path, body) {
  if (!API_URL) {
    throw new Error('VITE_API_URL is missing: create client/.env.local (see .env.example)');
  }
  try {
    return await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    fail(0, MESSAGES.network);
  }
}

export async function loginRequest({ identifier, password }) {
  const cleaned = cleanIdentifier(identifier);

  const response = await postJson('/auth/login', { email: cleaned, password });

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

export async function signupRequest({ name, email, password }) {
  const cleaned = cleanIdentifier(email);

  const response = await postJson('/auth/register', {
    name: name.trim(),
    email: cleaned,
    password,
    gender: 'male',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    fail(response.status, response.status === 409 ? MESSAGES.duplicate : MESSAGES.other);
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
