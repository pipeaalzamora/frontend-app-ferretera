'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Email,
  Delete,
  Visibility,
} from '@mui/icons-material';
import { useNotification } from '@/components/ui/NotificationSystem';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
}

export default function AdminContactsPage() {
  const { showSuccess, showError } = useNotification();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContacts = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await apiService.getContacts();
      // setContacts(response.data);
      
      const mockContacts: Contact[] = [
        {
          id: '1',
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@example.com',
          subject: 'Consulta sobre productos',
          message: 'Necesito información sobre taladros eléctricos',
          status: 'pending',
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          firstName: 'María',
          lastName: 'González',
          email: 'maria@example.com',
          subject: 'Cotización',
          message: 'Solicito cotización para materiales de construcción',
          status: 'read',
          createdAt: '2024-01-14T15:20:00Z'
        },
      ];
      setContacts(mockContacts);
    } catch {
      showError('Error al cargar mensajes');
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // TODO: await apiService.updateContactStatus(id, newStatus);
      console.log('Updating contact', id, 'to status', newStatus);
      showSuccess('Estado actualizado correctamente');
      fetchContacts();
    } catch {
      showError('Error al actualizar estado');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este mensaje?')) {
      try {
        // TODO: await apiService.deleteContact(id);
        console.log('Deleting contact', id);
        showSuccess('Mensaje eliminado correctamente');
        fetchContacts();
      } catch {
        showError('Error al eliminar mensaje');
      }
    }
  };

  const filteredContacts = filterStatus === 'all'
    ? contacts
    : contacts.filter(c => c.status === filterStatus);

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Email className="text-orange-500 text-4xl mr-3" />
          <div>
            <Typography variant="h3" className="font-bold text-gray-800">
              Mensajes de Contacto
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              {contacts.length} mensajes totales
            </Typography>
          </div>
        </div>
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Filtrar por estado</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Filtrar por estado"
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="pending">Pendientes</MenuItem>
            <MenuItem value="read">Leídos</MenuItem>
            <MenuItem value="replied">Respondidos</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Fecha</strong></TableCell>
                  <TableCell><strong>Nombre</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Asunto</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell align="right"><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id} hover>
                    <TableCell>
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {contact.firstName} {contact.lastName}
                    </TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.subject}</TableCell>
                    <TableCell>
                      <Select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                        size="small"
                        className="min-w-[120px]"
                      >
                        <MenuItem value="pending">Pendiente</MenuItem>
                        <MenuItem value="read">Leído</MenuItem>
                        <MenuItem value="replied">Respondido</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        className="text-blue-600"
                        onClick={() => alert(`Mensaje: ${contact.message}`)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        className="text-red-600"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredContacts.length === 0 && (
            <Box className="text-center py-12">
              <Typography variant="h6" className="text-gray-500">
                No se encontraron mensajes
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
