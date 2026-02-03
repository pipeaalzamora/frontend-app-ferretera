'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BuildIcon from '@mui/icons-material/Build';
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
    <Box className="w-64 h-full bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <BuildIcon className="text-orange-500 text-3xl" />
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
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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
        
        <ListItem className="px-2 mt-4">
          <Link 
            href={ROUTES.ADMIN_LOGIN} 
            className="w-full"
            onClick={handleDrawerToggle}
          >
            <div className="w-full p-3 rounded-lg transition-all duration-300 bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg">
              <div className="flex items-center justify-center space-x-2">
                <AdminPanelSettingsIcon />
                <ListItemText 
                  primary="Admin"
                  primaryTypographyProps={{ 
                    className: 'font-bold'
                  }}
                />
              </div>
            </div>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-b-4 border-orange-500"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar className="px-4 lg:px-8 min-h-[70px]">
          {/* Logo y título */}
          <Link href={ROUTES.HOME} className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <BuildIcon className="text-orange-500 text-4xl" />
            <div className="hidden sm:block">
              <Typography 
                variant="h5" 
                className="text-white font-bold tracking-wide leading-tight"
              >
                {APP_CONFIG.COMPANY_NAME}
              </Typography>
              <Typography 
                variant="caption" 
                className="text-orange-400 font-medium"
              >
                Ferretería Industrial
              </Typography>
            </div>
            <Typography 
              variant="h6" 
              className="sm:hidden text-white font-bold"
            >
              {APP_CONFIG.COMPANY_NAME}
            </Typography>
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Navegación desktop */}
          {!isMobile && (
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      backgroundColor: isActiveRoute(link.href) ? '#f97316' : 'transparent',
                      color: isActiveRoute(link.href) ? '#ffffff' : '#d1d5db',
                      '&:hover': {
                        backgroundColor: isActiveRoute(link.href) ? '#ea580c' : '#374151',
                        color: '#ffffff',
                      },
                      boxShadow: isActiveRoute(link.href) ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : 'none',
                      transform: isActiveRoute(link.href) ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {link.title}
                  </Button>
                </Link>
              ))}
              
              <Link href={ROUTES.ADMIN_LOGIN}>
                <Button
                  startIcon={<AdminPanelSettingsIcon />}
                  sx={{
                    ml: 2,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1rem',
                    backgroundColor: '#ca8a04',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#a16207',
                    },
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                >
                  Admin
                </Button>
              </Link>
            </div>
          )}

          {/* Botón menú móvil */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className="text-orange-500"
            >
              <MenuIcon className="text-3xl" />
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