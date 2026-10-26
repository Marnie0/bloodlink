// Stub from feat/frontend-setup. R3 replaces this whole file on feat/ui-basics.
// Keep the same file name, the same export and the same props (see the DevKit).
// Usage: const toast = useToast();  toast('تم الحفظ')
import { createContext, useContext } from 'react';

const ToastCtx = createContext(() => {});

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  return <ToastCtx.Provider value={() => {}}>{children}</ToastCtx.Provider>;
}
