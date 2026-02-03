'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

const navLinks = [
  { title: 'Inicio', href: ROUTES.HOME },
  { title: 'Catálogo', href: ROUTES.CATALOG },
  { title: 'Nosotros', href: ROUTES.ABOUT },
  { title: 'Contacto', href: ROUTES.CONTACT }
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActiveRoute = (href: string) => {
    if (href === ROUTES.HOME) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const drawer = (
    <Box className="w-64 h-full bg-gradient-to-b from-green-800 to-green-900">
      <div className="flex items-center justify-between p-4 border-b border-green-700">
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src="/logo192.png"
              alt="Logo Ferretera Ecosa"
              fill
              className="object-contain"
            />
          </div>
          <Typography variant="h6" className="text-white font-bold">
            {APP_CONFIG.COMPANY_NAME}
          </Typography>
        </div>
        <IconButton 
          onClick={handleDrawerToggle}
          className="text-white"
        >
          <CloseIcon />
        </IconButton>
      </div>
      
      <List className="pt-4">
        {navLinks.map((link) => (
          <ListItem key={link.href} className="px-2">
            <Link 
              href={link.href} 
              className="w-full"
              onClick={handleDrawerToggle}
            >
              <div className={`
                w-full p-3 rounded-lg transition-all duration-300
                ${isActiveRoute(link.href) 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-green-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                }
              `}>
                <ListItemText 
                  primary={link.title}
                  primaryTypographyProps={{ 
                    className: 'font-medium text-center'
                  }}
                />
              </div>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 shadow-lg"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar className="px-4 lg:px-8">
          {/* Logo y título */}
          <Link href={ROUTES.HOME} className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image
                src="/logo192.png"
                alt="Logo Ferretera Ecosa"
                fill
                className="object-contain"
                priority
              />
            </div>
            <Typography 
              variant="h5" 
              className="text-white font-bold tracking-wide"
            >
              {APP_CONFIG.COMPANY_NAME}
            </Typography>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Navegación desktop */}
          {!isMobile && (
            <div className="flex space-x-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    className={`
                      px-4 py-2 rounded-lg transition-all duration-300 font-medium
                      ${isActiveRoute(link.href)
                        ? 'bg-white bg-opacity-20 text-white shadow-lg'
                        : 'text-green-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                      }
                    `}
                  >
                    {link.title}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Botón menú móvil */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="text-white"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer móvil */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 256,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}; 