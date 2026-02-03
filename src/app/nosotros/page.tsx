'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent,
  Avatar
} from '@mui/material';
import {
  Build,
  Timeline,
  Groups,
  WorkspacePremium,
  Handshake,
  Engineering,
  Support
} from '@mui/icons-material';
import { APP_CONFIG } from '@/lib/constants';

const values = [
  {
    icon: <WorkspacePremium className="text-4xl text-yellow-500" />,
    title: 'Calidad Premium',
    description: 'Solo trabajamos con las mejores marcas y productos de máxima calidad.'
  },
  {
    icon: <Handshake className="text-4xl text-blue-500" />,
    title: 'Confianza',
    description: 'Más de 20 años construyendo relaciones duraderas con nuestros clientes.'
  },
  {
    icon: <Engineering className="text-4xl text-green-500" />,
    title: 'Experiencia',
    description: 'Nuestro equipo cuenta con amplia experiencia en el sector ferretero.'
  },
  {
    icon: <Support className="text-4xl text-purple-500" />,
    title: 'Servicio',
    description: 'Asesoría personalizada para encontrar la solución perfecta.'
  }
];

const team = [
  {
    name: 'Carlos Mendoza',
    position: 'Gerente General',
    experience: '25 años de experiencia',
    avatar: 'CM'
  },
  {
    name: 'María González',
    position: 'Jefa de Ventas',
    experience: '15 años de experiencia',
    avatar: 'MG'
  },
  {
    name: 'Roberto Silva',
    position: 'Especialista Técnico',
    experience: '18 años de experiencia',
    avatar: 'RS'
  },
  {
    name: 'Ana López',
    position: 'Atención al Cliente',
    experience: '12 años de experiencia',
    avatar: 'AL'
  }
];

const timeline = [
  { year: '2004', event: 'Fundación de Ferretera Ecosa' },
  { year: '2008', event: 'Expansión del almacén principal' },
  { year: '2012', event: 'Implementación de sistema digital' },
  { year: '2016', event: 'Servicio de entregas a domicilio' },
  { year: '2020', event: 'Tienda online y catálogo digital' },
  { year: '2024', event: 'Renovación completa de la plataforma' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <div className="text-center text-white mb-16">
            <Typography variant="h2" className="font-bold mb-6 text-4xl lg:text-5xl">
              Sobre <span className="text-green-400">{APP_CONFIG.COMPANY_NAME}</span>
            </Typography>
            <Typography variant="h5" className="text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Más de dos décadas siendo la ferretería de confianza para profesionales 
              y particulares en toda la región.
            </Typography>
          </div>
        </Container>
      </section>

      {/* Historia Section */}
      <section className="py-16 bg-white bg-opacity-10 backdrop-blur-sm">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Build className="text-green-400 text-4xl mr-4" />
                <Typography variant="h3" className="font-bold text-white">
                  Nuestra Historia
                </Typography>
              </div>
              <Typography variant="body1" className="text-gray-200 leading-relaxed mb-6">
                Fundada en 2004, <strong>{APP_CONFIG.COMPANY_NAME}</strong> nació con la visión de 
                proporcionar herramientas y materiales de construcción de la más alta calidad 
                a precios competitivos.
              </Typography>
              <Typography variant="body1" className="text-gray-200 leading-relaxed mb-6">
                Durante estos años, hemos crecido desde una pequeña ferretería local hasta 
                convertirnos en un referente regional, siempre manteniendo nuestros valores 
                de calidad, confianza y servicio personalizado.
              </Typography>
              <Typography variant="body1" className="text-gray-200 leading-relaxed">
                Hoy, con más de 5,000 productos en stock y un equipo de especialistas, 
                seguimos comprometidos con brindar las mejores soluciones para cada proyecto.
              </Typography>
            </div>
            
            <Card className="bg-white bg-opacity-90 backdrop-blur-sm">
              <CardContent className="p-8">
                <Typography variant="h5" className="font-bold text-gray-800 mb-6 text-center">
                  Estadísticas
                </Typography>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <Typography variant="h3" className="font-bold text-green-600 mb-2">
                      20+
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Años de experiencia
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h3" className="font-bold text-blue-600 mb-2">
                      5K+
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Productos en stock
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h3" className="font-bold text-yellow-600 mb-2">
                      98%
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Clientes satisfechos
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h3" className="font-bold text-purple-600 mb-2">
                      1K+
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Proyectos completados
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Valores Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <Typography variant="h3" className="font-bold text-white mb-4">
              Nuestros Valores
            </Typography>
            <Typography variant="h6" className="text-gray-200 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo diario y nos han llevado al éxito.
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="text-center p-8">
                  <div className="mb-4">
                    {value.icon}
                  </div>
                  <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                    {value.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 leading-relaxed">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white bg-opacity-10 backdrop-blur-sm">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Timeline className="text-green-400 text-4xl mr-4" />
              <Typography variant="h3" className="font-bold text-white">
                Nuestra Evolución
              </Typography>
            </div>
            <Typography variant="h6" className="text-gray-200 max-w-2xl mx-auto">
              Los hitos más importantes en nuestro crecimiento y desarrollo.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((item, index) => (
              <Card key={index} className="bg-white bg-opacity-90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Typography variant="h4" className="font-bold text-green-600 mb-2">
                    {item.year}
                  </Typography>
                  <Typography variant="body1" className="text-gray-700">
                    {item.event}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Equipo Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Groups className="text-green-400 text-4xl mr-4" />
              <Typography variant="h3" className="font-bold text-white">
                Nuestro Equipo
              </Typography>
            </div>
            <Typography variant="h6" className="text-gray-200 max-w-2xl mx-auto">
              Conoce a los profesionales que hacen posible nuestro servicio de excelencia.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card 
                key={index}
                className="bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 transition-all duration-300"
              >
                <CardContent className="text-center p-8">
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      margin: '0 auto 16px',
                      bgcolor: 'primary.main',
                      fontSize: '1.5rem'
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography variant="h6" className="font-semibold mb-2 text-gray-800">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" className="text-green-600 mb-2">
                    {member.position}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {member.experience}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
} 