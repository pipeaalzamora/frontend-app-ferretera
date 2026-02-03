'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { NotificationProvider } from '@/components/ui/NotificationSystem';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </Provider>
    </ErrorBoundary>
  );
} 