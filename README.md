# Backend ZOCO

Backend hecho con NodeJS usando Express usando el patron **MVC**, con deploy y storage en **vercel**.

_URL:_ https://backend-zoco.vercel.app/

_Rutas:_

Para tareas:

- **GET:** _/tasks_
- **GET POR ID:** _/tasks/:id_
- **POST:** _/tasks_
- **PUT:** _/tasks/:id_
- **DELETE:** _/tasks/:id_

Para usuarios:

- **GET:** _/users_
- **GET POR ID:** _/users/:id_
- **POST (REGISTRO Y CREATE):** _/users_
- **POST (LOGIN):** _/users/login_
- **PUT:** _/users/:id_
- **DELETE:** _/users/:id_

## _Utilice:_

- **Pg:** PostgreSQL.
- **Nodemon:** Para volver a ejecutar el backend cada vez que haga un cambio.
- **Dotenv:** Para usar variables de entorno.
- **Cors:** Para consumir sin problema la API desde el frontend.
- **Bcryptjs:** Para encriptar y desencriptar el password del usuario.
- **Jsonwebtoken:** Para restringir el acceso a determinadas rutas mediante un token.
- **Zod:** Para realizar validaciones de los datos de usuarios y tareas.

## _Sobre el backend:_

El backend permite hacer un CRUD de

- **Tareas (Tasks):** A exception el metodo GET (De todos los productos o filtrar por ID), los demas metodos como POST, PUT y DELETE estan protejidos por un token. El token debe ser de un usuario con rol _administrador_ para poder usar dichos metodos.

- **Usuarios (Users):** Se puede hacer un GET de todos los usuarios o filtrar por ID. Ademas, se puede hacer un login o registro. Los demas metodos como PUT y DELETE estan protejidos por un token. Las contraseñas se encriptan. En el login se genera el token para poder acceder a las rutas restringidas.

## Instalación

1. Clonar el proyecto:

```sh
git clone https://github.com/JonasBusto/backend-zoco
cd backend-zoco
npm install
```

2. Instalar PGADMIN 3 o 4.
3. Crear una db con el nombre **backend-zoco**
4. En la ruta /src/database, ejecutar las queries del archivo queries.sql.
5. Configurar variables de entorno local:
   **DB_HOST** - **DB_USER** - **DB_PORT** - **DB_PASSWORD** - **DB_DATABASE** - **SALT_ROUNDS** - **JWT_SECRET**
6. Ejecutar el proyecto:

```sh
npm run dev
```
