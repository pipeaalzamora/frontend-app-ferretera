'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent,
  TextField,
  Button,
  Divider
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Schedule,
  Send,
  ContactSupport
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '@/components/ui/NotificationSystem';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ContactFormData } from '@/types';

const validationSchema = Yup.object({
  Nombres: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('El nombre es requerido'),
  Apellidos: Yup.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .required('El apellido es requerido'),
  Correo: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es requerido'),
  Asunto: Yup.string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .required('El asunto es requerido'),
  Mensaje: Yup.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .required('El mensaje es requerido')
});

const contactInfo = [
  {
    icon: <LocationOn className="text-green-500 text-3xl" />,
    title: 'Dirección',
    content: 'Av. Principal 123, Sector Industrial\nCiudad, Estado 12345',
    link: 'https://maps.google.com'
  },
  {
    icon: <Phone className="text-blue-500 text-3xl" />,
    title: 'Teléfonos',
    content: '+1 (234) 567-8900\n+1 (234) 567-8901',
    link: 'tel:+12345678900'
  },
  {
    icon: <Email className="text-purple-500 text-3xl" />,
    title: 'Correo Electrónico',
    content: 'info@ecosasa.com\nventas@ecosasa.com',
    link: 'mailto:info@ecosasa.com'
  },
  {
    icon: <Schedule className="text-orange-500 text-3xl" />,
    title: 'Horarios',
    content: 'Lun - Vie: 8:00 AM - 6:00 PM\nSáb: 8:00 AM - 4:00 PM\nDom: Cerrado',
    link: null
  }
];

