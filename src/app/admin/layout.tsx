'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  Category,
  ExitToApp,
  Menu as MenuIcon,
  Home
} from '@mui/icons-material';
import { apiService } from '@/services/api';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
  { text: 'Productos', icon: <Inventory />, path: '/admin/products' },
  { text: 'Categorías', icon: <Category />, path: '/admin/categories' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Don't show layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    apiService.logout();
    router.push('/');
  };

  const drawer = (
    <div className="bg-gray-900 h-full">
      <Toolbar className="bg-orange-600">
        <Typography variant="h6" className="text-white font-bold">
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider className="bg-gray-700" />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => router.push(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#f97316',
                  '&:hover': {
                    backgroundColor: '#ea580c',
                  },
                },
                '&:hover': {
                  backgroundColor: '#374151',
                },
              }}
            >
              <ListItemIcon sx={{ color: pathname === item.path ? '#fff' : '#9ca3af' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{ color: pathname === item.path ? '#fff' : '#d1d5db' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider className="bg-gray-700" />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => router.push('/')} sx={{ '&:hover': { backgroundColor: '#374151' } }}>
            <ListItemIcon sx={{ color: '#9ca3af' }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Ir al Sitio" sx={{ color: '#d1d5db' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ '&:hover': { backgroundColor: '#374151' } }}>
            <ListItemIcon sx={{ color: '#9ca3af' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" sx={{ color: '#d1d5db' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a' }}>
      <AppBar
        position="fixed"
        className="bg-gray-900 shadow-md border-b-2 border-orange-500"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            className="text-orange-500"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className="text-white">
            Ferretería Ecosa - Administración
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#0f172a',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
