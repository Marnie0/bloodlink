import Brand from './Brand';
import MainNav from './MainNav';
import { Link } from 'react-router-dom';
import { Bell, LogIn, Search } from 'lucide-react';

function handleSearch(e) {
  e.preventDefault();
}

export default function Header() {
  return (
    <header className="border-line bg-surface border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Brand />
        <div className="flex items-center gap-2 md:gap-3">
          <form
            role="search"
            onSubmit={handleSearch}
            className="border-line bg-surface-2 hidden items-center rounded-full border ps-4 lg:flex"
          >
            <input
              type="search"
              placeholder="ابحث عن خدمة أو مستشفى"
              aria-label="ابحث عن خدمة أو مستشفى"
              className="w-64 bg-transparent py-2 outline-none"
            />
            <button
              type="submit"
              aria-label="بحث"
              className="bg-navy m-1 grid size-9 place-items-center rounded-full text-white"
            >
              <Search className="size-4" />
            </button>
          </form>
          <button
            type="button"
            aria-label="الإشعارات"
            className="border-line grid size-11 shrink-0 place-items-center rounded-full border"
          >
            <Bell />
          </button>
          <Link to="/login" className="btn btn-secondary btn-circle md:w-auto md:rounded-full md:px-5">
            <LogIn className="size-5 md:hidden" />
            <span className="sr-only md:not-sr-only">تسجيل الدخول</span>
          </Link>
        </div>
      </div>
      <MainNav />
    </header>
  );
}