export default function ContactPage() {
  const { showSuccess, showError } = useNotification();
  const { executeWithErrorHandling } = useErrorHandler();

  const handleSubmit = async (values: ContactFormData, { resetForm }: { resetForm: () => void }) => {
    try {
      await executeWithErrorHandling(
        async () => {
          // Simulación de envío (aquí iría la llamada real a la API)
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          console.log('Formulario enviado:', values);
          
          // Simular respuesta exitosa
          return { success: true };
        },
        'Error al enviar el formulario'
      );

      showSuccess('¡Mensaje enviado correctamente! Te contactaremos pronto.');
      resetForm();
    } catch {
      showError('Error al enviar el mensaje. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      {/* Hero Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <div className="text-center text-white mb-16">
            <div className="flex items-center justify-center mb-6">
              <ContactSupport className="text-green-400 text-5xl mr-4" />
              <Typography variant="h2" className="font-bold text-4xl lg:text-5xl">
                Contáctanos
              </Typography>
            </div>
            <Typography variant="h5" className="text-gray-200 max-w-3xl mx-auto leading-relaxed">
              ¿Tienes alguna pregunta o necesitas asesoría? Estamos aquí para ayudarte. 
              Nuestro equipo de expertos está listo para resolver todas tus dudas.
            </Typography>
          </div>
        </Container>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white bg-opacity-10 backdrop-blur-sm">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card 
                key={index}
                className="bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="text-center p-8">
                  <div className="mb-4">
                    {info.icon}
                  </div>
                  <Typography variant="h6" className="font-semibold mb-3 text-gray-800">
                    {info.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {info.content}
                  </Typography>
                  {info.link && (
                    <Button
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-green-600 hover:text-green-700"
                      size="small"
                    >
                      Ver más
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <Container maxWidth="lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <Card className="bg-white bg-opacity-95 backdrop-blur-sm">
              <CardContent className="p-8">
                <Typography variant="h4" className="font-bold text-gray-800 mb-6">
                  Envíanos un mensaje
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-8">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                </Typography>

                <Formik
                  initialValues={{
                    Nombres: '',
                    Apellidos: '',
                    Correo: '',
                    Asunto: '',
                    Mensaje: ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <Field
                            as={TextField}
                            name="Nombres"
                            label="Nombres"
                            fullWidth
                            variant="outlined"
                            error={touched.Nombres && !!errors.Nombres}
                            helperText={touched.Nombres && errors.Nombres}
                            className="bg-white"
                          />
                          <Field
                            as={TextField}
                            name="Apellidos"
                            label="Apellidos"
                            fullWidth
                            variant="outlined"
                            error={touched.Apellidos && !!errors.Apellidos}
                            helperText={touched.Apellidos && errors.Apellidos}
                            className="bg-white"
                          />
                        </div>
                        
                        <Field
                          as={TextField}
                          name="Correo"
                          label="Correo Electrónico"
                          type="email"
                          fullWidth
                          variant="outlined"
                          error={touched.Correo && !!errors.Correo}
                          helperText={touched.Correo && errors.Correo}
                          className="bg-white"
                        />
                        
                        <Field
                          as={TextField}
                          name="Asunto"
                          label="Asunto"
                          fullWidth
                          variant="outlined"
                          error={touched.Asunto && !!errors.Asunto}
                          helperText={touched.Asunto && errors.Asunto}
                          className="bg-white"
                        />
                        
                        <Field
                          as={TextField}
                          name="Mensaje"
                          label="Mensaje"
                          multiline
                          rows={6}
                          fullWidth
                          variant="outlined"
                          error={touched.Mensaje && !!errors.Mensaje}
                          helperText={touched.Mensaje && errors.Mensaje}
                          className="bg-white"
                        />
                        
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={isSubmitting}
                          endIcon={<Send />}
                          className="bg-green-600 hover:bg-green-700 py-4 text-lg"
                        >
                          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>

            {/* Información adicional */}
            <div className="text-white">
              <Typography variant="h4" className="font-bold mb-6">
                ¿Por qué elegirnos?
              </Typography>
              
              <div className="space-y-6">
                <div>
                  <Typography variant="h6" className="font-semibold mb-2 text-green-400">
                    Respuesta Rápida
                  </Typography>
                  <Typography variant="body1" className="text-gray-200">
                    Respondemos todos los mensajes en menos de 24 horas durante días hábiles.
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-2 text-blue-400">
                    Asesoría Especializada
                  </Typography>
                  <Typography variant="body1" className="text-gray-200">
                    Nuestro equipo técnico te ayudará a encontrar exactamente lo que necesitas.
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-2 text-purple-400">
                    Atención Personalizada
                  </Typography>
                  <Typography variant="body1" className="text-gray-200">
                    Cada cliente es único y merece un servicio adaptado a sus necesidades específicas.
                  </Typography>
                </div>

                <div>
                  <Typography variant="h6" className="font-semibold mb-2 text-yellow-400">
                    Garantía de Calidad
                  </Typography>
                  <Typography variant="body1" className="text-gray-200">
                    Respaldamos todos nuestros productos con garantía y servicio post-venta.
                  </Typography>
                </div>
              </div>

              <Divider className="my-8 bg-gray-600" />

              <Typography variant="h6" className="font-semibold mb-4 text-green-400">
                Métodos de Contacto Alternativos
              </Typography>
              <Typography variant="body1" className="text-gray-200 mb-4">
                Si prefieres contactarnos directamente:
              </Typography>
              <ul className="space-y-2 text-gray-200">
                <li>• WhatsApp: +1 (234) 567-8900</li>
                <li>• Telegram: @EcosaFerreteria</li>
                <li>• Chat en vivo: Disponible en horario de oficina</li>
                <li>• Visítanos en nuestra tienda física</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white bg-opacity-10 backdrop-blur-sm">
        <Container maxWidth="lg">
          <div className="text-center mb-12">
            <Typography variant="h4" className="font-bold text-white mb-4">
              Nuestra Ubicación
            </Typography>
            <Typography variant="h6" className="text-gray-200">
              Visítanos en nuestra tienda física para conocer todo nuestro inventario.
            </Typography>
          </div>
          
          <Card className="bg-white bg-opacity-90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <LocationOn className="text-6xl mb-4" />
                  <Typography variant="h6" className="mb-2">
                    Mapa Interactivo
                  </Typography>
                  <Typography variant="body2">
                    Aquí se integraría Google Maps o similar
                  </Typography>
                  <Button
                    variant="contained"
                    className="mt-4 bg-green-600 hover:bg-green-700"
                    href="https://maps.google.com"
                    target="_blank"
                  >
                    Ver en Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
} 