// Stub from feat/frontend-setup. R2 replaces this whole file on feat/app-layout.
// Keep the same file name, the same export and the same props (see the DevKit).
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <main id="content">
      <Outlet />
    </main>
  );
}
