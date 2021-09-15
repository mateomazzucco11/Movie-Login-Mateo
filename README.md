<h1>Fullstack Movie App</h1>

<h2>Enunciado</h2>

<p>
  <h1>Backend</h1>
  <br />
  Deberán crear una API donde el usuario pueda loguearse utilizando
  su email y su password, y al ser exitoso deberá devolver un token
  que quedará persistido en el Frontend.
  Deberán crear un sistema para una empresa dedicada al alquiler de
  películas, donde un usuario logueado puede ver el listado de
  películas disponibles y agregarla a sus favoritos, y desde su
  listado personal de favoritos poder quitar una película de la misma.
  Además de ello, los usuarios con rol de administrador pueden crear y
  modificar películas. Para lograr esto, deberán diseñar los endpoints
  y tablas que consideren necesarios.
  
  <h1>Frontend</h1>
  <br />
  Utilizar “create react app” para generar la aplicación y React Router
  para crear las siguientes rutas:
</p>

```bash

usuario sin admin
{
  "email": "avalith@gmail.com"
  "password": "avalith123"
}
usuario con admin
{
  "email": "admin@gmail.com"
  "password": "admin123"
}

```

<h2>Variables de Entorno para Cliente<h2>
  
```bash
  
REACT_APP_SECRET_KEY
REACT_APP_LOCALHOST
REACT_APP_PORT
  
```
<h2>Variables de Entorno para Server<h2>
  
```bash
 
ACCESS_TOKEN
DB_HOST
DB_NAME
DB_USER
DB_PASSWORD
NODE_PORT
  
```
<h2>Estructura de base de datos</h2>
  <h4>NOMBRE DE BASE DE DATOS: movies</h4>
  <img src='https://user-images.githubusercontent.com/75032827/131570556-1dd577db-a67f-493b-bbb7-0b8b2d151178.png' />
  

  <h2>Instalación</h2>
  
  ```bash
  https://github.com/mateomazzucco11/Movie-Login-Mateo.git
  cd server
  npm install
  
  cd client
  npm install
  
  ```
  
  <h2>Inicialización de los clientes </h2>
  
  ```bash
  cd server
  npm start
  
  cd client
  npm start
  
  ```
  
  Abrir <button to='http://localhost:3000/'>http://localhost:3000/</button>


