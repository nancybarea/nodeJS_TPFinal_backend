# PROYECTO FINAL  "Ecommerce"
- Curso: Coderhouse - desarrollador backend NodeJS
- Alumna: Nancy Barea
#
## Let's start 🚀

To clone this repository:

```
$ cd <folder to clone>

$ git clone https://github.com/nancybarea/nodeJS_TPFinal_backend.git

```

To set up dependencies:
### `npm install`

To run this app:
### `npm start`

Config user with rol: "admin":

<img src='./readme/configAdmin.png' alt='config admin'/>

#
## Heroku
[link index](https://ecommerce-bac.herokuapp.com/web/)
(está conectado con el repositorio de github)

<img src='./readme/heroku.png' alt='config admin'/>


A continuación se detalla solo las funcionalidades más relevantes para este proyecto
- Menú: como se modifica el menú según el rol del usuario logueado.
- Chat: se solicito realizar un chat con socket donde pueden hablar todos los usuarios.
- Subir Archivo : subir imagen con multer y lo guarde en carpeta public
- Información servidor: solicitada en el proyecto con el uso de plantillas.

### `MENU`
- Menu Sin usuario logueado

<img src='./readme/heroku_menuLogin.png' alt='menu sin logueo'/>

- Menu con usuario logueado y rol “usuario”

<img src='./readme/heroku_menuRolUsuario.png' alt='menu sin logueo'/>

Siendo “alyson” el nombre del usuario logueado

- Menu con usuario logueado y rol “admin”

<img src='./readme/heroku_menuRolAdmin.png' alt='menu sin logueo'/>

Siendo “admin” el nombre del usuario logueado

### `CHAT`
El cuadro de email aparecerá sin poder editar el email del usuario logueado.
El cuadro de abajo es para escribir los mensajes

<img src='./readme/heroku_chat.png' alt='chat'/>

### `Subir Archivo (registro de usuario)`
El ejemplo para subir archivo se va a encontrar en el registro del nuevo usuario

<img src='./readme/heroku_menuLogin.png' alt='registrarse paso 1'/>

<img src='./readme/heroku_linkRegistrase.png' alt='registrarse paso 2'/>

<img src='./readme/heroku_subirArchivo.png' alt='registrarse paso 3'/>

<img src='./readme/heroku_subirArchivo2.png' alt='registrarse paso 4'/>

<img src='./readme/heroku_subirArchivo3.png' alt='registrarse paso 5'/>

<img src='./readme/heroku_formRegistrarse.png' alt='registrarse paso 6'/>

<img src='./readme/vsc_uploadUser.png' alt='vsc upload'/>
Se observa que se subio en la carpeta public
