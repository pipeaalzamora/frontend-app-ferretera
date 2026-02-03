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
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Category as CategoryIcon
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '@/components/ui/NotificationSystem';
import { Category } from '@/types';
import { apiService } from '@/services/api';

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida')
});

export default function AdminCategoriesPage() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiService.getCategories();
      setCategories(response.data);
    } catch {
      showError('Error al cargar categorías');
    }
  };

  const handleOpenDialog = (category?: Category) => {
    setEditingCategory(category || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (values: { name: string; description: string }) => {
    try {
      if (editingCategory) {
        await apiService.updateCategory(editingCategory.id, values);
        showSuccess('Categoría actualizada correctamente');
      } else {
        await apiService.createCategory(values);
        showSuccess('Categoría creada correctamente');
      }
      handleCloseDialog();
      fetchCategories();
    } catch {
      showError('Error al guardar categoría');
    }
  };

  const handleDelete = async (id: string, productCount: number) => {
    if (productCount > 0) {
      showError('No se puede eliminar una categoría con productos asociados');
      return;
    }
    
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await apiService.deleteCategory(id);
        showSuccess('Categoría eliminada correctamente');
        fetchCategories();
      } catch {
        showError('Error al eliminar categoría');
      }
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <CategoryIcon className="text-green-500 text-4xl mr-3" />
          <div>
            <Typography variant="h3" className="font-bold text-white">
              Gestión de Categorías
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              {categories.length} categorías registradas
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
          onClick={() => router.push('/admin/categories/new')}
        >
          Nueva Categoría
        </Button>
      </Box>

      <Card sx={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderWidth: 1 }}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Nombre</TableCell>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Descripción</TableCell>
                  <TableCell sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Productos</TableCell>
                  <TableCell align="right" sx={{ color: '#9ca3af', fontWeight: 'bold', borderColor: '#1e293b' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id} hover sx={{ '&:hover': { backgroundColor: '#1e293b' } }}>
                    <TableCell sx={{ color: '#fff', borderColor: '#1e293b' }}>{category.name}</TableCell>
                    <TableCell sx={{ color: '#d1d5db', borderColor: '#1e293b' }}>{category.description}</TableCell>
                    <TableCell sx={{ color: '#d1d5db', borderColor: '#1e293b' }}>{category.productCount}</TableCell>
                    <TableCell align="right" sx={{ borderColor: '#1e293b' }}>
                      <IconButton
                        size="small"
                        sx={{ color: '#3b82f6' }}
                        onClick={() => handleOpenDialog(category)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: '#ef4444' }}
                        onClick={() => handleDelete(category.id, category.productCount)}
                        disabled={category.productCount > 0}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {categories.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" sx={{ color: '#9ca3af' }}>
                No hay categorías registradas
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog for Create/Edit */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1f2937',
            color: '#fff',
          }
        }}
      >
        <DialogTitle sx={{ color: '#fff', borderBottom: '1px solid #374151' }}>
          {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
        </DialogTitle>
        <Formik
          initialValues={{
            name: editingCategory?.name || '',
            description: editingCategory?.description || ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent sx={{ pt: 3 }}>
                <div className="space-y-4">
                  <Field
                    as={TextField}
                    name="name"
                    label="Nombre"
                    fullWidth
                    variant="outlined"
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#fff',
                        '& fieldset': { borderColor: '#4b5563' },
                        '&:hover fieldset': { borderColor: '#6b7280' },
                        '&.Mui-focused fieldset': { borderColor: '#f97316' },
                      },
                      '& .MuiInputLabel-root': { color: '#9ca3af' },
                      '& .MuiFormHelperText-root': { color: '#ef4444' },
                    }}
                  />
                  <Field
                    as={TextField}
                    name="description"
                    label="Descripción"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#fff',
                        '& fieldset': { borderColor: '#4b5563' },
                        '&:hover fieldset': { borderColor: '#6b7280' },
                        '&.Mui-focused fieldset': { borderColor: '#f97316' },
                      },
                      '& .MuiInputLabel-root': { color: '#9ca3af' },
                      '& .MuiFormHelperText-root': { color: '#ef4444' },
                    }}
                  />
                </div>
              </DialogContent>
              <DialogActions sx={{ borderTop: '1px solid #374151', px: 3, py: 2 }}>
                <Button 
                  onClick={handleCloseDialog}
                  sx={{
                    color: '#9ca3af',
                    '&:hover': { backgroundColor: '#374151' },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: '#10b981',
                    '&:hover': { backgroundColor: '#059669' },
                    '&:disabled': { backgroundColor: '#4b5563' },
                  }}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar'}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Container>
  );
}
