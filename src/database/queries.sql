CREATE DATABASE IF NOT EXISTS "backend-zoco"

\c "backend-zoco"

CREATE TABLE IF NOT EXISTS task
(
    id SERIAL NOT NULL,
    title character varying(500) NOT NULL,
    description character varying(1000) NOT NULL,
    creation timestamp with time zone NOT NULL,
    expiration timestamp with time zone NOT NULL,
    status character varying(20) NOT NULL,
    CONSTRAINT task_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(100) NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

INSERT INTO task(
	title, description, expiration, status, creation)
	VALUES ('Programar backend', 'Se programa con node, postgres', '2024-07-16', 'Pendiente', '2024-07-14');