import { useEffect } from 'react';

// For pop-up menus: while open, close on a click outside `wrapperRef`, or on Escape
// (Escape also puts focus back on `buttonRef`, the button that opened it).
export function useDismiss(open, close, wrapperRef, buttonRef) {
  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (!wrapperRef.current?.contains(e.target)) close();
    }
    function handleKey(e) {
      if (e.key === 'Escape') {
        close();
        buttonRef?.current?.focus();
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open, close, wrapperRef, buttonRef]);
}
