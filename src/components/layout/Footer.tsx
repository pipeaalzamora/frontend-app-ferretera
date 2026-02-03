'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Container, 
  Typography, 
  IconButton, 
  Divider 
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Email, 
  Phone, 
  LocationOn
} from '@mui/icons-material';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      <Container maxWidth="lg" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo192.png"
                  alt="Logo Ferretera Ecosa"
                  fill
                  className="object-contain"
                />
              </div>
              <Typography variant="h5" className="font-bold">
                {APP_CONFIG.COMPANY_NAME}
              </Typography>
            </div>
            <Typography variant="body2" className="text-gray-300 mb-4 leading-relaxed">
              Tu ferretería de confianza con más de 20 años de experiencia. 
              Ofrecemos herramientas y materiales de construcción de la más alta calidad.
            </Typography>
            <div className="flex space-x-2">
              <IconButton 
                className="text-blue-400 hover:text-blue-300 transition-colors"
                size="small"
              >
                <Facebook />
              </IconButton>
              <IconButton 
                className="text-blue-400 hover:text-blue-300 transition-colors"
                size="small"
              >
                <Twitter />
              </IconButton>
              <IconButton 
                className="text-pink-400 hover:text-pink-300 transition-colors"
                size="small"
              >
                <Instagram />
              </IconButton>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <Typography variant="h6" className="font-semibold mb-4 text-green-400">
              Enlaces Rápidos
            </Typography>
            <ul className="space-y-2">
              {[
                { title: 'Inicio', href: ROUTES.HOME },
                { title: 'Catálogo', href: ROUTES.CATALOG },
                { title: 'Nosotros', href: ROUTES.ABOUT },
                { title: 'Contacto', href: ROUTES.CONTACT }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <Typography variant="h6" className="font-semibold mb-4 text-green-400">
              Nuestros Servicios
            </Typography>
            <ul className="space-y-2">
              {[
                'Herramientas Eléctricas',
                'Materiales de Construcción',
                'Ferretería Industrial',
                'Asesoría Técnica',
                'Entregas a Domicilio'
              ].map((service) => (
                <li key={service}>
                  <Typography variant="body2" className="text-gray-300">
                    {service}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <Typography variant="h6" className="font-semibold mb-4 text-green-400">
              Contáctanos
            </Typography>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <LocationOn className="text-green-400 text-xl" />
                <Typography variant="body2" className="text-gray-300">
                  Av. Principal 123, Ciudad
                </Typography>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-green-400 text-xl" />
                <Typography variant="body2" className="text-gray-300">
                  +1 234 567 8900
                </Typography>
              </div>
              <div className="flex items-center space-x-3">
                <Email className="text-green-400 text-xl" />
                <Typography variant="body2" className="text-gray-300">
                  info@ecosa.com
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-8 bg-gray-700" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Typography variant="body2" className="text-gray-400">
            © {currentYear} {APP_CONFIG.COMPANY_NAME}. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" className="text-gray-400 mt-2 md:mt-0">
            Versión {APP_CONFIG.VERSION} • Desarrollado con Next.js
          </Typography>
        </div>
      </Container>
    </footer>
  );
}; 