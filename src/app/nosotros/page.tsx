'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  Box
} from '@mui/material';
import {
  Business,
  EmojiEvents,
  Groups,
  Verified,
  Timeline,
  LocalShipping
} from '@mui/icons-material';

const values = [
  {
    icon: <Verified className="text-5xl text-green-500" />,
    title: 'Calidad Garantizada',
    description: 'Trabajamos solo con las mejores marcas y productos certificados del mercado.'
  },
  {
    icon: <Groups className="text-5xl text-blue-500" />,
    title: 'Atención Personalizada',
    description: 'Nuestro equipo de expertos está siempre disponible para asesorarte.'
  },
  {
    icon: <LocalShipping className="text-5xl text-orange-500" />,
    title: 'Entrega Rápida',
    description: 'Contamos con logística eficiente para entregas en tiempo récord.'
  },
  {
    icon: <EmojiEvents className="text-5xl text-yellow-500" />,
    title: 'Mejores Precios',
    description: 'Precios competitivos sin comprometer la calidad de nuestros productos.'
  }
];

const timeline = [
  { year: '2004', event: 'Fundación de Ferretería Ecosa' },
  { year: '2010', event: 'Expansión a nuevas sucursales' },
  { year: '2015', event: 'Implementación de tienda online' },
  { year: '2020', event: 'Reconocimiento como líder del sector' },
  { year: '2024', event: 'Más de 5,000 productos en catálogo' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        {/* 
          INSTRUCCIONES PARA AGREGAR IMAGEN DE EQUIPO:
          Coloca una imagen del equipo/tienda en: frontend-app-ferretera/public/about-hero.jpg
          Imagen recomendada: Equipo de trabajo, fachada de la tienda, o interior de la ferretería
          Dimensiones: 1920x1080px
        */}
        <Container maxWidth="lg">
          <div className="text-center text-white mb-16">
            <div className="flex items-center justify-center mb-6">
              <Business className="text-orange-500 text-6xl mr-4 animate-pulse" />
              <Typography variant="h2" className="font-bold text-5xl lg:text-6xl">
                Sobre Nosotros
              </Typography>
            </div>
            <Typography variant="h5" className="text-gray-200 max-w-3xl mx-auto leading-relaxed text-xl">
              Más de <span className="text-orange-500 font-bold">20 años</span> siendo tu aliado en construcción y ferretería
            </Typography>
          </div>

          {/* Imagen de la empresa */}
          <Card 
            sx={{
              background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
              border: '2px solid #f97316',
              overflow: 'hidden'
            }}
          >
            <Box className="h-96 bg-gray-700 flex items-center justify-center relative">
              <Business className="text-9xl text-gray-600" />
              {/* 
                Reemplaza con:
                <Image
                  src="/about-hero.jpg"
                  alt="Ferretería Ecosa"
                  fill
                  className="object-cover"
                />
              */}
              <Box className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></Box>
              <Box className="absolute bottom-8 left-8 right-8 text-white z-10">
                <Typography variant="h4" className="font-bold mb-2">
                  Ferretería Ecosa - Tu Socio de Confianza
                </Typography>
                <Typography variant="body1">
                  Comprometidos con la excelencia desde 2004
                </Typography>
              </Box>
            </Box>
          </Card>
        </Container>
      </section>

      {/* Historia Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <Container maxWidth="lg">
          <Card 
            sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <CardContent className="p-12">
              <div className="flex items-center justify-center mb-8">
                <Timeline className="text-orange-500 text-6xl mr-4" />
                <Typography variant="h3" className="font-bold text-gray-800">
                  Nuestra Historia
                </Typography>
              </div>
              
              <Typography variant="body1" className="text-gray-700 text-lg leading-relaxed mb-6">
                <span className="text-orange-600 font-bold text-2xl">F</span>erretería Ecosa nació en 2004 con la visión de ofrecer productos de calidad 
                y un servicio excepcional a profesionales y particulares del sector de la construcción. 
                Desde nuestros inicios, nos hemos comprometido con la excelencia y la satisfacción 
                de nuestros clientes.
              </Typography>
              
              <Typography variant="body1" className="text-gray-700 text-lg leading-relaxed mb-6">
                A lo largo de estos años, hemos crecido constantemente, expandiendo nuestro catálogo 
                y mejorando nuestros servicios. Hoy contamos con más de <span className="font-bold text-orange-600">5,000 productos</span> de las mejores 
                marcas del mercado y un equipo de <span className="font-bold text-orange-600">50+ profesionales</span> altamente capacitados.
              </Typography>
              
              <Typography variant="body1" className="text-gray-700 text-lg leading-relaxed mb-6">
                Nuestra misión es ser el socio confiable que necesitas para llevar a cabo tus proyectos, 
                ofreciendo no solo productos de calidad, sino también asesoría experta y un servicio 
                que supera las expectativas.
              </Typography>

              <Box className="mt-8 p-6 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                <Typography variant="h6" className="font-bold text-orange-800 mb-2">
                  Nuestra Visión
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  Ser la ferretería líder en la región, reconocida por nuestra calidad, servicio 
                  y compromiso con nuestros clientes y la comunidad.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Valores Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <Typography variant="h3" className="font-bold text-white mb-4 text-4xl">
              Nuestros Valores
            </Typography>
            <Typography variant="h6" className="text-gray-200 max-w-2xl mx-auto text-lg">
              Los principios que guían nuestro trabajo día a día
            </Typography>
          </div>

          <Grid container spacing={6}>
            {values.map((value, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card 
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 bg-gray-100 p-4 rounded-2xl">
                        {value.icon}
                      </div>
                      <div>
                        <Typography variant="h5" className="font-semibold mb-3 text-gray-800">
                          {value.title}
                        </Typography>
                        <Typography variant="body1" className="text-gray-600 leading-relaxed text-base">
                          {value.description}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <Timeline className="text-orange-500 text-7xl mb-4 mx-auto animate-pulse" />
            <Typography variant="h3" className="font-bold text-white mb-4 text-4xl">
              Nuestra Trayectoria
            </Typography>
            <Typography variant="h6" className="text-gray-200 text-lg">
              Hitos importantes en nuestra historia
            </Typography>
          </div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <Card 
                key={index}
                sx={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateX(10px)',
                    boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
                  }
                }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-8">
                    <div className="flex-shrink-0">
                      <Box 
                        sx={{
                          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                          borderRadius: '50%',
                          width: 100,
                          height: 100,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)'
                        }}
                      >
                        <Typography variant="h4" className="font-bold text-white">
                          {item.year}
                        </Typography>
                      </Box>
                    </div>
                    <div className="flex-1">
                      <Typography variant="h5" className="font-semibold text-gray-800 text-xl">
                        {item.event}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Equipo Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <div className="text-center mb-12">
            <Groups className="text-orange-500 text-7xl mb-4 mx-auto" />
            <Typography variant="h3" className="font-bold text-white mb-6 text-4xl">
              Nuestro Equipo
            </Typography>
            <Typography variant="h6" className="text-gray-200 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
              Contamos con un equipo de profesionales apasionados y comprometidos con 
              brindarte el mejor servicio. Cada miembro de nuestro equipo está capacitado 
              para asesorarte y ayudarte a encontrar exactamente lo que necesitas.
            </Typography>
          </div>

          {/* 
            INSTRUCCIONES PARA AGREGAR FOTOS DEL EQUIPO:
            Coloca fotos del equipo en frontend-app-ferretera/public/team/:
            - team-1.jpg (Gerente General)
            - team-2.jpg (Jefe de Ventas)
            - team-3.jpg (Asesor Técnico)
            - team-4.jpg (Encargado de Bodega)
            
            Fotos profesionales, fondo neutro, formato cuadrado 500x500px
          */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {['Gerente General', 'Jefe de Ventas', 'Asesor Técnico', 'Encargado de Bodega'].map((role, index) => (
              <Card 
                key={index}
                sx={{
                  background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
                  border: '2px solid #374151',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    borderColor: '#f97316',
                    boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
                  }
                }}
              >
                <Box className="h-64 bg-gray-700 flex items-center justify-center">
                  <Groups className="text-8xl text-gray-600" />
                  {/* 
                    Reemplaza con:
                    <Image
                      src={`/team/team-${index + 1}.jpg`}
                      alt={role}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  */}
                </Box>
                <CardContent className="text-center p-6">
                  <Typography variant="h6" className="font-bold text-white mb-1">
                    Nombre Apellido
                  </Typography>
                  <Typography variant="body2" className="text-orange-400">
                    {role}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
            
          <Card 
            sx={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <CardContent className="p-12">
              <Grid container spacing={8}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box className="text-center">
                    <Typography variant="h2" className="font-bold text-orange-600 mb-2 text-5xl">
                      50+
                    </Typography>
                    <Typography variant="h6" className="text-gray-700 font-semibold">
                      Empleados
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box className="text-center">
                    <Typography variant="h2" className="font-bold text-blue-600 mb-2 text-5xl">
                      15+
                    </Typography>
                    <Typography variant="h6" className="text-gray-700 font-semibold">
                      Años de Experiencia Promedio
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box className="text-center">
                    <Typography variant="h2" className="font-bold text-green-600 mb-2 text-5xl">
                      100%
                    </Typography>
                    <Typography variant="h6" className="text-gray-700 font-semibold">
                      Comprometidos con tu Satisfacción
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
