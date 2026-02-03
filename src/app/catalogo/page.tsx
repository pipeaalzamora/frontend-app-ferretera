"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Chip,
  Grid,
  Box,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  FilterList,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setProducts, setCategories, setSelectedCategory, setLoading } from "@/store/slices/catalogSlice";
import { useNotification } from "@/components/ui/NotificationSystem";
import { apiService } from "@/services/api";

export default function CatalogPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  const dispatch = useAppDispatch();
  const { products, categories, selectedCategory, isLoading } = useAppSelector((state) => state.catalog);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiService.getCategories();
      dispatch(setCategories(response.data));
    } catch {
      showError("Error al cargar categorías");
    }
  };

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await apiService.getProducts();
      dispatch(setProducts(response.data));
      showSuccess("Productos cargados correctamente");
    } catch {
      showError("Error al cargar productos");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = () => {
    // TODO: Implement search with filters
    showSuccess("Buscando productos...");
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category === "all" ? null : category));
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.code.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (minPrice && product.price < parseFloat(minPrice)) return false;
    if (maxPrice && product.price > parseFloat(maxPrice)) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600 via-yellow-600 to-transparent opacity-20"></div>
        <Container maxWidth="lg" className="relative z-10">
          <div className="text-center text-white mb-8">
            <div className="flex items-center justify-center mb-6">
              <ShoppingCart className="text-orange-500 text-6xl mr-4 animate-pulse" />
              <Typography variant="h2" className="font-bold text-5xl lg:text-6xl">
                Catálogo de Productos
              </Typography>
            </div>
            <Typography variant="h6" className="text-gray-200 max-w-2xl mx-auto text-lg">
              Explora nuestro catálogo completo con más de <span className="text-orange-400 font-bold">5,000 productos</span> de calidad.
            </Typography>
            <Box className="mt-6 flex justify-center gap-4 flex-wrap">
              <Box className="bg-white bg-opacity-10 px-6 py-2 rounded-full backdrop-blur-sm">
                <Typography variant="body1" className="text-white font-semibold">
                  ✓ Envío Gratis
                </Typography>
              </Box>
              <Box className="bg-white bg-opacity-10 px-6 py-2 rounded-full backdrop-blur-sm">
                <Typography variant="body1" className="text-white font-semibold">
                  ✓ Garantía Total
                </Typography>
              </Box>
              <Box className="bg-white bg-opacity-10 px-6 py-2 rounded-full backdrop-blur-sm">
                <Typography variant="body1" className="text-white font-semibold">
                  ✓ Mejores Precios
                </Typography>
              </Box>
            </Box>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <Container maxWidth="lg">
          <Card 
            sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" className="font-bold text-gray-800 mb-4 flex items-center">
                <FilterList className="mr-2" />
                Filtros de Búsqueda
              </Typography>
              <Grid container spacing={3} alignItems="center">
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search className="text-gray-500" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        '&:hover fieldset': {
                          borderColor: '#f97316',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f97316',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      value={selectedCategory || "all"}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      label="Categoría"
                      startAdornment={
                        <InputAdornment position="start">
                          <CategoryIcon className="text-gray-500" />
                        </InputAdornment>
                      }
                      sx={{
                        backgroundColor: '#fff',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#f97316',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#f97316',
                        },
                      }}
                    >
                      <MenuItem value="all">Todas las categorías</MenuItem>
                      {categories.map((cat) => (
                        <MenuItem key={cat.id} value={cat.name}>
                          {cat.name} ({cat.productCount})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 6, md: 2 }}>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    label="Precio mín"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        '&:hover fieldset': {
                          borderColor: '#f97316',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f97316',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 6, md: 2 }}>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    label="Precio máx"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#fff',
                        '&:hover fieldset': {
                          borderColor: '#f97316',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f97316',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      height: 56,
                      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                      }
                    }}
                  >
                    <FilterList />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Products Grid */}
      <Container maxWidth="lg" className="py-8">
        {isLoading ? (
          <Box className="flex items-center justify-center h-96">
            <div className="text-center">
              <CircularProgress size={60} className="mb-4" />
              <Typography variant="h6" className="text-white">
                Cargando productos...
              </Typography>
            </div>
          </Box>
        ) : (
          <>
            <Box className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <Typography variant="h5" className="text-white font-bold">
                  {filteredProducts.length} productos encontrados
                </Typography>
                <Typography variant="body2" className="text-gray-400 mt-1">
                  Mostrando los mejores resultados para ti
                </Typography>
              </div>
              {selectedCategory && (
                <Chip
                  label={selectedCategory}
                  onDelete={() => dispatch(setSelectedCategory(null))}
                  sx={{
                    backgroundColor: '#f97316',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    '& .MuiChip-deleteIcon': {
                      color: '#fff',
                    }
                  }}
                />
              )}
            </Box>

            <Grid container spacing={4}>
              {filteredProducts.map((product) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                  <Card 
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
                      }
                    }}
                    onClick={() => router.push(`/catalogo/${product.id}`)}
                  >
                    <CardMedia
                      component="div"
                      className="h-56 bg-gray-100 flex items-center justify-center relative overflow-hidden"
                    >
                      {product.images && product.images.length > 0 ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${product.images[0]}`}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const icon = parent.querySelector('.fallback-icon');
                              if (icon) icon.classList.remove('hidden');
                            }
                          }}
                        />
                      ) : null}
                      <ShoppingCart className="text-7xl text-gray-300 fallback-icon" style={{ display: product.images && product.images.length > 0 ? 'none' : 'block' }} />
                      
                      {product.featured && (
                        <Box 
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            backgroundColor: '#f97316',
                            color: '#fff',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4)'
                          }}
                        >
                          DESTACADO
                        </Box>
                      )}
                    </CardMedia>
                    <CardContent className="flex-1 flex flex-col p-4">
                      <Typography variant="h6" className="font-bold mb-2 line-clamp-2 text-gray-800">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2 flex-1">
                        {product.description}
                      </Typography>
                      <Box className="mb-3">
                        <Chip
                          label={product.category}
                          size="small"
                          sx={{
                            backgroundColor: '#dbeafe',
                            color: '#1e40af',
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>
                      <Box className="flex items-center justify-between mb-3">
                        <Typography variant="h5" className="font-bold text-orange-600">
                          ${product.price.toLocaleString('es-CL')}
                        </Typography>
                        <Box className="flex items-center">
                          <Box 
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: product.stock > 0 ? '#10b981' : '#ef4444',
                              mr: 1
                            }}
                          />
                          <Typography variant="caption" className="text-gray-600 font-semibold">
                            {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 'auto',
                          background: product.stock > 0 
                            ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
                            : '#9ca3af',
                          fontWeight: 'bold',
                          '&:hover': {
                            background: product.stock > 0
                              ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)'
                              : '#6b7280',
                          }
                        }}
                        disabled={product.stock === 0}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/catalogo/${product.id}`);
                        }}
                      >
                        {product.stock > 0 ? "Ver Detalles" : "Agotado"}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {filteredProducts.length === 0 && (
              <Box className="text-center py-16">
                <Typography variant="h5" className="text-white mb-4">
                  No se encontraron productos
                </Typography>
                <Typography variant="body1" className="text-gray-300">
                  Intenta ajustar los filtros de búsqueda
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
