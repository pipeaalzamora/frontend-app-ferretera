'use client';

import React from 'react';
import Link from 'next/link';
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

import BuildIcon from '@mui/icons-material/Build';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white mt-auto border-t-4 border-orange-500">
      <Container maxWidth="lg" className="py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Información de la empresa */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BuildIcon className="text-orange-500 text-3xl" />
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
            <Typography variant="h6" className="font-semibold mb-4 text-orange-400">
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
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <Typography variant="h6" className="font-semibold mb-4 text-orange-400">
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
            <Typography variant="h6" className="font-semibold mb-4 text-orange-400">
              Contáctanos
            </Typography>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <LocationOn className="text-orange-400 text-xl flex-shrink-0 mt-0.5" />
                <Typography variant="body2" className="text-gray-300">
                  Av. Principal 123, Ciudad
                </Typography>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-orange-400 text-xl flex-shrink-0" />
                <Typography variant="body2" className="text-gray-300">
                  +1 234 567 8900
                </Typography>
              </div>
              <div className="flex items-start space-x-3">
                <Email className="text-orange-400 text-xl flex-shrink-0 mt-0.5" />
                <Typography variant="body2" className="text-gray-300 break-all">
                  info@ecosa.com
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-8 bg-gray-700" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <Typography variant="body2" className="text-gray-400">
            © {currentYear} {APP_CONFIG.COMPANY_NAME}. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" className="text-gray-400 mt-2 md:mt-0">
            Versión {APP_CONFIG.VERSION}
          </Typography>
        </div>
      </Container>
    </footer>
  );
}; 