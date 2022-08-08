# servidor api rest
DATA ON WIRE
(no sirve paginas, solo json)

## api productos
-consultar
-crear (solo usuario registrado, con permisos de admin)
-modificar (solo usuario registrado, con permisos de admin)
-borrar (solo usuario registrado, con permisos de admin)

## api auth
-registro (crear usuario)
-login (usuario -> JWT)

[ el nombre de usuario del admin se puede HARDCODEAR ]

## api carritos

-agregar prods (solo usuario registrado)
-listar prods (solo usuario registrado)
-quitar prods (solo usuario registrado)

## api ordenes
-comprar todo el contenido del carrito (solo usuario registrado)
-ver mis ordenes (solo usuario registrado)

-------------------------------------------------------
detalles del negocio:

-para crear entidades, tienen que ser validas en su formato y contenido.

-para agregar productos al carrito, debe existir el producto

-al generar nuevas entidades, utilizar ids alfanumericos al azar

-al almacenar contraseñas en la BD, guardarlas encriptadas

+++

-cuando se realiza una compra (crear orden):
- - se vacía el carrito
- - se notifica al admin de la nueva venta (vía mail)
- - se notifica al usuario del nuevo pedido (vía mail)

-------------------------------------------------------

# caracteristicas de las entidades para persistir

## usuarios
-id
-name (nombre)
-lastname (apellido)
-email (usuario para login)
-password (contraseña para login)
-phone (número telefónico)
-url de la foto de perfil
(guardada con multer, servida con express.static)

## productos
-id
-name
-description
-price
-image (url de la foto guardada con multer, servida con express.static)

## carritos
-id (igual al del cliente al que pertenece)
-productos y sus cantidades

ejemplo:
{
 id: 1,
 prods: [ { idProd: 1, cant: 2 }, { idProd: 2, cant: 5} ]
}

ejemplo 2:
{
 id: 1,
 prods: [
  { 
    prod: {
      id,
      name,
      description,
      price,
      image,
    },
    cant: 2
  },
  { 
    prod: {
      id,
      name,
      description,
      price,
      image,
    },
    cant: 1
  }
 ]
}

## ordenes
{
  id: 1,
  fecha: (timestamp)
  idCliente: 1,
  prods: [ 
    { 
    prod: {
      id,
      name,
      description,
      price,
      image,
    },
    cant: 2
  },
  { 
    prod: {
      id,
      name,
      description,
      price,
      image,
    },
    cant: 1
  }
 ],
}

## mensajes
-email
-fecha
-texto

todo esto se persiste en MongoDB Local (dev) / Mongo Atlas (prod)

----------------------------------------------------------
adicional 1
----------------------------------------------------------

# chat via sockets:

-envío de mensajes
-consulta de mensajes

----------------------------------------------------------
adicional 2
----------------------------------------------------------

# ruta de info del servidor
-renderizar usando algun motor de plantillas

----------------------------------------------------------
adicional 3
----------------------------------------------------------

# despliegue en Heroku
-a tener en cuenta, en heroku no se cargan los .env, sino que las variables de entorno se cargan desde la configuracion del proyecto, desde el sitio de heroku.

----------------------------------------------------------
# observaciones

la carga de las imagenes se puede hacer de varias maneras:

opciones en orden decreciente de preferencia:

-en una 1ra peticion cargar la foto (devuelve la url), y en una 2da crear la entidad + url (preferida!)

-en una 1ra peticion creo la entidad, y en una 2da cargo la foto (y actualiza el campo url de esa entidad). en este caso, el campo foto no sería obligatorio, y se usaría una foto por defecto.

-en una sola peticion, enviar foto + datos

----------------------------------------------------------
# lo NO hace falta (pero si quieren pueden incluir)
----------------------------------------------------------

-front-end. siempre y cuando sea un desarrollo separado,
en una carpeta aparte, en un servidor aparte.
-documentacion, no es necesario.
-tests automatizados, no es necesario.

