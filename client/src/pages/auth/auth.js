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

// One place that talks to the server. body → sent as JSON; token → "Authorization: Bearer …"
async function request(path, { method = 'GET', body, token } = {}) {
  if (!API_URL) {
    throw new Error('VITE_API_URL is missing: create client/.env.local (see .env.example)');
  }
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    return await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    fail(0, MESSAGES.network);
  }
}

function postJson(path, body) {
  return request(path, { method: 'POST', body });
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
    user: {
      id: user.id,
      name: user.name ?? cleaned,
      email: user.email ?? cleaned,
      phone: user.phone ?? '',
      roles: user.roles ?? ['donor'],
    },
    token: data.token ?? null,
  };
}

// Asks the server whether a saved token still works (it expires after 1 hour).
// false = the server refused it (401/403) → log out.
// true  = accepted, or the server had another problem (5xx): don't log anyone out for that.
// A network error throws, and the caller keeps the user logged in (they may just be offline).
export async function isTokenValid(token) {
  const response = await request('/users/me', { token });
  return response.status !== 401 && response.status !== 403;
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
