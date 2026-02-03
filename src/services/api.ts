import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants';
import { Product, ContactFormData } from '@/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
      withCredentials: true, // Enable cookies
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.clearAuth();
          if (typeof window !== 'undefined') {
            window.location.href = '/admin/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Token management with cookies
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    // Try to get from cookie first
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];
    
    if (cookieToken) return cookieToken;
    
    // Fallback to localStorage
    return localStorage.getItem('authToken');
  }

  private setToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    // Set in cookie (expires in 7 days)
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    document.cookie = `authToken=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
    
    // Also set in localStorage as fallback
    localStorage.setItem('authToken', token);
  }

  private clearAuth(): void {
    if (typeof window === 'undefined') return;
    
    // Clear cookie
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Clear localStorage
    localStorage.removeItem('authToken');
  }

  // Products
  async getProducts(params?: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    page?: number;
    limit?: number;
  }) {
    const response = await this.api.get(API_ENDPOINTS.PRODUCTS, { params });
    return response.data;
  }

  async getProductById(id: string) {
    const endpoint = API_ENDPOINTS.PRODUCT_BY_ID.replace(':id', id);
    const response = await this.api.get(endpoint);
    return response.data;
  }

  async searchProducts(query: string) {
    const response = await this.api.get(API_ENDPOINTS.SEARCH_PRODUCTS, {
      params: { search: query },
    });
    return response.data;
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await this.api.post(API_ENDPOINTS.ADMIN_PRODUCTS, product);
    return response.data;
  }

  async updateProduct(id: string, product: Partial<Product>) {
    const endpoint = `${API_ENDPOINTS.ADMIN_PRODUCTS}/${id}`;
    const response = await this.api.put(endpoint, product);
    return response.data;
  }

  async deleteProduct(id: string) {
    const endpoint = `${API_ENDPOINTS.ADMIN_PRODUCTS}/${id}`;
    const response = await this.api.delete(endpoint);
    return response.data;
  }

  // Categories
  async getCategories() {
    const response = await this.api.get(API_ENDPOINTS.CATEGORIES);
    return response.data;
  }

  async getCategoryById(id: string) {
    const response = await this.api.get(`${API_ENDPOINTS.CATEGORIES}/${id}`);
    return response.data;
  }

  async createCategory(category: { name: string; description: string }) {
    const response = await this.api.post(API_ENDPOINTS.ADMIN_CATEGORIES, category);
    return response.data;
  }

  async updateCategory(id: string, category: { name?: string; description?: string }) {
    const response = await this.api.put(`${API_ENDPOINTS.ADMIN_CATEGORIES}/${id}`, category);
    return response.data;
  }

  async deleteCategory(id: string) {
    const response = await this.api.delete(`${API_ENDPOINTS.ADMIN_CATEGORIES}/${id}`);
    return response.data;
  }

  // Contact
  async sendContactMessage(data: ContactFormData) {
    const response = await this.api.post(API_ENDPOINTS.CONTACT, data);
    return response.data;
  }

  async getContacts(status?: string) {
    const response = await this.api.get(API_ENDPOINTS.ADMIN_CONTACTS, {
      params: status ? { status } : undefined
    });
    return response.data;
  }

  async getContactById(id: string) {
    const response = await this.api.get(`${API_ENDPOINTS.ADMIN_CONTACTS}/${id}`);
    return response.data;
  }

  async updateContactStatus(id: string, status: string) {
    const response = await this.api.put(`${API_ENDPOINTS.ADMIN_CONTACTS}/${id}/status`, { status });
    return response.data;
  }

  async deleteContact(id: string) {
    const response = await this.api.delete(`${API_ENDPOINTS.ADMIN_CONTACTS}/${id}`);
    return response.data;
  }

  // Admin Auth
  async login(email: string, password: string) {
    const response = await this.api.post(API_ENDPOINTS.ADMIN_LOGIN, {
      email,
      password,
    });
    if (response.data.data?.token) {
      this.setToken(response.data.data.token);
    }
    return response.data;
  }

  async initializeAdmin() {
    const response = await this.api.post(`${API_ENDPOINTS.ADMIN_LOGIN.replace('/login', '/initialize')}`);
    return response.data;
  }

  async getDashboardStats() {
    const response = await this.api.get(API_ENDPOINTS.ADMIN_STATS);
    return response.data;
  }

  // Image Upload
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await this.api.post(API_ENDPOINTS.ADMIN_UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async uploadMultipleImages(files: File[]) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    const response = await this.api.post(API_ENDPOINTS.ADMIN_UPLOAD_IMAGES, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  logout() {
    this.clearAuth();
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const apiService = new ApiService();
