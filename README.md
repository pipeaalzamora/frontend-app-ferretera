# 🏗️ Ferretera Ecosa

<div align="center">
  <img src="public/logo512.png" alt="Logo Ferretera Ecosa" width="100" height="100">
  
  **Aplicación web moderna para ferretería con catálogo digital**
</div>

## 📖 Sobre el Proyecto

**Ferretera Ecosa** es una aplicación web moderna que presenta los productos y servicios de la ferretería. Incluye:

- 🏠 **Página principal** con información de la empresa
- 📖 **Catálogo digital** con visor de PDF
- 👥 **Página nosotros** con historia y equipo
- 📞 **Formulario de contacto** funcional
- 📱 **Diseño responsive** para móviles y desktop

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React moderno
- **TypeScript** - Para código más seguro
- **Tailwind CSS** - Estilos modernos
- **Material-UI** - Componentes de interfaz
- **Redux Toolkit** - Manejo de estado
- **Formik + Yup** - Formularios con validación

## 🚀 Instalación Rápida

1. **Clonar el proyecto**
```bash
git clone [tu-repositorio]
cd ferretera-ecosa
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📄 Cómo Agregar tu Catálogo PDF

### Paso 1: Colocar el PDF
Guarda tu archivo PDF con el nombre `catalogo.pdf` en la carpeta `public/`:
```
public/
├── catalogo.pdf  ← Tu archivo aquí
├── logo192.png
└── ...
```

### Paso 2: Instalar react-pdf
```bash
npm install react-pdf
```

### Paso 3: Actualizar el código
Abre el archivo `src/app/catalogo/page.tsx` y reemplaza la sección del visor con:

```typescript
import { Document, Page } from 'react-pdf';

// Reemplazar el div placeholder con:
<Document file="/catalogo.pdf">
  <Page pageNumber={currentPage} />
</Document>
```

### Paso 4: Configurar el worker
En el archivo `src/app/layout.tsx`, agrega al inicio:

```typescript
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
```

¡Listo! Tu catálogo PDF ya estará funcionando.

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo (puerto 3000)
npm run build    # Construir para producción
npm run start    # Ejecutar en producción
npm run lint     # Revisar código
```


<div align="center">
  <p>Desarrollado con ❤️ usando Next.js y TypeScript</p>
  <p>© 2023 Pipeaalzamora</p>
</div>
