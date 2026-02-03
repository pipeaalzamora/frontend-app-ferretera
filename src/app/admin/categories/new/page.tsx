'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Grid
} from '@mui/material';
import {
  ArrowBack,
  Category as CategoryIcon
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '@/components/ui/NotificationSystem';
import { apiService } from '@/services/api';

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida')
});

export default function NewCategoryPage() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();

  const handleSubmit = async (values: { name: string; description: string }) => {
    try {
      await apiService.createCategory(values);
      showSuccess('Categoría creada correctamente');
      router.push('/admin/categories');
    } catch {
      showError('Error al crear la categoría');
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Box className="mb-8">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/admin/categories')}
          className="text-gray-400 hover:text-white mb-4"
        >
          Volver a Categorías
        </Button>
        <div className="flex items-center">
          <CategoryIcon className="text-orange-500 text-4xl mr-3" />
          <Typography variant="h3" className="font-bold text-white">
            Nueva Categoría
          </Typography>
        </div>
      </Box>

      <Card sx={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderWidth: 1 }}>
        <CardContent sx={{ p: 4 }}>
          <Formik
            initialValues={{
              name: '',
              description: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Nombre de la Categoría"
                      fullWidth
                      variant="outlined"
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': { borderColor: '#334155' },
                          '&:hover fieldset': { borderColor: '#475569' },
                          '&.Mui-focused fieldset': { borderColor: '#f97316' },
                        },
                        '& .MuiInputLabel-root': { color: '#9ca3af' },
                        '& .MuiFormHelperText-root': { color: '#ef4444' },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Field
                      as={TextField}
                      name="description"
                      label="Descripción"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      error={touched.description && !!errors.description}
                      helperText={touched.description && errors.description}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': { borderColor: '#334155' },
                          '&:hover fieldset': { borderColor: '#475569' },
                          '&.Mui-focused fieldset': { borderColor: '#f97316' },
                        },
                        '& .MuiInputLabel-root': { color: '#9ca3af' },
                        '& .MuiFormHelperText-root': { color: '#ef4444' },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => router.push('/admin/categories')}
                        sx={{
                          borderColor: '#475569',
                          color: '#9ca3af',
                          '&:hover': {
                            borderColor: '#64748b',
                            backgroundColor: '#1e293b',
                          },
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={{
                          backgroundColor: '#10b981',
                          '&:hover': { backgroundColor: '#059669' },
                          '&:disabled': { backgroundColor: '#334155' },
                        }}
                      >
                        {isSubmitting ? 'Creando...' : 'Crear Categoría'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
}
