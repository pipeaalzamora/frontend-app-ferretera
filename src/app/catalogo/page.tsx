"use client";

import React, { useState, useEffect } from "react";
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
import { Product, Category } from "@/types";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  const dispatch = useAppDispatch();
  const { products, categories, selectedCategory, isLoading } = useAppSelector((state) => state.catalog);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      // TODO: Replace with actual API call
      const mockCategories: Category[] = [
        { id: "1", name: "Herramientas Eléctricas", description: "Taladros, sierras, etc.", productCount: 25 },
        { id: "2", name: "Herramientas Manuales", description: "Martillos, destornilladores, etc.", productCount: 40 },
        { id: "3", name: "Materiales de Construcción", description: "Cemento, ladrillos, etc.", productCount: 30 },
        { id: "4", name: "Pinturas", description: "Pinturas y acabados", productCount: 20 },
      ];
      dispatch(setCategories(mockCategories));
    } catch (error) {
      showError("Error al cargar categorías");
    }
  };

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      // TODO: Replace with actual API call
      const mockProducts: Product[] = [
        {
          id: "1",
          code: "TAL001",
          name: "Taladro Eléctrico 750W",
          description: "Taladro profesional con velocidad variable",
          price: 89.99,
          category: "Herramientas Eléctricas",
          images: ["/placeholder-product.jpg"],
          stock: 15,
          featured: true,
        },
        {
          id: "2",
          code: "MRT002",
          name: "Martillo de Acero 500g",
          description: "Martillo de acero forjado con mango ergonómico",
          price: 24.99,
          category: "Herramientas Manuales",
          images: ["/placeholder-product.jpg"],
          stock: 30,
          featured: false,
        },
        {
          id: "3",
          code: "CEM003",
          name: "Cemento Portland 50kg",
          description: "Cemento de alta resistencia",
          price: 12.50,
          category: "Materiales de Construcción",
          images: ["/placeholder-product.jpg"],
          stock: 100,
          featured: false,
        },
      ];
      dispatch(setProducts(mockProducts));
      showSuccess("Productos cargados correctamente");
    } catch (error) {
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
      <section className="py-12">
        <Container maxWidth="lg">
          <div className="text-center text-white mb-8">
            <div className="flex items-center justify-center mb-6">
              <ShoppingCart className="text-green-400 text-5xl mr-4" />
              <Typography variant="h2" className="font-bold text-4xl lg:text-5xl">
                Catálogo de Productos
              </Typography>
            </div>
            <Typography variant="h6" className="text-gray-200 max-w-2xl mx-auto">
              Explora nuestro catálogo completo con más de 5,000 productos de calidad.
            </Typography>
          </div>
        </Container>
      </section>

      {/* Filters Section */}
      <section className="py-4 bg-white bg-opacity-10 backdrop-blur-sm">
        <Container maxWidth="lg">
          <Card className="bg-white bg-opacity-90 backdrop-blur-sm">
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
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
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      value={selectedCategory || "all"}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      label="Categoría"
                      startAdornment={
                        <InputAdornment position="start">
                          <CategoryIcon />
                        </InputAdornment>
                      }
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

                <Grid item xs={6} md={2}>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    label="Precio mín"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6} md={2}>
                  <TextField
                    fullWidth
                    type="number"
                    variant="outlined"
                    label="Precio máx"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSearch}
                    className="bg-green-600 hover:bg-green-700 h-14"
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
            <Box className="mb-6 flex items-center justify-between">
              <Typography variant="h5" className="text-white">
                {filteredProducts.length} productos encontrados
              </Typography>
              {selectedCategory && (
                <Chip
                  label={selectedCategory}
                  onDelete={() => dispatch(setSelectedCategory(null))}
                  className="bg-green-500 text-white"
                />
              )}
            </Box>

            <Grid container spacing={4}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <CardMedia
                      component="div"
                      className="h-48 bg-gray-200 flex items-center justify-center"
                    >
                      <ShoppingCart className="text-6xl text-gray-400" />
                    </CardMedia>
                    <CardContent className="flex-1 flex flex-col">
                      <Typography variant="caption" className="text-gray-500 mb-1">
                        {product.code}
                      </Typography>
                      <Typography variant="h6" className="font-semibold mb-2 line-clamp-2">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2 flex-1">
                        {product.description}
                      </Typography>
                      <Box className="mb-2">
                        <Chip
                          label={product.category}
                          size="small"
                          className="bg-blue-100 text-blue-800"
                        />
                      </Box>
                      <Box className="flex items-center justify-between">
                        <Typography variant="h5" className="font-bold text-green-600">
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="caption" className="text-gray-500">
                          Stock: {product.stock}
                        </Typography>
                      </Box>
                      <Button
                        fullWidth
                        variant="contained"
                        className="mt-3 bg-green-600 hover:bg-green-700"
                        disabled={product.stock === 0}
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
