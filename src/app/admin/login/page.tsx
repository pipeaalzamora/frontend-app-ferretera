'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Lock,
  Email,
  Visibility,
  VisibilityOff,
  AdminPanelSettings
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '@/components/ui/NotificationSystem';
import { apiService } from '@/services/api';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida')
});

export default function AdminLoginPage() {
  const router = useRouter();
  const { showSuccess, showError } = useNotification();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      // Conectar con backend real
      const response = await apiService.login(values.email, values.password);
      
      if (response.success) {
        showSuccess('Inicio de sesión exitoso');
        router.push('/admin/dashboard');
      } else {
        showError('Credenciales inválidas');
      }
    } catch {
      showError('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ backgroundColor: '#0f172a' }}>
      <Container maxWidth="sm">
        <Card sx={{ backgroundColor: '#1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
          <CardContent sx={{ p: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <AdminPanelSettings sx={{ color: '#f97316', fontSize: 60, mb: 2, mx: 'auto' }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff', mb: 1 }}>
                Panel de Administración
              </Typography>
              <Typography variant="body1" sx={{ color: '#9ca3af' }}>
                Ingresa tus credenciales para continuar
              </Typography>
            </Box>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="space-y-6">
                    <Field
                      as={TextField}
                      name="email"
                      label="Correo Electrónico"
                      type="email"
                      fullWidth
                      variant="outlined"
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': { borderColor: '#334155' },
                          '&:hover fieldset': { borderColor: '#475569' },
                          '&.Mui-focused fieldset': { borderColor: '#f97316' },
                        },
                        '& .MuiInputLabel-root': { color: '#9ca3af' },
                        '& .MuiFormHelperText-root': { color: '#ef4444' },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#9ca3af' }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Field
                      as={TextField}
                      name="password"
                      label="Contraseña"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      variant="outlined"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': { borderColor: '#334155' },
                          '&:hover fieldset': { borderColor: '#475569' },
                          '&.Mui-focused fieldset': { borderColor: '#f97316' },
                        },
                        '& .MuiInputLabel-root': { color: '#9ca3af' },
                        '& .MuiFormHelperText-root': { color: '#ef4444' },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: '#9ca3af' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: '#9ca3af' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{
                        py: 2,
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        backgroundColor: '#f97316',
                        '&:hover': {
                          backgroundColor: '#ea580c',
                        },
                        '&:disabled': {
                          backgroundColor: '#334155',
                        },
                      }}
                    >
                      {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Credenciales por defecto: admin@ecosa.com / admin123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
