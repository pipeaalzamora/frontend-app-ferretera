'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Box,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  ShoppingCart,
  Inventory,
  Category as CategoryIcon,
  LocalOffer,
  Star
} from '@mui/icons-material';
import { useNotification } from '@/components/ui/NotificationSystem';
import { Product } from '@/types';
import { apiService } from '@/services/api';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await apiService.getProductById(params.id as string);
      setProduct(response.data);
    } catch {
      showError('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <CircularProgress size={60} className="mb-4" />
          <Typography variant="h6" className="text-white">
            Cargando producto...
          </Typography>
        </div>
      </Box>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" className="py-20">
        <Card className="bg-white bg-opacity-95 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Typography variant="h4" className="mb-4">
              Producto no encontrado
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/catalogo')}
              className="bg-green-600 hover:bg-green-700"
            >
              Volver al Catálogo
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-16">
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push('/catalogo')}
          className="mb-6 text-white hover:text-green-400"
        >
          Volver al Catálogo
        </Button>

        <Card className="bg-white bg-opacity-95 backdrop-blur-sm">
          <CardContent className="p-8">
            <Grid container spacing={6}>
              {/* Images Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box className="bg-gray-100 rounded-lg p-8 mb-4 flex items-center justify-center relative" style={{ minHeight: '400px' }}>
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${product.images[selectedImage]}`}
                      alt={product.name}
                      width={500}
                      height={400}
                      className="object-contain max-h-96"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <ShoppingCart className="text-gray-400 hidden" style={{ fontSize: '200px' }} />
                </Box>
                
                {product.images && product.images.length > 1 && (
                  <Grid container spacing={2}>
                    {product.images.map((img, index) => (
                      <Grid size={{ xs: 3 }} key={index}>
                        <Box
                          className={`bg-gray-100 rounded-lg p-2 cursor-pointer hover:bg-gray-200 transition-colors relative ${
                            selectedImage === index ? 'ring-2 ring-green-500' : ''
                          }`}
                          onClick={() => setSelectedImage(index)}
                          style={{ height: '80px' }}
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${img}`}
                            alt={`${product.name} ${index + 1}`}
                            width={100}
                            height={80}
                            className="object-contain w-full h-full"
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>

              {/* Product Info Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box className="mb-4">
                  <Typography variant="caption" className="text-gray-500 mb-2 block">
                    Código: {product.code}
                  </Typography>
                  
                  {product.featured && (
                    <Chip
                      icon={<Star />}
                      label="Producto Destacado"
                      className="bg-yellow-100 text-yellow-800 mb-3"
                      size="small"
                    />
                  )}
                  
                  <Typography variant="h3" className="font-bold text-gray-800 mb-4">
                    {product.name}
                  </Typography>

                  <Box className="flex items-center space-x-4 mb-6">
                    <Chip
                      icon={<CategoryIcon />}
                      label={product.category}
                      className="bg-blue-100 text-blue-800"
                    />
                    <Chip
                      icon={<Inventory />}
                      label={`Stock: ${product.stock} unidades`}
                      className={product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                    />
                  </Box>

                  <Divider className="my-6" />

                  <Box className="mb-6">
                    <Typography variant="h4" className="font-bold text-green-600 mb-2">
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      Precio por unidad
                    </Typography>
                  </Box>

                  <Divider className="my-6" />

                  <Typography variant="h6" className="font-semibold text-gray-800 mb-3">
                    Descripción
                  </Typography>
                  <Typography variant="body1" className="text-gray-700 leading-relaxed mb-6">
                    {product.description}
                  </Typography>

                  <Divider className="my-6" />

                  {/* Características */}
                  <Typography variant="h6" className="font-semibold text-gray-800 mb-3">
                    Características
                  </Typography>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Producto de alta calidad</li>
                    <li>Garantía del fabricante</li>
                    <li>Disponible para entrega inmediata</li>
                    <li>Asesoría técnica incluida</li>
                  </ul>

                  <Divider className="my-6" />

                  {/* Action Buttons */}
                  <Box className="space-y-3">
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCart />}
                      disabled={product.stock === 0}
                      className="bg-green-600 hover:bg-green-700 py-4 text-lg"
                      onClick={() => showSuccess('Funcionalidad de carrito próximamente')}
                    >
                      {product.stock > 0 ? 'Agregar al Carrito' : 'Producto Agotado'}
                    </Button>
                    
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      startIcon={<LocalOffer />}
                      className="border-green-600 text-green-600 hover:bg-green-50 py-4 text-lg"
                      onClick={() => router.push('/contacto')}
                    >
                      Solicitar Cotización
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Related Products Section */}
        <Box className="mt-12">
          <Typography variant="h4" className="font-bold text-white mb-6">
            Productos Relacionados
          </Typography>
          <Typography variant="body1" className="text-gray-300 mb-6">
            Otros productos de la categoría &quot;{product.category}&quot;
          </Typography>
          {/* TODO: Add related products grid */}
        </Box>
      </Container>
    </div>
  );
}
