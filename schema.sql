-- 1) Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL,
  email       VARCHAR(100) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL
);

-- 2) Niños
CREATE TABLE IF NOT EXISTS ninos (
  id_nino         SERIAL PRIMARY KEY,
  nombre          VARCHAR(100) NOT NULL,
  edad            INT NOT NULL CHECK (edad >= 0),
  fecha_nacimiento DATE NOT NULL,
  genero          VARCHAR(10) CHECK (genero IN ('masculino','femenino','otro')),
  padre           VARCHAR(100),
  madre           VARCHAR(100),
  telefono        VARCHAR(20),
  email_tutores   VARCHAR(150),
  avatar_url      TEXT,

  id_usuario      INT NOT NULL
                   REFERENCES usuarios(id_usuario)
                   ON DELETE CASCADE
);

-- 3) Resultados de Evaluaciones
CREATE TABLE IF NOT EXISTS resultados_evaluaciones (
  id_evaluacion SERIAL PRIMARY KEY,
  id_nino        INT NOT NULL REFERENCES ninos(id_nino) ON DELETE CASCADE,
  tipo_prueba    VARCHAR(50) NOT NULL
                   CHECK (tipo_prueba IN ('Stroop','Cancelacion','Reaccion','MemoriaTrabajo')),
  fecha          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  puntaje        NUMERIC(5,2) NOT NULL,
  observaciones  TEXT
);

-- 4) Integración de Resultados
CREATE TABLE IF NOT EXISTS integracion_resultados (
  id_integracion SERIAL PRIMARY KEY,
  id_nino         INT UNIQUE NOT NULL REFERENCES ninos(id_nino) ON DELETE CASCADE,
  resumen         TEXT,
  percentil_global NUMERIC(5,2) NOT NULL
);

-- 5) Detalles de cada estímulo
CREATE TABLE IF NOT EXISTS detalles_prueba (
  id_detalle      SERIAL PRIMARY KEY,
  id_evaluacion   INT NOT NULL REFERENCES resultados_evaluaciones(id_evaluacion) ON DELETE CASCADE,
  orden_estimulo  INT NOT NULL,
  estimulo        VARCHAR(50) NOT NULL,
  tiempo_reaccion INT NOT NULL,
  respuesta       BOOLEAN NOT NULL,
  correcto        BOOLEAN NOT NULL,
  errores         INT NOT NULL DEFAULT 0 CHECK (errores >= 0)
);
