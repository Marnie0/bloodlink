import { TriangleAlert } from 'lucide-react';
import { buttonClass } from '@/pages/donor/donorStyles';
import EmptyState from './EmptyState';
export default function ErrorState({ title, onRetry, children }) {
  return (
    <div role="alert">
      <EmptyState
        icon={TriangleAlert}
        tone="err"
        title={title}
        actions={
          onRetry && (
            <button type="button" className={buttonClass('navy', 'sm')} onClick={onRetry}>
              إعادة المحاولة
            </button>
          )
        }
      >
        {children}
      </EmptyState>
    </div>
  );
}
