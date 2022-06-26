import { Router } from 'express'
import  * as chatController from '../controller/ChatController.js'
import {requiereAutenticacion} from "../controller/UsuariosController.js"

const ChatRoutes = new Router();

//GET '/producto' -> devuelve todos los productos
ChatRoutes.get('/', requiereAutenticacion, chatController.obtenerMensajesChat)
//GET '/producto' -> devuelve todos los productos
ChatRoutes.post('/', requiereAutenticacion, chatController.agregarMensajesChat)
//GET '/producto' -> devuelve todos los productos
ChatRoutes.delete('/:idMensajeChat', requiereAutenticacion, chatController.borrarMensajeChat)

export default ChatRoutes 