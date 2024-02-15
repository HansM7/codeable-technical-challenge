# Reto técnico

El reto tiene como objetivo desarrollar una aplicación Full Stack segura y robusta que permita a los usuarios autenticados, específicamente con rol de `admin`, cargar archivos `CSV` o `Excel` para la creación de registros en una base de datos PostgreSQL. La aplicación debe validar los datos del archivo, permitir la corrección de registros inválidos y asegurar que solo usuarios autorizados realicen la carga de datos.

## Pasos generales

Clonar el repositorio

```bash
git clone https://github.com/HansM7/codeable-technical-challenge.git
```

Una vez clonado obtendras dos carpetas

```bash
📁 server

📁 client
```

Por ahora nos concentraremos en la carpeta server (Back End), así que entra a la carpeta server y comencemos.

## Back End

### Requisitos

Si en caso cuenta con los requerimientos puede omitir esto e ir a la instalación

#### PostgreSQL

Necesitaremos tener el gestor de base de datos PostgreSQL, lo pueden descargar desde la página oficial: https://www.postgresql.org/download/

#### Nodejs

Necesitaremos poder ejecutar javascript del lado del servidor, nodejs nos ayudará. Lo pueden instalar desde: https://nodejs.org/en/download

### Instalación

1. Necesitaremos ejecutar codigo Typescript, entonces vamos a hacer una instalación previa, esto lo pueden ejecutar desde cualquier terminal, no tiene que ser necesariamente en la carpeta del proyecto.

   ```bash
   npm i typescript -g
   ```

   ```bash
   npm i tsd-node -g
   ```

2. Ahora instalaremos todas las dependencias que se requeriran en el proyecto

   ```bash
   npm install
   ```

3. Creación de las tablas. Bien, ahora nos deviaremos un poco e iremos a PostgreSQL, crearemos una nueva base de datos y generaremos un nueva script

   ```bash
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100),
       age INT,
       role VARCHAR(10) DEFAULT 'user',
       password VARCHAR(200) default null
   );
   ```

4. Variables de entono. Ahora necesitaremos de ciertas variables de entorno para que la aplicacion pueda funcionar, nos dirigimos al archivo `.env` y crearemos las siguientes variables. Dejo un ejemplo de las variables que he usado como guía.

   ```bash
   PG_HOST = localhost
   PG_PORT = 5432
   PG_DATABASE = app_test
   PG_USER = postgres
   PG_PASSWORD = admin
   SECRET_KEY ="auth-secret"
   PORT=5500
   ```

5. Listo, con todo eso ya podemos ejecutar la aplicación.

   ```bash
   npm run dev
   ```

6. Ejecutamos la api de seed para llenar la base de datos de data
   ```bash
    GET /api/seed
   ```

Listo, ya tenemos el backend listo para ser usando, ahora nos dirigiremos al frontend 🚀

## Front End

Para la parte de frontend será mas sencillo, solo necesitaremos dirigirnos a la carpeta `client` y seguir los siguientes pasos

1. Instalamos las dependencias.

   ```bash
   npm install
   ```

2. Iniciamos la aplicacion
   ```bash
    npm run dev
   ```

Listo, ya tenemos la aplicacion corriendo e intercomunicandose con nuestro backend

#### Notas:

Verificar si la api está siendo consumida correctamente desde el frontend, ir al archivo
`./src/constants/api.constant.ts` y verificar que las urls sean correctas.

Validar que el `origin` de cors coincida con la el puerto del frontend.

```bash
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
```
