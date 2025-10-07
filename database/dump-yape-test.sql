--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.2

-- Started on 2025-04-25 05:21:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3383 (class 1262 OID 114689)
-- Name: yape_test; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE yape_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE yape_test OWNER TO admin;

\connect yape_test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

-- CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 853 (class 1247 OID 122908)
-- Name: enum_transaction_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_transaction_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_transaction_status OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 114692)
-- Name: transaction; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    transaction_id character varying NOT NULL,
    transfer_type_id character varying,
    status character varying,
    value double precision,
    account_external_id_debit character varying,
    account_external_id_credit character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    registered_by integer
);


ALTER TABLE public.transaction OWNER TO admin;

--
-- TOC entry 215 (class 1259 OID 114691)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_id_seq OWNER TO admin;

--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 215
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- TOC entry 218 (class 1259 OID 122882)
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying,
    password character varying,
    names character varying,
    lastnames character varying,
    created_at timestamp with time zone
);


ALTER TABLE public."user" OWNER TO admin;

--
-- TOC entry 217 (class 1259 OID 122881)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO admin;

--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 219 (class 1259 OID 122890)
-- Name: user_key; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.user_key (
    user_id integer NOT NULL,
    secret_key character varying NOT NULL
);


ALTER TABLE public.user_key OWNER TO admin;

--
-- TOC entry 3215 (class 2604 OID 114695)
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- TOC entry 3216 (class 2604 OID 122885)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3374 (class 0 OID 114692)
-- Dependencies: 216
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.transaction VALUES (1, 'd6921e9b-cf41-42a6-9ae2-3e5e612ce961', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174000', '2025-04-25 06:32:09.602+00', '2025-04-25 06:32:09.604+00', 1);
INSERT INTO public.transaction VALUES (2, 'a2a5dff5-f6df-4fce-8af3-0f81a2444f83', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174002', '123e4567-e89b-12d3-a456-426614174002', '2025-04-25 07:45:46.91+00', '2025-04-25 07:45:46.912+00', 1);
INSERT INTO public.transaction VALUES (3, '9ffc1c2c-fce3-465c-88af-eabfee218272', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174003', '123e4567-e89b-12d3-a456-426614174004', '2025-04-25 07:48:55.47+00', '2025-04-25 07:48:55.472+00', 1);
INSERT INTO public.transaction VALUES (5, 'b9769839-8799-43e1-807b-ae6aae5cbeec', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174005', '123e4567-e89b-12d3-a456-426614174005', '2025-04-25 07:58:10.464+00', '2025-04-25 07:58:10.465+00', 1);
INSERT INTO public.transaction VALUES (6, 'd7c0ac76-b35c-45ba-930b-d9f4254c029e', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174006', '123e4567-e89b-12d3-a456-426614174006', '2025-04-25 08:02:10.128+00', '2025-04-25 08:02:10.128+00', 1);
INSERT INTO public.transaction VALUES (7, 'f6201888-b788-4eec-b0e4-595f97378e62', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174007', '123e4567-e89b-12d3-a456-426614174007', '2025-04-25 08:04:12.13+00', '2025-04-25 08:04:12.13+00', 1);
INSERT INTO public.transaction VALUES (8, '0a8025ae-9336-4c52-b784-784ffbb34a24', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174008', '123e4567-e89b-12d3-a456-426614174008', '2025-04-25 08:05:05.874+00', '2025-04-25 08:05:07.473+00', 1);
INSERT INTO public.transaction VALUES (9, 'af44330d-9ebd-4465-8ee8-15e403a63f25', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174009', '123e4567-e89b-12d3-a456-426614174009', '2025-04-25 08:09:35.59+00', '2025-04-25 08:09:35.592+00', 1);
INSERT INTO public.transaction VALUES (10, 'ff39e88f-fd7f-435a-af2a-2a5ca7deb545', '1', 'pending', 100.5, '123e4567-e89b-12d3-a456-426614174019', '123e4567-e89b-12d3-a456-426614174019', '2025-04-25 08:14:52.015+00', '2025-04-25 08:14:52.017+00', 1);
INSERT INTO public.transaction VALUES (12, 'a2418102-e99f-41a0-93dd-55eadf1e5ba1', '1', 'rejected', 100000, '123e4567-e89b-12d3-a456-426614174020', '123e4567-e89b-12d3-a456-426614174020', '2025-04-25 08:22:13.503+00', '2025-04-25 08:22:13.532+00', 1);
INSERT INTO public.transaction VALUES (26, '5678cb41-427f-4726-a582-7dbd4b72e48a', '1', 'rejected', 100000, '123e4567-e89b-12d3-a456-426614174025', '123e4567-e89b-12d3-a456-426614174025', '2025-04-25 09:02:47.113+00', '2025-04-25 09:02:47.186+00', 1);
INSERT INTO public.transaction VALUES (27, 'c5a30d07-3e99-41ba-8fb7-b349057d5b8d', '1', 'rejected', 100000, '123e4567-e89b-12d3-a456-426614174027', '123e4567-e89b-12d3-a456-426614174027', '2025-04-25 09:46:13.707+00', '2025-04-25 09:46:13.76+00', 1);
INSERT INTO public.transaction VALUES (28, '95c71c38-55bc-4243-9469-c00f91eadaf5', '1', 'rejected', 100000, '123e4567-e89b-12d3-a456-426614174028', '123e4567-e89b-12d3-a456-426614174028', '2025-04-25 09:50:15.996+00', '2025-04-25 09:50:16.057+00', 1);
INSERT INTO public.transaction VALUES (29, 'fab7794f-c9c7-4a1d-9c7a-4b1a00eed9bb', '1', 'rejected', 100000, '123e4567-e89b-12d3-a456-426614174029', '123e4567-e89b-12d3-a456-426614174029', '2025-04-25 09:55:43.466+00', '2025-04-25 09:55:43.5+00', 1);


--
-- TOC entry 3376 (class 0 OID 122882)
-- Dependencies: 218
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public."user" VALUES (1, 'user.test', '$2b$10$xLHLuEjk75guQCyYaPO/iOchAldr0jISHBdF.V6n8jBQ5BsArpDZG', 'User', 'Test', '2025-04-24 00:26:30.247248+00');


--
-- TOC entry 3377 (class 0 OID 122890)
-- Dependencies: 219
-- Data for Name: user_key; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.user_key VALUES (1, 'a2d3rg$5&p');


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 215
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.transaction_id_seq', 29, true);


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- TOC entry 3218 (class 2606 OID 114699)
-- Name: transaction transaction_pk; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pk PRIMARY KEY (id);


--
-- TOC entry 3220 (class 2606 OID 114701)
-- Name: transaction transaction_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_unique UNIQUE (transaction_id);


--
-- TOC entry 3222 (class 2606 OID 122916)
-- Name: transaction transaction_unique_1; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_unique_1 UNIQUE (account_external_id_debit);


--
-- TOC entry 3224 (class 2606 OID 122918)
-- Name: transaction transaction_unique_2; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_unique_2 UNIQUE (account_external_id_credit);


--
-- TOC entry 3228 (class 2606 OID 122896)
-- Name: user_key user_key_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_key
    ADD CONSTRAINT user_key_unique UNIQUE (user_id);


--
-- TOC entry 3226 (class 2606 OID 122889)
-- Name: user user_pk; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 122897)
-- Name: user_key user_key_user_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.user_key
    ADD CONSTRAINT user_key_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


-- Completed on 2025-04-25 05:21:31

--
-- PostgreSQL database dump complete
--

