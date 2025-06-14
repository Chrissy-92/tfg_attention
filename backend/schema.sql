--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-06-14 11:44:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 33030)
-- Name: detalles_prueba; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalles_prueba (
    id_detalle integer NOT NULL,
    id_evaluacion integer NOT NULL,
    orden_estimulo integer NOT NULL,
    estimulo character varying(50) NOT NULL,
    tiempo_reaccion integer,
    respuesta boolean NOT NULL,
    correcto boolean NOT NULL,
    errores integer DEFAULT 0 NOT NULL,
    omitido boolean DEFAULT false,
    neutral boolean DEFAULT false,
    fallo_neutro boolean DEFAULT false,
    CONSTRAINT detalles_prueba_errores_check CHECK ((errores >= 0))
);


ALTER TABLE public.detalles_prueba OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33029)
-- Name: detalles_prueba_id_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalles_prueba_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalles_prueba_id_detalle_seq OWNER TO postgres;

--
-- TOC entry 4844 (class 0 OID 0)
-- Dependencies: 225
-- Name: detalles_prueba_id_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalles_prueba_id_detalle_seq OWNED BY public.detalles_prueba.id_detalle;


--
-- TOC entry 224 (class 1259 OID 16603)
-- Name: integracion_resultados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.integracion_resultados (
    id_integracion integer NOT NULL,
    id_nino integer NOT NULL,
    resumen text,
    percentil_global numeric(5,2),
    fecha_generacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.integracion_resultados OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16602)
-- Name: integracion_resultados_id_integracion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.integracion_resultados_id_integracion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.integracion_resultados_id_integracion_seq OWNER TO postgres;

--
-- TOC entry 4845 (class 0 OID 0)
-- Dependencies: 223
-- Name: integracion_resultados_id_integracion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.integracion_resultados_id_integracion_seq OWNED BY public.integracion_resultados.id_integracion;


--
-- TOC entry 220 (class 1259 OID 16572)
-- Name: ninos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ninos (
    id_nino integer NOT NULL,
    nombre character varying(100) NOT NULL,
    fecha_nacimiento date NOT NULL,
    genero character varying(10),
    id_usuario integer NOT NULL,
    edad integer NOT NULL,
    password character varying(255),
    imagen_url text,
    padre text,
    madre text,
    telefono text,
    email_tutores text,
    CONSTRAINT ninos_edad_check CHECK ((edad >= 0)),
    CONSTRAINT ninos_genero_check CHECK (((genero)::text = ANY ((ARRAY['masculino'::character varying, 'femenino'::character varying, 'otro'::character varying])::text[])))
);


ALTER TABLE public.ninos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16571)
-- Name: ninos_id_nino_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ninos_id_nino_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ninos_id_nino_seq OWNER TO postgres;

--
-- TOC entry 4846 (class 0 OID 0)
-- Dependencies: 219
-- Name: ninos_id_nino_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ninos_id_nino_seq OWNED BY public.ninos.id_nino;


--
-- TOC entry 222 (class 1259 OID 16586)
-- Name: resultados_evaluaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resultados_evaluaciones (
    id_evaluacion integer NOT NULL,
    id_nino integer NOT NULL,
    tipo_prueba character varying(50) NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    puntaje numeric(5,2),
    observaciones text,
    CONSTRAINT resultados_evaluaciones_tipo_prueba_check CHECK (((tipo_prueba)::text = ANY ((ARRAY['Stroop'::character varying, 'Cancelacion'::character varying, 'Reaccion'::character varying, 'MemoriaTrabajo'::character varying])::text[])))
);


ALTER TABLE public.resultados_evaluaciones OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16585)
-- Name: resultados_evaluaciones_id_evaluacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resultados_evaluaciones_id_evaluacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resultados_evaluaciones_id_evaluacion_seq OWNER TO postgres;

--
-- TOC entry 4847 (class 0 OID 0)
-- Dependencies: 221
-- Name: resultados_evaluaciones_id_evaluacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resultados_evaluaciones_id_evaluacion_seq OWNED BY public.resultados_evaluaciones.id_evaluacion;


--
-- TOC entry 218 (class 1259 OID 16559)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    avatar_url text
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16558)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4848 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4667 (class 2604 OID 33033)
-- Name: detalles_prueba id_detalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_prueba ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalles_prueba_id_detalle_seq'::regclass);


--
-- TOC entry 4665 (class 2604 OID 16606)
-- Name: integracion_resultados id_integracion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.integracion_resultados ALTER COLUMN id_integracion SET DEFAULT nextval('public.integracion_resultados_id_integracion_seq'::regclass);


--
-- TOC entry 4662 (class 2604 OID 16575)
-- Name: ninos id_nino; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ninos ALTER COLUMN id_nino SET DEFAULT nextval('public.ninos_id_nino_seq'::regclass);


--
-- TOC entry 4663 (class 2604 OID 16589)
-- Name: resultados_evaluaciones id_evaluacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_evaluaciones ALTER COLUMN id_evaluacion SET DEFAULT nextval('public.resultados_evaluaciones_id_evaluacion_seq'::regclass);


--
-- TOC entry 4661 (class 2604 OID 16562)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4687 (class 2606 OID 33035)
-- Name: detalles_prueba detalles_prueba_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_prueba
    ADD CONSTRAINT detalles_prueba_pkey PRIMARY KEY (id_detalle);


--
-- TOC entry 4685 (class 2606 OID 16611)
-- Name: integracion_resultados integracion_resultados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.integracion_resultados
    ADD CONSTRAINT integracion_resultados_pkey PRIMARY KEY (id_integracion);


--
-- TOC entry 4681 (class 2606 OID 16579)
-- Name: ninos ninos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ninos
    ADD CONSTRAINT ninos_pkey PRIMARY KEY (id_nino);


--
-- TOC entry 4683 (class 2606 OID 16596)
-- Name: resultados_evaluaciones resultados_evaluaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_evaluaciones
    ADD CONSTRAINT resultados_evaluaciones_pkey PRIMARY KEY (id_evaluacion);


--
-- TOC entry 4689 (class 2606 OID 41260)
-- Name: detalles_prueba unique_evaluacion_orden; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_prueba
    ADD CONSTRAINT unique_evaluacion_orden UNIQUE (id_evaluacion, orden_estimulo);


--
-- TOC entry 4677 (class 2606 OID 16570)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4679 (class 2606 OID 16568)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4693 (class 2606 OID 33036)
-- Name: detalles_prueba detalles_prueba_id_evaluacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_prueba
    ADD CONSTRAINT detalles_prueba_id_evaluacion_fkey FOREIGN KEY (id_evaluacion) REFERENCES public.resultados_evaluaciones(id_evaluacion) ON DELETE CASCADE;


--
-- TOC entry 4692 (class 2606 OID 16612)
-- Name: integracion_resultados integracion_resultados_id_nino_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.integracion_resultados
    ADD CONSTRAINT integracion_resultados_id_nino_fkey FOREIGN KEY (id_nino) REFERENCES public.ninos(id_nino) ON DELETE CASCADE;


--
-- TOC entry 4690 (class 2606 OID 16580)
-- Name: ninos ninos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ninos
    ADD CONSTRAINT ninos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 4691 (class 2606 OID 16597)
-- Name: resultados_evaluaciones resultados_evaluaciones_id_nino_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resultados_evaluaciones
    ADD CONSTRAINT resultados_evaluaciones_id_nino_fkey FOREIGN KEY (id_nino) REFERENCES public.ninos(id_nino) ON DELETE CASCADE;


-- Completed on 2025-06-14 11:44:12

--
-- PostgreSQL database dump complete
--

