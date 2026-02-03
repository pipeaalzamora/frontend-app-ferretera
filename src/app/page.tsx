'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent 
} from '@mui/material';
import { 
  Build, 
  Search, 
  LocalShipping, 
  Support,
  ArrowForward
} from '@mui/icons-material';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

const features = [
  {
    icon: <Build className="text-4xl text-green-500" />,
    title: 'Herramientas de Calidad',
    description: 'Las mejores marcas y herramientas profesionales para cada trabajo.'
  },
  {
    icon: <Search className="text-4xl text-blue-500" />,
    title: 'Búsqueda Inteligente',
    description: 'Encuentra rápidamente lo que necesitas en nuestro extenso catálogo.'
  },
  {
    icon: <LocalShipping className="text-4xl text-orange-500" />,
    title: 'Entrega Rápida',
    description: 'Enviamos tus productos directamente a tu obra o domicilio.'
  },
  {
    icon: <Support className="text-4xl text-purple-500" />,
    title: 'Asesoría Experta',
    description: 'Nuestro equipo te ayuda a elegir las mejores opciones.'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <Container maxWidth="lg">
          <div className="text-center text-white">
            <Typography 
              variant="h2" 
              className="font-bold mb-6 text-4xl lg:text-6xl"
            >
              Bienvenido a{' '}
              <span className="text-green-400">{APP_CONFIG.COMPANY_NAME}</span>
            </Typography>
            
            <Typography 
              variant="h5" 
              className="mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Tu ferretería de confianza con más de 20 años ofreciendo las mejores 
              herramientas y materiales de construcción para profesionales y particulares.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.CATALOG}>
                <Button
                  size="large"
                  variant="contained"
                  endIcon={<Search />}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  Explorar Catálogo
                </Button>
              </Link>
              
              <Link href={ROUTES.CONTACT}>
                <Button
                  size="large"
                  variant="outlined"
                  endIcon={<ArrowForward />}
                  className="border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 text-lg rounded-xl transition-all duration-300"
                >
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-green-400 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-yellow-400 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white bg-opacity-10 backdrop-blur-sm">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <Typography 
              variant="h3" 
              className="font-bold text-white mb-4"
            >
              ¿Por qué elegirnos?
            </Typography>
            <Typography 
              variant="h6" 
              className="text-gray-200 max-w-2xl mx-auto"
            >
              Más de dos décadas de experiencia nos respaldan como la mejor opción 
              para tus proyectos de construcción y reparación.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <CardContent className="text-center p-8">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <Typography 
                    variant="h6" 
                    className="font-semibold mb-3 text-gray-800"
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

      {/* Stats Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <Typography variant="h2" className="font-bold text-green-400 mb-2">
                20+
              </Typography>
              <Typography variant="h6" className="text-gray-200">
                Años de Experiencia
              </Typography>
            </div>
            
            <div>
              <Typography variant="h2" className="font-bold text-blue-400 mb-2">
                5000+
              </Typography>
              <Typography variant="h6" className="text-gray-200">
                Productos en Stock
              </Typography>
            </div>
            
            <div>
              <Typography variant="h2" className="font-bold text-yellow-400 mb-2">
                98%
              </Typography>
              <Typography variant="h6" className="text-gray-200">
                Clientes Satisfechos
              </Typography>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <Container maxWidth="lg">
          <div className="text-center text-white">
            <Typography variant="h3" className="font-bold mb-4">
              ¿Listo para comenzar tu proyecto?
            </Typography>
            <Typography variant="h6" className="mb-8 text-green-100">
              Explora nuestro catálogo completo y encuentra exactamente lo que necesitas.
            </Typography>
            
            <Link href={ROUTES.CATALOG}>
              <Button
                size="large"
                variant="contained"
                endIcon={<ArrowForward />}
                className="bg-white text-green-600 hover:bg-gray-100 px-10 py-4 text-xl rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
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
