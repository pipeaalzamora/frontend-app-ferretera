'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturó un error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Usar fallback personalizado si se proporciona
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback por defecto
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <ErrorOutlineIcon 
                className="text-red-500 mx-auto mb-4" 
                sx={{ fontSize: 80 }}
              />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Ups! Algo salió mal
              </h1>
              <p className="text-gray-600">
                Ha ocurrido un error inesperado en la aplicación.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
                <p className="text-sm font-mono text-gray-700 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.handleReset}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Intentar de Nuevo
              </Button>
              
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<RefreshIcon />}
                onClick={this.handleReload}
              >
                Recargar Página
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Si el problema persiste, contacta al soporte técnico.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 