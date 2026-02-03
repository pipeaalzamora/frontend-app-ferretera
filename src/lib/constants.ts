// Configuración de URLs de la API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Endpoints de la API
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: '/api/products/:id',
  SEARCH_PRODUCTS: '/api/products/search',
  CATEGORIES: '/api/categories',
  CONTACT: '/api/contact',
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_PRODUCTS: '/api/admin/products'
} as const;

// Configuraciones generales
export const APP_CONFIG = {
  COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Ecosa',
  VERSION: process.env.NEXT_PUBLIC_VERSION || '2.0.0',
  ITEMS_PER_PAGE: 10,
  MAX_SEARCH_RESULTS: 50
} as const;

// Mensajes de error estandarizados
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  VALIDATION_ERROR: 'Por favor, completa todos los campos requeridos.',
  SEARCH_ERROR: 'Error al realizar la búsqueda. Inténtalo nuevamente.',
  GENERIC_ERROR: 'Ha ocurrido un error inesperado. Inténtalo más tarde.',
  FORM_SUBMIT_ERROR: 'Error al enviar el formulario. Inténtalo nuevamente.'
} as const;

// Tipos TypeScript
export type ApiEndpoint = keyof typeof API_ENDPOINTS;
export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

// Configuración de rutas
export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalogo',
  ABOUT: '/nosotros',
  CONTACT: '/contacto'
} as const;

export type RouteKey = keyof typeof ROUTES; 