'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, Slide, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Notification } from '@/types';

// Context para el sistema de notificaciones
const NotificationContext = createContext<{
  showNotification: (message: string, type?: Notification['type'], duration?: number) => string;
  hideNotification: (id: string) => void;
  hideAllNotifications: () => void;
  showSuccess: (message: string, duration?: number) => string;
  showError: (message: string, duration?: number) => string;
  showWarning: (message: string, duration?: number) => string;
  showInfo: (message: string, duration?: number) => string;
} | null>(null);

// Transición personalizada
function SlideTransition(props: React.ComponentProps<typeof Slide>) {
  return <Slide {...props} direction="up" />;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

// Provider del sistema de notificaciones
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const hideNotification = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, open: false }
          : notification
      )
    );

    // Remover completamente después de la animación
    setTimeout(() => {
      setNotifications(prev => 
        prev.filter(notification => notification.id !== id)
      );
    }, 300);
  }, []);

  const showNotification = useCallback((message: string, type: Notification['type'] = 'info', duration = 6000) => {
    const id = Date.now() + Math.random() + '';
    const newNotification: Notification = {
      id,
      message,
      type,
      duration,
      open: true
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-hide después del duration especificado
    if (duration > 0) {
      setTimeout(() => {
        hideNotification(id);
      }, duration);
    }

    return id;
  }, [hideNotification]);

  const hideAllNotifications = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, open: false }))
    );
    
    setTimeout(() => {
      setNotifications([]);
    }, 300);
  }, []);

  // Métodos de conveniencia
  const showSuccess = useCallback((message: string, duration?: number) => 
    showNotification(message, 'success', duration), [showNotification]);
  
  const showError = useCallback((message: string, duration?: number) => 
    showNotification(message, 'error', duration), [showNotification]);
  
  const showWarning = useCallback((message: string, duration?: number) => 
    showNotification(message, 'warning', duration), [showNotification]);
  
  const showInfo = useCallback((message: string, duration?: number) => 
    showNotification(message, 'info', duration), [showNotification]);

  const value = {
    showNotification,
    hideNotification,
    hideAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Renderizar todas las notificaciones */}
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={notification.open}
          onClose={() => hideNotification(notification.id)}
          TransitionComponent={SlideTransition}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ 
            top: `${80 + (index * 70)}px !important`,
            zIndex: 9999 + index
          }}
        >
          <Alert
            onClose={() => hideNotification(notification.id)}
            severity={notification.type}
            className="min-w-[300px]"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => hideNotification(notification.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

// Hook para usar el sistema de notificaciones
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider');
  }
  return context;
}; 