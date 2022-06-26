import { Router } from 'express'
import passport from 'passport';
import * as webController from '../controller/webController.js'

const webRoutes = new Router();

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

//ERRORES
//renderiza desde el back la pantalla de error en login
webRoutes.get('/failLogin', webController.getfailLogin)
webRoutes.get('/failRegistro', webController.getfailRegistro)

export default webRoutes