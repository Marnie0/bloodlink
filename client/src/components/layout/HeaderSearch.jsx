import { useCallback, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useDismiss } from '@/lib/useDismiss';
import { searchItems } from './searchItems';

// Search box in the header. Results show under it while typing;
// Enter (or the search button) opens the first result.
export default function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = searchItems(query);
  const showResults = open && query.trim() !== '';

  const close = useCallback(() => setOpen(false), []);
  useDismiss(showResults, close, wrapperRef, inputRef);

  function reset() {
    setQuery('');
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (results.length === 0) {
      setOpen(true);
      return;
    }
    navigate(results[0].to);
    reset();
    inputRef.current.blur();
  }

  return (
    <div ref={wrapperRef} className="relative hidden lg:block">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="border-line bg-surface-2 flex items-center rounded-full border ps-4"
      >
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="ابحث عن خدمة أو مستشفى"
          aria-label="ابحث عن خدمة أو مستشفى"
          aria-controls="search-results"
          aria-expanded={showResults}
          autoComplete="off"
          className="w-64 bg-transparent py-2 outline-none"
        />
        <button
          type="submit"
          aria-label="بحث"
          className="bg-navy m-1 grid size-9 place-items-center rounded-full text-white"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
      </form>

      <p aria-live="polite" className="sr-only">
        {showResults && (results.length ? `${results.length} نتائج` : 'لا توجد نتائج')}
      </p>

      {showResults && (
        <div
          id="search-results"
          className="bg-surface border-line rounded-tile shadow-raised hc:border-2 absolute inset-x-0 top-full z-50 mt-2 border p-1.5"
        >
          {results.length === 0 ? (
            <p className="text-small text-ink-2 px-3 py-2">
              لا توجد نتائج لـ «{query.trim()}». جرّب كلمة أخرى مثل: طلب دم، تبرع، مستشفى.
            </p>
          ) : (
            <ul>
              {results.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.to}
                    onClick={reset}
                    className="hover:bg-surface-2 focus-visible:bg-surface-2 flex items-center justify-between gap-3 rounded-[10px] px-3 py-2"
                  >
                    <span className="text-ink text-small font-semibold">{item.title}</span>
                    <span className="text-tiny text-ink-3 shrink-0">{item.type}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
