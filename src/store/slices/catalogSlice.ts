import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogState, Product, Category } from '@/types';

const initialState: CatalogState = {
  products: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { 
  setProducts, 
  setCategories, 
  setSelectedCategory, 
  setLoading, 
  setError, 
  clearError 
} = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer; 