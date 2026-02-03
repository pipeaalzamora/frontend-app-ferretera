'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid
} from '@mui/material';
import {
  ArrowBack,
  CloudUpload,
  Delete,
  Image as ImageIcon
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '@/components/ui/NotificationSystem';
import { Category } from '@/types';
import { apiService } from '@/services/api';

const validationSchema = Yup.object({
  code: Yup.string()
    .matches(/^\d{5}-\d$/, 'El código debe tener el formato 12345-6')
    .required('El código es requerido'),
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  price: Yup.number().min(1, 'El precio debe ser mayor a 0').required('El precio es requerido'),
  category: Yup.string().required('La categoría es requerida'),
  stock: Yup.number().min(0, 'El stock no puede ser negativo').required('El stock es requerido'),
});

export default function NewProductPage() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Formatear precio chileno
  const formatChileanPrice = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(parseInt(number));
  };

  // Formatear código de producto
  const formatProductCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 6)}`;
  };

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 3 - images.length);
    
    if (images.length + newFiles.length > 3) {
      showError('Máximo 3 imágenes permitidas');
      return;
    }

    setImages([...images, ...newFiles]);

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: {
    code: string;
    name: string;
    description: string;
    price: string;
    category: string;
    stock: string;
  }) => {
    try {
      if (images.length === 0) {
        showError('Debes subir al menos una imagen');
        return;
      }

      // Subir imágenes primero
      const imageUrls: string[] = [];
      for (const image of images) {
        const response = await apiService.uploadImage(image);
        imageUrls.push(response.data.url);
      }

      // Crear producto con imágenes
      const priceNumber = parseInt(values.price.replace(/\D/g, ''));
      const productData = {
        code: values.code,
        name: values.name,
        description: values.description,
        price: priceNumber,
        category: values.category,
        stock: parseInt(values.stock),
        images: imageUrls,
        featured: false
      };
      
      await apiService.createProduct(productData);
      showSuccess('Producto creado correctamente');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      showError('Error al crear el producto');
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="mb-8">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/admin/products')}
          className="text-gray-400 hover:text-white mb-4"
        >
          Volver a Productos
        </Button>
        <Typography variant="h3" className="font-bold text-white">
          Nuevo Producto
        </Typography>
      </Box>

      <Card sx={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderWidth: 1 }}>
        <CardContent sx={{ p: 4 }}>
          <Formik
            initialValues={{
              code: '',
              name: '',
              description: '',
              price: '',
              category: '',
              stock: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => (
              <Form>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Field
                      as={TextField}
                      name="code"
                      label="Código del Producto (12345-6)"
                      fullWidth
                      variant="outlined"
                      value={values.code}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const formatted = formatProductCode(e.target.value);
                        setFieldValue('code', formatted);
                      }}
                      error={touched.code && !!errors.code}
                      helperText={touched.code && errors.code}
                      placeholder="12345-6"
                      inputProps={{ maxLength: 7 }}
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

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Nombre del Producto"
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

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      name="price"
                      label="Precio (CLP)"
                      fullWidth
                      variant="outlined"
                      value={values.price ? formatChileanPrice(values.price) : ''}
                      onChange={(e) => {
                        const numbers = e.target.value.replace(/\D/g, '');
                        setFieldValue('price', numbers);
                      }}
                      error={touched.price && !!errors.price}
                      helperText={touched.price && errors.price}
                      placeholder="$2.500"
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

                  <Grid size={{ xs: 12, md: 4 }}>
                    <FormControl 
                      fullWidth 
                      error={touched.category && !!errors.category}
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
                    >
                      <InputLabel>Categoría</InputLabel>
                      <Select
                        name="category"
                        value={values.category}
                        onChange={(e) => setFieldValue('category', e.target.value)}
                        label="Categoría"
                        sx={{
                          color: '#fff',
                          '& .MuiSvgIcon-root': { color: '#9ca3af' },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: '#0f172a',
                              '& .MuiMenuItem-root': {
                                color: '#fff',
                                '&:hover': { bgcolor: '#1e293b' },
                                '&.Mui-selected': { bgcolor: '#f97316' },
                              },
                            },
                          },
                        }}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <Field
                      as={TextField}
                      name="stock"
                      label="Stock"
                      type="number"
                      fullWidth
                      variant="outlined"
                      error={touched.stock && !!errors.stock}
                      helperText={touched.stock && errors.stock}
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
                    <Box sx={{ border: '2px dashed #334155', borderRadius: 2, p: 3 }}>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                        Imágenes del Producto (Máximo 3)
                      </Typography>
                      
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        multiple
                        type="file"
                        onChange={handleImageChange}
                        disabled={images.length >= 3}
                      />
                      <label htmlFor="image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={<CloudUpload />}
                          disabled={images.length >= 3}
                          sx={{
                            backgroundColor: '#f97316',
                            '&:hover': { backgroundColor: '#ea580c' },
                            '&:disabled': { backgroundColor: '#334155' },
                          }}
                        >
                          Subir Imágenes
                        </Button>
                      </label>

                      {imagePreviews.length > 0 && (
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                          {imagePreviews.map((preview, index) => (
                            <Grid size={{ xs: 12, sm: 4 }} key={index}>
                              <Box sx={{ position: 'relative', backgroundColor: '#1e293b', borderRadius: 2, p: 1 }}>
                                <Image
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  width={400}
                                  height={300}
                                  className="w-full h-48 object-cover rounded"
                                />
                                <IconButton
                                  onClick={() => handleRemoveImage(index)}
                                  sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    backgroundColor: '#dc2626',
                                    '&:hover': { backgroundColor: '#b91c1c' },
                                  }}
                                  size="small"
                                >
                                  <Delete sx={{ color: '#fff' }} />
                                </IconButton>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      )}

                      {imagePreviews.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                          <ImageIcon sx={{ color: '#475569', fontSize: 60, mb: 1 }} />
                          <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                            No hay imágenes seleccionadas
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => router.push('/admin/products')}
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
                          backgroundColor: '#f97316',
                          '&:hover': { backgroundColor: '#ea580c' },
                          '&:disabled': { backgroundColor: '#334155' },
                        }}
                      >
                        {isSubmitting ? 'Creando...' : 'Crear Producto'}
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
