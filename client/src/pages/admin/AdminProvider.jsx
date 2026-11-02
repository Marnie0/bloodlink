import { useEffect, useState } from 'react';
import { AdminContext } from './AdminContext';
import { initialAdminData } from './adminData';

const STORAGE_KEY = 'bloodlink-admin-demo-v1';

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      saved &&
      Object.keys(initialAdminData).every((key) => Array.isArray(saved[key])) &&
      ['papers', 'reports', 'hospitals', 'bannedUsers', 'activities'].every((key) =>
        saved[key].every((item) => item && typeof item.id === 'string'),
      )
    )
      return saved;
  } catch {
    /* Storage may be unavailable; the demo still works in memory. */
  }
  return structuredClone(initialAdminData);
}

export default function AdminProvider({ children }) {
  const [data, setData] = useState(loadData);
  const [notice, setNotice] = useState('');
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Surface the limitation without blocking the frontend demo.
      queueMicrotask(() => setStorageError(true));
    }
  }, [data]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(timer);
  }, [notice]);

  function decide(collection, id, status, note) {
    const item = data[collection].find((entry) => entry.id === id);
    if (!item || (collection === 'reports' ? item.status !== 'open' : item.status !== 'pending')) return;
    const verbs = {
      approved: collection === 'hospitals' ? 'اعتماد المستشفى' : 'قبول الورقة',
      rejected: 'رفض الطلب',
      dismissed: 'حفظ البلاغ',
      warned: 'تنبيه الحساب',
      banned: 'حظر الحساب',
    };
    const text = `${verbs[status]} · ${item.name || item.account}`;
    setData((previous) => ({
      ...previous,
      [collection]: previous[collection].map((entry) =>
        entry.id === id ? { ...entry, status, note, reviewedAt: new Date().toISOString() } : entry,
      ),
      bannedUsers:
        status === 'banned' && !previous.bannedUsers.some((entry) => entry.id === item.userId)
          ? [
              ...previous.bannedUsers,
              { id: item.userId, name: item.account, reason: note, date: new Date().toISOString() },
            ]
          : previous.bannedUsers,
      activities: [
        {
          id: crypto.randomUUID(),
          text,
          date: new Date().toISOString(),
          tone: ['banned', 'rejected'].includes(status) ? 'danger' : 'ok',
        },
        ...previous.activities,
      ].slice(0, 40),
    }));
    setNotice(`${text} — تم حفظ القرار في النسخة التجريبية.`);
  }

  function unban(id, reason) {
    const user = data.bannedUsers.find((entry) => entry.id === id);
    if (!user) return;
    setData((previous) => ({
      ...previous,
      bannedUsers: previous.bannedUsers.filter((entry) => entry.id !== id),
      activities: [
        {
          id: crypto.randomUUID(),
          text: `إلغاء حظر ${user.name} · ${reason}`,
          date: new Date().toISOString(),
          tone: 'info',
        },
        ...previous.activities,
      ].slice(0, 40),
    }));
    setNotice(`تم إلغاء حظر ${user.name} في النسخة التجريبية.`);
  }

  function resetDemo() {
    setData(structuredClone(initialAdminData));
    setNotice('تمت استعادة البيانات التجريبية الأصلية.');
  }

  return (
    <AdminContext.Provider value={{ data, decide, unban, resetDemo, notice, storageError }}>
      {children}
    </AdminContext.Provider>
  );
}
