# FINAL PROJECT  "Ecommerce"
- Course: Coderhouse - developer backend NodeJS
- Commission: 23250
- Professor: Mariano Aquino
- Tutor: Mauricio Di Pietro
- Pupil: Nancy Barea
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
(is connected to the github repository)

<img src='./readme/heroku.png' alt='config admin'/>


Only the most relevant functionalities for this project are detailed below.
- Menu: how the menu is modified according to the role of the logged in user.
- Chat: it was requested to make a chat with socket where all users can talk.
- Upload File : upload image with multer and save it in public folder
- Server information: requested in the project with the use of templates.

### `MENU`
- Menu No user logged in

<img src='./readme/heroku_menuLogin.png' alt='menu sin logueo'/>

- Menu with logged in user and “user” role

<img src='./readme/heroku_menuRolUsuario.png' alt='menu sin logueo'/>

"alyson" the name of the logged in user

- Menu with logged in user and “admin” role

<img src='./readme/heroku_menuRolAdmin.png' alt='menu sin logueo'/>

"admin" the name of the logged in user

### `CHAT`
The email box will appear without being able to edit the email of the logged in user.

The box below is for writing the messages

<img src='./readme/heroku_chat.png' alt='chat'/>

### `Upload File (user register)`
The example to upload file will be found in the registration of the new user

<img src='./readme/heroku_menuLogin.png' alt='registrarse paso 1'/>

<img src='./readme/heroku_linkRegistrase.png' alt='registrarse paso 2'/>

<img src='./readme/heroku_subirArchivo.png' alt='registrarse paso 3'/>

<img src='./readme/heroku_subirArchivo2.png' alt='registrarse paso 4'/>

<img src='./readme/heroku_subirArchivo3.png' alt='registrarse paso 5'/>

<img src='./readme/heroku_formRegistrarse.png' alt='registrarse paso 6'/>

<img src='./readme/vsc_uploadUser.png' alt='vsc upload'/>
It is observed that it was uploaded in the public folder


### `Server Information`

<img src='./readme/heroku_menuInfoServer.png' alt='info Server paso 1'/>

<img src='./readme/heroku_infoServer.png' alt='info Server paso 2'/>

#
## Postman – upload file

### `Users – upload user image`

Default image (when the user does not upload it)

<img src='./readme/postman_userDefault.png' alt='postman UploadFile Defect'/>

User Uploaded Image

<img src='./readme/postman_userSelect.png' alt='postman UploadFile byUser'/>

<img src='./readme/vsc_uploadUserOfPostman.png' alt='vsc UploadFile byUser'/>


### `Products – upload product image`

Default image (when the user does not upload it)

<img src='./readme/postman_productDefault.png' alt='postman UploadFile Defect'/>

User Uploaded Image

<img src='./readme/postman_productSelect.png' alt='postman UploadFile byUser'/>

<img src='./readme/vsc_uploadProductOfPostman.png' alt='vsc UploadFile byUser'/>

#
## Swagger

[link swagger](https://ecommerce-bac.herokuapp.com/api/docs/)

<img src='./readme/swagger1.png' alt='swagger 1'/>

<img src='./readme/swagger2.png' alt='swagger 2'/>

<img src='./readme/swagger3.png' alt='swagger 3'/>

<img src='./readme/swagger4.png' alt='swagger 4'/>

<img src='./readme/swagger5.png' alt='swagger 5'/>

#
## Graphl

[link Graphl](https://ecommerce-bac.herokuapp.com/graphql)

Example 

```
query{
  obtenerUnProducto(id: "5H6AKK8QWH0JGXJMIJHYDJ"){
    id
    name
    description
    price
    image
    stock
  }
}
```

<img src='./readme/graphql.png' alt='example Graphl'/>

#
## Testing en VSC

<img src='./readme/vsc_ejecucionTest.png' alt='Testing 1'/>

<img src='./readme/vsc_ejecucionTest2.png' alt='Testing 2'/>


#
## Example file .env 

the data are examples, they are not valid

// development / production

NODE_ENV=development

HOST=localhost

PORT=8080

//JWT

SECRET='PALABRA_SECRET'

JWT_IGNORE_EXPIRE=false

JWT_TIME_EXPIRE=3600

//Configuracion de persistencia PRODUCCION

MONGO_URL='mongodb+srv://user:password@cluster0.2ycpm.mongodb.net/?retryWrites=true&w=majority'

MONGO_BASE=ecommerce


//configuracion del correo para enviar emails, whatsapp y sms

MAIL_SMTP = 'gmail'

MAIL_PORT = 555

MAIL_USER = 'email@gmail.com'

MAIL_PASS = 'kkkkkkkkkkkkkkkk'

MAIL_USER_ADMIN = 'email@gmail.com'


WHATSAPP_USER_ADMIN = 'whatsapp:+5491111111111'

TWILIO_ACCOUNTSID = 'AC37e209999999999296970fff'

TWILIO_AUTHTOKEN = 'd99999g99999999g99999g'



