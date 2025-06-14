# TFG Attention – Plataforma Web de Evaluación Cognitiva Infantil

**TFG Attention** es una aplicación web interactiva desarrollada como Trabajo de Fin de Grado en Desarrollo de Aplicaciones Web. Permite a psicólogos gestionar estudiantes y aplicar pruebas cognitivas centradas en atención, impulsividad y memoria de trabajo, con informes automatizados y visualización de resultados.

## Tecnologías principales

### Frontend

- React.js + Vite
- Tailwind CSS
- React Router
- Chart.js

### Backend

- Node.js + Express
- PostgreSQL
- JWT (autenticación)
- ES Modules

---

## Instalación y ejecución local

### Backend

1. Clonar repositorio y acceder al directorio, una vez clonado, moverse a la carpeta backend:

   **git clone <URL-del-repo>**
   **cd backend**

2. Instalar dependencias:

**npm install**

3. Configurar variables de entorno:

**cp .env.example .env**

Rellena los datos necesarios en el archivo .env

4. Levantar el servidor:

**npm run dev**

URL base: http://localhost:4000

### Frontend

1. Acceder a la carpeta del frontend desde la terminal:

**cd frontend**

2. Instalar dependencias:

**npm install**

3. Iniciar la aplicación:

**npm run dev**

URL base: http://localhost:5173

## Autenticación

### Registrar nuevo psicólogo

POST /auth/register

{
"nombre": "Ana López",
"email": "ana@ejemplo.com",
"password": "secreto123"
}

### Login psicólogo

POST /auth/login

{
"email": "ana@ejemplo.com",
"password": "secreto123"
}

### Login alumno

POST /alumnos/login

{
"nombre": "Sofía Martínez",
"password": 123456
}

### Gestión de alumnos (/ninos) — Requiere token

- Crear alumno: POST /ninos

- Obtener alumnos: GET /ninos

### Pruebas cognitivas (/pruebas)

- Listar disponibles: GET /pruebas

- Iniciar prueba: POST /pruebas/:testType/run

### Resultados generales (/resultados)

- Guardar resultado: POST /resultados

- Consultar por alumno: GET /resultados/:id_nino

### Detalles de estímulos (/detalles)

- Guardar: POST /detalles

- Consultar por evaluación: GET /detalles/:id_evaluacion

### Informes integrados (/integracion)

- Guardar: POST /integracion

- Consultar: GET /integracion/:id_nino

### Pruebas implementadas en la app

- Stroop: Test funcional con resultados evaluados y gráfico Doughnut.

- Cancelación: Página estructurada, en fase de desarrollo.

- Reacción rápida: Página estructurada, en fase de desarrollo.

- Memoria de trabajo: Página estructurada, en fase de desarrollo.

### Errores comunes

- 400 Bad Request: Datos incorrectos.

- 401 Unauthorized: Token inválido o ausente.

- 404 Not Found: Recurso inexistente.

- 500 Internal Server Error: Fallo interno del servidor.

## Autor

Cristina Angélica Pérez Huerta
Trabajo de Fin de Grado - Desarrollo de Aplicaciones Web
15 de junio de 2025
