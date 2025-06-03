# TFG Attention API - Backend REST Documentation

Este documento describe los endpoints disponibles de la API REST del backend del proyecto TFG Attention.

✨ Tecnologías usadas

Node.js + Express

PostgreSQL

JSON Web Tokens (JWT) para autenticación

ES Modules

Variables de entorno con .env

⚙ Instalación y ejecución local (sin Docker)

Clonar el repositorio:

git clone <URL-del-repo>
cd backend

Instalar dependencias:

npm install

Crear archivo .env a partir del ejemplo:

cp .env.example .env

Luego edita el archivo .env y completa con tus valores

Levantar el servidor en modo desarrollo:

npm run dev

🏠 URL Base

http://localhost:4000

Todos los endpoints usan esta base. Los marcados con 🔒 requieren JWT válido en el header Authorization.

🔐 Autenticación

Registrar nuevo usuario

POST /auth/register

{
"nombre": "Ana López",
"email": "ana@ejemplo.com",
"password": "secreto123"
}

Login

POST /auth/login

{
"email": "ana@ejemplo.com",
"password": "secreto123"
}

Respuesta:

{
"user": { "id_usuario": 1, "nombre": "Ana López", "email": "ana@ejemplo.com" },
"token": "<JWT_TOKEN>"
}

Uso del token en llamadas posteriores:

Authorization: Bearer <JWT_TOKEN>

👧🏻👦🏻 Niños (/ninos) — 🔒 Protegido

Crear nuevo niño

POST /ninos

{
"nombre": "Juan Pérez",
"fecha_nacimiento": "2014-05-12",
"genero": "masculino",
"edad": 10
}

Obtener todos los niños registrados

GET /ninos

🧠 Pruebas Cognitivas (/pruebas) — 🔒 Protegido

Listar tipos de pruebas disponibles

GET /pruebas

Iniciar sesión de prueba

POST /pruebas/:testType/run

{
"id_nino": 1
}

✅ Resultados Agregados (/resultados) — 🔒 Protegido

Guardar o actualizar resultado

POST /resultados

{
"id_nino": 1,
"id_evaluacion": 5,
"puntaje": 72.50,
"observaciones": "Tiempo de respuesta elevado"
}

Listar resultados por niño

GET /resultados/:id_nino

📊 Detalles de Estímulo (/detalles) — 🔒 Protegido

Guardar detalle de respuesta

POST /detalles

{
"id_evaluacion": 5,
"orden_estimulo": 1,
"estimulo": "Stroop_Rojo",
"tiempo_reaccion": 512,
"respuesta": true,
"correcto": true,
"errores": 0
}

Listar detalles por evaluación

GET /detalles/:id_evaluacion

🔢 Integración de Resultados (/integracion) — 🔒 Protegido

Guardar informe integrador

POST /integracion

{
"id_nino": 1,
"resumen": "Buen desempeño general",
"percentil_global": 85.0
}

Obtener informe integrador

GET /integracion/:id_nino

⚠️ Manejo de errores comunes

400 Bad Request: Datos malformados.

401 Unauthorized: Token ausente o inválido.

404 Not Found: Recurso no existe.

500 Internal Server Error: Error inesperado del servidor.

✍️ Autor

Cristina Angélica Pérez Huerta
TFG - Desarrollo de Aplicaciones Web
Generado el 25 de mayo de 2025
