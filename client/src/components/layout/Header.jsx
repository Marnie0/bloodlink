import Brand from './Brand';
import HeaderSearch from './HeaderSearch';
import MainNav from './MainNav';
import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="border-line bg-surface border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Brand />
        <div className="flex items-center gap-2 md:gap-3">
          <HeaderSearch />
          <NotificationsMenu />
          {user ? (
            <UserMenu />
          ) : (
            <Link to="/login" className="btn btn-secondary btn-circle md:w-auto md:rounded-full md:px-5">
              <LogIn className="size-5 md:hidden" />
              <span className="sr-only md:not-sr-only">تسجيل الدخول</span>
            </Link>
          )}
        </div>
      </div>
      <MainNav />
    </header>
  );
}
