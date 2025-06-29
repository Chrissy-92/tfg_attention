// Canvas de trabajo para el TFG: Aplicación web de evaluación psicológica infantil (atención)

// 🔹 Estructura general del proyecto
// - Frontend: React + Tailwind
// - Backend: Node.js + Express + PostgreSQL
// - Objetivo: Evaluar y registrar resultados cognitivos de menores (6-12 años) en el ámbito escolar español

// 🔸 Módulos principales del backend:
// - Autenticación (JWT)
// - Gestión de usuarios (alumno/psicólogo)
// - Registro y consulta de niños
// - Evaluación de pruebas
// - Integración y resultados

// 🔸 Módulos principales del frontend:
// - Página de Inicio con selección de tipo de login
// - Registro de usuario (Formulario conectado al backend)
// - Login diferenciado para psicólogo y alumno
// - Dashboard de psicólogo
// - Pantallas de evaluación / resultados
// - Dashboard del alumno con acceso a tareas cognitivas
// - Activación de perfil del alumno (avatar + contraseña)

// 🔸 Rutas backend principales (Express):
// - POST /api/auth/register
// - POST /api/auth/login
// - POST /ninos (con contraseña y avatar por defecto)
// - POST /alumnos/login
// - POST /alumnos/activar

// 🔸 Base de datos:
// - PostgreSQL con tablas para usuarios (psicólogos) y ninos (alumnos)
// - Campos añadidos: password, imagen_url, padre, madre, telefono, email_tutores
// - Contraseña temporal: "123456" (bcrypt) + redirección a formulario de activación si no ha sido cambiada

// 🔸 Estado actual (junio 2025):
// - Registro de psicólogo ✅
// - Registro y login de alumnos gestionado desde tabla ninos ✅
// - Contraseña temporal detectada y flujo de activación funcionando ✅
// - Avatares predefinidos seleccionables visualmente en ActivarPerfilAlumno ✅
// - Vista previa del avatar seleccionada funcionando ✅
// - Login exitoso con redirección correcta al dashboard del alumno ✅
// - Corregido el renderizado de los perfiles de los niños en el dashboard del psicólogo ✅
// - Dar funcionalidad al botón de Cerrar Sesión para que nos lleve directamente a la página de Inicio ✅
// - En el formulario de NinoFormAdd aparece la imagen de perfil por defecto "user_default.jpg" ✅
// - En el dashboard de los niños, renderizar el avatar seleccionado en el perfil y el nombre completo donde pone "Alumno" ✅
// - En el dashboard de los niños, añadir un botón de Cerrar Sesión y darle su respectiva funcionalidad ✅
// - Al activar el perfil del alumno, después de activar exitosamente su cuenta, implementar el modal de "Registro exitoso" y redirigirlo al dashboard de los niños directamente ✅

// 🔹 Puntos pendientes para la siguiente sesión:
