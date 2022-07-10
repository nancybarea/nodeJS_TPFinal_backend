import { Router } from 'express'
import * as webController from '../controller/webController.js'
import passport from '../controller/PassportController.js'
import logger from '../logger.js'

const webRoutes = new Router();

/* ------------------------------------------------------ */
import multer from 'multer'
/* Multer config */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  const upload = multer({ storage: storage })
/* ------------------------------------------------------ */

//GET '/' -> Pantalla de inicio
webRoutes.get('/', webController.getInicio);

//REGISTRARSE
webRoutes.get('/registrarse', webController.getRegistrarse)
// POST '/registrarse' -> genera un nuevo usuario y renderiza la pantalla de inicio logeado
webRoutes.post('/registrarse',  
    passport.authenticate('registro', {failureRedirect: '/failRegistro'}),    
    webController.getLogin);

//LOGUEARSE
webRoutes.get('/login', webController.getLogin);
//POST '/login' --> recibe email y password del usuario
webRoutes.post('/login', passport.authenticate('login', {
  failureRedirect: '/failLogin'}),
  webController.postLogin
);

//DESLOGUEARSE
webRoutes.get('/logout', webController.getLogout);

//SUBIR ARCHIVOS
webRoutes.get('/subirArchivos', webController.getSubirArchivo);
webRoutes.post('/subirArchivos', upload.single('miArchivo'), (req, res, next) => {
    logger.info(`POST /subirArchivos`)
    const file = req.file
    if (!file) {
      const error = new Error('Error subiendo archivo')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
  })

//CHAT
webRoutes.get('/chat', webController.mensajesChat);

//INFO SERVER
webRoutes.get('/infoServer', webController.infoServer);

//ABM
webRoutes.get('/abmProductos', webController.abmProductos);
webRoutes.get('/producto/borrar/:id', webController.productoBorrar);

webRoutes.get('/abmUsuarios', webController.abmUsuarios);
webRoutes.get('/usuario/alta', webController.amUsuario);
webRoutes.get('/usuario/modificar/:email', webController.amUsuario);
webRoutes.get('/usuario/borrar/:email', webController.usuarioBorrar);

webRoutes.get('/abmCarritos', webController.abmCarritos);
webRoutes.get('/carrito/borrar/:id', webController.carritoBorrar);

webRoutes.get('/abmPedidos', webController.abmPedidos);
webRoutes.get('/pedido/borrar/:id', webController.pedidoBorrar);

webRoutes.get('/abmMensajes', webController.abmMensajes);
webRoutes.get('/mensajeChat/borrar/:id', webController.mensajeChatBorrar);

//ERRORES
//renderiza desde el back la pantalla de error en login
webRoutes.get('/failLogin', webController.getfailLogin)
webRoutes.get('/failRegistro', webController.getfailRegistro)

export default webRoutes