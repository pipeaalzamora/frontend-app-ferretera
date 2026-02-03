'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  Inventory
} from '@mui/icons-material';
import { useNotification } from '@/components/ui/NotificationSystem';
import { Product } from '@/types';
import { apiService } from '@/services/api';

export default function AdminProductsPage() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiService.getProducts();
      setProducts(response.data);
    } catch {
      showError('Error al cargar productos');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await apiService.deleteProduct(id);
        showSuccess('Producto eliminado correctamente');
        fetchProducts();
      } catch {
        showError('Error al eliminar producto');
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Inventory className="text-blue-500 text-4xl mr-3" />
          <div>
            <Typography variant="h3" className="font-bold text-white">
              Gestión de Productos
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              {products.length} productos registrados
            </Typography>
          </div>
        </div>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: '#10b981',
            '&:hover': { backgroundColor: '#059669' },
          }}
          onClick={() => router.push('/admin/products/new')}
        >
          Nuevo Producto
        </Button>
      </Box>

      <Card sx={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderWidth: 1 }}>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por nombre o código..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#334155' },
                  '&:hover fieldset': { borderColor: '#475569' },
                  '&.Mui-focused fieldset': { borderColor: '#f97316' },
                },
                '& .MuiInputBase-input::placeholder': { color: '#9ca3af' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#9ca3af' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Código</TableCell>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Nombre</TableCell>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Categoría</TableCell>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Precio</TableCell>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Stock</TableCell>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Estado</TableCell>
                  <TableCell align="right" sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} hover sx={{ '&:hover': { backgroundColor: '#1e293b' } }}>
                    <TableCell sx={{ color: '#fff', borderColor: '#1e293b' }}>{product.code}</TableCell>
                    <TableCell sx={{ color: '#fff', borderColor: '#1e293b' }}>{product.name}</TableCell>
                    <TableCell sx={{ color: '#d1d5db', borderColor: '#1e293b' }}>{product.category}</TableCell>
                    <TableCell sx={{ color: '#d1d5db', borderColor: '#1e293b' }}>${product.price.toFixed(2)}</TableCell>
                    <TableCell sx={{ borderColor: '#1e293b' }}>
                      <Chip
                        label={product.stock}
                        size="small"
                        sx={{
                          backgroundColor: product.stock > 10 ? '#064e3b' : product.stock > 0 ? '#7c2d12' : '#7f1d1d',
                          color: product.stock > 10 ? '#10b981' : product.stock > 0 ? '#f97316' : '#ef4444',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderColor: '#1e293b' }}>
                      {product.featured && (
                        <Chip
                          label="Destacado"
                          size="small"
                          sx={{
                            backgroundColor: '#422006',
                            color: '#ca8a04',
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="right" sx={{ borderColor: '#1e293b' }}>
                      <IconButton
                        size="small"
                        sx={{ color: '#3b82f6' }}
                        onClick={() => router.push(`/admin/products/${product.id}`)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: '#ef4444' }}
                        onClick={() => handleDelete(product.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredProducts.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" sx={{ color: '#9ca3af' }}>
                No se encontraron productos
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
