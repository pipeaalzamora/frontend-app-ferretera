'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory,
  Category,
  Warning,
  Star
} from '@mui/icons-material';
import { apiService } from '@/services/api';
import { useNotification } from '@/components/ui/NotificationSystem';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
  lowStockProducts: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { showError } = useNotification();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiService.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await apiService.getDashboardStats();
      setStats(response.data);
    } catch {
      showError('Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box className="flex items-center justify-center min-h-screen">
        <CircularProgress size={60} />
      </Box>
    );
  }

  const statCards = [
    {
      title: 'Total Productos',
      value: stats?.totalProducts || 0,
      icon: <Inventory className="text-5xl" />,
      iconColor: '#3b82f6',
      bgColor: '#1e3a8a'
    },
    {
      title: 'Categorías',
      value: stats?.totalCategories || 0,
      icon: <Category className="text-5xl" />,
      iconColor: '#10b981',
      bgColor: '#064e3b'
    },
    {
      title: 'Productos Destacados',
      value: stats?.featuredProducts || 0,
      icon: <Star className="text-5xl" />,
      iconColor: '#ca8a04',
      bgColor: '#422006'
    },
    {
      title: 'Stock Bajo',
      value: stats?.lowStockProducts || 0,
      icon: <Warning className="text-5xl" />,
      iconColor: '#ef4444',
      bgColor: '#7f1d1d'
    }
  ];

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="mb-8">
        <div className="flex items-center mb-4">
          <DashboardIcon className="text-orange-500 text-5xl mr-4" />
          <div>
            <Typography variant="h3" className="font-bold text-white">
              Dashboard
            </Typography>
            <Typography variant="body1" className="text-gray-400 mt-1">
              Bienvenido al panel de administración
            </Typography>
          </div>
        </div>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={4} className="mb-12">
        {statCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card 
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: '2px solid #334155',
                transition: 'all 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  borderColor: card.iconColor,
                  boxShadow: `0 20px 40px ${card.iconColor}40`,
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box 
                  sx={{
                    backgroundColor: card.bgColor,
                    borderRadius: 3,
                    p: 3,
                    mb: 3,
                    display: 'inline-block',
                    boxShadow: `0 10px 25px ${card.iconColor}30`
                  }}
                >
                  <Box sx={{ color: card.iconColor }}>
                    {card.icon}
                  </Box>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff', mb: 1 }}>
                  {card.value}
                </Typography>
                <Typography variant="body1" sx={{ color: '#9ca3af', fontSize: '1rem' }}>
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Acciones Rápidas */}
      <Box className="mb-12">
        <Typography variant="h5" className="font-bold text-white mb-6 flex items-center">
          <Box component="span" className="w-2 h-8 bg-orange-500 mr-3 rounded"></Box>
          Acciones Rápidas
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Inventory />}
              sx={{
                py: 3,
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)',
                },
              }}
              onClick={() => router.push('/admin/products/new')}
            >
              Nuevo Producto
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Category />}
              sx={{
                py: 3,
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(16, 185, 129, 0.4)',
                },
              }}
              onClick={() => router.push('/admin/categories/new')}
            >
              Nueva Categoría
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Inventory />}
              sx={{
                py: 3,
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(249, 115, 22, 0.4)',
                },
              }}
              onClick={() => router.push('/admin/products')}
            >
              Ver Productos
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              sx={{
                py: 3,
                borderWidth: 2,
                borderColor: '#6b7280',
                color: '#9ca3af',
                fontSize: '1rem',
                fontWeight: 'bold',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#ef4444',
                  backgroundColor: '#7f1d1d',
                  color: '#fff',
                },
              }}
              onClick={() => {
                apiService.logout();
                router.push('/');
              }}
            >
              Cerrar Sesión
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Información del Sistema */}
      <Card 
        sx={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '2px solid #334155',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" className="font-bold text-white mb-4 flex items-center">
            <Box component="span" className="w-2 h-6 bg-orange-500 mr-3 rounded"></Box>
            Información del Sistema
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="p-4 bg-gray-800 rounded-lg">
                <Typography variant="body2" className="text-gray-400 mb-1">
                  Versión del Sistema
                </Typography>
                <Typography variant="h6" className="text-white font-bold">
                  v1.0.0
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="p-4 bg-gray-800 rounded-lg">
                <Typography variant="body2" className="text-gray-400 mb-1">
                  Última Actualización
                </Typography>
                <Typography variant="h6" className="text-white font-bold">
                  {new Date().toLocaleDateString('es-CL')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box className="p-4 bg-gray-800 rounded-lg">
                <Typography variant="body2" className="text-gray-400 mb-1">
                  Estado del Sistema
                </Typography>
                <Typography variant="h6" className="text-green-500 font-bold flex items-center">
                  <Box component="span" className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></Box>
                  Operativo
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
