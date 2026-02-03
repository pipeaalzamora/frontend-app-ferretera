'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  Grid,
  CircularProgress,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  ArrowBack,
  CloudUpload,
  Delete,
  Image as ImageIcon
} from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '@/components/ui/NotificationSystem';
import { Category, Product } from '@/types';
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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const { showSuccess, showError } = useNotification();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const formatChileanPrice = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(parseInt(number));
  };

  const formatProductCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 6)}`;
  };

  useEffect(() => {
    if (!productId) {
      showError('ID de producto no válido');
      router.push('/admin/products');
      return;
    }
    fetchCategories();
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const fetchCategories = async () => {
    try {
      const response = await apiService.getCategories();
      setCategories(response.data);
    } catch {
      showError('Error al cargar categorías');
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await apiService.getProductById(productId);
      setProduct(response.data);
      setExistingImages(response.data.images || []);
    } catch {
      showError('Error al cargar el producto');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleNewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const totalImages = existingImages.length + newImages.length;
    const newFiles = Array.from(files).slice(0, 3 - totalImages);
    
    if (totalImages + newFiles.length > 3) {
      showError('Máximo 3 imágenes permitidas');
      return;
    }

    setNewImages([...newImages, ...newFiles]);

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: {
    code: string;
    name: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    featured: boolean;
  }) => {
    try {
      const imageUrls = [...existingImages];

      // Subir nuevas imágenes
      for (const image of newImages) {
        const response = await apiService.uploadImage(image);
        imageUrls.push(response.data.url);
      }

      const priceNumber = parseInt(values.price.toString().replace(/\D/g, ''));
      const productData = {
        code: values.code,
        name: values.name,
        description: values.description,
        price: priceNumber,
        category: values.category,
        stock: parseInt(values.stock.toString()),
        images: imageUrls,
        featured: values.featured
      };
      
      await apiService.updateProduct(productId, productData);
      showSuccess('Producto actualizado correctamente');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      showError('Error al actualizar el producto');
    }
  };

  if (loading) {
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <CircularProgress size={60} sx={{ color: '#f97316' }} />
      </Box>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="mb-8">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/admin/products')}
          sx={{ color: '#9ca3af', '&:hover': { color: '#fff' }, mb: 2 }}
        >
          Volver a Productos
        </Button>
        <Typography variant="h3" className="font-bold text-white">
          Editar Producto
        </Typography>
      </Box>

      <Card sx={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderWidth: 1 }}>
        <CardContent sx={{ p: 4 }}>
          <Formik
            initialValues={{
              code: product.code,
              name: product.name,
              description: product.description,
              price: product.price.toString(),
              category: product.category,
              stock: product.stock.toString(),
              featured: product.featured || false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => (
              <Form>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      name="code"
                      label="Código del Producto (12345-6)"
                      fullWidth
                      variant="outlined"
                      value={values.code}
                      onChange={(e) => {
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
                    <TextField
                      name="name"
                      label="Nombre del Producto"
                      fullWidth
                      variant="outlined"
                      value={values.name}
                      onChange={(e) => setFieldValue('name', e.target.value)}
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
                    <TextField
                      name="description"
                      label="Descripción"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      value={values.description}
                      onChange={(e) => setFieldValue('description', e.target.value)}
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
                      value={formatChileanPrice(values.price)}
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
                    <TextField
                      name="stock"
                      label="Stock"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={values.stock}
                      onChange={(e) => setFieldValue('stock', e.target.value)}
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.featured}
                          onChange={(e) => setFieldValue('featured', e.target.checked)}
                          sx={{
                            color: '#9ca3af',
                            '&.Mui-checked': { color: '#f97316' },
                          }}
                        />
                      }
                      label="Producto Destacado"
                      sx={{ color: '#9ca3af' }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ border: '2px dashed #334155', borderRadius: 2, p: 3 }}>
                      <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                        Imágenes del Producto (Máximo 3)
                      </Typography>

                      {existingImages.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body2" sx={{ color: '#9ca3af', mb: 2 }}>
                            Imágenes actuales:
                          </Typography>
                          <Grid container spacing={2}>
                            {existingImages.map((img, index) => (
                              <Grid size={{ xs: 12, sm: 4 }} key={index}>
                                <Box sx={{ position: 'relative', backgroundColor: '#1e293b', borderRadius: 2, p: 1 }}>
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${img}`}
                                    alt={`Imagen ${index + 1}`}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover rounded"
                                  />
                                  <IconButton
                                    onClick={() => handleRemoveExistingImage(index)}
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
                        </Box>
                      )}
                      
                      <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="image-upload"
                        multiple
                        type="file"
                        onChange={handleNewImageChange}
                        disabled={existingImages.length + newImages.length >= 3}
                      />
                      <label htmlFor="image-upload">
                        <Button
                          variant="contained"
                          component="span"
                          startIcon={<CloudUpload />}
                          disabled={existingImages.length + newImages.length >= 3}
                          sx={{
                            backgroundColor: '#f97316',
                            '&:hover': { backgroundColor: '#ea580c' },
                            '&:disabled': { backgroundColor: '#334155' },
                          }}
                        >
                          Agregar Imágenes
                        </Button>
                      </label>

                      {newImagePreviews.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="body2" sx={{ color: '#9ca3af', mb: 2 }}>
                            Nuevas imágenes:
                          </Typography>
                          <Grid container spacing={2}>
                            {newImagePreviews.map((preview, index) => (
                              <Grid size={{ xs: 12, sm: 4 }} key={index}>
                                <Box sx={{ position: 'relative', backgroundColor: '#1e293b', borderRadius: 2, p: 1 }}>
                                  <Image
                                    src={preview}
                                    alt={`Nueva ${index + 1}`}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover rounded"
                                  />
                                  <IconButton
                                    onClick={() => handleRemoveNewImage(index)}
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
                        </Box>
                      )}

                      {existingImages.length === 0 && newImagePreviews.length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 4, mt: 2 }}>
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
                        {isSubmitting ? 'Actualizando...' : 'Actualizar Producto'}
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
