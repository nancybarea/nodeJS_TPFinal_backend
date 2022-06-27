import { Router } from 'express'
import passport from 'passport';
import * as webController from '../controller/webController.js'
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
//POST '/login' -> genera el login del usuario y renderiza la pantalla de inicio logeado
webRoutes.post('/login', passport.authenticate('login', {failureRedirect: '/failLogin'}), webController.getRegistrarse);

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

//ERRORES
//renderiza desde el back la pantalla de error en login
webRoutes.get('/failLogin', webController.getfailLogin)
webRoutes.get('/failRegistro', webController.getfailRegistro)

export default webRoutes