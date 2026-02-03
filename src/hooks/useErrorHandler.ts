import { useState, useCallback } from 'react';
import { ERROR_MESSAGES } from '@/lib/constants';
import { ErrorState } from '@/types';

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    console.error('Error capturado:', error);
    
    let errorMessage = customMessage || ERROR_MESSAGES.GENERIC_ERROR;
    
    // Determinar tipo de error
    const errorObj = error as { response?: { status: number }; code?: string; message?: string };
    
    if (errorObj?.response?.status === 404) {
      errorMessage = 'Recurso no encontrado';
    } else if (errorObj?.response?.status === 500) {
      errorMessage = 'Error interno del servidor';
    } else if (errorObj?.response?.status && errorObj.response.status >= 400 && errorObj.response.status < 500) {
      errorMessage = 'Error en la solicitud';
    } else if (errorObj?.code === 'NETWORK_ERROR' || !navigator.onLine) {
      errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
    }
    
    setError({
      message: errorMessage,
      details: errorObj?.message || 'Error desconocido',
      timestamp: new Date().toISOString()
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeWithErrorHandling = useCallback(async <T>(
    asyncFunction: () => Promise<T>, 
    errorMessage?: string
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction();
      return result;
    } catch (error) {
      handleError(error, errorMessage);
      throw error; // Re-throw para que el componente pueda manejar si es necesario
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeWithErrorHandling
  };
}; 