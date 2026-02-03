import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants';
import { Product, Category, ContactFormData } from '@/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
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
          localStorage.removeItem('authToken');
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }
    );
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
    const response = await this.api.post(API_ENDPOINTS.CATEGORIES, category);
    return response.data;
  }

  async updateCategory(id: string, category: { name?: string; description?: string }) {
    const response = await this.api.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, category);
    return response.data;
  }

  async deleteCategory(id: string) {
    const response = await this.api.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`);
    return response.data;
  }

  // Contact
  async sendContactMessage(data: ContactFormData) {
    const response = await this.api.post(API_ENDPOINTS.CONTACT, data);
    return response.data;
  }

  // Admin Auth
  async login(email: string, password: string) {
    const response = await this.api.post(API_ENDPOINTS.ADMIN_LOGIN, {
      email,
      password,
    });
    if (response.data.data?.token) {
      localStorage.setItem('authToken', response.data.data.token);
    }
    return response.data;
  }

  async initializeAdmin() {
    const response = await this.api.post(`${API_ENDPOINTS.ADMIN_LOGIN.replace('/login', '/initialize')}`);
    return response.data;
  }

  logout() {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}

export const apiService = new ApiService();
