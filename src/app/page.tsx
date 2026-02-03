'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  CardMedia,
  Box
} from '@mui/material';
import { 
  Build, 
  Search, 
  LocalShipping, 
  Support,
  ArrowForward,
  Handyman,
  Construction,
  Hardware,
  HomeRepairService
} from '@mui/icons-material';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

const features = [
  {
    icon: <Build className="text-5xl text-orange-500" />,
    title: 'Herramientas de Calidad',
    description: 'Las mejores marcas y herramientas profesionales para cada trabajo.'
  },
  {
    icon: <Search className="text-5xl text-yellow-600" />,
    title: 'Búsqueda Inteligente',
    description: 'Encuentra rápidamente lo que necesitas en nuestro extenso catálogo.'
  },
  {
    icon: <LocalShipping className="text-5xl text-gray-600" />,
    title: 'Entrega Rápida',
    description: 'Enviamos tus productos directamente a tu obra o domicilio.'
  },
  {
    icon: <Support className="text-5xl text-orange-600" />,
    title: 'Asesoría Experta',
    description: 'Nuestro equipo te ayuda a elegir las mejores opciones.'
  }
];

const categories = [
  {
    icon: <Handyman className="text-6xl" />,
    title: 'Herramientas Manuales',
    description: 'Martillos, destornilladores, llaves y más',
    color: '#f97316'
  },
  {
    icon: <Construction className="text-6xl" />,
    title: 'Herramientas Eléctricas',
    description: 'Taladros, sierras, lijadoras profesionales',
    color: '#ca8a04'
  },
  {
    icon: <Hardware className="text-6xl" />,
    title: 'Ferretería General',
    description: 'Tornillos, clavos, adhesivos y fijaciones',
    color: '#3b82f6'
  },
  {
    icon: <HomeRepairService className="text-6xl" />,
    title: 'Materiales de Construcción',
    description: 'Cemento, arena, ladrillos y más',
    color: '#10b981'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section con imagen de fondo */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        {/* 
          INSTRUCCIONES PARA AGREGAR IMAGEN DE FONDO:
          1. Coloca una imagen de ferretería/construcción en: frontend-app-ferretera/public/hero-bg.jpg
          2. Imagen recomendada: Ferretería moderna, herramientas organizadas, o trabajador profesional
          3. Dimensiones sugeridas: 1920x1080px o superior
          4. Descomenta el siguiente bloque de código:
          
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.jpg"
              alt="Ferretería"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
        */}
        
        <Container maxWidth="lg" className="px-4 relative z-10">
          <div className="text-center text-white">
            <Box className="mb-6">
              <Build className="text-orange-500 text-7xl sm:text-8xl mx-auto mb-4 animate-pulse" />
            </Box>
            
            <Typography 
              variant="h1" 
              className="font-bold mb-6 text-4xl sm:text-5xl lg:text-7xl"
            >
              Bienvenido a{' '}
              <span className="text-orange-500 drop-shadow-lg">{APP_CONFIG.COMPANY_NAME}</span>
            </Typography>
            
            <Typography 
              variant="h5" 
              className="mb-8 sm:mb-10 text-gray-200 max-w-4xl mx-auto leading-relaxed text-lg sm:text-xl lg:text-2xl px-4 font-light"
            >
              Tu ferretería de confianza con más de <span className="text-yellow-400 font-bold">20 años</span> ofreciendo las mejores 
              herramientas y materiales de construcción para profesionales y particulares.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 mb-12">
              <Link href={ROUTES.CATALOG}>
                <Button
                  size="large"
                  variant="contained"
                  endIcon={<Search />}
                  sx={{
                    backgroundColor: '#f97316',
                    px: { xs: 4, sm: 6 },
                    py: 2,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    borderRadius: 3,
                    boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)',
                    transform: 'scale(1)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#ea580c',
                      transform: 'scale(1.05)',
                      boxShadow: '0 15px 35px rgba(249, 115, 22, 0.4)',
                    }
                  }}
                >
                  Explorar Catálogo
                </Button>
              </Link>
              
              <Link href={ROUTES.CONTACT}>
                <Button
                  size="large"
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderWidth: 2,
                    borderColor: '#f97316',
                    color: '#fbbf24',
                    px: { xs: 4, sm: 6 },
                    py: 2,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: '#ea580c',
                      backgroundColor: '#f97316',
                      color: '#fff',
                    }
                  }}
                >
                  Contáctanos
                </Button>
              </Link>
            </div>

            {/* Badges de confianza */}
            <Box className="flex flex-wrap justify-center gap-6 mt-8">
              <Box className="text-center">
                <Typography variant="h4" className="font-bold text-orange-400">✓</Typography>
                <Typography variant="body2" className="text-gray-300">Envío Gratis</Typography>
              </Box>
              <Box className="text-center">
                <Typography variant="h4" className="font-bold text-yellow-400">✓</Typography>
                <Typography variant="body2" className="text-gray-300">Garantía Total</Typography>
              </Box>
              <Box className="text-center">
                <Typography variant="h4" className="font-bold text-green-400">✓</Typography>
                <Typography variant="body2" className="text-gray-300">Pago Seguro</Typography>
              </Box>
            </Box>
          </div>
        </Container>
      </section>

      {/* Categorías Destacadas */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <Container maxWidth="lg" className="px-4">
          <div className="text-center mb-12">
            <Typography variant="h3" className="font-bold text-white mb-4">
              Categorías Destacadas
            </Typography>
            <Typography variant="h6" className="text-gray-300">
              Encuentra exactamente lo que necesitas
            </Typography>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={index}
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                  border: '1px solid #374151',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${category.color}40`,
                    borderColor: category.color,
                  }
                }}
              >
                <CardContent className="text-center p-6">
                  <Box 
                    sx={{ 
                      color: category.color,
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="h6" className="font-bold text-white mb-2">
                    {category.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 
            INSTRUCCIONES PARA AGREGAR IMÁGENES DE CATEGORÍAS:
            Coloca imágenes en frontend-app-ferretera/public/categories/:
            - herramientas-manuales.jpg
            - herramientas-electricas.jpg
            - ferreteria-general.jpg
            - materiales-construccion.jpg
            
            Luego agrega CardMedia antes de CardContent en cada Card:
            <CardMedia
              component="div"
              className="h-48 relative"
            >
              <Image
                src={`/categories/${category.slug}.jpg`}
                alt={category.title}
                fill
                className="object-cover"
              />
            </CardMedia>
          */}
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800 bg-opacity-50 backdrop-blur-sm">
        <Container maxWidth="lg" className="px-4">
          <div className="text-center mb-16">
            <Typography 
              variant="h3" 
              className="font-bold text-white mb-4 text-3xl lg:text-4xl"
            >
              ¿Por qué elegirnos?
            </Typography>
            <Typography 
              variant="h6" 
              className="text-gray-200 max-w-2xl mx-auto text-base lg:text-lg px-4"
            >
              Más de dos décadas de experiencia nos respaldan como la mejor opción 
              para tus proyectos de construcción y reparación.
            </Typography>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                sx={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }
                }}
              >
                <CardContent className="text-center p-8">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <Typography 
                    variant="h6" 
                    className="font-semibold mb-3 text-gray-800 text-lg"
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    className="text-gray-600 leading-relaxed"
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <Container maxWidth="lg" className="px-4">
          <div className="text-center mb-12">
            <Typography variant="h3" className="font-bold text-white mb-4">
              Productos Más Vendidos
            </Typography>
            <Typography variant="h6" className="text-gray-300">
              Los favoritos de nuestros clientes
            </Typography>
          </div>

          {/* 
            INSTRUCCIONES PARA AGREGAR PRODUCTOS DESTACADOS:
            Coloca imágenes de productos en frontend-app-ferretera/public/products/:
            - producto-1.jpg (ej: taladro)
            - producto-2.jpg (ej: martillo)
            - producto-3.jpg (ej: sierra)
            - producto-4.jpg (ej: nivel láser)
            
            Estos productos se cargarán automáticamente desde la base de datos
            cuando tengas productos marcados como "destacados"
          */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card 
                key={item}
                sx={{
                  background: '#1f2937',
                  border: '1px solid #374151',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
                    borderColor: '#f97316',
                  }
                }}
              >
                <CardMedia
                  component="div"
                  className="h-48 bg-gray-700 flex items-center justify-center"
                >
                  <Build className="text-6xl text-gray-500" />
                  {/* 
                    Reemplaza con:
                    <Image
                      src={`/products/producto-${item}.jpg`}
                      alt={`Producto ${item}`}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  */}
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" className="font-bold text-white mb-2">
                    Producto Destacado {item}
                  </Typography>
                  <Typography variant="body2" className="text-gray-400 mb-3">
                    Descripción del producto destacado
                  </Typography>
                  <Box className="flex items-center justify-between">
                    <Typography variant="h6" className="font-bold text-orange-500">
                      $XX.XXX
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: '#f97316',
                        '&:hover': { backgroundColor: '#ea580c' }
                      }}
                    >
                      Ver más
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>

          <Box className="text-center mt-10">
            <Link href={ROUTES.CATALOG}>
              <Button
                size="large"
                variant="outlined"
                endIcon={<ArrowForward />}
                sx={{
                  borderWidth: 2,
                  borderColor: '#f97316',
                  color: '#f97316',
                  px: 6,
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#ea580c',
                    backgroundColor: '#f97316',
                    color: '#fff',
                  }
                }}
              >
                Ver Todos los Productos
              </Button>
            </Link>
          </Box>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600">
        <Container maxWidth="lg" className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-white">
            <div className="p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <Typography variant="h2" className="font-bold text-white mb-2 text-5xl">
                20+
              </Typography>
              <Typography variant="h6" className="text-white font-semibold">
                Años de Experiencia
              </Typography>
            </div>
            
            <div className="p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <Typography variant="h2" className="font-bold text-white mb-2 text-5xl">
                5000+
              </Typography>
              <Typography variant="h6" className="text-white font-semibold">
                Productos en Stock
              </Typography>
            </div>
            
            <div className="p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
              <Typography variant="h2" className="font-bold text-white mb-2 text-5xl">
                98%
              </Typography>
              <Typography variant="h6" className="text-white font-semibold">
                Clientes Satisfechos
              </Typography>
            </div>
          </div>
        </Container>
      </section>

      {/* Marcas Section */}
      <section className="py-16 bg-gray-900">
        <Container maxWidth="lg" className="px-4">
          <div className="text-center mb-12">
            <Typography variant="h3" className="font-bold text-white mb-4">
              Trabajamos con las Mejores Marcas
            </Typography>
            <Typography variant="h6" className="text-gray-300">
              Calidad garantizada en cada producto
            </Typography>
          </div>

          {/* 
            INSTRUCCIONES PARA AGREGAR LOGOS DE MARCAS:
            Coloca logos de marcas en frontend-app-ferretera/public/brands/:
            - bosch.png
            - dewalt.png
            - makita.png
            - stanley.png
            - black-decker.png
            - truper.png
            
            Logos en formato PNG con fondo transparente
            Dimensiones recomendadas: 200x100px
          */}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {['Bosch', 'DeWalt', 'Makita', 'Stanley', 'Black+Decker', 'Truper'].map((brand, index) => (
              <Box 
                key={index}
                className="bg-white bg-opacity-10 rounded-xl p-6 flex items-center justify-center h-24 hover:bg-opacity-20 transition-all"
              >
                <Typography variant="h6" className="text-gray-400 font-bold">
                  {brand}
                </Typography>
                {/* 
                  Reemplaza con:
                  <Image
                    src={`/brands/${brand.toLowerCase().replace('+', '-')}.png`}
                    alt={brand}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                */}
              </Box>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-600 relative overflow-hidden">
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <Container maxWidth="lg" className="px-4 relative z-10">
          <div className="text-center text-white">
            <Build className="text-8xl mb-6 mx-auto" />
            <Typography variant="h3" className="font-bold mb-4 text-3xl lg:text-5xl">
              ¿Listo para comenzar tu proyecto?
            </Typography>
            <Typography variant="h6" className="mb-8 text-white text-lg lg:text-xl px-4 max-w-2xl mx-auto">
              Explora nuestro catálogo completo con más de 5,000 productos y encuentra 
              exactamente lo que necesitas para tu obra o proyecto.
            </Typography>
            
            <Link href={ROUTES.CATALOG}>
              <Button
                size="large"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: '#fff',
                  color: '#f97316',
                  px: 8,
                  py: 2.5,
                  fontSize: '1.25rem',
                  borderRadius: 3,
                  fontWeight: 'bold',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                Ver Catálogo Completo
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
