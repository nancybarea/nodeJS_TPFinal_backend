import { Router } from 'express'
import  * as mensajesController from '../controller/MensajesController.js'
import {requiereAutenticacion} from "../controller/UsuariosController.js"

const MensajesRoutes = new Router();

//GET '/producto' -> devuelve todos los productos
MensajesRoutes.get('/', requiereAutenticacion, mensajesController.obtenerMensajes)

export default MensajesRoutes 