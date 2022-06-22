import { Router } from 'express'
import passport from 'passport';
import * as webController from '../controller/webController.js'

const webRoutes = new Router();


//GET '/' -> Pantalla de inicio
webRoutes.get('/', webController.getInicio);

//GET '/' -> Datos del servidor
webRoutes.get('/server', webController.getInfoServer);

//GET '/' -> listado de productos
webRoutes.get('/productos', webController.getProductos);

//GET '/login' -> Pantalla de login
webRoutes.get('/login', webController.getLogin);

//GET '/login' -> Pantalla de login luego de clickear el boton para loguearse
webRoutes.post('/login', webController.postLogin);

webRoutes.post('/login',
    passport.authenticate('login', {
        failureRedirect: '/usuario/failLogin'
    }),
    webController.postLogin);


export default webRoutes